// form fields
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const email = document.querySelector('#email');
const title = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const activitiesFieldset = document.querySelector('#activities');
const activities = document.querySelectorAll('#activities input');
const cost = document.querySelector('#activities-cost');
const payment = document.querySelector('#payment');
const cc = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin')
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

/* Basic Info Section
====================== */

// Focus on name element after reload
nameField.focus();

// Name field keyup event validation check
nameField.addEventListener('keyup', () => {
    nameCheck();
});

// Email field keyup event validation check
email.addEventListener('keyup', () => {
    emailCheck();
});

// Show/hide other job role field
otherJobRole.style.display='none';
title.addEventListener('change', () => {
    if (title.value == 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/* Tshirt Info Section
====================== */

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

/* Activities Section
====================== */

// On change to activity choices, add or subtract event cost from total displayed.
currentCost = 0;
activitiesFieldset.addEventListener('change', (e) => {
    const eventCost = parseInt(e.target.dataset.cost);
    if (e.target.checked ) {
        currentCost += eventCost;
    } else {
        currentCost -= eventCost;
    }
    cost.textContent = `Total: $ ${currentCost}`;
});

// Add/remove focus class
activitiesFieldset.addEventListener('focus', (e) => {
 e.target.parentNode.className = 'focus';
}, true);

activitiesFieldset.addEventListener('blur', (e) => {
    e.target.parentNode.className='';
}, true);

// Check for conflicting activity times & that at least one activity is checked
activitiesFieldset.addEventListener('change', (e) => {
    for (i = 0; i < activities.length; i++) {
        if (activities[i] !== e.target) {
            if (activities[i].dataset.dayAndTime == e.target.dataset.dayAndTime) {
                activities[i].disabled = true;
                activities[i].parentElement.className= 'disabled';
            } 
            
            if (e.target.checked == false) {
               activities[i].disabled = false;
               activities[i].parentElement.className= '';
            }
        }
    }
    actCheck();
});

/* Payment Info Section
====================== */

// Select CC option by default
payment.options[1].selected = true;
paypal.style.display = 'none';
bitcoin.style.display='none';

// Show appropriate div for each payment method
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

/* Form Validation
====================== */

// Validation helper functions

 // Checks for empty name field
const nameCheck = () => {
    if (nameField.value) { 
        nameField.parentElement.className= "valid";
        nameField.parentElement.lastElementChild.style.display= 'none';
        return true;
    } else {
        nameField.parentElement.className= "not-valid";
        nameField.focus();
        nameField.parentElement.lastElementChild.style.display= 'block';
        return false;
    }
};

// Checks for empty email field and tests content against regex
const emailCheck = () => {
    if (email.value && /^\w{3,}@\w{3,}\.com$/.test(email.value)) {
        email.parentElement.className= "valid";
        email.parentElement.lastElementChild.style.display= 'none';
        console.log('passed both checks');
        return true;
    } else {
        if (email.value) {
            console.log('bad form');
            email.nextElementSibling.textContent = 'Email address must be formatted correctly';
        } else {
            console.log('empty');
            email.nextElementSibling.textContent = 'Please enter your email';
        }
        email.parentElement.className= "not-valid";
        email.parentElement.lastElementChild.style.display= 'block';
        email.focus();
        return false;
    }

};

// Checks that at least one activity is selected
const actCheck = () => {
    let actCount = 0;
    for (let i = 0; i < activities.length; i++) {    
        if (activities[i].checked) {
            actCount ++;
        };
    }
    if (actCount > 0) {
        activitiesFieldset.firstElementChild.className= "valid";
        activitiesFieldset.lastElementChild.style.display= 'none';
        return true;
    } else {
        activitiesFieldset.firstElementChild.className= "not-valid";
        activitiesFieldset.lastElementChild.style.display = 'block';
        activitiesFieldset.focus();
        return false;
    }
};

// If credit card is payment method, checks cc number, zip code, and cvv against regex
const ccCheck = () => {
    if (payment.value == 'credit-card') {
        const ccCheck = /^[0-9]{13,16}$/.test(ccNum.value);
        const zipCheck = /^[0-9]{5}$/.test(zip.value);
        const cvvCheck = /^[0-9]{3}$/.test(cvv.value);
        // This code block
        if (!ccCheck) {
            ccNum.parentElement.className= "not-valid";
            ccNum.parentElement.lastElementChild.style.display= 'block';
            ccNum.focus();
            return false;
        } else if (!zipCheck) {
            ccNum.parentElement.className= "valid";
            ccNum.parentElement.lastElementChild.style.display= 'none';
            zip.parentElement.className= "not-valid";
            zip.parentElement.lastElementChild.style.display= 'block';
            zip.focus();
            return false;
        } else if (!cvvCheck) {
            zip.parentElement.className= "valid";
            zip.parentElement.lastElementChild.style.display= 'none';
            cvv.parentElement.className= "not-valid";
            cvv.parentElement.lastElementChild.style.display= 'block';
            cvv.focus();
            return false;
        } else {
            cvv.parentElement.className= "valid";
            cvv.parentElement.lastElementChild.style.display= 'none';
            return true;
        }
    }
};


/* Form Submission
====================== */

//Submit form and call validation helper functions
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameCheck()) {
        return false;
    } else if (!emailCheck()) {
        return false;
    } else if (!actCheck()) {
        return false;
    } else if (!ccCheck()){
        return false;
    } else {
        return true;
    }
});



