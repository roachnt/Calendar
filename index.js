/* Get required initial elements */
var today = new Date();

var activeCalendar = today;
var year = activeCalendar.getFullYear();
var month = activeCalendar.getMonth();

var calendar = document.querySelector('.calendar');
var weeks = Array.from(calendar.querySelectorAll('.week'));
var days = Array.from(calendar.querySelectorAll('.day'));

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* Add dates to the appropriate squares */
Date.prototype.monthDays = function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

function setActiveCalendar(date) {
  activeCalendar = date;
  year = activeCalendar.getFullYear();
  month = activeCalendar.getMonth();
}

/* Change months */
var currentMonth = document.querySelector('.current-month');
function changeMonth(month, year) {
  var firstDayOfMonth = new Date(year, month);
  var firstWeekDay = firstDayOfMonth.getDay();
  var lastDayInMonth = firstDayOfMonth.monthDays();
  setActiveCalendar(firstDayOfMonth);
  var dayToSet = 1;
  days.forEach(day => day.innerHTML = "");
  for (var i = firstWeekDay; i < firstWeekDay + lastDayInMonth; i++) {
    days[i].innerHTML = `<p class="day-number">${dayToSet}</p>`;
    if (activeCalendar.getMonth() == today.getMonth()
      && activeCalendar.getFullYear() == today.getFullYear()
      && days[i].textContent == today.getDate().toString()) {
      days[i].classList.add('today');
    }
    dayToSet++;
  }
  if (month == 12) month = 0;
  if (month == -1) month = 11;
  currentMonth.innerHTML = `<p>${months[month]}</p>`
}
changeMonth(month,year);

/* Edit panel variables */
var editDay = document.querySelector('.edit-day-container');
let editOpen = false;
var closeEditIcon = editDay.querySelector("#close-edit-day");

/* Menu panel variables */
var menuIcon = document.querySelector('.menu-icon');
var calBackIcon = document.querySelector('.calendar-back-icon');
var calForwardIcon = document.querySelector('.calendar-forward-icon');
var menu = document.querySelector('.menu-container');
let menuOpen = false;
var closeMenuIcon = menu.querySelector("#close-menu");

/* Fade in and out numbers */
function numberFadeIn(checkBoolean) {
  days.forEach(day => {
    var daynumber = day.querySelector('.day-number');
    if (!checkBoolean && daynumber != null) {
      if (activeCalendar.getMonth() == today.getMonth()
        && day.textContent == today.getDate().toString()) {
        day.classList.add('today');
      }
      daynumber.style.opacity = 1;
      daynumber.style.visibility = 'visible';
    }
  });
}

function numberFadeOut() {
  days.forEach(day => {
    var daynumber = day.querySelector('.day-number');
    if (day.classList.contains('today')) day.classList.remove('today');
    if (daynumber != null) {
      daynumber.style.opacity = 0;
      daynumber.style.visibility = 'hidden';
    }
  });
}

/* Menu toggle functionality */
function toggleMenu() {
  if(!menuOpen && !editOpen) {
    numberFadeOut();
    calendar.style.backgroundColor = "#454545";
    menu.classList.add('menu-container-open');
    menuOpen = true;
  }
  else {
    calendar.style.backgroundColor = "white";
    menu.classList.remove('menu-container-open');
    menuOpen = false;
  }
}

/* icon functionality */
/* menu icon */
calendar.addEventListener('mousemove',
  () => menuIcon.classList.add('menu-icon-mousemove'));
menuIcon.addEventListener('mousemove',
  () => menuIcon.classList.add('menu-icon-mousemove'));
calendar.addEventListener('mouseout',
  () => menuIcon.classList.remove('menu-icon-mousemove'));
menuIcon.addEventListener('click', toggleMenu);
closeMenuIcon.addEventListener('click', () =>
  {
    calendar.style.backgroundColor = "white";
    menu.classList.remove('menu-container-open');
    menuOpen = false;
  });
menu.addEventListener('transitionend',
  () => numberFadeIn(menuOpen));

/* back icon */
calendar.addEventListener('mousemove',
  () => {
    if (!menuOpen && !editOpen)
    calBackIcon.classList.add('calendar-back-icon-mousemove');
});
calBackIcon.addEventListener('mousemove',
  () => calBackIcon.classList.add('calendar-back-icon-mousemove'));
calendar.addEventListener('mouseout',
  () => calBackIcon.classList.remove('calendar-back-icon-mousemove'));
calBackIcon.addEventListener('click', () => {
  days.forEach(day => {
    if (day.classList.contains('today')) day.classList.remove('today');
  });
  changeMonth(month - 1, year);
});

/* forward icon */
calendar.addEventListener('mousemove',
  () => {
    if (!menuOpen && !editOpen)
    calForwardIcon.classList.add('calendar-forward-icon-mousemove');
  });
calForwardIcon.addEventListener('mousemove',
  () => calForwardIcon.classList.add('calendar-forward-icon-mousemove'));
calendar.addEventListener('mouseout',
  () => calForwardIcon.classList.remove('calendar-forward-icon-mousemove'));
calForwardIcon.addEventListener('click', () => {
  days.forEach(day => {
    if (day.classList.contains('today')) day.classList.remove('today');
  });
  changeMonth(month + 1, year);
});

/* Day edit toggle functionality */
function toggleEditDay() {
  if (this.textContent != "") {
    if(!editOpen && !menuOpen) {
      var date = editDay.querySelector('.date');
      var weekdayClicked = weekdays[this.dataset.dayofweek];
      var dayNumberClicked = this.querySelector('.day-number');
      date.textContent = `${weekdayClicked}, ${months[month]} ${dayNumberClicked.textContent}, ${year}`;
      editDay.classList.add('edit-day-container-open');
      editOpen = true;
    }
    else {
      calendar.style.backgroundColor = "white";
      editDay.classList.remove('edit-day-container-open');
      editOpen = false;
    }
  }
}

days.forEach(day => { day.addEventListener('click', toggleEditDay) });

days.forEach(day => { day.addEventListener('click', () => {
  if (day.textContent != "") {
    calForwardIcon.classList.remove('calendar-forward-icon-mousemove');
    calBackIcon.classList.remove('calendar-back-icon-mousemove');
    menuIcon.classList.remove('menu-icon-mousemove');
    currentMonth.classList.remove('current-month-mousemove');
  }
})});
editDay.addEventListener('mousemove', () => {
  calForwardIcon.classList.remove('calendar-forward-icon-mousemove');
  calBackIcon.classList.remove('calendar-back-icon-mousemove');
  menuIcon.classList.remove('menu-icon-mousemove');
  currentMonth.classList.remove('current-month-mousemove');
});

calendar.addEventListener('click', () =>
  {
    if (menuOpen) toggleMenu();
  });

/* Styling for hovering over a date */
days.forEach(day => day.addEventListener('mousemove', () =>
  {
    if (day.textContent == "" && !editOpen && !menuOpen) day.classList.add('day-empty');
    else if (!editOpen && !menuOpen) day.classList.add('day-hover');
  }));
days.forEach(day => day.addEventListener('mouseout', () =>
  {
    if (day.classList.contains('day-hover')) day.classList.remove('day-hover');
    else day.classList.remove('day-empty');
  }));

/* Edit day menu functionality */

/* schedule functionality */
var dayInfo = editDay.querySelector('.day-info');
var daySchedule = editDay.querySelector('.day-schedule');
var hours = daySchedule.querySelectorAll('.hour');
var hourContainers = daySchedule.querySelectorAll('.hour-container');
var halfHours = Array.from(daySchedule.querySelectorAll('.half-hour'));
var selectedTime = dayInfo.querySelector('.selected-time');
var startTime = "";
var startPeriod = "";
var endTime = "";
var endPeriod = "";
var lastTimeDown = "";
var lastPeriodDown = "";
let mouseDown = false;
var closeIcon = document.querySelector('.close-icon');
var firstDown;
var firstDownTime;

editDay.addEventListener('mousemove', () => {
  closeIcon.classList.add('close-icon-mousemove');
});
editDay.addEventListener('mouseout', () => {
  closeIcon.classList.remove('close-icon-mousemove');
});
closeIcon.addEventListener('click', () => {
  toggleEditDay();
  halfHours.forEach(halfHour => {
    halfHour.classList.remove('half-hour-mousedown');
  })
});

// Set time data
for (var i = 0; i < hourContainers.length; i++) {
  var innerHalfs = hours[i].querySelectorAll('.half-hour');
  var currTime = i % 12;
  if (currTime == 0) currTime = 12;
  innerHalfs[0].dataset.startTime = `${currTime}:00`;
  innerHalfs[0].dataset.endTime = `${currTime}:30`;
  innerHalfs[1].dataset.startTime = `${currTime}:30`;
  innerHalfs[1].dataset.endTime = `${currTime + 1}:00`;
  if (innerHalfs[1].dataset.endTime == "13:00") innerHalfs[1].dataset.endTime = `1:00`;
  if (i < 12) innerHalfs.forEach(innerHalf => innerHalf.dataset.period = "am");
  else innerHalfs.forEach(innerHalf => innerHalf.dataset.period = "pm");
}

var goingDown = true;
function clickDrag(halfHourBefore, halfHour, halfHourAfter) {
  if (mouseDown) {
    if (halfHours.indexOf(halfHour) < firstDown) {
      goingDown = true;
      if (halfHours.indexOf(halfHour) != 0) halfHourBefore.classList.remove('half-hour-mousedown');
      endTime = firstDownTime.dataset.endTime;
      endPeriod = firstDownTime.dataset.period;
      startTime = halfHour.dataset.startTime;
      startPeriod = halfHour.dataset.period;
      selectedTime.textContent = `${startTime + startPeriod} - ${endTime + endPeriod}`
    }
    else if (halfHours.indexOf(halfHour) > firstDown) {
      if (halfHours.indexOf(halfHour) != 47) halfHourAfter.classList.remove('half-hour-mousedown');
      goingDown = false;
      startTime = firstDownTime.dataset.startTime;
      startPeriod = firstDownTime.dataset.period;
      endTime = halfHour.dataset.endTime;
      endPeriod = halfHour.dataset.period;
      selectedTime.textContent = `${startTime + startPeriod} - ${endTime + endPeriod}`
    }
    else if (goingDown) {
      if (halfHours.indexOf(halfHour) != 0) halfHourBefore.classList.remove('half-hour-mousedown');
    }
    else {
      if (halfHours.indexOf(halfHour) != 47) halfHourAfter.classList.remove('half-hour-mousedown');
    }
    halfHour.classList.add('half-hour-mousedown');
  }
}

// Listeners for half hour selection functionality
var shiftDown = false;
window.addEventListener('keydown', (e) => {
  if (e.shiftKey) shiftDown = true;
});
window.addEventListener('keyup', (e) => {
  shiftDown = false;
});
for (var i = 0; i < halfHours.length; i++) {
  let halfHourBefore = halfHours[i-1];
  let halfHour = halfHours[i];
  let halfHourAfter = halfHours[i+1];
  halfHour.addEventListener('mousemove', () => {
    halfHour.classList.add('half-hour-hover');
    clickDrag(halfHourBefore, halfHour, halfHourAfter);
  });
  halfHour.addEventListener('mouseleave', () => {
    halfHour.classList.remove('half-hour-hover');
  });
  halfHour.addEventListener('mousedown', () => {
    if (shiftDown) {
      halfHours.forEach(halfHour => {
        halfHour.classList.remove('half-hour-mousedown');
      });
      if (firstDown < halfHours.indexOf(halfHour)) {
        for (let j = firstDown; j <= halfHours.indexOf(halfHour); j++) {
            halfHours[j].classList.add('half-hour-mousedown');
        }
        startTime = firstDownTime.dataset.startTime + firstDownTime.dataset.period;
        endTime = halfHour.dataset.endTime + halfHour.dataset.period;
        selectedTime.textContent = `${startTime} - ${endTime}`
      }
      else {
        for (let j = firstDown; j >= halfHours.indexOf(halfHour); j--) {
            halfHours[j].classList.add('half-hour-mousedown');
        }
        startTime = halfHour.dataset.startTime + halfHour.dataset.period;
        endTime = halfHour.dataset.endTime + halfHour.dataset.period;
        selectedTime.textContent = `${startTime} - ${endTime}`
      }
    }
    else {
      halfHours.forEach(halfHour => {halfHour.classList.remove('half-hour-mousedown')});
      firstDown = halfHours.indexOf(halfHour);
      firstDownTime = halfHour;
      mouseDown = true;
    }
  });
  halfHour.addEventListener('mouseup', () => {
    mouseDown = false;
  });
  halfHour.addEventListener('click', () => {
    if (shiftDown) {
      halfHours.forEach(halfHour => {
        halfHour.classList.remove('half-hour-mousedown');
      });
      if (firstDown < halfHours.indexOf(halfHour)) {
        for (let j = firstDown; j <= halfHours.indexOf(halfHour); j++) {
            halfHours[j].classList.add('half-hour-mousedown');
        }
        startTime = firstDownTime.dataset.startTime + firstDownTime.dataset.period;
        endTime = halfHour.dataset.endTime + halfHour.dataset.period;
        selectedTime.textContent = `${startTime} - ${endTime}`
      }
      else {
        for (let j = firstDown; j >= halfHours.indexOf(halfHour); j--) {
            halfHours[j].classList.add('half-hour-mousedown');
        }
        startTime = halfHour.dataset.startTime + halfHour.dataset.period;
        endTime = firstDownTime.dataset.startTime + firstDownTime.dataset.period;
        selectedTime.textContent = `${startTime} - ${endTime}`
      }
    }
    else {
      halfHour.classList.add('half-hour-mousedown');
      startTime = halfHour.dataset.startTime + halfHour.dataset.period;
      endTime = halfHour.dataset.endTime + halfHour.dataset.period;
      selectedTime.textContent = `${startTime} - ${endTime}`
    }
  });
}

daySchedule.addEventListener('mouseleave', () => {
  mouseDown = false;
});



/* Day info functionality */


/* Current month functionality */
calendar.addEventListener('mousemove', () => {
  if (!menuOpen && !editOpen)
  currentMonth.classList.add('current-month-mousemove');
});
calendar.addEventListener('mouseout', () => {
  currentMonth.classList.remove('current-month-mousemove');
});
calBackIcon.addEventListener('mousemove', () => {
  currentMonth.classList.add('current-month-mousemove');
});
calForwardIcon.addEventListener('mousemove', () => {
  currentMonth.classList.add('current-month-mousemove');
});
