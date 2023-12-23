
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const currentDay = currentDate.getDate();
const currentDayOfWeek = currentDate.getDay();

document.addEventListener("DOMContentLoaded", function () {
  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();
  
  const viewSelect = document.getElementById("viewSelect");
  const monthSelect = document.getElementById("monthSelect");

  viewSelect.value = "monthly";
  monthSelect.value = currentMonth.toString();

 
  generateCalendar("monthly", currentMonth);

 
  viewSelect.addEventListener("change", function () {
    const selectedView = viewSelect.value;
    const selectedMonth = monthSelect.value;
    generateCalendar(selectedView, selectedMonth);
  });

  monthSelect.addEventListener("change", function () {
    const selectedMonth = monthSelect.value;
    const selectedView = viewSelect.value;
    generateCalendar(selectedView, selectedMonth);
  });
});


function changeView() {
  const selectedView = document.getElementById("viewSelect").value;
  const selectedMonth = document.getElementById("monthSelect").value;
  generateCalendar(selectedView, selectedMonth);
}

function changeMonth() {
  const selectedMonth = document.getElementById("monthSelect").value;
  const selectedView = document.getElementById("viewSelect").value;
  generateCalendar(selectedView, selectedMonth);
}
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function generateCalendar(view, month) {
const calendarContainer = document.getElementById("calendar");
const wcalendarContainer = document.getElementById("wcalendar");
calendarContainer.innerHTML = "";

const table = document.createElement("table");

if (view === "monthly") {
  // Monthly view
  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();

  let currentDayOfWeek = new Date(new Date().getFullYear(), month, 1).getDay();

  const headerRow = document.createElement("tr");
  for (let i = 0; i < 7; i++) {
    const th = document.createElement("th");
    th.textContent = getDayOfWeekName(i);
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  let dayCounter = 1;
  for (let week = 0; dayCounter <= daysInMonth; week++) {
    const row = document.createElement("tr");
    for (let day = 0; day < 7; day++) {
      const td = document.createElement("td");
      if (week === 0 && day < currentDayOfWeek) {
        // Empty cells before the first day of the month
        td.textContent = "";
      } else if (dayCounter <= daysInMonth) {
        td.textContent = dayCounter;
        if (currentDay==dayCounter && currentMonth == month){
          td.classList.add("active");
        }
       
        dayCounter++;
      }
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  } else {
    // Weekly view
    const headerRow = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const th = document.createElement("th");
      th.textContent = getDayOfWeekName(i);
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentDayOfWeek = currentDate.getDay();
    // Calculate the start and end dates for the current week
    let startDate = currentDay - currentDayOfWeek;
    let endDate = startDate + 6;

    // Create a row for the days of the week
    const row = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const td = document.createElement("td");
      // Adjust startDate if it goes beyond the current month
      if (startDate < 1) {
        startDate = getDaysInMonth(2023, month - 1) - startDate;
      } else if (startDate > getDaysInMonth(2023, month)-1) {
        startDate = startDate - getDaysInMonth(2023, month) + 1;
      }
      td.textContent = startDate;
      if (currentDay==startDate){
        td.classList.add("active");
      }
      row.appendChild(td);
      startDate++;
    }
    table.appendChild(row);
  }

  wcalendarContainer.appendChild(table);
  calendarContainer.appendChild(table);
}

function getDayOfWeekName(dayIndex) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[dayIndex];
}


// It was a lot of fun making this, especially figuring out the logic behind the weekly view when you are at the beginning or the end of the month