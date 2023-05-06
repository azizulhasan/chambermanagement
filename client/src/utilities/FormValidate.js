
export class FormValidate {
    #isValid = { type: 'green-700', message: '' }
    validate(value, type = 'text') {
        switch (type) {
            case 'text':
                this.#isValid = validateText(value);
                break;
            case 'email':
                this.#isValid = validateEmail(value);
                break;
            case 'password':
                this.#isValid = validatePassword(value);
                break;
            case 'number':
                this.#isValid = validatePhoneNumber(value);
                break;
            default:
                this.#isValid = validateText(value);
        }

        return this.#isValid;
    }
}


const validateText = (value) => {
    let errMsg = '';
    let type = 'red-700'

    if (value.length < 3) {
        errMsg = 'Please enter a name with at least 3 letters';
    }

    if (!(/^[a-zA-Z\s]+$/.test(value))) {
        errMsg = 'Only alphabets allowed.'
    }

    if (value === '') {
        errMsg = 'Please enter a valid name.'
    }

    if (!errMsg) {
        type = 'green-700'
    }

    return { type: type, message: errMsg }

}

const validateEmail = (value) => {
    let isValid = value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (isValid === null) {
        return { type: 'red-700', message: 'Please enter a valid email' }
    } else {
        return { type: 'green-700', message: '' }
    }
}



const validatePassword = (value) => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (reg.test(value)) {
        return { type: 'green-700', message: '' }
    } else {
        return { type: 'red-700', message: 'Password should have one spechial charecter, one number, one alphabet and at least 8 charecters.' }
    }
}

const validatePhoneNumber = (value) => {
    let reg = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
    if (reg.test(value)) {
        return { type: 'green-700', message: '' }
    } else {
        return { type: 'red-700', message: 'Please enter a valid phone number.' }
    }
}