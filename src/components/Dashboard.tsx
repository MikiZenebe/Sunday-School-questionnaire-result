/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Dashboard.tsx
import ChartCard from "./ChartCard";

const createPieOption = (
  name: string,
  data: { value: number; name: string }[],
  isDoughnut: boolean = true,
) => ({
  tooltip: { trigger: "item", formatter: "{b}: <br/><b>{c}</b> ({d}%)" },
  legend: { top: "bottom" },
  series: [
    {
      name: name,
      type: "pie",
      radius: isDoughnut ? ["40%", "70%"] : "70%",
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: !isDoughnut,
        formatter: "{b}\n{c} ({d}%)",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "14",
          fontWeight: "bold",
        },
      },
      data: data,
    },
  ],
});

const createBarOption = (
  name: string,
  data: { value: number; name: string }[],
  horizontal: boolean = false,
) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const val = params[0].value;
        const percent = ((val / total) * 100).toFixed(1);
        return `${params[0].name}<br/>${params[0].marker} ${params[0].seriesName}: <b>${val}</b> (${percent}%)`;
      },
    },
    grid: { left: "3%", right: "8%", bottom: "8%", containLabel: true },
    xAxis: horizontal
      ? { type: "value" }
      : {
          type: "category",
          data: data.map((d) => d.name),
          axisLabel: { interval: 0, rotate: 15 },
        },
    yAxis: horizontal
      ? {
          type: "category",
          data: data.map((d) => d.name),
          axisLabel: { interval: 0 },
        }
      : { type: "value" },
    series: [
      {
        name: name,
        type: "bar",
        data: data.map((d) => ({
          value: d.value,
          itemStyle: { borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0] },
        })),
        itemStyle: { color: "#5470c6" },
        label: {
          show: true,
          position: horizontal ? "right" : "top",
          formatter: (params: any) => {
            const percent = ((params.value / total) * 100).toFixed(1);
            return `${params.value} (${percent}%)`;
          },
        },
      },
    ],
  };
};

const createLineOption = (
  name: string,
  data: { value: number; name: string }[],
) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const val = params[0].value;
        const percent = ((val / total) * 100).toFixed(1);
        return `${params[0].name}<br/>${params[0].marker} ${params[0].seriesName}: <b>${val}</b> (${percent}%)`;
      },
    },
    grid: { left: "3%", right: "4%", bottom: "8%", containLabel: true },
    xAxis: {
      type: "category",
      data: data.map((d) => d.name),
      axisLabel: { interval: 0, rotate: 15 },
    },
    yAxis: { type: "value" },
    series: [
      {
        name: name,
        type: "line",
        data: data.map((d) => d.value),
        smooth: true,
        areaStyle: { opacity: 0.2 },
        itemStyle: { color: "#91cc75" },
        lineStyle: { width: 4 },
        symbolSize: 8,
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            const percent = ((params.value / total) * 100).toFixed(1);
            return `${params.value} (${percent}%)`;
          },
        },
      },
    ],
  };
};

// Using Pie Chart for simple binary/demographic comparison
const GENDER_OPTION = createPieOption(
  "ጾታ",
  [
    { value: 34, name: "ወንድ" },
    { value: 105, name: "ሴት" },
  ],
  false,
);

// Using a standard Bar Chart to compare the 3 categories easily
const SCHOOL_OPTION = createBarOption("ትምህርት ቤት", [
  { value: 67, name: "የግል" },
  { value: 21, name: "የህዝብ" },
  { value: 59, name: "የመንግሥት" },
]);

// Using Doughnut Pie Chart
const JOIN_OPTION = createPieOption(
  "የመጡበት መንገድ",
  [
    { value: 33, name: "በቤተሰብ" },
    { value: 30, name: "በራሴ" },
    { value: 36, name: "በጓደኛ" },
  ],
  true,
);

// Using Horizontal Bar Chart because the long labels fit better on the Y-axis
const PURPOSE_OPTION = createBarOption(
  "ምን ለማግኘት መጣህ/ሽ?",
  [
    { value: 126, name: "ዕውቀት/ሥርዓት/በረከት/መንፈሳዊ ሕይወት ለማግኘት" },
    { value: 5, name: "ለማገልገል" },
    { value: 3, name: "ጠባይ ለማስተካከል" },
    { value: 1, name: "ለዲቁና" },
  ],
  false,
);

// Using Pie chart for a simple Yes/No breakdown
const GAINED_OPTION = createPieOption(
  "ያገኙት ጥቅም",
  [
    { value: 24, name: "አዎ" },
    { value: 115, name: "አይ፡ ያላገኙት ሥነ-ምግባር፣ እኩልነት አለመረዳት፣ ንስሐ አባት፣ የዜማ ት/ት" },
  ],
  false,
);

// Using Line/Area chart to show the spread of values
const CONFESSOR_OPTION = createLineOption("ንስሐ አባት", [
  { value: 48, name: "የቤተሰብ" },
  { value: 17, name: "ያልጠቀሰ" },
  { value: 17, name: "የግል" },
  { value: 59, name: "የሌለው" },
]);

const charts = [
  {
    title: "1. ጾታ",
    option: GENDER_OPTION,
    className: "col-span-1 lg:col-span-1",
  },
  {
    title: "3. እንዴት ወደ ስንበት ት/ቤት መጣህ/ሽ?",
    option: JOIN_OPTION,
    className: "col-span-1 lg:col-span-1",
  },
  {
    title: "5. በመምጣትህ/ሽ ምን አገኘህ/ሽ?",
    option: GAINED_OPTION,
    className: "col-span-1 lg:col-span-1",
  },
  {
    title: "4. ምን ለማግኘት መጣህ/ሽ?",
    option: PURPOSE_OPTION,
    className: "col-span-1 lg:col-span-2",
  },
  {
    title: "2. የትምህርት ቤት ዓይነት",
    option: SCHOOL_OPTION,
    className: "col-span-1 lg:col-span-1",
  },
  {
    title: "6. ንስሐ አባት",
    option: CONFESSOR_OPTION,
    className: "col-span-1 lg:col-span-3",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="pt-4 md:pt-0">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            የሰንበት ት/ቤት የዳሰሳ ጥናት ውጤት
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            ከተሳታፊዎች የተሰበሰበውን መረጃ የሚያሳይ አጠቃላይ ትንታኔ (እስከ 147 ምላሾች)
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              ጠቅላላ ተሳታፊዎች
            </div>
            <div className="mt-2 text-4xl font-black text-slate-800">139</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              ዋና ዓላማ
            </div>
            <div className="mt-2 text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              ዕውቀት/ሥርዓት/መንፈሳዊ ሕይወት
            </div>
            <div className="text-sm text-emerald-600 mt-2 font-medium bg-emerald-50 px-2 py-1 rounded inline-flex self-start">
              93% ያህል ተሳታፊዎች
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              አብዛኛው ተሳታፊ ጾታ
            </div>
            <div className="mt-2 text-4xl font-black text-slate-800">ሴቶች</div>
            <div className="text-sm text-purple-600 mt-2 font-medium bg-purple-50 px-2 py-1 rounded inline-flex self-start">
              75% (105 ተሳታፊዎች)
            </div>
          </div>
        </div>

        {/* Charts Grid Array */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
          {charts.map((c) => (
            <ChartCard
              key={c.title}
              title={c.title}
              option={c.option}
              className={c.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
