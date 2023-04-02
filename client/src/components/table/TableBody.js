import { classNames } from '../../utilities/utilities';

export default function TableBody({ children, id, classes = '' }) {
    return (
        <tbody id={id} className={classNames('bg-white', classes)}>
            {children}
        </tbody>
    );
}
