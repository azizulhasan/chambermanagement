import { classNames } from '../../utilities/utilities';

export default function Select({
    id,
    name,
    selected,
    options = [],
    classes,
    defaultValue = '',
    value = '',
    defaultOption = 'Select value',
    addDefaultOption = true,
    required = true,
    onChange = null,
}) {
    return (
        <select
            id={id ? id : name}
            name={name}
            onChange={onChange && onChange}
            autoComplete="on"
            value={value}
            required={required}
            className={classNames(
                'ctx-block ctx-rounded-md  !ctx-border-gray-300 ctx-shadow-sm focus:!ctx-border-gray-900  sm:ctx-text-sm ',
                classes
            )}
        >
            {addDefaultOption && <option value="0">{defaultOption}</option>}
            {options.length
                ? typeof options[0] == 'string'
                    ? getArrayOptions(options, selected)
                    : getGroupDropdown(options, selected)
                : getObjectOptions(options, selected)}
        </select>
    );
}

function getGroupDropdown(options, selected) {
    if (!Object.values(options)[0].hasOwnProperty('optionGroup')) {
        return getObjectOptions(options, selected);
    }

    return Object.values(options).map((optionGroup, i) => {
        {
            return optionGroup.hasOwnProperty('optionGroup') ? (
                <optgroup label={optionGroup.optionGroup} key={i}>
                    {Object.keys(optionGroup.options).map(
                        (optionName, index) => {
                            let currentOption = optionGroup.options[optionName];
                            return (
                                <option key={index} value={optionName}>
                                    {' '}
                                    {currentOption}{' '}
                                </option>
                            );
                        }
                    )}
                </optgroup>
            ) : null;
        }
    });
}

function getObjectOptions(options, selected) {
    return Object.keys(options).map((key, index) => {
        return (
            <option key={index} value={options[key]._id}>
                {' '}
                {options[key].name}{' '}
            </option>
        );
    });
}

function getArrayOptions(options, selected) {
    return options.map((option, index) => {
        return (
            <option key={index} value={option}>
                {' '}
                {option}{' '}
            </option>
        );
    });
}
