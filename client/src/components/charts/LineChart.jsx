"use client";

const LineChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChartComponent
        accessibilityLayer
        data={[
          { month: "Jan", count: 111 },
          { month: "Feb", count: 157 },
          { month: "Mar", count: 129 },
          { month: "Apr", count: 150 },
          { month: "May", count: 119 },
          { month: "Jun", count: 72 },
        ]}
      >
        <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={4} />
      </BarChartComponent>
    </ChartContainer>
  );
};

export default LineChart;
