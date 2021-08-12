
//!!! При установке настроек проверять стили, возможно некоторые нужно активировать
let mySlider = new Swiper('.image-slider', {
    navigation: {
        nextEl: '.swiper-button-next',  //активировать кнопки стрелки
        prevEl: '.swiper-button-prev'
    },

    pagination: {  //базово можно использовать только одну пагинации, если нужно что то ещё - настраиваем дополнительно
        el: '.swiper-pagination',
        clickable: true,        //переключение по точкам
        // dynamicBullets: true,  //изменяющиеся размеры точек нав
        //     renderBullet(index, className) {     //метод дабавит нумерацию в точки навигации
        //         return '<span class="' + className + '">' + (index + 1) + '</span>';
        //     },
        type: 'fraction',    //выведет навигацию в виде 1/5 вместо точек
        renderFraction(currentClass, totalClass) {    // метод модифицирует навигацию, добавляя слова 'Image 1 of 5'
            return 'Image <span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        },
        type: 'progressbar',  //полоса навигации сверху
    },

    autoplay: {
        delay: 1000,
        stopOnLastSlide: false, // для этой настройки loop(бесконечность) нужно отключить. true - при достижении последнего слайда автопрокрутка остановиться
        disableOnInteraction: true, // false - если мы листнули вручную, то автопрокрутка продолжится, true - если вручную листнули автопрокрутка не возобновиться
    },

    scrollbar: {     //скролл бегунок снизу
        el: '.swiper-scrollbar',
        draggable: true   // возможность перетаскивать скролл
    },

    simulateTouch: true,  // по умолчанию можно перетаскивать слайды мышкой(false запрет)
    touchRatio: 1,   // скорость перетаскивания слайдов 0 - отключить
    grabCursor: true,   // замена стандартного курсора при перетаскивании
    slideToClickedSlide: true,   // переключение на слайд при клике на него

    keyboard: {   // переключатели для клавиатуры
        enabled: true,    //вкл/выкл
        onlyInViewport: true,  //вкл/выкл только когда слайдер в пределах вьюпорта
    },

    mousewheel: {
        sensitivity: 1,
        eventsTarget: ".image-slider"   // указать класс объекта, на котором будет срабатывать прокрутка мышью
    },

    autoHeight: true,  // настроит плавную подстройку высоты всего слайдера по изображения(лучше сразу делать все изображения одного размера)

    loop: true, // бесконечное прокручивание (!!!с мультирядностью не работает, не совсем корректно работает со скроллом )

    speed: 600, // скорость прокрутки слайдов

    // slidesPerView: 1,  // количество картинок отображаемое за раз, можно также 2.2 или 3.8

    // spaceBetween: 30,  // при нескольких слайдах установит отступы между ними

    // slidesPerGroup: 1, // при нескольких слайдах опр. кол-во пролистываемых слайдов за раз(по умолчанию по 1)

    // initialSlide: 0,  // index слайда с которого начнётся показ, !!!первый нулевой

    // slidesPerColumn: 2,  // несколько рядов показа слайдов !!!ОБЯЗАТЕЛЬНО настроить (autoHeight: false, slidesPerView: 2, spaceBetween: 30) + стили для размера слайдера

    // freeMode: true,  // в таком режиме скролл прокручивается по делениям мышки, а так же свободно останавливается при перетаскивании

    // direction: 'vertical',  // вертикальный слайдер (стили подправить)

    effect: 'cube',         // 'slide' - по умолчанию.  'flip', 'cube', 'fade', 'coverflow'   !!!!(slidesPerView: 1)
    //'fade' - эффект исчезания слайда как с опасити без доп. настроек

    flipEffect: {        // эффект переворота слайда для flip нужно(прикольно)
        slideShadows: true,
        limitRotation: true
    },
    cubeEffect: {           // ширину слайдера задать по ширине картинки
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
    },
    coverflowEffect: {    // слайды под наклоном, рекомендовано при (slidesPerView: 2+)
        rotate: 20,
        stretch: 50,
        slideShadows: true,
    },

    // АДАПТАЦИЯ (под каждую ширину можно разные настройки)
    // breakpoints: {
    //     320: {
    //         slidesPerView: 1,
    //     },
    //     480: {
    //         slidesPerView: 2,
    //     },
    //     992: {
    //         slidesPerView: 3,
    //     }
    // },


    // //Для ускорения загрузки и оптимизации сайта можно отключить полную предзагрузку картинок слайдера(со старта загрузятся только 
    // // первые для показа, остальные будут подгружаться по клику на стрелку)
    // preloadImages: false,             //отключить предзагрузку
    // lazy: {
    //     loadOnTransitionStart: false, // подгружать на старте переключения слайда    
    //     loadPrevNext: false,          // подгружать предыдущую и след картинку
    // },
    // watchSlidesProgress: true,          // слежка за видимыми слайдами
    // watchSlidesVisibility: true,        // добавление класса видимым слайдам


    // есть ещё параллакс эффект(например фон текста будет смещаться при текстовом слайдере )


});

// Need for show at the same time PROGRESSBAR AND PAGINATION
let mySliderAllSlides = document.querySelector('.image-slider__total');
let mySliderCurrentSlide = document.querySelector('.image-slider__current');

mySliderAllSlides.innerHTML = mySlider.slides.length - 2;  // - 2 так как при вёрстке добавилось два блока и они учитываются в нумерации

mySlider.on('slideChange', () => {
    let currentSlide = ++mySlider.realIndex;
    mySliderCurrentSlide.innerHTML = `Image ${currentSlide}`;
});



