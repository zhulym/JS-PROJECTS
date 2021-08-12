"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['myForm'];
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let fromData = new FormData(form);
        fromData.append('image', formImage.files[0]);

        if (error === 0) {
            formPreview.innerHTML = '';
            form.reset();
        } else {
            alert('Заполните обязательные поля!');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        formReq.forEach((item) => {
            let input = item;
            input.classList.remove('_error');

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    input.classList.add('_error');
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                input.classList.add('_error');
                error++;
            } else {
                if (input.value === '') {
                    input.classList.add('_error');
                    error++;
                }
            }
        })
        return error;
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    })

    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения!');
            formImage.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть не более 2МБ!');
            return;
        }

        let reader = new FileReader();

        reader.onload = function (event) {
            formPreview.innerHTML = `<img src="${event.target.result}">`;
        };

        reader.onerror = function (event) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);

    }
})