import { DoesUserHasPermissionsInterface } from "../interface/CanIHavePermissionProps";
import dayjs from 'dayjs';

export const doesUserHasPermissions = (data : DoesUserHasPermissionsInterface) => {
    let assignedActions = Object.keys(data.userPermissions);
  
    // Check whether organizations is passed and if user is not of MOXFIVE org and orgId not match then set authorized to false
    if (data.projectId && data.userPermissions.hasOwnProperty(data.projectId)) {
      assignedActions = Object.keys(data.userPermissions[data.projectId]);
    }

    // If any is passed then check whether user has any of the provided actions
    if (data.any) {
      return data.actions.some(action => {
        return assignedActions.includes(action);
      });
    } else {
      // Check whether user has all the provided actions
      return data.actions.every(action => {
        return assignedActions.includes(action);
      });
    }
  };

  export const preparedPiChartData = (responseData: any[], handleLegendItemClick = null, drillDownEventCallback = null) =>  {

    const preparedData =  responseData.map(({ id, name, value, color, ...other }) => {
      return {
        ...other,
        name: name,
        y: value,
        selected: true,
        color: color,
        events: {
          click: function (event: any) {
            if (drillDownEventCallback) {
              //@ts-ignore
              drillDownEventCallback({ event, id, name, value });
            }
          },
          legendItemClick: (event: any) => {
            if (handleLegendItemClick) {
              //@ts-ignore
              handleLegendItemClick(event);
            }
          },
        },
      };
    });
  
    return preparedData;
  
  };

  export const convertDateToSpecificFormat = ({ date, format } : any) => {
    return dayjs(date).format(format);
  };
  