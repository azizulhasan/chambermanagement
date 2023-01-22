import {classNames} from "../../utilities/utilities";

export default function TableTd({children, classes, key='', onClick}) {
	return (<td key={key} onClick={onClick} className={classNames('ctx-py-3 ctx-text-sm ctx-text-gray-700', classes)} >{children}</td>);
}
