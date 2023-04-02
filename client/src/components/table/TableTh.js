import { classNames } from '../../utilities/utilities';

export default function TableTh({ children, classes, key }) {
    return (
        <th key={key} scope="col" className={classNames('py-3', classes)}>
            {children}
        </th>
    );
}
