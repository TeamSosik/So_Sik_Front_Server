import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const KcalChart = ({ mealList, props }) => {
  console.log(props);
  console.log(mealList);
  const totalIntakeValues = [0];
  let recode = false;
  if (props.dayTargetKcal === 0) {
    recode = false;
  } else {
    recode = true;
  }

  const dayTargetKcal = props.dayTargetKcal;
  mealList.forEach((data) => {
    totalIntakeValues[0] += data.calculationKcal;
  });
  //   상태

  // 메서드

  // view

  const kcalChartOptions = {
    annotations: {},
    chart: {
      animations: {
        enabled: false,
        dynamicAnimation: {
          speed: 800,
        },
      },
      background: "#fff",
      foreColor: "#000",
      fontFamily: "SUITE-Regular",
      height: 340,
      id: "iA93N",
      stackOnlyBar: true,
      toolbar: {
        show: false,
      },
      type: "radialBar",
      width: 300,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        isFunnel: false,
        isFunnel3d: true,
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#59BD82",
              fontSize: "12px",
              fontWeight: 600,
            },
          },
        },
      },
      bubble: {
        zScaling: true,
      },
      treemap: {
        borderRadius: 4,
        dataLabels: {
          format: "scale",
        },
      },
      radialBar: {
        hollow: {
          margin: 0,
          size: "59%",
          background: "#fff",
          dropShadow: {},
        },
        track: {
          startAngle: 0,
          endAngle: 0,
          margin: 6,
        },
        dataLabels: {
          name: {
            fontSize: 20,
            fontWeight: 900,
          },
          value: {
            fontSize: 25,
          },
          total: {
            fontWeight: 400,
          },
        },
        barLabels: {
          enabled: false,
          margin: 5,
          useSeriesColors: true,
          fontWeight: 600,
          fontSize: "16px",
        },
      },
      pie: {
        donut: {
          labels: {
            name: {},
            value: {},
            total: {},
          },
        },
      },
    },
    colors: [
      Math.round(
        (Math.round(totalIntakeValues[0] * 100) / 100 / dayTargetKcal) * 10000
      ) /
        100 >
      100
        ? "#e81515"
        : "#59BD82",
    ],
    grid: {
      padding: {
        right: 0,
        bottom: 12,
        left: 10,
      },
    },
    labels: ["현재까지"],
    legend: {
      show: false,
      fontSize: 14,
      offsetY: 0,
      itemMargin: {
        vertical: 0,
      },
    },
    series: [
      recode === true
        ? Math.round(
            (Math.round(totalIntakeValues[0] * 100) / 100 / dayTargetKcal) *
              10000
          ) / 100
        : 0,
    ],
    stroke: {
      fill: {
        type: "solid",
        opacity: 0.85,
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
    },
    tooltip: {
      enabled: false,
      hideEmptySeries: false,
      fillSeriesColor: true,
    },
    xaxis: {
      labels: {
        trim: true,
        style: {},
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "",
        },
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
    yaxis: {
      labels: {
        style: {},
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
    theme: {
      palette: "palette4",
    },
  };

  return (
    <div>
      <div className="my-weight-change">
        <ReactApexChart
          options={kcalChartOptions}
          series={kcalChartOptions.series}
          type="radialBar"
          height={400}
          zIndex="0"
        />
      </div>
    </div>
  );
};

export default KcalChart;
