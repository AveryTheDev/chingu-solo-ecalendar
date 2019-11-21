import { setMonthName } from "./utils.js";

const setDayOfWeek = weekday => {
  switch (weekday) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return;
  }
};

export const fetchToday = () => {
  const currentMonth = document.getElementsByClassName("current-month-of-day");
  const currentDayOfWeek = document.getElementsByClassName(
    "current-day-of-week"
  );
  const currentDate = document.getElementsByClassName("current-day");
  const currentYear = document.getElementsByClassName("cal-year");

  //grabs dates
  const today = new Date();

  const month = setMonthName(today.getMonth());
  const dayOfWeek = setDayOfWeek(today.getDay());
  const date = today.getDate();
  const year = today.getFullYear();

  //places text in HTML tags
  currentMonth[0].innerText = month;
  currentDayOfWeek[0].innerText = dayOfWeek;
  currentDate[0].innerText = date;
  currentYear[0].innerText = year;

  //highlights current day of week
  const currentWeekDate = document.getElementById(dayOfWeek);

  currentWeekDate.id = "currentWeekday";
};

//determines day of week the first date of the month is
export const findFirstOfMonthIndex = (month, year) => {
  const selectedMonth = setMonthName(month);
  const date = new Date(`${selectedMonth} 1 ${year}`);
  const dayOfWeek = date.getDay();

  return dayOfWeek;
};

//creates spots for calendar dates
export const createMonthMatrix = (prevMonthLength, monthLength, index) => {
  const monthArray = [];
  let dateArray = [];
  let day = 1;

  //if the first day of the week is on a Sunday
  if (index === 0) {
    for (let i = 0; i < monthLength; i++) {
      if (dateArray.length < 7 && i < monthLength - 1) {
        dateArray.push(day);
        day++;
      } else if (i === monthLength - 1) {
        monthArray.push(dateArray);
        return monthArray;
      } else {
        monthArray.push(dateArray);
        dayArray = [day];
        day++;
      }
    }

    return monthArray;
  }
  //first day of week
  else {
    //sets first day of previous month shown on calendar
    let firstArrayDate = prevMonthLength - (index - 1);
    let day;

    //creates first row of calendar with prev and current month dates
    for (let i = 0; i < 7; i++) {
      if (day > prevMonthLength) {
        day = 1;
        dateArray.push(day);
        day++;
      } else if (i === 0) {
        day = firstArrayDate;
        dateArray.push(day);
        day++;
      } else {
        day < prevMonthLength;
        dateArray.push(day);
        day++;
      }
    }

    monthArray.push(dateArray);
    dateArray = [];

    const datesLeft = monthLength - (day - 1);

    //manages the rest of the calendar to find the remaining days of the current calendar month
    for (let i = 0; i < datesLeft; i++) {
      if (dateArray.length < 7 && i < datesLeft - 1) {
        dateArray.push(day);
        day++;
      } else if (i === datesLeft - 1) {
        dateArray.push(day);
        monthArray.push(dateArray);
        return monthArray;
      } else if (dateArray.length === 7) {
        monthArray.push(dateArray);
        dateArray = [day];
        day++;
      }
    }

    return monthArray;
  }
};

//takes values from the matrix to assemble into a grid format
export const gridFromMatrix = (matrix, day, month, year) => {
  //where grid data will be inserted
  const calendar = document.getElementsByClassName("calendar-grid-container");
  //grid data and current date
  const monthData = matrix;
  const today = day;

  //initialization of grid
  let grid = document.createElement("div");

  grid.className = "calendar_grid";

  //counter to track when transition to next week has occured;
  let counter = 1;

  // loops through arrays nested in matrix
  for (let i = 0; i < monthData.length; i++) {
    for (let j = 0; j < monthData[i].length; j++) {
      if (counter % 7 === 0 || i === monthData.length - 1) {
        let date = document.createElement("div");
        calendar[0].appendChild(grid);

        date.id = `${month + 1}${monthData[i][j]}${year}`;
        date.innerText = monthData[i][j];
        date.className = "calendar_date";
        grid.appendChild(date);

        counter++;
      } else {
        let date = document.createElement("div");
        //see if date is today's date
        if (monthData[i][j] === today) {
          date.className = "calendar_current_date";
        } else {
          date.className = "calendar_date";
        }

        date.id = `${month + 1}${monthData[i][j]}${year}`;
        date.innerText = monthData[i][j];
        grid.appendChild(date);
        counter++;
      }
    }
  }
};
