import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Loading from './../../common/spinners/Loading';

const RecdAnly_section1 = () => {

  // 필드

  const defaultParams = {
    rankType: "food",
    period: 30// 조회 기간
  }

  const periodList = [7, 15, 30];
  const rankTypeList = ["food", "kcal"];
  const rankTypeNameList = ["빈도수", "칼로리"];

  // 상태
  const [data, setData] = useState([]);
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);

  // 메서드
  // 섭취 랭크 요청
  const getData = async (params) => {

    const accesstoken = window.sessionStorage.getItem("accesstoken");
    const refreshtoken = window.sessionStorage.getItem("refreshtoken");

    try {

      const response = await axios({

        method: "get",
        url: "/intake/v1/rank",
        baseURL: "http://43.200.224.252:5056/",
        headers: {
          authorization: accesstoken,
          refreshtoken: refreshtoken,
          "Content-Type": "application/json"
        },
        params: params
      });

      return response;

    } catch(e) {
      console.log(e);
    }

    setLoading(false);
  }

  const addData = async (params) => {

    const response = await getData(params);

    if(!response) {
      return;
    }

    const dataList = response.data.result;
    const rankCount = 5;// 화면에 보일 랭크 개수
    const newData = dataList.filter((data, index) => {
      return index < rankCount;
    })
    .map((data, index) => {

      let {name, value} = data;

      return {
        x: name,
        y: value,
      }
    });

    setData(() => {

      return newData
    });
  }

  const handleParamsChange = (e) => {
    const {name, value} = e.target;

    setParams((current) => {
      return {
        ...current,
        [name]: value
      }
    });
    const newParams = {
      ...params,
      [name]: value
    }

    addData(newParams);
  }

  // view
  const barChartOptions = {
    annotations: {},
    chart: {
      animations: {
        enabled: false,
        easing: "swing",
      },
      background: "#FFFFFF",
      foreColor: "#000000",
      fontFamily: "SUITE-Regular",
      height: 245,
      id: "T2atb",
      stackOnlyBar: true,
      toolbar: {
        show: false,
      },
      type: "bar",
      width: 400,
      zoom: {
        enabled: false,
      },
      fontUrl: null,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "95%",
        distributed: true,
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        isFunnel: false,
        isFunnel3d: true,
        dataLabels: {
          position: "center",
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
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#59BD82"],
    dataLabels: {
      offsetX: -2,
      offsetY: -3,
      style: {
        colors: ["#fff"],
      },
      background: {
        enabled: false,
      },
    },
    grid: {
      padding: {
        right: 25,
        left: 15,
      },
    },
    legend: {
      fontSize: 14,
      offsetX: 0,
      offsetY: 0,
      markers: {
        shape: "square",
        size: 8,
      },
      itemMargin: {
        horizontal: 6,
        vertical: 0,
      },
    },
    stroke: {
      show: false,
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
      shared: false,
      hideEmptySeries: true,
      intersect: true,
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
      tickPlacement: "between",
      title: {
        style: {
          fontWeight: 700,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {},
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
  };

  const barChartData = [
    {
      name: "Bar",
      data: data,
      zIndex: 0,
    },
  ];

  const selectPeriodListView = periodList.map((data, index) => {
    const defaultPeriod = params.period;
    const unit = <span>일</span>
    return data === defaultPeriod ? 
      <option value={data} selected>{data}{unit}</option>
      :
      <option value={data}>{data}{unit}</option>
  })

  const selectRankTypeListView = rankTypeList.map((data, index) => {
    const defaultRankType = params.rankType;

    return data === defaultRankType ? 
      <option value={data} selected>{rankTypeNameList[index]}</option>
      :
      <option value={data}>{rankTypeNameList[index]}</option>
  })

  // 초기화 시작
  useEffect(() => {

    addData(defaultParams);

  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="recd-anly-section1">
      <div className="recd-anly-name">
        <div>
          내가 섭취한 음식 TOP 5
        </div>
      </div>
      <div className="recd-anly-content">
        <div id="chart">
          <div className='params-select-box'>

            <div className="rankType-select-box">
              <div className="select-title">종류 : </div>
              <select name="rankType" onChange={handleParamsChange}>
                {selectRankTypeListView}
              </select>
            </div>

            <div className="period-select-box">
              <div className="select-title">기간 : </div>
              <select name="period" onChange={handleParamsChange}>
                {selectPeriodListView}
              </select>
            </div>

          </div>
          <div className='chart-box'>
            <ReactApexChart
              options={barChartOptions}
              series={barChartData}
              type="bar"
              height={300}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default RecdAnly_section1;