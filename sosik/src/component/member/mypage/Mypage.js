import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WeightModal from "../../intake/modal/WeightModal";
import ReactApexChart from "react-apexcharts";
import "./mypage.css";

const MyPage = () => {
  const getData = async () => {
    const authorization = JSON.parse(localStorage.getItem("accesstoken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshtoken"));

    try {
      await axios({
        method: "get",
        url: "http://localhost:5056/members/v1/detail",
        headers: {
          authorization: "Bearer " + authorization,
          refreshToken: "Bearer " + refreshToken,
        },
      }).then((response) => {
        console.log(response);
        setUsers(response.data.result);
      });
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const [users, setUsers] = useState({
    memberId: "",
    email: "",
    name: "",
    gender: "",
    height: 0,
    role: "",
    activityLevel: "",
    nickname: "",
    profileImage: "",
    birthday: "",
    tdeeCalculation: "",
    weightList: [""],
  });

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
      offsetX: 0,
    },
    series: [
      {
        name: "현재 체중",
        data: users.weightList.map((entry) => ({
          x: entry.createdAt,
          y: entry.currentWeight,
        })),
        zIndex: 0,
      },
      {
        name: "목표 체중",
        data: users.weightList.map((entry) => ({
          x: entry.createdAt,
          y: entry.targetWeight,
        })),
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

  const lastWeightEntry = users.weightList[users.weightList.length - 1];
  const lastCurrentWeight = lastWeightEntry.currentWeight;
  const lastGoalWeight = lastWeightEntry.targetWeight;

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="my-page">
      <div className="left-section">
        <div className="profile-info">
          <img
            src={`http://localhost:9000/members/images/${users.memberId}`}
            alt=""
          />
          <h2>{users.nickname} 님</h2>
        </div>
        <div className="update-btn">
          <button
            className="my-kcal"
            type="submit"
            onClick={() => handleNavigate("/recdkcal")}
          >
            나의 칼로리
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="my-anly"
            type="submit"
            onClick={() => handleNavigate("/recdanly")}
          >
            나의 분석
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="myweight-update"
            type="submit"
            onClick={handleShowModal}
          >
            나의 체중 수정
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
          <button
            className="myinfo-update"
            type="submit"
            onClick={() => handleNavigate("/updateinfo")}
          >
            내 정보 수정
            <FontAwesomeIcon
              icon={faAngleRight}
              size="2xs"
              style={{ color: "#000000", marginLeft: 30 }}
            />
          </button>
        </div>
      </div>

      <div className="right-section">
        <div className="kcal-weight">
          <div className="kcal">
            <div className="kcal-type">
              <div className="tdee-kcal">
                <span className="kcal-type-name">TDEE 칼로리</span>
                <span className="kcal-name">{users.tdeeCalculation}kcal</span>
              </div>
              <hr />
              <div className="activity-kcal">
                <span className="kcal-type-name">오늘 목표 칼로리</span>
                <span className="kcal-name">{0}kcal</span>
              </div>
            </div>
          </div>
          <div className="weight">
            <div className="current-weight">
              <span className="weight-name">현재 체중</span>
              <p className="current">{lastCurrentWeight}kg</p>
            </div>
            <div className="target-weight">
              <span className="weight-name">목표 체중</span>
              <p className="target">{lastGoalWeight}kg</p>
            </div>
            <div className="remaining-weight">
              <span className="weight-name">남은 체중</span>
              <p className="remaining">
                {Math.abs(lastCurrentWeight - lastGoalWeight)}kg
              </p>
            </div>
          </div>
        </div>

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
      {showModal && (
        <WeightModal handleCloseModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default MyPage;
