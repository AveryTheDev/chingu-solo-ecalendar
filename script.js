const setMonthName = month => {
  if (month === -1) {
    month = 11;
  } else if (month === 12) {
    month = 0;
  }
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

  //highlights current day of week
  const currentWeekDate = document.getElementById(dayOfWeek);

  currentWeekDate.id = "currentWeekday";
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

//takes values from the matrix to assemble into a grid format
const gridFromMatrix = (matrix, day, month, year) => {
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
  for (i = 0; i < monthData.length; i++) {
    for (j = 0; j < monthData[i].length; j++) {
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

//collection of functions that results in the creation of the grid
const createMonthGrid = () => {
  const today = new Date();

  //grab currentDate data
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();

  //grab previous month data
  const previousMonthLength = new Date(currentYear, currentMonth, 0).getDate();
  const currentMonthLength = new Date(
    currentYear,
    currentMonth + 1,
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
  const grid = gridFromMatrix(
    monthMatrix,
    currentDay,
    currentMonth,
    currentYear
  );
};

const createMonthRow = () => {
  const prev_month_div = document.getElementById("previous-cal-month");
  const current_month_div = document.getElementById("current-cal-month");
  const next_month_div = document.getElementById("next-cal-month");

  const today = new Date();
  const month = today.getMonth();
  const prevMonth = setMonthName(month - 1);
  const currentMonth = setMonthName(month);
  const nextMonth = setMonthName(month + 1);

  prev_month_div.innerText = prevMonth;
  current_month_div.innerText = currentMonth;
  next_month_div.innerText = nextMonth;
};

const start = () => {
  fetchToday();
  createMonthGrid();
  createMonthRow();
};

//runs as the document loads
document.body.onload = start;

////////////////////////////////////////////////////////////////////////////////

//Modal ClassName Toggles
const modal = document.getElementById("modal-container");
const openModal = document.getElementById("event-button");
const closeModal = document.getElementById("close-modal");

const toggleModalView = () => {
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
    return;
  } else {
    modal.classList.add("hide");
  }
};

openModal.addEventListener("click", toggleModalView, false);
closeModal.addEventListener("click", toggleModalView, false);

//////////////////////////////////////////////////////////////////////////////////////////

//handles addition of events to calendar and event list

//submits all collected info about user event
const saveButton = document.getElementsByClassName("save-event-button")[0];

const getValue = (...form_data) => {
  const values = [];

  for (let value of form_data) {
    values.push(value);
  }
  return values[0];
};

//reformats value from date inputs for various purposes in the calendar app
const reformatDate = (date, purpose = "") => {
  const originalFormat = date.split("-");

  if (purpose === "list") {
    const newFormat = originalFormat[2];
    return newFormat;
  } else if (purpose === "set_id") {
    const newFormat = [
      originalFormat[1],
      originalFormat[2],
      originalFormat[0]
    ].join("");
    return parseInt(newFormat, 10);
  } else {
    const newFormat = [
      setMonthName(originalFormat[1] - 1),
      originalFormat[2],
      originalFormat[0]
    ].join(" ");

    return newFormat;
  }
};

//adds date and event to list on left of site page
const appendToEventList = (event, start, end) => {
  const dateHolder = document.getElementById("event-date");
  const eventList = document.getElementById("event-names");

  ///date returns in the format of "yyyy-mm-dd" so format must be changed
  start = reformatDate(start, "list");
  end = reformatDate(end, "list");

  const date = document.createElement("div");
  date.className = "date";
  date.id = `${start}${end}`;
  date.innerText = `${start}`;

  if (end !== start) {
    date.innerText = `${start} - ${end}`;
  }

  dateHolder.appendChild(date);

  const eventName = document.createElement("div");
  eventName.className = "event";
  eventName.id = `${event}${start}${end}`;
  eventName.innerText = `${event}`;

  eventList.appendChild(eventName);
};

//takes all provided information to create a calendar div representing the event
const createCalendarEventDiv = (...event_info) => {
  //Uses same date information to determine id of calendar div(s) to append the event info to
  const startDivId = reformatDate(event_info[1], "set_id");
  const endDivId = reformatDate(event_info[2], "set_id");

  let lengthOfEvent = endDivId - startDivId;
  if (lengthOfEvent > 0) {
    lengthOfEvent = lengthOfEvent / 10000;
  }

  let divId = startDivId;

  for (let i = 0; i <= lengthOfEvent; i++) {
    if (i > 0) {
      divId += 10000;
    }

    //div that will display data collected from modal form
    const eventContainer = document.createElement("div");
    eventContainer.className = "calendar-event-container";
    eventContainer.id = `${event_info[0] + divId}`;

    //reformats date data into proper format for calendar div
    const start = reformatDate(event_info[1]);
    const end = reformatDate(event_info[2]);

    const event = document.createElement("div");
    event.className = "calendar-event";
    event.innerText = `${event_info[0]}`; //contains user event value
    eventContainer.appendChild(event);
    //handles date data

    const dateRow = document.createElement("div");
    dateRow.className = "calendar-event-dates"; //holds start and end dates(if applicable)

    const startDate = document.createElement("div");
    startDate.className = "calendar-event-start-date";
    startDate.innerText = `${start}`; //start date value

    const endDate = document.createElement("div");
    endDate.className = "calendar-event-end-date";
    endDate.innerText = `${end}`; //end date value

    //adds dates to date container
    dateRow.appendChild(startDate);
    dateRow.appendChild(endDate);
    eventContainer.appendChild(dateRow);

    //adds people involved or invited
    const participants = document.createElement("div");
    participants.className = "calendar-event-participants";
    participants.innerText = `${event_info[3]}`; //participants value
    eventContainer.appendChild(participants);

    //adds location of event
    const location = document.createElement("div");
    location.className = "calendar-event-location";
    location.innerText = `${event_info[4]}`; //location value
    eventContainer.appendChild(location);

    //adds description of event
    const description = document.createElement("div");
    description.className = "calendar-event-description";
    description.innerText = `${event_info[5]}`; //description value
    eventContainer.appendChild(description);

    //add event to day of event
    let dayOfEvent = document.getElementById(divId);
    dayOfEvent.appendChild(eventContainer);
  }
};

//adds event to the list of events in the side panel and the calendar itself
const addEvent = () => {
  const userEvent = document.getElementById("user-event").value;
  const startDate = document.getElementById("event-start").value;
  const endDate = document.getElementById("event-end").value;
  const participants = document.getElementById("event-people").value;
  const location = document.getElementById("event-location").value;
  const description = document.getElementById("event-description").value;

  const values = getValue([
    userEvent,
    startDate,
    endDate,
    participants,
    location,
    description
  ]);

  //takes in the parameters userEvent, startDate, and endDate to add to the event list
  appendToEventList(values[0], values[1], values[2]);

  //takes all the user submitted values to place onto the corresponding calendar date(s)
  createCalendarEventDiv(...values);
};

saveButton.addEventListener(
  "click",
  () => {
    addEvent();
    toggleModalView();
  },
  false
);

//control synchronous scroll for event list postings

var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var leftDiv = document.getElementsByClassName("left")[0];
var rightDiv = document.getElementsByClassName("right")[0];

leftDiv.onscroll = function() {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightDiv.scrollTop = this.scrollTop;
  }
  isSyncingLeftScroll = false;
};

rightDiv.onscroll = function() {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftDiv.scrollTop = this.scrollTop;
  }
  isSyncingRightScroll = false;
};
