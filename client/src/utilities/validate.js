import { getUserAddress, getFormattedDate } from './utilities';

const submitContactForm = async (e) => {
    e.preventDefault();
    let thisForm = new FormData(e.target);

    let data = {};
    for (let [key, value] of thisForm.entries()) {
        data[key] = value;
    }
    data.date = getFormattedDate();
    data.address = getUserAddress();

    let action = process.env.REACT_APP_API_URL + '/api/contact_form';

    if (!action) {
        displayError('The form action property is not set!');
        return false;
    }
    document.querySelector('.loading').classList.remove('hidden');
    php_email_form_submit(action, data);

    return true;
};

function php_email_form_submit(action, formData) {
    fetch(action, {
        method: 'POST',
        body: JSON.stringify(formData),
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
            document.querySelector('.loading').classList.add('hidden');
            if (data.data.length) {
                document
                    .querySelector('.sent-message')
                    .classList.remove('hidden');
                setTimeout(() => {
                    document
                        .querySelector('.sent-message')
                        .classList.add('hidden');
                }, 2000)
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
            displayError(error);
        });
}

function displayError(error) {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.error-message').innerHTML = error;
    document.querySelector('.error-message').classList.remove('hidden');

    setTimeout(() => {
        document
            .querySelector('.error-message')
            .classList.add('hidden');
    }, 2000)
}

export default submitContactForm;
