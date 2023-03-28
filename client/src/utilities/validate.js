import { getUserAddress, getFormattedDate } from './utilities';

const submitContactForm = (e) => {
    e.preventDefault();
    let forms = document.querySelectorAll('.php-email-form');
    forms.forEach(function (e) {
        e.addEventListener('submit', function (event) {
            event.preventDefault();

            let thisForm = this;

            let action = process.env.REACT_APP_API_URL + '/api/contact_form';

            if (!action) {
                displayError(thisForm, 'The form action property is not set!');
                return;
            }
            thisForm.querySelector('.loading').classList.add('block');
            thisForm
                .querySelector('.error-message')
                .classList.remove('block');
            thisForm.querySelector('.sent-message').classList.remove('block');

            let formData = new FormData(thisForm);
            formData.append('date', getFormattedDate());
            php_email_form_submit(thisForm, action, formData);
        });
    });
};

function php_email_form_submit(thisForm, action, formData) {
    let data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    data.address = getUserAddress();
    fetch(action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(
                    `${response.status} ${response.statusText} ${response.url}`
                );
            }
        })
        .then((data) => {
            thisForm.querySelector('.loading').classList.remove('block');
            if (data.data.length) {
                thisForm
                    .querySelector('.sent-message')
                    .classList.add('block');
                thisForm.reset();
            } else {
                throw new Error(
                    data
                        ? data
                        : 'Form submission failed and no error message returned from: ' +
                        action
                );
            }
        })
        .catch((error) => {
            displayError(thisForm, error);
        });
}

function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('block');
}

export default submitContactForm;
