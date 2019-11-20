import { setMonthName } from "./utils.js";
import {
  fetchToday,
  findFirstOfMonthIndex,
  createMonthMatrix,
  gridFromMatrix
} from "./monthUtils.js";
import {
  getValue,
  appendToEventList,
  createCalendarEventDiv
} from "./eventUtils.js";

//controls synchronous scroll for event list postings

const isSyncingLeftScroll = false;
const isSyncingRightScroll = false;
const leftDiv = document.getElementsByClassName("left")[0];
const rightDiv = document.getElementsByClassName("right")[0];

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

//allows open and close of modal via buttons and X text only
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

//Event Addition Functions

//handles addition of events to calendar and event list

//submits all collected info about user event
const saveButton = document.getElementsByClassName("save-event-button")[0];

//adds event to the list of events in the side panel and the calendar itself
const addEvent = () => {
  const userEvent = document.getElementById("user-event").value;
  const startMonth = document.getElementById("event-start-month").value;
  const startDay = document.getElementById("event-start-day").value;
  const endMonth = document.getElementById("event-end-month").value;
  const endDay = document.getElementById("event-end-day").value;
  const participants = document.getElementById("event-people").value;
  const location = document.getElementById("event-location").value;
  const description = document.getElementById("event-description").value;

  const today = new Date();
  const month = setMonthName(today.getMonth());

  if (!month.includes(startMonth) || !month.includes(endMonth)) {
    return;
  }

  const values = getValue([
    userEvent,
    startMonth,
    startDay,
    endMonth,
    endDay,
    participants,
    location,
    description
  ]);

  //takes in the parameters userEvent, startDate, and endDate to add to the event list
  appendToEventList(values[0], values[2], values[4]);

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
