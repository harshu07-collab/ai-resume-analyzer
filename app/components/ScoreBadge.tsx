interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeClass = "";
  let label = "";

  if (score > 70) {
    badgeClass = "bg-badge-green text-green-600";
    label = "Strong";
  } else if (score > 50) {
    badgeClass = "bg-badge-yellow text-yellow-600";
    label = "Good Start";
  } else {
    badgeClass = "bg-badge-red text-red-600";
    label = "Needs Improvement";
  }

  return (
    <div className={`score-badge ${badgeClass}`}>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default ScoreBadge;
