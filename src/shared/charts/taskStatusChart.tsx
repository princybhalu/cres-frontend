import React, { useEffect, useRef, useState } from "react";
import { preparedPiChartData } from "../../utils/utils";
import PieChart from "./DynamicPieChart";
import LoaderIcon from "../icons/loader-icon";

export const TaskStatusChart = ({ isDrillDown = false }) => {
  const [isLoader, setIsLoader] = useState(true);
  const [seriesData, setSeriesData] = useState([]);
  const legendOption = {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  };

  const handleDrillDownEvent = ({
    //@ts-ignore
    event,
    ...props
  }) => {
    // drillDownComponentRef.current?.toggleSidebar(props);
    console.log("data new is selcted : ");
    console.log("props : ", props);
  };

  useEffect(() => {
    (async () => {
    //   setIsLoader(true);
      try {
        // TODO : add Apply call here
        // const details = await activeNoOfIncidents({ widgetId: widgetId });
        const details = [
            {
              name: "Not Submitted",
              value: 20,
              selected: true,
              color: "#084E8F" // replace "color1" with your desired color
            },
            {
              name: "Pending for Reviews",
              value: 10,
              selected: true,
              color: "#E03D34" // replace "color2" with your desired color
            },
            {
              name: "Approved",
              value: 20,
              selected: true,
              color: "#62B57D" // replace "color3" with your desired color
            },
            {
              name: "Declined",
              value: 20,
              selected: true,
              color: "#E4E4E4" // replace "color4" with your desired color
            }
          ];
          
        if (isDrillDown) {
          setSeriesData(
            //@ts-ignore
            preparedPiChartData(details, null, handleDrillDownEvent)
          );
        } else {
          //@ts-ignore
          setSeriesData(preparedPiChartData(details, null, null));
        }
        setIsLoader(false);
      } catch (e) {
        setIsLoader(false);
      }
    })();
  }, []);

  return (
    <>
    {
        !isLoader ? <>{seriesData?.length && (
            <PieChart
              legend={legendOption}
              series={[
                {
                  name: "",
                  colorByPoint: true,
                  data: seriesData,
                },
              ]}
              isNoDataFound={!seriesData.length}
            />
          )}</> : (
            <LoaderIcon />
          )}
    </>
  );
};
