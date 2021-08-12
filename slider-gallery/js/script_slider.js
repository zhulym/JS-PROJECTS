let slider = document.querySelector('.slider');

// Create download icon
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement('afterbegin', loadIcon);


// Create left arrow
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

// Create right arrow
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);


//Событие ждём пока загрузится весь контент и вешаем клики на кнопки
// пока картинки грузятся работает loadIcon, потом должен исчезать
debugger;
window.addEventListener('load', function () {
    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    })

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    })

    images.startSlide();
    hideLoadIcon(loadIcon);

})

function hideLoadIcon(loadIcon) {
    loadIcon.style.display = 'none';
}



// функция проверит размеры слайдера, если они заданы в HTML, то применит их

function setSize(slider) {
    let widthOfSlider = slider.getAttribute('data-width');
    let heightOfSlider = slider.getAttribute('data-height');
    if (widthOfSlider !== null && widthOfSlider !== "") {
        slider.style.width = widthOfSlider;
    }
    if (heightOfSlider !== null && heightOfSlider !== "") {
        slider.style.height = heightOfSlider;
    }
}

setSize(slider);


let images = {
    currentIndex: 0,                                              // индекс текущего изображения
    slides: [],                                                   // здесь будут блоки див (слайды)
    startSlide() {
        this.slides = document.querySelectorAll('.slider-item');  // получаем все слайды и показываем первый
        this.showImageWithCurrentIndex();
    },
    showImageWithCurrentIndex() {
        this.slides[this.currentIndex].classList.remove('hidden-slide');  //берём слайд с текущим индексом и убираем у него класс, т.е. открываем одно изображение
    },

    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIndex === 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex--;
        }
        this.showImageWithCurrentIndex();
    },

    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIndex === this.slides.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.showImageWithCurrentIndex();
    },
    // при переключении слайда скрываем абсолютно все, а нужный включится по индексу
    hideVisibleImages() {
        this.slides.forEach((item) => item.classList.add('hidden-slide'));
    }

}



/*====================================  GALLERY  ================================================*/

let galleryImages = document.querySelectorAll(".gallery-item");

function init() {
    galleryImages.forEach((item) => item.addEventListener('click', changeBigPicture));
}

function changeBigPicture(event) {
    let containerForImage = document.getElementById("big_picture");

    containerForImage.innerHTML = "";

    let imageNameParts = event.target.id.split("_");
    let src = "images/gallery/big/img" + imageNameParts[1] + ".jpg";
    let imageDomElement = document.createElement("img");
    imageDomElement.src = src;
    containerForImage.appendChild(imageDomElement);
}

window.onload = init;