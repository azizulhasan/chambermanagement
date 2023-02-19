import {classNames} from "../../utilities/utilities";

export default function TableTr({children, classes, key='', draggable = false, onDragEnd= null, onDragOver = null, onDragStart= null}) {
	return (<tr draggable={draggable}
				onDragOver={onDragOver && onDragOver}
				onDragStart={onDragStart && onDragStart}
				onDragEnd={onDragEnd && onDragEnd}
				key={key} className={classNames('hover:ctx-bg-gray-50', classes)} >{children}</tr>);
}
