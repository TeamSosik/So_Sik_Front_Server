import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Graph = () => {
    const userInfo =JSON.parse(window.localStorage.getItem("member"));  
    
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
            data: userInfo.result.weightList.map(entry => ({
              x: entry.createdAt,
              y: entry.currentWeight,
    
            })),
            zIndex: 0,
          },
          {
            name: "목표 체중",
            data: userInfo.result.weightList.map((entry) => ({
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



    return (
        <div>
            <div className="my-weight-change">
            <span className="weight-change-title">나의 체중 변화</span>
            <ReactApexChart
                options={weightChangeOptions}
                series={weightChangeOptions.series}
                type="area"
                height={450}
                zIndex="0"/>
            </div>
        </div>
    );
};

export default Graph;