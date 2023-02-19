
import {__} from '@wordpress/i18n'
import {TableTd} from "../table/Table";

export const NotFound = ({children, title = __('No Data Found')}) => {
	return <>
		{
			children ? children : <>
				<TableTd>
					<span className="ctx-sr-only"></span>
				</TableTd>
				<TableTd>
					<h1>{title}</h1>
				</TableTd>
				<TableTd>
					<span className="ctx-sr-only"></span>
				</TableTd>
			</>
		}
	</>
};
