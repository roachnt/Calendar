/* Get required initial elements */
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();

var calendar = document.querySelector('.calendar');
var weeks = Array.from(calendar.querySelectorAll('.week'));
var days = Array.from(calendar.querySelectorAll('.day'));



var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* Add dates to the appropriate squares */
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

var firstDayOfMonth = new Date(year, month);
var firstWeekDay = firstDayOfMonth.getDay();
var lastDayInMonth = daysInMonth(year, month);
var dayToSet = 1;

for (var i = firstWeekDay; i < firstWeekDay + lastDayInMonth; i++) {
  days[i].innerHTML += `<p class="day-number">${dayToSet}</p>`;
  dayToSet++;
}


/* Menu toggle functionality */
var menuIcon = document.querySelector('.menu-icon');
var menu = document.querySelector('.menu-container');
let menuOpen = false;
var closeMenuIcon = menu.querySelector("#close-menu");

function toggleMenu() {
  if(!menuOpen) {
    menu.classList.add('menu-container-open');
    menuOpen = true;
  }
  else {
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
closeMenuIcon.addEventListener('click', () => {
  menu.classList.remove('menu-container-open');
  menuOpen = false;
});

/* Styling for hovering over a date */
days.forEach(day => day.addEventListener('mousemove', () =>
  {
    if (day.textContent != "" ) day.classList.add('day-hover');
    else day.classList.add('day-empty');
  }));
days.forEach(day => day.addEventListener('mouseout', () =>
  {
    if (day.textContent != "" ) day.classList.remove('day-hover');
    else day.classList.remove('day-empty');
  }));
