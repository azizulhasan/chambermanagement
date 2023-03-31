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
}) {
    return toolTip ? (
        <>
            <div className="ctx-group ctx-flex ctx-relative">
                {label && (
                    <label
                        className="ctx-inline-flex ctx-mt-1 ctx-text-gray-500"
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
                        'ctx-block ctx-rounded-md !ctx-border-gray-300 ctx-shadow-sm sm:ctx-text-sm',
                        classes
                    )}
                    onChange={onChange && onChange}
                    onBlur={onBlur && onBlur}
                    {...{ validate }}
                />
                <ToolTip title={toolTip} />
            </div>
        </>
    ) : (
        <>
            {label && (
                <label
                    className="ctx-inline-flex ctx-mt-1 ctx-text-gray-500"
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
                    'ctx-block ctx-rounded-md !ctx-border-gray-300 ctx-shadow-sm sm:ctx-text-sm',
                    classes
                )}
                onChange={onChange && onChange}
                onBlur={onBlur && onBlur}
            />
        </>
    );
}
