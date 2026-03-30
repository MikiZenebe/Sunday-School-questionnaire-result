// components/ChartCard.tsx
import ReactECharts from "echarts-for-react";

interface ChartCardProps {
  title: string;
  option: unknown;
  className?: string;
}

export default function ChartCard({
  title,
  option,
  className = "",
}: ChartCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <h3 className="text-[17px] font-semibold text-slate-800 mb-4 capitalize tracking-tight font-sans">
        {title.replace(/^\d+\.\s*/, "")}{" "}
        {/* Strips the "1. " numbering for a cleaner look */}
      </h3>
      <div className="flex-1 w-full flex items-center justify-center">
        <ReactECharts
          option={option}
          style={{ height: "320px", width: "100%" }}
        />
      </div>
    </div>
  );
}
