import {classNames} from "../../utilities/utilities";
import TableHeader from "./TableHeader";
import TableTd from "./TableTd";
import TableTh from "./TableTh";
import TableBody from "./TableBody";
import TableTr from "./TableTr";

export default function Table({children, id, headers = [], classes = '', thClasses = ''}) {
	return (
		<table id={id} className={classNames('ctx-w-full ctx-text-sm ctx-text-left ctx-text-gray-500 dark:ctx-text-gray-400', classes)}>
			{/*Advanced Filter table head  */}
			{
				headers.length ? <TableHeader headers={headers} thClasses={thClasses} classes={'ctx-pl-2'}/> : null
			}
			{children}
		</table>
	);
}

export {
	TableHeader,
	TableBody,
	TableTr,
	TableTd,
	TableTh,
}
