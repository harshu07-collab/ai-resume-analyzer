export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
        try {
            // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
            let lib = await import("pdfjs-dist/build/pdf.mjs");
            
            // Handle cases where the module is wrapped in a default export
            if (lib && lib.default && !lib.getDocument) {
                lib = lib.default;
            }

            // Set the worker source to a CDN that matches the library version
            // This ensures the API and Worker versions always match even if the package is updated
            lib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${lib.version}/build/pdf.worker.min.mjs`;
            pdfjsLib = lib;
            return lib;
        } catch (err) {
            loadPromise = null;
            throw err;
        }
    })();

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = lib.getDocument({ 
            data: new Uint8Array(arrayBuffer),
            useSystemFonts: true, // Better font rendering
            disableFontFace: false,
        });
        
        const pdf = await loadingTask.promise;
        
        if (pdf.numPages === 0) {
            throw new Error("The PDF file appears to be empty (0 pages).");
        }
        
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false }); // Disable alpha for better performance if not needed

        if (!context) {
            throw new Error("Failed to get canvas 2d context. Your browser might be out of memory or not support canvas.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Fill background with white (PDFs are often transparent but expected to be white)
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({ 
            canvasContext: context, 
            viewport,
            intent: 'display'
        }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob. The PDF page might be too large.",
                        });
                    }
                },
                "image/png"
            );
        });
    } catch (err) {
        console.error("PDF conversion error:", err);
        return {
            imageUrl: "",
            file: null,
            error: err instanceof Error ? err.message : String(err),
        };
    }
}