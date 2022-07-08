const form = document.querySelector('form');
const textInputs = document.querySelectorAll('form input[type="text"]');
const inputCheckBoxs = document.querySelectorAll('form input[type="checkbox"]');


textInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const currentInput = e.target; 
    
        if(currentInput.name == "name") {

        };

        if(currentInput.name == "Last-name") {
            
        };

        if(currentInput.name == "Phone-number") {
           
        };

        if(currentInput.name == "Mail") {
           
        };
    });
});




const inputValid = (input) => {
    if(!input.validity.valid) {
        input.style.borderColor = "#EA5D1A";
        return false;
    } else {
        input.style.borderColor = "";
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

const formSend = (e) => {
    e.preventDefault();

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

    const name = inputValid(formObjects.name),
        surname = inputValid(formObjects.surname),
        phoneNumber = inputValid(formObjects.phoneNumber),
        email =  inputValid(formObjects.email),
        content = inputValid(formObjects.textArea),
        checkboxAgree = checkBoxValid(formObjects.agreeCheck),
        checkBoxPrivacy = checkBoxValid(formObjects.privacy),
        checkBoxContact = checkBoxContactValid(formObjects.contactCheck);


    if (name && surname && phoneNumber && email && content && checkboxAgree && checkBoxPrivacy && checkBoxContact) {
        console.log("wyśle się");
    } else {
        console.log("nie wyśle się");
    };
};

form.addEventListener('submit', formSend);