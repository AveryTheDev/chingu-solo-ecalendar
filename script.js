const setMonthName = month => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return;
  }
};

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
  }
};

const fetchToday = () => {
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
};

//determines day of week the first date of the month is
const findFirstOfMonthIndex = (month, year) => {
  const selectedMonth = setMonthName(month);
  const date = new Date(`${selectedMonth} 1 ${year}`);
  const dayOfWeek = date.getDay();

  return dayOfWeek;
};

//creates spots for calendar dates
const createMonthMatrix = (prevMonthLength, monthLength, index) => {
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

const gridFromMatrix = (matrix, day) => {
  //where grid data will be inserted
  const calendar = document.getElementsByClassName("calendar-grid-container");
  //grid data and current date
  const monthData = matrix;
  const today = day;

  //initialization of row
  let row = document.createElement("div");

  row.className = "calendar_row";

  //counter to track when transition to next week has occured;
  let counter = 1;

  // loops through arrays nested in matrix
  for (i = 0; i < monthData.length; i++) {
    for (j = 0; j < monthData[i].length; j++) {
      if (counter % 7 === 0 || i === monthData.length - 1) {
        let col = document.createElement("div");
        calendar[0].appendChild(row);

        col.id = monthData[i][j] * Date.now();
        col.innerText = monthData[i][j];
        row.appendChild(col);

        counter++;
      } else {
        let col = document.createElement("div");
        //see if date is today's date
        if (monthData[i][j] === today) {
          col.className = "calendar_current_date";
        } else {
          col.className = "calendar_col";
        }

        col.id = monthData[i][j] * Date.now();
        col.innerText = monthData[i][j];
        row.appendChild(col);
        counter++;
      }
    }
  }
};

const createMonthGrid = () => {
  const today = new Date();

  //grab currentDate data
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  //grab previous month data
  const previousMonthLength = new Date(
    currentYear,
    today.getMonth(),
    0
  ).getDate();
  const currentMonthLength = new Date(
    currentYear,
    today.getMonth() + 1,
    0
  ).getDate();

  //find first day of week for current month
  const firstOfMonthIndex = findFirstOfMonthIndex(
    today.getMonth(),
    currentYear
  );

  //create matrix of month values
  const monthMatrix = createMonthMatrix(
    previousMonthLength,
    currentMonthLength,
    firstOfMonthIndex
  );

  //need to cycle through each array in the matrix and create an element per value
  const grid = gridFromMatrix(monthMatrix, currentDay);
};

const start = () => {
  fetchToday();
  createMonthGrid();
};

//runs as the document loads
document.body.onload = start;
