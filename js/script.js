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

// Activities  
activitiesFieldset.addEventListener('focus', (e) => {
 e.target.parentNode.className = 'focus';
}, true);

activitiesFieldset.addEventListener('blur', (e) => {
    e.target.parentNode.className='';
}, true);

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

// Form validation helper functions
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

const emailCheck = () => {
    if (email.value && /^\w{3,}@\w{3,}\.com$/.test(email.value)) {
        email.parentElement.className= "valid";
        email.parentElement.lastElementChild.style.display= 'none';
        return true;
    } else {
        email.parentElement.className= "not-valid";
        email.parentElement.lastElementChild.style.display= 'block';
        email.focus();
        return false;
    }

};

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

const ccCheck = () => {
    if (payment.value == 'credit-card') {
        const ccCheck = /^[0-9]{13,16}$/.test(ccNum.value);
        const zipCheck = /^[0-9]{5}$/.test(zip.value);
        const cvvCheck = /^[0-9]{3}$/.test(cvv.value);
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

// Form submission & validation
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



