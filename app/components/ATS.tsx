import React from 'react';

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    let bgColor = "from-red-100";
    let icon = "/icons/ats-bad.svg";

    if (score > 69) {
        bgColor = "from-green-100";
        icon = "/icons/ats-good.svg";
    } else if (score > 49) {
        bgColor = "from-yellow-100";
        icon = "/icons/ats-warning.svg";
    }

    return (
        <div className={`bg-gradient-to-b ${bgColor} to-white p-6 rounded-2xl shadow-md w-full`}>
            <div className="flex items-center gap-4 mb-6">
                <img src={icon} alt="ATS Icon" className="w-16 h-16" />
                <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Applicant Tracking System</h3>
                <p className="text-gray-500">
                    ATS is software that employers use to scan resumes. A higher score means your resume is more likely to be seen.
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <img
                            src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                            alt={suggestion.type}
                            className="w-5 h-5 mt-0.5"
                        />
                        <p className="text-gray-700 font-medium">{suggestion.tip}</p>
                    </div>
                ))}
            </div>

            <p className="text-sm font-semibold text-gray-800">
                Fixing these issues can significantly increase your chances of landing an interview.
            </p>
        </div>
    );
};

export default ATS;
