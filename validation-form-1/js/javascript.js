const form = document.forms['myForm'];
const inputs = document.querySelectorAll('.form-input');
const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');
const checkboxContainer = document.querySelector('.checkbox_items');
const checkboxes = document.querySelectorAll('.form_checkbox');

const validationShema = {
    email: {
        regexp: /\S+@\S+\.\S+/gi,
        message: 'Incorrect Email!'
    },
    username: {
        regexp: /^[a-zA-Z0-9-\s]+$/gi,
        message: 'Incorrect Name!'
    },
    about: {
        regexp: /^[a-zA-Z0-9-\s!?]+$/gi,
        message: 'Please use only alphabetic symbols and numbers!'
    },

    image: {
        message: 'You can load only images!',
        sizeMessage: 'Max size for images is 1MB!',
    },

    checkbox: {
        message: 'Please choose minimum one skill!',
    },
};

/*=============== Validation for inputs ================*/

inputs.forEach((item) => {
    item.addEventListener('blur', validateFormControl)
});

function validateFormControl(event) {
    const input = event.target || event;
    const error = validationShema[input.name].message;
    const regExp = validationShema[input.name].regexp;
    const isValid = input.value.match(regExp);

    if (!input.required) return;

    if (!isValid) {
        input.nextElementSibling.innerHTML = error;
        input.classList.add('error');
        return false;
    } else {
        input.nextElementSibling.innerHTML = '';
        input.classList.remove('error');
        return true;
    }
};

/*=============== Validation before submit =================*/

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputErrors = [];
    const inputValues = {};

    inputs.forEach((input) => {
        const isValid = validateFormControl(input);
        if (!isValid) {
            inputErrors.push(input);
            return;
        }
        inputValues[input.name] = input.value;
    });

    let fromData = new FormData(form);
    fromData.append('image', formImage.files[0]);

    if (inputErrors.length && countOfChecked === 0) {
        addClassError();
        return;
    } else {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(inputValues),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('response');
                console.log(json);
            });
    }

    formPreview.innerHTML = '';
    formImage.nextElementSibling.innerHTML = '';
    form.reset();
});

/*=============== Validation for image ================*/

formImage.addEventListener('change', () => {
    loadingFile(formImage.files[0]);
});

function loadingFile(image) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
        formImage.nextElementSibling.innerHTML = validationShema.image.message;
        formImage.value = '';
        return;
    } else {
        formImage.nextElementSibling.innerHTML = '';
    }

    if (image.size > 1024 * 1024) {
        formImage.nextElementSibling.innerHTML = validationShema.image.sizeMessage;
        formImage.value = '';
        return;
    } else {
        formImage.nextElementSibling.innerHTML = '';
    }

    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}">`;
    })
    reader.readAsDataURL(image);
};

/*=============== Validation for checkbox ================*/
let countOfChecked = 0;

checkboxes.forEach((item) => {
    item.addEventListener('change', checking);
});

function checking(event) {
    if (event.target.hasAttribute('checked')) {
        if (!(countOfChecked - 1)) {
            addClassError();
        }
        event.target.removeAttribute('checked');
        countOfChecked--;
    } else {
        event.target.setAttribute('checked', '');
        checkboxContainer.nextElementSibling.innerHTML = '';
        checkboxes.forEach((item) => {
            item.classList.remove('error');
        })
        countOfChecked++;
    }
}

function addClassError() {
    checkboxes.forEach((item) => {
        checkboxContainer.nextElementSibling.innerHTML = validationShema.checkbox.message;
        item.classList.add('error');
    })
}