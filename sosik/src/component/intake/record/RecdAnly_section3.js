import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../common/spinners/Loading";
import TodayKcalNotData from "../../../images/today_kcal_not_data.png";

const RecdAnly_section3 = () => {
  // 필드

  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const nutrientDetails = ["탄수화물", "단백질", "지방"];

  const totalIntakeValues = [0, 0, 0];
  const colors = [
    "hsl(177, 70%, 50%)",
    "hsl(293, 70%, 50%)",
    "hsl(327, 70%, 50%)",
    "hsl(182, 70%, 50%)",
    "hsl(203, 70%, 50%)",
  ];

  const defaultPieChartData = nutrientDetails.map((data, index) => {
    return {
      id: data,
      label: data,
      value: totalIntakeValues[index],
      color: colors[index],
    };
  });

  // 상태

  // 메서드

  const getTodayTargetkcal = async () => {
    const authorization = JSON.parse(sessionStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshtoken"));
    let today = new Date().toISOString().split("T")[0];
    console.log(today);

    try {
      await axios({
        method: "get",
        url: "http://43.200.224.252:5056/target-calorie/v1/" + today,
        headers: {
          authorization: authorization,
          refreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response);
        if (response.data.result.dayTargetKcal === null) {
          console.log(response);
          setPieChartData([]);
        } else {
          totalIntakeValues[0] =
            (Math.floor((response.data.result.dayTargetKcal / 8) * 100) / 100) *
            4;
          totalIntakeValues[1] =
            (Math.floor(((response.data.result.dayTargetKcal * 3) / 40) * 100) /
              100) *
            4;
          totalIntakeValues[2] =
            (Math.floor((response.data.result.dayTargetKcal / 45) * 100) /
              100) *
            9;
          console.log(response);

          const nutrientList = nutrientDetails.map((data, index) => {
            return {
              id: data,
              label: data,
              value: totalIntakeValues[index],
              color: colors[index],
            };
          });
          setPieChartData(nutrientList);
        }

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // 처음 페이지 들어왔을 때 실행
  useEffect(() => {
    setLoading(true);
    getTodayTargetkcal();
  }, []);

  // view
  const chartView = (
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
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="recd-anly-section2">
      <div className="recd-anly-name">일일 권장 영양소 섭취량</div>
      <div className="recd-anly-content">
        {pieChartData.length !== 0 ? (
          chartView
        ) : (
          <img src={TodayKcalNotData} alt="not_data.png" />
        )}
      </div>
    </div>
  );
};

export default RecdAnly_section3;
