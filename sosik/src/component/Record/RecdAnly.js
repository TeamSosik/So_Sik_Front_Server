import React from "react";
import ReactApexChart from "react-apexcharts";
import { ResponsivePie } from '@nivo/pie';
import RecdButton from "../../component/Record/RecdButton";
import "../../common/css/record/recdAnly.css";

const RecdAnly_section1 = () => {
    const barChartOptions = {
        "annotations": {},
        "chart": {
            "animations": {
                "enabled": false,
                "easing": "swing"
            },
            "background": "#FFFFFF",
            "foreColor": "#000000",
            "fontFamily": "SUITE-Regular",
            "height": 245,
            "id": "T2atb",
            "stackOnlyBar": true,
            "toolbar": {
                "show": false
            },
            "type": "bar",
            "width": 400,
            "zoom": {
                "enabled": false
            },
            "fontUrl": null
        },
        "plotOptions": {
            "bar": {
                "horizontal": true,
                "barHeight": "95%",
                "distributed": true,
                "borderRadius": 5,
                "borderRadiusApplication": "end",
                "borderRadiusWhenStacked": "last",
                "hideZeroBarsWhenGrouped": false,
                "isDumbbell": false,
                "isFunnel": false,
                "isFunnel3d": true,
                "dataLabels": {
                    "position": "center",
                    "total": {
                        "enabled": false,
                        "offsetX": 0,
                        "offsetY": 0,
                        "style": {
                            "color": "#373d3f",
                            "fontSize": "12px",
                            "fontWeight": 600
                        }
                    }
                }
            },
            "bubble": {
                "zScaling": true
            },
            "treemap": {
                "dataLabels": {
                    "format": "scale"
                }
            },
            "radialBar": {
                "hollow": {
                    "background": "#fff"
                },
                "dataLabels": {
                    "name": {},
                    "value": {},
                    "total": {}
                },
                "barLabels": {
                    "enabled": false,
                    "margin": 5,
                    "useSeriesColors": true,
                    "fontWeight": 600,
                    "fontSize": "16px"
                }
            },
            "pie": {
                "donut": {
                    "labels": {
                        "name": {},
                        "value": {},
                        "total": {}
                    }
                }
            }
        },
        "colors": [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#59BD82"
        ],
        "dataLabels": {
            "offsetX": -2,
            "offsetY": -3,
            "style": {
                "colors": [
                    "#fff"
                ]
            },
            "background": {
                "enabled": false
            }
        },
        "grid": {
            "padding": {
                "right": 25,
                "left": 15
            }
        },
        "legend": {
            "fontSize": 14,
            "offsetX": 0,
            "offsetY": 0,
            "markers": {
                "shape": "square",
                "size": 8
            },
            "itemMargin": {
                "horizontal": 6,
                "vertical": 0
            }
        },
        "series": [
            {
                "name": "Bar",
                "data": [
                    {
                        "x": "피자",
                        "y": "5"
                    },
                    {
                        "x": "햄버거",
                        "y": "3"
                    },
                    {
                        "x": "마제소바",
                        "y": "10"
                    },
                    {
                        "x": "샐러드",
                        "y": "20"
                    },
                    {
                        "x": "치킨",
                        "y": 10
                    }
                ],
                "zIndex": 0
            }
        ],
        "stroke": {
            "show": false,
            "fill": {
                "type": "solid",
                "opacity": 0.85,
                "gradient": {
                    "shade": "dark",
                    "type": "horizontal",
                    "shadeIntensity": 0.5,
                    "inverseColors": true,
                    "opacityFrom": 1,
                    "opacityTo": 1,
                    "stops": [
                        0,
                        50,
                        100
                    ],
                    "colorStops": []
                }
            }
        },
        "tooltip": {
            "shared": false,
            "hideEmptySeries": true,
            "intersect": true
        },
        "xaxis": {
            "labels": {
                "trim": true,
                "style": {}
            },
            "group": {
                "groups": [],
                "style": {
                    "colors": [],
                    "fontSize": "12px",
                    "fontWeight": 400,
                    "cssClass": ""
                }
            },
            "tickPlacement": "between",
            "title": {
                "style": {
                    "fontWeight": 700
                }
            },
            "tooltip": {
                "enabled": false
            }
        },
        "yaxis": {
            "tickAmount": 5,
            "labels": {
                "style": {}
            },
            "title": {
                "style": {
                    "fontWeight": 700
                }
            }
        }
    }

    const barChartData = [
        {
            name: "Bar",
            data: [
                { x: "피자", y: 5 },
                { x: "햄버거", y: 3 },
                { x: "마제소바", y: 10 },
                { x: "샐러드", y: 20 },
                { x: "치킨", y: 10 },
            ],
            zIndex: 0,
        },
    ];

    return (
        <div className="recd-anly-section1">
            <div className="recd-anly-name">내가 섭취한 음식 TOP 5</div>
            <div className="recd-anly-content">
                <div id="chart">
                    <ReactApexChart
                        options={barChartOptions}
                        series={barChartData}
                        type="bar"
                        height={300}
                    />
                </div>
            </div>
            <hr />
        </div>
    );
};

const RecdAnly_section2 = () => {
    const pieChartData = [
        {
            "id": "탄수화물",
            "label": "탄수화물",
            "value": 466,
            "color": "hsl(177, 70%, 50%)"
        },
        {
            "id": "단백질",
            "label": "단백질",
            "value": 284,
            "color": "hsl(293, 70%, 50%)"
        },
        {
            "id": "지방",
            "label": "지방",
            "value": 495,
            "color": "hsl(327, 70%, 50%)"
        },
        {
            "id": "무기질",
            "label": "무기질",
            "value": 100,
            "color": "hsl(182, 70%, 50%)"
        },
        {
            "id": "비타민",
            "label": "비타민",
            "value": 279,
            "color": "hsl(203, 70%, 50%)"
        }
    ];

    return (
        <div className="recd-anly-section2">
            <div className="recd-anly-name">일일 영양소 분석</div>
            <div className="recd-anly-content">
                <div id="pie-chart" style={{ width: '700px', height: '400px', margin: '0 auto' }}>
                    <ResponsivePie
                        data={pieChartData}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={1}
                        cornerRadius={7}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'yellow_green_blue' }}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', '0.2']]
                        }}
                        arcLinkLabelsTextOffset={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsOffset={-2}
                        arcLinkLabelsDiagonalLength={18}
                        arcLinkLabelsStraightLength={36}
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            { match: { id: 'ruby' }, id: 'dots' },
                            { match: { id: 'c' }, id: 'dots' },
                            { match: { id: 'go' }, id: 'dots' },
                            { match: { id: 'python' }, id: 'dots' },
                            { match: { id: 'scala' }, id: 'lines' },
                            { match: { id: 'lisp' }, id: 'lines' },
                            { match: { id: 'elixir' }, id: 'lines' },
                            { match: { id: 'javascript' }, id: 'lines' }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};


const RecdAnly = () => {
    return (
        <div>
            <RecdButton />
            <RecdAnly_section1 />
            <RecdAnly_section2 />
        </div>
    );
};

export default RecdAnly;
