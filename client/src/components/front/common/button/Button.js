import ButtonGroup from './ButtonGroup';
import { getPrefixedClassNames } from '../../utilities/utilities';

let buttonId = 1;
export default function Button({
    children = '',
    onClick,
    icon,
    buttonStyle,
    classNames = '',
    iconPosition = 'after',
    style = {},
    addBgColor = true,
}) {
    const buttons = {
        buttonOne: ' rounded px-2 py-1.5 text-xs ',
        buttonTow: ' rounded-md px-3 py-2 text-sm  leading-4',
        buttonThree: ' rounded-md px-4 py-2 text-sm ',
        buttonFour: ' rounded-md px-4 py-2 text-base ',
        buttonFive: ' rounded-md px-6 py-3 text-base ',
        defaultClass:
            'inline-flex items-center border border-transparent shadow-sm font-medium focus:outline-none',
    };

    const getClassNames = (buttonStyle = 'buttonOne') => {
        let style = buttons.defaultClass;
        if (buttons[buttonStyle] !== undefined) {
            style += ' ' + buttons[buttonStyle];
        } else {
            style += ' ' + buttons['buttonOne'];
        }

        style += classNames;
        style +=
            addBgColor && ' bg-themeColor text-white hover:bg-themeHoverColor ';

        return style;
    };

    return (
        <button
            id={buttonStyle + '-' + buttonId++}
            className={getPrefixedClassNames(
                getClassNames(buttonStyle),
                'ctx-'
            )}
            onClick={onClick}
            type="button"
            style={style}
        >
            {iconPosition === 'after' ? (
                <>
                    {children + ' '} {icon}
                </>
            ) : (
                <>
                    {' '}
                    {icon} {' ' + children}{' '}
                </>
            )}
        </button>
    );
}

export { ButtonGroup };
