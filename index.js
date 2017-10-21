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
      && days[i].textContent == today.getDate().toString()) {
      days[i].classList.add('today');
    }
    dayToSet++;
  }
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
var closeIcon = document.querySelector('.close-icon');

editDay.addEventListener('mousemove', () => {
  closeIcon.classList.add('close-icon-mousemove');
});
editDay.addEventListener('mouseout', () => {
  closeIcon.classList.remove('close-icon-mousemove');
});
closeIcon.addEventListener('click', toggleEditDay);

/* schedule functionality */
var dayInfo = editDay.querySelector('.day-info');
var daySchedule = editDay.querySelector('.day-schedule');
var hours = daySchedule.querySelectorAll('.hour');
var halfHours = daySchedule.querySelectorAll('.half-hour');

halfHours.forEach(halfHour => halfHour.addEventListener('mousemove', () => {
  halfHour.classList.add('half-hour-hover');
}));
halfHours.forEach(halfHour => halfHour.addEventListener('mouseout', () => {
  halfHour.classList.remove('half-hour-hover');
}));
