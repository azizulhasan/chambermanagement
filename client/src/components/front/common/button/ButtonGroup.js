// Button group Component

import {
    classNames,
    getPrefixedClassNames,
} from '../../../../utilities/utilities';

// import { classNames, getPrefixedClassNames } from '../../utilities/utilities';

let buttonId = 0;
export default function ButtonGroup({
    classes,
    name,
    items = [],
    toggleElementIndex = 0,
    selected = '',
    onclickButton,
}) {
    let buttonCSS = {
        0: 'relative inline-flex items-center rounded-l-md border border-gray bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:text-white hover:bg-themeHoverColor focus:z-10  focus:outline-none ',
        end: 'relative -ml-px inline-flex items-center rounded-r-md border border-gray bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:text-white hover:bg-themeHoverColor focus:z-10  focus:outline-none ',
        normal: 'relative  inline-flex items-center  border border-gray bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:text-white hover:bg-themeHoverColor focus:z-10 focus:outline-none ',
    };
    const getClassNames = (classes, item) => {
        if (item.type === selected) {
            classes += ' ctx-isActive';
        }
        if (item.classNames) {
            classes += ' ' + item.classNames;
        }
        return getPrefixedClassNames(classes, 'ctx-');
    };

    return (
        <>
            <span
                className={classNames(
                    'ctx-isolate ctx-inline-flex ctx-rounded-md ctx-shadow-sm',
                    classes
                )}
            >
                {items.length &&
                    items.map((item, index) => {
                        if (index === 0) {
                            return (
                                <button
                                    id={buttonId++}
                                    onClick={(e) =>
                                        onclickButton(e, toggleElementIndex)
                                    }
                                    type="button"
                                    name={name}
                                    value={item.type}
                                    className={getClassNames(
                                        buttonCSS[0],
                                        item
                                    )}
                                >
                                    {item.text}
                                </button>
                            );
                        } else if (index === items.length - 1) {
                            return (
                                <button
                                    id={buttonId++}
                                    onClick={(e) =>
                                        onclickButton(e, toggleElementIndex)
                                    }
                                    type="button"
                                    value={item.type}
                                    name={name}
                                    className={getClassNames(
                                        buttonCSS['end'],
                                        item
                                    )}
                                >
                                    {item.text}
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    id={buttonId++}
                                    onClick={(e) =>
                                        onclickButton(e, toggleElementIndex)
                                    }
                                    type="button"
                                    value={item.type}
                                    name={name}
                                    className={getClassNames(
                                        buttonCSS['normal'],
                                        item
                                    )}
                                >
                                    {item.text}
                                </button>
                            );
                        }
                    })}
            </span>
        </>
    );
}
