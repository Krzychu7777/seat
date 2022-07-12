const form = document.querySelector('form');
const inputs = document.querySelectorAll('form input');
let formObjects = {
    name: document.querySelector('input[name="name"]'),
    surname: document.querySelector('input[name="Last-name"]'),
    phoneNumber: document.querySelector('input[name="Phone-number"]'),
    email: document.querySelector('input[name="Mail"]'),
    agree: document.querySelector('input[name="Mail"]'),
    textArea: document.querySelector('textarea'),
    agreeCheck: document.querySelector('input[name="send_agree"]'),
    privacy: document.querySelector('input[name="privacy-policy"]'),
    contactCheck: document.querySelectorAll('input[name="contact[]"]')
};


const showError = (el, error, errorSecond, errorActive, errorSecActive) => {
    el.style.borderColor = "#EA5D1A";
    error.classList.add(errorActive);

    if(errorSecond.classList.contains(errorSecActive))
    errorSecond.classList.remove(errorSecActive);
}

const inputAlerts = (input, errorClass, errorMismatch) => {
    if(input.validity.valueMissing) {
        showError(input, errorClass, errorMismatch, 'error--active', 'error-second--active');
    } else if(input.validity.typeMismatch || input.validity.patternMismatch || input.validity.tooShort) {
        showError(input, errorMismatch, errorClass, 'error-second--active', 'error--active');
    } else if(input.validity.valid) {
        input.style.borderColor = "#a1d417";
        if(errorClass.classList.contains('error--active')) {
        errorClass.classList.remove('error--active');}

        if(errorMismatch.classList.contains('error-second--active')) {
        errorMismatch.classList.remove('error-second--active');}
    }
}

const inputValid = (input, error) => {
    if(!input.validity.valid) {
        input.style.borderColor = "#EA5D1A";
        error.classList.add('error--active');
        return false;
    } else {
        input.style.borderColor = "";
        error.classList.remove('error--active');
        return true;
    }
};

const checkBoxValid = (checkBox) => {
    if(checkBox.checked === false) {
        checkBox.style.borderColor ="#EA5D1A";
        return false;
    }
    return true;
};

const checkBoxContactValid = (checkBoxes) => {
    const inputChecked = [...checkBoxes].filter((item) => item.checked);

    if(inputChecked == "") {
        for(let i=0; i < checkBoxes.length; i++) {
            checkBoxes[i].style.borderColor = "#EA5D1A";
        }
        return false;
    }
    return true;
};

const emailCheck = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const advancedEmailValid = (input, error) => {
    if(!emailCheck(input.value)) {
        input.style.borderColor = "#EA5D1A";
        error.classList.add('error--active');
        return false;
    } else {
        input.style.borderColor = "";
        error.classList.remove('error--active');
        return true;
    }
}

const emailAlert = (input, errorMismatch) => {
    if(input.value == '') {
        errorMismatch.classList.remove('error-second--active');
    } else if(!emailCheck(input.value)) {
        input.style.borderColor = "#EA5D1A";
        errorMismatch.classList.add('error-second--active');
    } else {
        input.style.borderColor = "#a1d417";
        errorMismatch.classList.remove('error-second--active');
    }
}

const formSend = (e) => {
    e.preventDefault();

    let formErrors = {
        name: document.querySelector('.error-name'),
        surname: document.querySelector('.error-surname'),
        phoneNuber: document.querySelector('.error-phone'),
        email: document.querySelector('.error-email'),
        textArea: document.querySelector('.error-textarea'),
    }

    const name = inputValid(formObjects.name, formErrors.name),
        surname = inputValid(formObjects.surname, formErrors.surname),
        phoneNumber = inputValid(formObjects.phoneNumber, formErrors.phoneNuber),
        email =  advancedEmailValid(formObjects.email, formErrors.email),
        content = inputValid(formObjects.textArea, formErrors.textArea),
        checkboxAgree = checkBoxValid(formObjects.agreeCheck),
        checkBoxPrivacy = checkBoxValid(formObjects.privacy),
        checkBoxContact = checkBoxContactValid(formObjects.contactCheck);


    if (name && surname && phoneNumber && email && content && checkboxAgree && checkBoxPrivacy && checkBoxContact) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              name: formObjects.name.value,
              surname: formObjects.surname.value,
              phoneNumber: formObjects.phoneNumber.value,
              email: formObjects.email.value,
              content: formObjects.textArea.value,
              sendAgree: formObjects.agreeCheck.checked,
              policyPrivacy: formObjects.privacy.checked
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => {
                location.href = "thanks.html";
            });

    } else {
        location.href = "#contact-form";
    }
};

form.addEventListener('submit', formSend);

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const currentInput = e.target;
        const currentError = currentInput.parentNode.querySelector('.error');
        const errorMismatch = currentInput.parentNode.querySelector('.error-second');
    
        if(currentInput.name == "name") {
            inputAlerts(currentInput, currentError, errorMismatch);
        };

        if(currentInput.name == "Last-name") {
            inputAlerts(currentInput, currentError, errorMismatch);
        };

        if(currentInput.name == "Phone-number") {
            inputAlerts(currentInput, currentError, errorMismatch);
            currentInput.value = currentInput.value.replace(' ', '');
            currentInput.value = currentInput.value.replace(/[^\d, +,' ']/, '');
        };

        if(currentInput.name == "Mail") {
            inputAlerts(currentInput, currentError, errorMismatch);
            emailAlert(currentInput, errorMismatch);
        };
    });

    input.addEventListener('change', (e) => {
        const currentCheckbox = e.target;

        if(currentCheckbox.name == "send_agree") {
            currentCheckbox.style.borderColor = "";
        }

        if(currentCheckbox.name == "privacy-policy") {
            currentCheckbox.style.borderColor = "";
        }
    });
});

formObjects.contactCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        for(let i = 0; i < formObjects.contactCheck.length; i++) {
            formObjects.contactCheck[i].style.borderColor = "";
        }
    })
});

formObjects.textArea.addEventListener('input', (e) => {
    const currentTextArea = e.target;
    const curError = currentTextArea.parentNode.querySelector('.error');
    const curErrorMis = currentTextArea.parentNode.querySelector('.error-second');

    inputAlerts(currentTextArea, curError, curErrorMis);
});
