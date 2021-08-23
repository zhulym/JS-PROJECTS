const sliderContainer = document.querySelector('.slider__container');
const upArrow = document.querySelector('.slider-up__button');
const downArrow = document.querySelector('.slider-down__button');
const leftSlides = document.querySelectorAll('.slider-left__item');
const rightSlides = document.querySelectorAll('.slider-right__item');
const pagination = document.querySelector('.slider__pagination');

const length = rightSlides.length;
let currentLeftIdx = 0;
let currentRightIdx = 0;
let isActive = true;
let paginationItems;
createPagination();

upArrow.addEventListener('click', slideUp);
downArrow.addEventListener('click', slideDown);
sliderContainer.addEventListener('mousewheel', slideWheel);
pagination.addEventListener('click', slideOnPag);

function slideWheel(event) {
  if (event.wheelDelta < 0) {
    slideDown();
  }
  if (event.wheelDelta > 0) {
    slideUp();
  }
}

function delPrevSlide(slider, animation, index) {
  isActive = false;
  slider[index].classList.add(animation);
  slider[index].addEventListener('animationend', function () {
    this.classList.remove('active', animation);
  })
}

function addNextSlide(slider, animation, index) {
  slider[index].classList.add('next', animation);
  slider[index].addEventListener('animationend', function () {
    this.classList.remove('next', animation);
    this.classList.add('active');
    isActive = true;
  })
}

function clearPagination() {
  Array.from(paginationItems).forEach(el => {
    if (el.classList.contains('active-pagination')) {
      el.classList.remove('active-pagination');
    }
  })
}

function slideUp() {
  if (isActive) {
    clearPagination();
    delPrevSlide(leftSlides, 'to-down', currentLeftIdx);
    currentLeftIdx = ((currentLeftIdx - 1) + length) % length;
    addNextSlide(leftSlides, 'from-up', currentLeftIdx);

    delPrevSlide(rightSlides, 'to-up', currentRightIdx);
    currentRightIdx = ((currentRightIdx - 1) + length) % length;
    addNextSlide(rightSlides, 'from-down', currentRightIdx);
    paginationItems[currentRightIdx].classList.add('active-pagination');
  }
}

function slideDown() {
  if (isActive) {
    clearPagination();
    delPrevSlide(leftSlides, 'to-up', currentLeftIdx);
    currentLeftIdx = ((currentLeftIdx + 1) + length) % length;
    addNextSlide(leftSlides, 'from-down', currentLeftIdx);

    delPrevSlide(rightSlides, 'to-down', currentRightIdx);
    currentRightIdx = ((currentRightIdx + 1) + length) % length;
    addNextSlide(rightSlides, 'from-up', currentRightIdx);
    paginationItems[currentRightIdx].classList.add('active-pagination');
  }
}

function createPagination() {
  for (let i = 0; i < length - 1; i++) {
    const pagItem = document.createElement('span');
    pagItem.setAttribute('class', 'pagination-item')
    pagItem.setAttribute('data-idx', i + 1)
    pagination.append(pagItem);
  }
  paginationItems = document.getElementsByClassName('pagination-item');
}

function slideOnPag(event) {
  const currentPag = Number(event.target.dataset.idx);

  if (currentRightIdx === currentPag) {
    return;
  }

  if (currentPag < currentRightIdx && isActive) {
    clearPagination();
    delPrevSlide(leftSlides, 'to-down', currentLeftIdx);
    currentLeftIdx = currentPag;
    addNextSlide(leftSlides, 'from-up', currentLeftIdx);

    delPrevSlide(rightSlides, 'to-up', currentRightIdx);
    currentRightIdx = currentPag;
    addNextSlide(rightSlides, 'from-down', currentRightIdx);
    paginationItems[currentRightIdx].classList.add('active-pagination');
  }

  if (currentPag > currentRightIdx && isActive) {
    clearPagination();
    delPrevSlide(leftSlides, 'to-up', currentLeftIdx);
    currentLeftIdx = currentPag;
    addNextSlide(leftSlides, 'from-down', currentLeftIdx);

    delPrevSlide(rightSlides, 'to-down', currentRightIdx);
    currentRightIdx = currentPag;
    addNextSlide(rightSlides, 'from-up', currentRightIdx);
    paginationItems[currentRightIdx].classList.add('active-pagination');
  }
}

console.log('Самооценка: \n 1. Первый этап +10 (слайдер работает) \n 2. Второй этап. Обязательный функционал +10 (слайдер зациклен) \n 3. Третий этап. Дополнительный функционал: \n    - слайд по колесу мыши +10 \n    - визуальная пагинация +10 \n    - слайд по клику пагинации +10 \n\n Итого: 50 (макс.30).')
