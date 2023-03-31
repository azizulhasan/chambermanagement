import { classNames } from '../../utilities/utilities';

export default function TableBody({ children, id, classes = '' }) {
    return (
        <tbody id={id} className={classNames('ctx-bg-white', classes)}>
            {children}
        </tbody>
    );
}
