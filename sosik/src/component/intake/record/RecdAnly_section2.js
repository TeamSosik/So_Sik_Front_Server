import { ResponsivePie } from '@nivo/pie';
import React, { useState } from 'react';

const RecdAnly_section2 = () => {

  // 필드
  const defaultPieChartData = [
    {
      id: "탄수화물",
      label: "탄수화물",
      value: 466,
      color: "hsl(177, 70%, 50%)",
    },
    {
      id: "단백질",
      label: "단백질",
      value: 284,
      color: "hsl(293, 70%, 50%)",
    },
    {
      id: "지방",
      label: "지방",
      value: 495,
      color: "hsl(327, 70%, 50%)",
    },
    {
      id: "무기질",
      label: "무기질",
      value: 100,
      color: "hsl(182, 70%, 50%)",
    },
    {
      id: "비타민",
      label: "비타민",
      value: 279,
      color: "hsl(203, 70%, 50%)",
    },
  ];

  // 상태
  const [pieChartData, setPieChartData] = useState(defaultPieChartData);


  // 메서드

  // view


  

  return (
    <div className="recd-anly-section2">
      <div className="recd-anly-name">일일 영양소 분석</div>
      <div className="recd-anly-content">
        <div
          id="pie-chart"
          style={{ width: "700px", height: "400px", margin: "0 auto" }}
        >
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={7}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "yellow_green_blue" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", "0.2"]],
            }}
            arcLinkLabelsTextOffset={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsOffset={-2}
            arcLinkLabelsDiagonalLength={18}
            arcLinkLabelsStraightLength={36}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color", modifiers: [] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              { match: { id: "ruby" }, id: "dots" },
              { match: { id: "c" }, id: "dots" },
              { match: { id: "go" }, id: "dots" },
              { match: { id: "python" }, id: "dots" },
              { match: { id: "scala" }, id: "lines" },
              { match: { id: "lisp" }, id: "lines" },
              { match: { id: "elixir" }, id: "lines" },
              { match: { id: "javascript" }, id: "lines" },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RecdAnly_section2;