import React from "react";
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let bgColor = "bg-red-50";
  let textColor = "text-red-600";
  let borderColor = "border-red-200";
  let icon = null;

  if (score > 69) {
    bgColor = "bg-green-50";
    textColor = "text-green-600";
    borderColor = "border-green-200";
    icon = (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  } else if (score > 39) {
    bgColor = "bg-yellow-50";
    textColor = "text-yellow-600";
    borderColor = "border-yellow-200";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border",
        bgColor,
        textColor,
        borderColor
      )}
    >
      {icon}
      {score}/100
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
  itemId: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  categoryScore,
  itemId,
}) => {
  return (
    <AccordionHeader itemId={itemId} className="hover:bg-gray-50">
      <div className="flex items-center justify-between w-full">
        <span className="text-lg font-semibold text-gray-900">{title}</span>
        <ScoreBadge score={categoryScore} />
      </div>
    </AccordionHeader>
  );
};

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryContentProps {
  tips: Tip[];
  itemId: string;
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips, itemId }) => {
  return (
    <AccordionContent itemId={itemId}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2">
            {tip.type === "good" ? (
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            )}
            <span className="text-gray-700 text-sm font-medium">{tip.tip}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg",
              tip.type === "good" ? "bg-green-50" : "bg-red-50"
            )}
          >
            <h4
              className={cn(
                "text-sm font-bold mb-1",
                tip.type === "good" ? "text-green-800" : "text-red-800"
              )}
            >
              {tip.type === "good" ? "What you did well" : "How to improve"}
            </h4>
            <p
              className={cn(
                "text-sm",
                tip.type === "good" ? "text-green-700" : "text-red-700"
              )}
            >
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
};

interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Accordion allowMultiple>
        <AccordionItem id="tone-style">
          <CategoryHeader
            title="Tone & Style"
            categoryScore={feedback.toneAndStyle.score}
            itemId="tone-style"
          />
          <CategoryContent
            tips={feedback.toneAndStyle.tips}
            itemId="tone-style"
          />
        </AccordionItem>

        <AccordionItem id="content">
          <CategoryHeader
            title="Content"
            categoryScore={feedback.content.score}
            itemId="content"
          />
          <CategoryContent tips={feedback.content.tips} itemId="content" />
        </AccordionItem>

        <AccordionItem id="structure">
          <CategoryHeader
            title="Structure"
            categoryScore={feedback.structure.score}
            itemId="structure"
          />
          <CategoryContent
            tips={feedback.structure.tips}
            itemId="structure"
          />
        </AccordionItem>

        <AccordionItem id="skills">
          <CategoryHeader
            title="Skills"
            categoryScore={feedback.skills.score}
            itemId="skills"
          />
          <CategoryContent tips={feedback.skills.tips} itemId="skills" />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
