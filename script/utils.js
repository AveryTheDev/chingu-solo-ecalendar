export const setMonthName = month => {
  if (month === -1) {
    month = 11;
  } else if (month === 12) {
    month = 0;
  }
  switch (month) {
    case 0 || "Jan":
      return "January";
    case 1 || "Feb":
      return "February";
    case 2 || "Mar":
      return "March";
    case 3 || "Apr":
      return "April";
    case 4 || "May":
      return "May";
    case 5 || "Jun":
      return "June";
    case 6 || "Jul":
      return "July";
    case 7 || "Aug":
      return "August";
    case 8 || "Sep":
      return "September";
    case 9 || "Oct":
      return "October";
    case 10 || "Nov":
      return "November";
    case 11 || "Dec":
      return "December";
    default:
      return;
  }
};

export const setNumberFromName = month => {
  switch (month) {
    case "Jan":
      return 1;
    case "Feb":
      return 2;
    case "Mar":
      return 3;
    case "Apr":
      return 4;
    case "May":
      return 5;
    case "Jun":
      return 6;
    case "Jul":
      return 7;
    case "Aug":
      return 8;
    case "Sep":
      return 9;
    case "Oct":
      return 10;
    case "Nov":
      return 11;
    case "Dec":
      return 12;
    default:
      return;
  }
};
