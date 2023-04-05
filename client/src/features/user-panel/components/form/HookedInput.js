import React from 'react';

const HookedInput = ({
    name,
    label = null,
    labelInline = false,
    type = 'text',
    register,
    onChange,
    onBlur,
    placeholder,
    wrapperClasses = '',
    labelClasses = '',
    inputClasses = '',
    styleVariant = '',
    validation = {},
    errorMessage = ' ',
    withMessageSpace = false,
}) => {
    let composedClass = '';
    if (styleVariant === 'edit') {
        composedClass = ' form__input--edit ';
    }

    return (
        <div>
            <div
                className={
                    labelInline
                        ? wrapperClasses
                        : `flex flex-col ${wrapperClasses} `
                }
            >
                {label ? (
                    <label htmlFor={name} className={labelClasses}>
                        {label}
                    </label>
                ) : null}
                <input
                    {...register(name, validation)}
                    placeholder={
                        placeholder
                            ? placeholder
                            : label?.split('')[0].toUpperCase() +
                              label?.slice(1)
                    }
                    type={type}
                    className={composedClass + inputClasses}
                />
            </div>
            <p
                className={
                    withMessageSpace
                        ? 'h-5 text-sm text-red-500'
                        : `text-sm text-red-500 `
                }
            >
                {errorMessage}
            </p>
        </div>
    );
};

export default HookedInput;
