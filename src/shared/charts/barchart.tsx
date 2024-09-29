import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface BarChartPropsType {
  title?: string;
  data?: { [key: string]: number };
  width?: number;
  height?: number;
}

const data ={
    "office": 5,
    "officer": 15,
    "contractor": 25,
    "dealer": 10
}



const UserRoleBarChart: React.FC<BarChartPropsType> = ({
  title = "",
  width = 400,
  height = 300,
}) => {
  const [options, setOptions] = useState<Highcharts.Options | null>(null);
  const chartReference = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const categories = Object.keys(data);
    const seriesData = Object.values(data);

    setOptions({
      chart: {
        type: 'bar',
        backgroundColor: "rgba(0,0,0,0)",
        width,
        height,
      },
      title: {
        text: title,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
        }
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Count'
        },max:30
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            format: '{y}',
            style: {
              fontWeight: 'bold',
              color: '#333',
              fontFamily: 'Inter, sans-serif',
            }
          },
          colorByPoint: true,
        }
      },
      series: [{
        name: 'Count',
        data: seriesData,
        type: 'bar'
      }],
      colors: ['#446ca5', '#f39c12', '#27ae60', '#b7950b', '#e74c3c', '#8e3b47'],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ["downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"],
          },
        },
      },
    });
  }, [data, title, width, height]);

  return (
    <div>
      {options ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartReference}
        />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default UserRoleBarChart;