import { classNames } from '../../utilities/utilities';

export default function TableTd({ children, classes, key = '', onClick }) {
    return (
        <td
            key={key}
            onClick={onClick}
            className={classNames(
                'py-3 text-sm text-gray-700',
                classes
            )}
        >
            {children}
        </td>
    );
}
