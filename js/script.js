

/* input and fieldset ids:
name
email
title
other-job-role
size
design
color
activities fieldset
payment
exp-month
exp-year
cc-num
zip
cvv */

let form = document.querySelector('form');
let nameField = document.querySelector('#name');
let email = document.querySelector('#email');
let title = document.querySelector('#title');
let otherJobRole = document.querySelector('#other-job-role');
let size = document.querySelector('#size');
let design = document.querySelector('#design');
let color = document.querySelector('#color');
let activitiesFieldset = document.querySelector('#activities');
let activities = document.querySelectorAll('#activities input');
let cost = document.querySelector('#activities-cost');
let payment = document.querySelector('#payment');
let cc = document.querySelector('#credit-card');
let paypal = document.querySelector('#paypal');
let bitcoin = document.querySelector('#bitcoin')
let expMonth = document.querySelector('#exp-month');
let expYear = document.querySelector('#exp-year');
let ccNum = document.querySelector('#cc-num');
let zip = document.querySelector('#zip');
let cvv = document.querySelector('#cvv');

// Focus on name element after reload
nameField.focus();

// Show/hide other job role field
otherJobRole.style.display='none';

title.addEventListener('change', () => {
    if (title.value == 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// Disable color field until design is chosen
color.disabled = true;

// On change to design field show available color options for design
design.addEventListener('change', () => {
    color.disabled = false;
    let options = color.options;
    for (let i=0; i<options.length; i++){
        options[i].hidden = true
    }
    if (design.value == 'js puns') {
        options = document.querySelectorAll('[data-theme="js puns"]');
        for (let i=0; i<options.length; i++){
            options[i].hidden = false;
        }
    } else {
        options = document.querySelectorAll('[data-theme="heart js"]');
        for (let i=0; i<options.length; i++){
            options[i].hidden = false;
        }
    }
});

// On change to activity choices, add or subtract event cost from total displayed.
currentCost = 0;
activitiesFieldset.addEventListener('change', (e) => {
    let eventCost = parseInt(e.target.dataset.cost);
    if (e.target.checked ) {
        currentCost += eventCost;
    } else {
        currentCost -= eventCost;
    }
    cost.textContent = `Total: $ ${currentCost}`;
});

// Select CC option by default
payment.options[1].selected = true;
paypal.style.display = 'none';
bitcoin.style.display='none';

payment.addEventListener('change', () => {
    switch (payment.value) {
        case 'credit-card':
            cc.style.display = 'block';
            paypal.style.display = 'none';
            bitcoin.style.display='none';
            break;
        case 'paypal':
            paypal.style.display = 'block';
            cc.style.display = 'none';
            bitcoin.style.display='none';
            break;
        case 'bitcoin':
            bitcoin.style.display = 'block';
            cc.style.display = 'none'
            paypal.style.display = 'none';
            break;
    }
});

/* nameField.value = 'Sarah Baghdadi';
email.value = 'sarah@bagh.com';
activities[2].checked = true;
payment.value = 'credit-card';
ccNum.value = '1234567891234';
zip.value = '12345';
cvv.value = '123'; */

let nameCheck = () => {
    if (nameField.value) {
        return true;
    } else {
        console.log('Name check failed');
        return false;
    }
};

let emailCheck = () => {
    if (email.value && /^\w{3,}@\w{3,}\.com$/.test(email.value)) {
        return true;
    } else {
        console.log('Email check failed');
        return false;
    }

};

let actCheck = () => {
    let actCount = 0;
    for (let i = 0; i < activities.length; i++) {    
        if (activities[i].checked) {
            actCount ++;
        };
    }
    if (actCount > 0) {
        return true;
    } else {
        console.log('Act check failed');
        return false;
    }
};

let ccCheck = () => {
    if (payment.value == 'credit-card') {
        let ccCheck = /^[0-9]{13,16}$/.test(ccNum.value);
        let zipCheck = /^[0-9]{5}$/.test(zip.value);
        let cvvCheck = /^[0-9]{3}$/.test(cvv.value);
        if (!ccCheck) {
            console.log('CC check failed');
            return false;
        } else if (!zipCheck) {
            console.log('Zip check failed');
            return false;
        } else if (!cvvCheck) {
            console.log('CVV check failed');
            return false;
        } else {
            return true;
        }
    }
};

// Form submission & validation
form.addEventListener('submit', (e) => {
        if (!nameCheck()) {
            return false;
        } else if (!emailCheck()) {
            return false;
        } else if (!actCheck()) {
            return false;
        } else if (!ccCheck()){
            return false;
        } else {
            console.log('submitted')
            e.preventDefault();
            return true;
        }
});



