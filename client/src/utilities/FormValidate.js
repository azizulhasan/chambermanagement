
export class FormValidate {
    #isValid = false;
    validate(value, type = 'text') {
        switch (type) {
            case 'text':
                this.#isValid = validateText(value);
                break;
            default:
                this.#isValid = validateText(value);

        }
        return this.#isValid;
    }
}


const validateText = (value) => {
    return false;
}

const validateEmail = (value) => {
    return false;
}

const validatePassword = (value) => {
    return false;
}