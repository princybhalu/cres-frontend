import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerComp = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <DateRangePicker
        onChange={(item) => {
          //@ts-ignore
          setState([item.selection]);

          console.log(item);
          
        }}
        //@ts-ignore
        showSelectionPreview={false}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
      />
    </>
  );
};

export default DateRangePickerComp;
