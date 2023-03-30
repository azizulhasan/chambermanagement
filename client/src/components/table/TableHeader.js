import { classNames } from '../../utilities/utilities';
import TableTr from './TableTr';
import TableTh from './TableTh';

export default function TableHeader({ children, classes, headers, thClasses }) {
    return (
        <thead
            className={classNames('ctx-bg-gray-200 ctx-uppercase ', classes)}
        >
            <TableTr classes={'hover:ctx-bg-gray-200 ctx-text-left'}>
                {headers.length &&
                    headers.map((header, index) =>
                        thClasses && thClasses[1] === index ? (
                            <TableTh key={index} classes={thClasses[0]}>
                                {header}{' '}
                            </TableTh>
                        ) : (
                            <TableTh key={index} classes={thClasses}>
                                {header}
                            </TableTh>
                        )
                    )}
            </TableTr>
        </thead>
    );
}
