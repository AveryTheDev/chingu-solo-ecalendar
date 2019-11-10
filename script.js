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

const setMonthLength = month => {
  switch (month) {
    case 0 | 2 | 4 | 6 | 7 | 9 | 11:
      return 31;
    case 1:
      return 28;
    case 3 | 5 | 8 | 10:
      return 30;
    default:
      return;
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
  currentMonth[0].innerHTML = month;
  currentDayOfWeek[0].innerHTML = dayOfWeek;
  currentDate[0].innerHTML = date;
  currentYear[0].innerHTML = year;
};

//determines day of week the first date of the month is
const findFirstOfMonthIndex = (month, year) => {
  const month = setMonthName(month);

  const dayOfWeek = getDay(`${month} 1 ${year}`);

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
  }
  //first day of week
  else {
    //sets first day of previous month shown on calendar
    let firstArrayDate = prevMonthLength - (index - 1);
    let day;

    for (let i = 0; i < 7; i++) {
      if (day > prevMonthLength) {
        day = 1;
        dateArray.push(day);
        day++;
      } else if (i === 0) {
        day = firstArrayDate;
        dateArray.push(day);
        day++;
      }
    }

    monthArray.push(dayArray);

    const datesLeft = monthLength - day;

    for (let i = 0; i < datesLeft; i++) {
      if (dateArray.length < 7 && i < datesLeft - 1) {
        dateArray.push(day);
        day++;
      } else if (i === datesLeft - 1) {
        monthArray.push(dateArray);
        return monthArray;
      } else {
        monthArray.push(dateArray);
        dayArray = [day];
        day++;
      }
    }
  }
};

const createMonthGrid = () => {
  //location of grid created below
  const calendar = document.getElementsByClassName("calendar-grid-container");

  const today = new Date();

  //grab currentDate data
  const currentDay = today.getDate();
  const currentMonth = setMonthName(today.getMonth());
  const previousMonth = today.getMonth() - 1;
  const currentYear = today.getFullYear();

  //grab previous month data
  const previousMonthLength = setMonthLength(previousMonth);
  const currentMonthLength = setMonthLength(today.getMonth());

  //find first day of week for current month
  const firstOfMonthIndex = findFirstOfMonthIndex(currentMonth, currentYear);

  //create matrix of month values
  const monthMatrix = createMonthMatrix(
    previousMonthLength,
    currentMonthLength,
    firstOfMonthIndex
  );

  //need to cycle through each array in the matrix and create an element per value
};

//runs as the document loads
document.body.onload = fetchToday;
