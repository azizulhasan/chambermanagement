import { classNames } from '../../utilities/utilities';

export default function TableTh({ children, classes, key }) {
    return (
        <th key={key} scope="col" className={classNames('ctx-py-3', classes)}>
            {children}
        </th>
    );
}
