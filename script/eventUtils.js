export const getValue = (...form_data) => {
  const values = [];

  for (let value of form_data) {
    values.push(value);
  }
  return values[0];
};

//reformats value from date inputs for various purposes in the calendar app
export const reformatDate = (month, day, purpose = "", year = 2019) => {
  if (purpose === "set_id") {
    const numberFormat = setNumberFromName(month);
    return `${numberFormat}${day}${year}`;
  }

  const refined_month = setMonthName(month);

  return `${refined_month} ${day}`;
};

//adds date and event to list on left of site page
export const appendToEventList = (event, start_day, end_day) => {
  const dateHolder = document.getElementById("event-date");
  const eventList = document.getElementById("event-names");

  const date = document.createElement("div");
  date.className = "date";
  date.id = `${start_day}${end_day}`;
  date.innerText = `${start_day}`;

  if (end_day !== start_day) {
    date.innerText = `${start_day} - ${end_day}`;
  }

  dateHolder.appendChild(date);

  const eventName = document.createElement("div");
  eventName.className = "event";
  eventName.id = `${event}${start_day}${end_day}`;
  eventName.innerText = `${event}`;

  eventList.appendChild(eventName);
};

//takes all provided information to create a calendar div representing the event
export const createCalendarEventDiv = (...event_info) => {
  //Uses same date information to determine id of calendar div(s) to append the event info to
  const startDivId = event_info[2];
  const endDivId = event_info[4];

  let lengthOfEvent = endDivId - startDivId;

  let divIncrement = startDivId;

  for (let i = 0; i <= lengthOfEvent; i++) {
    if (i > 0) {
      divIncrement += 1;
    }

    //div that will display data collected from modal form
    const eventContainer = document.createElement("div");
    eventContainer.className = "calendar-event-container";
    eventContainer.id = `${event_info[0] + divIncrement}`;

    //reformats date data into proper format for calendar div
    const start = reformatDate(event_info[1], event_info[2]);
    const end = reformatDate(event_info[3], event_info[4]);

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
    participants.innerText = `${event_info[5]}`; //participants value
    eventContainer.appendChild(participants);

    //adds location of event
    const location = document.createElement("div");
    location.className = "calendar-event-location";
    location.innerText = `${event_info[6]}`; //location value
    eventContainer.appendChild(location);

    //adds description of event
    const description = document.createElement("div");
    description.className = "calendar-event-description";
    description.innerText = `${event_info[7]}`; //description value
    eventContainer.appendChild(description);

    //add event to day of event
    const divId = reformatDate(event_info[3], event_info[2], "set_id");

    let dayOfEvent = document.getElementById(divId);
    dayOfEvent.appendChild(eventContainer);
  }
};
