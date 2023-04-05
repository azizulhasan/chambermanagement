import { classNames } from '../../utilities/utilities';
import ToolTip from '../common/ToolTip';

export default function Input({
    label,
    type = 'text',
    name,
    value = '',
    placeholder = '',
    classes = '',
    required = false,
    readOnly = false,
    onBlur = null,
    onChange = null,
    toolTip = '',
    validate = null,
    toolTipCss = ''
}) {
    return toolTip ? (
        <>
            <div className="group flex relative">
                {label && (
                    <label
                        className="inline-flex mt-1 text-gray-500"
                        htmlFor="input-field"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    required={required}
                    readOnly={readOnly}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={classNames(
                        'block rounded-md !border-gray-300 shadow-sm sm:text-sm',
                        classes
                    )}
                    onChange={onChange && onChange}
                    onBlur={onBlur && onBlur}
                    {...{ validate }}
                />
                <ToolTip classes={toolTipCss} title={toolTip} />
            </div>
        </>
    ) : (
        <>
            {label && (
                <label
                    className="inline-flex mt-1 text-gray-500"
                    htmlFor="input-field"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                required={required}
                readOnly={readOnly}
                autoComplete="off"
                placeholder={placeholder}
                className={classNames(
                    'block rounded-md !border-gray-300 shadow-sm sm:text-sm',
                    classes
                )}
                onChange={onChange && onChange}
                onBlur={onBlur && onBlur}
            />
        </>
    );
}
