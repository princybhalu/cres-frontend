// import React, { useEffect, useState } from "react";
// // import classes from './custom-date-picker.module.scss';
// import { DateRangePicker } from "react-date-range";
// import {
//   DATE_FORMATS,
//   MAX_DATA_FOR_DATE_RANGE,
//   TIMELINE_OPTIONS,
// } from "../../constants";
// import { addDays, isSameDay, startOfYear } from "date-fns";
// import { convertDateToSpecificFormat } from "../../utils/utils";

// const CustomDateRangePicker = ({
//   handleApplyCallback,
//   handleCancelCallback,
//   selectedCustomRange,
//   allTimeDateRangeObj,
//   fromMarketPlaceFilter = false,
//   customDateRangePicker = true,
//   fromHoverInlineDatepicker = false,
//   openWithLabel = false,
// }: any) => {
//   const [selectedSideMenuOption, setSelectedSideMenuOption] = useState(null);
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), -7),
//       key: "selection",
//       selectedOption: TIMELINE_OPTIONS.Custom,
//     },
//   ]);

//   useEffect(() => {
//     if (
//       selectedCustomRange &&
//       selectedCustomRange.startDate &&
//       selectedCustomRange.endDate
//     ) {
//       setState([
//         {
//           startDate: new Date(selectedCustomRange.startDate),
//           endDate: new Date(selectedCustomRange.endDate),
//           key: "selection",
//           selectedOption: selectedCustomRange.selectedCustomRangeOption,
//         },
//       ]);
//     }
//   }, []);

//   const handleChange = (item: any) => {
//     setSelectedSideMenuOption(null);
//     setState([item.selection]);
//   };
//   const formatSelectedDateOnApply = () => {
//     const selectedDateRange = state[0];
//     const dateObj = {
//       startDate: selectedDateRange.startDate,
//       endDate: selectedDateRange.endDate,
//       selectedOption: selectedSideMenuOption
//         ? selectedSideMenuOption
//         : "Custom",
//     };
//     handleApplyCallback(dateObj);
//   };

//   const getDateBeforeTwelveMonths = () => {
//     const currentDate = new Date();
//     return new Date(currentDate.setMonth(currentDate.getMonth() - 11));
//   };
//   const getDateBeforeSpecificDaysFromNow = (days: any) => {
//     let now = new Date();
//     return new Date(now.setDate(now.getDate() - days));
//   };
//   const getAndSetSelectSideMenuOption = (
//     range: any,
//     definedRange: any,
//     sideMenu: any
//   ) => {
//     const result =
//       isSameDay(range.startDate, definedRange.startDate) &&
//       isSameDay(range.endDate, definedRange.endDate);
//     if (result === true) {
//       setSelectedSideMenuOption(sideMenu);
//     }
//     return result;
//   };
//   const handleStaticRangeSelection = (
//     range: any,
//     definedRange: any,
//     source: any
//   ) => {
//     switch (source) {
//       case TIMELINE_OPTIONS.AllTime: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.AllTime
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Today: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.Today
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Yesterday: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.Yesterday
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Last_30_Days: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.Last_30_Days
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Last_90_Days: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.Last_90_Days
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Last_12_Months: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.Last_12_Months
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.This_Year: {
//         return getAndSetSelectSideMenuOption(
//           range,
//           definedRange,
//           TIMELINE_OPTIONS.This_Year
//         );
//         break;
//       }
//       case TIMELINE_OPTIONS.Custom: {
//         if (!selectedSideMenuOption) {
//           return true;
//         } else {
//           return false;
//         }
//         break;
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         className={`${"daterangepickerwrap"} ${fromMarketPlaceFilter ? "marketplaceDaterangepickerwrap" : ""} ${openWithLabel ? "daterangepickerwrapOpenWithLabel" : ""}`}
//       >
//         {
//           // Display selected date for only customdaterangepicker in filter
//           customDateRangePicker && (
//             <span className={"showdate"}>
//               {state[0] &&
//                 (selectedSideMenuOption ? selectedSideMenuOption : "Custom")}
//               : &nbsp;
//               {state[0] &&
//                 state[0].startDate &&
//                 state[0].endDate &&
//                 `From  ${convertDateToSpecificFormat({ date: state[0].startDate, format: DATE_FORMATS.TIMELINE_DATE_FORMAT })} To ${convertDateToSpecificFormat({ date: state[0].endDate, format: DATE_FORMATS.TIMELINE_DATE_FORMAT })}`}
//             </span>
//           )
//         }
//         {
//           // Display daterangepicker with static ranges for customdaterangepicker in filter
//           customDateRangePicker && (
//             //@ts-ignore
//             <DateRangePicker
//               onChange={handleChange}
//               showSelectionPreview={true}
//               moveRangeOnFirstSelection={false}
//               months={2}
//               minDate={getDateBeforeSpecificDaysFromNow(
//                 MAX_DATA_FOR_DATE_RANGE - 1
//               )}
//               maxDate={new Date()}
//               ranges={state}
//               staticRanges={[
//                 {
//                   label: TIMELINE_OPTIONS.AllTime,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.AllTime,
//                     startDate: new Date(allTimeDateRangeObj.startDate),
//                     endDate: new Date(allTimeDateRangeObj.endDate),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.AllTime
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Today,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Today,
//                     startDate: new Date(),
//                     endDate: new Date(),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Today
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Yesterday,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Yesterday,
//                     startDate: getDateBeforeSpecificDaysFromNow(1),
//                     endDate: getDateBeforeSpecificDaysFromNow(1),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Yesterday
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Last_30_Days,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Last_30_Days,
//                     startDate: getDateBeforeSpecificDaysFromNow(29),
//                     endDate: new Date(),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Last_30_Days
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Last_90_Days,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Last_90_Days,
//                     startDate: getDateBeforeSpecificDaysFromNow(89),
//                     endDate: new Date(),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Last_90_Days
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Last_12_Months,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Last_12_Months,
//                     startDate: getDateBeforeTwelveMonths(),
//                     endDate: new Date(),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Last_12_Months
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.This_Year,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.This_Year,
//                     startDate: startOfYear(new Date()),
//                     endDate: new Date(),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.This_Year
//                     );
//                   },
//                 },
//                 {
//                   label: TIMELINE_OPTIONS.Custom,
//                   range: () => ({
//                     selectedOption: TIMELINE_OPTIONS.Custom,
//                     startDate: new Date(),
//                     endDate: addDays(new Date(), 7),
//                   }),
//                   isSelected(range: any) {
//                     return handleStaticRangeSelection(
//                       range,
//                       this.range(),
//                       TIMELINE_OPTIONS.Custom
//                     );
//                   },
//                 },
//               ]}
//               direction="horizontal"
//               preventSnapRefocus={true}
//               calendarFocus="backwards"
//             />
//           )
//         }
//         {
//           // Display daterangepicker for hover-inline-edit-daterangepicker
//           fromHoverInlineDatepicker && (
//             <DateRangePicker
//               className={"custom-date-range-picker"}
//               onChange={(item: any) => {
//                 setState([item.selection]);
//               }}
//               //@ts-ignore
//               showSelectionPreview={true}
//               moveRangeOnFirstSelection={false}
//               months={2}
//               ranges={state}
//               direction="horizontal"
//             />
//           )
//         }
//         <div className={"daterangepickerbuttons"}>
//           <button className={"btn btn-default"} onClick={handleCancelCallback}>
//             Cancel
//           </button>
//           <button
//             className={"btn btn-primary m-l"}
//             onClick={formatSelectedDateOnApply}
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomDateRangePicker;

const fun  = () => "hi";
export default fun;