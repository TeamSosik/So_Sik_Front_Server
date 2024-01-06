import React from "react";
import ReactApexChart from "react-apexcharts";
import "../common/css/mypage.css";
import FoodModal from "./FoodModal/FoodModal";

const MyPage = () => {
  const profileImage =
    "https://www.wadiz.kr/wwwwadiz/green001/sns_profile_pics/20210715190605914_35332951.jpg"; // 프로필 이미지 URL
  const nickName = "떡뽀끼";
  const weightChangeOptions = {
    annotations: {},
    chart: {
      animations: {
        enabled: false,
      },
      background: "",
      foreColor: "#333",
      fontFamily: "SUITE-Regular",
      height: 342,
      id: "wxJSW",
      stacked: true,
      stackOnlyBar: true,
      toolbar: {
        show: false,
        tools: {
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      type: "area",
      width: 536,
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
              color: "#373d3f",
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
        dataLabels: {
          format: "scale",
        },
      },
      radialBar: {
        hollow: {
          background: "#fff",
        },
        dataLabels: {
          name: {},
          value: {},
          total: {},
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
    dataLabels: {
      enabled: false,
      style: {
        fontWeight: 700,
      },
    },
    fill: {},
    grid: {
      padding: {
        right: 36,
        left: 15,
      },
    },
    legend: {
      fontSize: 14,
      offsetY: 5,
      itemMargin: {
        horizontal: 14,
        vertical: 15,
      },
    },
    markers: {
      hover: {
        sizeOffset: 6,
      },
    },
    series: [
      {
        name: "현재 체중",
        data: [
          {
            x: "Aug",
            y: 31,
          },
          {
            x: "Sep",
            y: 40,
          },
          {
            x: "Oct",
            y: 28,
          },
          {
            x: "Nov",
            y: 51,
          },
          {
            x: "Dec",
            y: 42,
          },
        ],
        zIndex: 0,
      },
      {
        name: "목표 체중",
        data: [
          {
            x: "Aug",
            y: 20,
          },
          {
            x: "Sep",
            y: 32,
          },
          {
            x: "Oct",
            y: 38,
          },
          {
            x: "Nov",
            y: 22,
          },
          {
            x: "Dec",
            y: 56,
          },
        ],
        zIndex: 1,
      },
    ],
    stroke: {
      width: 4,
      fill: {
        type: "solid",
        opacity: 0.85,
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 0.65,
          opacityTo: 0.5,
          stops: [0, 100, 100],
          colorStops: [],
        },
      },
    },
    tooltip: {
      hideEmptySeries: true,
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
      tickAmount: "dataPoints",
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
    <div className="my-page">
      <div className="left-section">
        <div className="profile-info">
          <img src={profileImage} alt="프로필 이미지" />
          <h2>{nickName} 님</h2>
        </div>
      </div>

      <div className="right-section">
        <div className="kcal-weight">
          <div className="kcal">
            <div className="kcal-type">
              <div className="tdee-kcal">
                <span className="kcal-type-name">TDEE 칼로리</span>
                <span className="kcal-name">1500 kcal</span>
              </div>
              <hr />
              <div className="activity-kcal">
                <span className="kcal-type-name">오늘 목표 칼로리</span>
                <span className="kcal-name">2000 kcal</span>
              </div>
            </div>
          </div>
          <div className="weight">
            <div className="current-weight">
              <span className="weight-name">현재 체중</span>
              <p className="current">64kg</p>
            </div>
            <div className="target-weight">
              <span className="weight-name">목표 체중</span>
              <p className="target">60kg</p>
            </div>
            <div className="remaining-weight">
              <span className="weight-name">남은 체중</span>
              <p className="remaining">4kg</p>
            </div>
          </div>
        </div>
        <FoodModal></FoodModal>

        <div className="my-weight-change">
          <span className="weight-change-title">나의 체중 변화</span>
          <ReactApexChart
            options={weightChangeOptions}
            series={weightChangeOptions.series}
            type="area"
            height={450}
            zIndex="0"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
