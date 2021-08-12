const field = document.querySelector('.field');
const elements = document.querySelectorAll('.elem');
const counterContainer = document.querySelector('#tour');
const closeButton = document.querySelector('.close');
let selectedElem = '';
let counter = 1;

document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('elem')) return;
    choseElem(event);
});
field.addEventListener('click', moveElem);


function choseElem(event) {
    if (!event.target.classList.contains('active')) return;
    elements.forEach((item) => {
        item.classList.remove('change');
    })
    selectedElem = event.target;
    selectedElem.classList.add('change');
}

function moveElem(event) {
    if (!event.target.classList.contains('empty')) return;

    let emptyElem = document.querySelector('.empty');

    for (let i = 0; i <= elements.length; i++) {
        if (emptyElem === elements[i]) {
            if (selectedElem === elements[i + 1]
                || selectedElem === elements[i - 1]
                || selectedElem === elements[i - 4]
                || selectedElem === elements[i + 4]) {

                selectedElem.classList.remove('active');
                selectedElem.classList.add('empty');

                event.target.classList.remove('empty');
                event.target.classList.add('active');

                selectedElem.classList.remove('change');
                event.target.innerHTML = selectedElem.innerHTML;
                selectedElem.innerHTML = '';

                counterContainer.innerHTML = counter;
                counter++
                selectedElem = '';
            }
        }
    }

    function checkElems() {
        for (let i = 0; i < elements.length - 2; i++) {
            if (elements[i].innerHTML.slice(-1) !== elements[i].id.slice(-1)) {
                return false;
                return;
            }
        }
    }

    if (checkElems() === undefined && elements[15].innerHTML === '') {
        elements.forEach((item) => {
            item.classList.remove('active');
            item.classList.add('win-style');
        })
        document.querySelector('.win-message').style.top = '30%';
        document.querySelector('.text').innerHTML = `Победа на ${counter - 1} ходу! Для создания новой игры перезагрузите страницу`;
    }

    closeButton.addEventListener('click', closeWinMes);
    function closeWinMes() {
        document.querySelector('.win-message').style.top = '-100%';
    }
}