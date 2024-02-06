import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../common/spinners/Loading";
import TodayKcalNotData from "../../../images/today_kcal_not_data.png";

const RecdAnly_section2 = () => {
  // 필드
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
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 메서드
  // 섭취 음식 목록 불러오기
  const getData = async () => {
    try {
      const member = JSON.parse(sessionStorage.getItem("member"));
      const accesstoken = JSON.parse(sessionStorage.getItem("accesstoken"));
      const refreshtoken = JSON.parse(sessionStorage.getItem("refreshtoken"));

      const currentUTC = new Date();
      const koreaTimeOffset = 9 * 60 * 60 * 1000;
      const koreaTime = new Date(currentUTC.getTime() + koreaTimeOffset);
      // 오늘 날짜
      const todayInKorea = koreaTime.toISOString().split("T")[0]; // yyyy-MM-dd 형식

      const url = `/intake/v1/${todayInKorea}`;

      const response = await axios({
        method: "get",
        url: url,
        baseURL: "http://localhost:5056",
        headers: {
          Authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  const addPieChartData = async () => {
    const data = await getData();

    if (!data) {
      setPieChartData([]);
      return;
    }

    const nutrientDataList = data.data.result;

    if (nutrientDataList.length === 0) {
      setPieChartData([]);
      return;
    }

    nutrientDataList.forEach((data) => {
      totalIntakeValues[0] += data.calculationCarbo;
      totalIntakeValues[1] += data.calculationProtein;
      totalIntakeValues[2] += data.calculationFat;
    });

    // 영양소 목록 만들기
    const nutrientList = nutrientDetails.map((data, index) => {
      return {
        id: data,
        label: data,
        value:
          index === 2
            ? Math.round((totalIntakeValues[index] * 100) / 100) * 9
            : Math.round((totalIntakeValues[index] * 100) / 100) * 4,
        color: colors[index],
      };
    });

    setPieChartData(nutrientList);
  };

  // 처음 페이지 들어왔을 때 실행
  useEffect(() => {
    setLoading(true);

    addPieChartData();
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
      <div className="recd-anly-name">일일 영양소 분석</div>
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

export default RecdAnly_section2;
