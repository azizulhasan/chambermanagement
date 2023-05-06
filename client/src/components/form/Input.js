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
    toolTipCss = '',
    errObj = { type: 'red-700', message: '', isFormSubmitted: false, fieldName: 'name' }
}) {
    return errObj.isFormSubmitted ? (
        <>
            <div className="group flex relative">
                {label && (
                    <label
                        className="inline-flex mt-1 text-gray-500 whitespace-nowrap"
                        htmlFor="input-field"
                    >
                        {label}
                    </label>
                )}
                <div>
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
                    {errObj.isFormSubmitted && errObj.message && <p className={'ml-4 text-' + errObj.type + " " + errObj.fieldName}>{errObj.message}</p>}
                </div>
                {toolTip && <ToolTip classes={toolTipCss} title={toolTip} />}
            </div>
        </>
    ) : (
        <>
            <div className="group flex">
                {label && (
                    <label
                        className="inline-flex mt-1 text-gray-500 whitespace-nowrap"
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
            </div>
            {toolTip && <ToolTip classes={toolTipCss} title={toolTip} />}
        </>
    );
}
