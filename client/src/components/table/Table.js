import { classNames } from '../../utilities/utilities';
import TableHeader from './TableHeader';
import TableTd from './TableTd';
import TableTh from './TableTh';
import TableBody from './TableBody';
import TableTr from './TableTr';

export default function Table({
    children,
    id,
    headers = [],
    classes = '',
    thClasses = '',
}) {
    return (
        <table
            id={id}
            className={classNames(
                'w-full text-sm text-left text-gray-500 dark:text-gray-400',
                classes
            )}
        >
            {/*Advanced Filter table head  */}
            {headers.length ? (
                <TableHeader
                    headers={headers}
                    thClasses={thClasses}
                    classes={'pl-2'}
                />
            ) : null}
            {children}
        </table>
    );
}

export { TableHeader, TableBody, TableTr, TableTd, TableTh };
