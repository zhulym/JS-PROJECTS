const body = document.body;
const arrowSec = document.querySelector('.arrow-sec');
const arrowMin = document.querySelector('.arrow-min');
const arrowHour = document.querySelector('.arrow-hour');
const arrows = document.querySelectorAll('.arrows');
const digitClock = document.querySelector('.digit-clock');
const digitDate = document.querySelector('.digit-date');
const amsterdam = document.querySelector('.amsterdam-zone');
const cuba = document.querySelector('.cuba-zone');
const losAngeles = document.querySelector('.los-angeles-zone');
const tokyo = document.querySelector('.tokyo-zone');

let options = {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
  weekday: 'long',
};

let zoneOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};


function setTime() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  arrows.forEach(el => el.style.transition = (seconds === 0) ? 'none' : '0.1s')
  arrowSec.style.transform = `rotate(${(((seconds / 60) * 360) + 90)}deg)`;
  arrowMin.style.transform = `rotate(${(((minutes / 60) * 360) + 90)}deg)`;
  arrowHour.style.transform = `rotate(${(((hours / 12) * 360) + 90)}deg)`;

  digitClock.innerHTML = `${(hours < 10) ? '0' + hours : hours} : ${(minutes < 10) ? '0' + minutes : minutes} : ${(seconds < 10) ? '0' + seconds : seconds}`;
  digitDate.innerHTML = date.toLocaleString('en-US', options);

  amsterdam.innerHTML = `${date.toLocaleString('en-US', { ...zoneOptions, timeZone: 'Europe/Amsterdam' })}`;
  cuba.innerHTML = `${date.toLocaleString('en-US', { ...zoneOptions, timeZone: 'Cuba' })}`;
  losAngeles.innerHTML = `${date.toLocaleString('en-US', { ...zoneOptions, timeZone: 'America/Los_Angeles' })}`;
  tokyo.innerHTML = `${date.toLocaleString('en-US', { ...zoneOptions, timeZone: 'Asia/Tokyo' })}`;
}

setInterval(setTime, 10);

const darkLight = document.querySelector('.dark-light-mode');
const clockContainer = document.querySelector('.clock__container');
const digitContainer = document.querySelector('.digit-clock__container');
const timeZoneContainer = document.querySelector('.time-zone__container');
const timeZoneButton = document.querySelector('.time-zone__button');
const timeZoneClose = document.querySelector('.time-zone__close');
darkLight.addEventListener('click', changeMode);

function changeMode(e) {
  if (e.target.innerHTML === 'Light mode') {
    body.style.backgroundColor = '#E3E3E3';
    digitContainer.style.color = '#4e391c'
    e.target.innerHTML = 'Dark mode';
  } else {
    body.style.backgroundColor = '#080602';
    digitContainer.style.color = '#c77d1d'
    e.target.innerHTML = 'Light mode';
  }
  clockContainer.classList.toggle('light-mode');
}

timeZoneButton.addEventListener('click', () => timeZoneContainer.classList.add('show-time-zone'));
timeZoneClose.addEventListener('click', () => timeZoneContainer.classList.remove('show-time-zone'));

console.log('Самооценка: \n 1. Первый этап +10 \n 2. Второй этап. Обязательный функционал +10 \n 3. Третий этап. Дополнительный функционал: \n    - время в разных точках +10 \n    - тёмная светлая тема +10 \n\n Итого: 40 (макс.30).')

