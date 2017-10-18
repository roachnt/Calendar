var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();

var calendar = document.querySelector('.calendar');
var weeks = Array.from(calendar.querySelectorAll('.week'));
var days = Array.from(calendar.querySelectorAll('.day'));

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

var firstDayOfMonth = new Date(year, month);
var firstWeekDay = firstDayOfMonth.getDay();
var lastDayInMonth = daysInMonth(year, month);
var dayToSet = 1;

for (var i = firstWeekDay; i < firstWeekDay + lastDayInMonth; i++) {
  days[i].innerHTML = `<p class="day-number" style="margin: 5px;">${dayToSet}</p>`;
  dayToSet++;
}


var menuIcon = document.querySelector('.menu-icon');

calendar.addEventListener('mousemove',
  () => menuIcon.classList.add('menu-icon-mousemove'));
menuIcon.addEventListener('mousemove',
  () => menuIcon.classList.add('menu-icon-mousemove'));
calendar.addEventListener('mouseout',
  () => menuIcon.classList.remove('menu-icon-mousemove'));

days.forEach(day => day.addEventListener('mousemove', () =>
  day.classList.add('day-hover')));
days.forEach(day => day.addEventListener('mouseout', () =>
  day.classList.remove('day-hover')));
