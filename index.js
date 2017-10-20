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
  console.log(lastDayInMonth);
  var dayToSet = 1;
  days.forEach(day => day.innerHTML = "");
  for (var i = firstWeekDay; i < firstWeekDay + lastDayInMonth; i++) {
    days[i].innerHTML = `<p class="day-number">${dayToSet}</p>`;
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
var menu = document.querySelector('.menu-container');
let menuOpen = false;
var closeMenuIcon = menu.querySelector("#close-menu");

/* Fade in and out numbers */
function numberFadeIn(checkBoolean) {
  days.forEach(day => {
    var daynumber = day.querySelector('.day-number');
    if (!checkBoolean && daynumber != null) {
      daynumber.style.opacity = 1;
      daynumber.style.visibility = 'visible';
    }
  });
}

function numberFadeOut() {
  days.forEach(day => {
    var daynumber = day.querySelector('.day-number');
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


/* Day edit toggle functionality */
function toggleEditDay() {
  if (this.textContent != "") {
    if(!editOpen && !menuOpen) {
      var date = editDay.querySelector('.date');
      var weekdayClicked = weekdays[this.dataset.dayofweek];
      var dayNumberClicked = this.querySelector('.day-number');
      date.textContent = `${weekdayClicked}, ${months[month]} ${dayNumberClicked.textContent}, ${year}`;
      calendar.style.backgroundColor = "#454545";
      numberFadeOut();
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
closeEditIcon.addEventListener('click', (e) => {
  calendar.style.backgroundColor = "white";
  editDay.classList.remove('edit-day-container-open');
  editOpen = false;
});
calendar.addEventListener('click', () =>
  {
    if (menuOpen) toggleMenu();
  });
editDay.addEventListener('transitionend',
  () => numberFadeIn(editOpen));

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
