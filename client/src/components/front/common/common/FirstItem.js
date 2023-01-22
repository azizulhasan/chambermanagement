
import {__} from '@wordpress/i18n'
import {PlusIcon as PlusIconOutline} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {TableTd} from "../table/Table";
import {clearSingleAttribute} from "../../store/dynamicAttributesSlice";
import {defaultSingleAttribute} from "../../utilities/data";
import {openModal} from "../../store/modalSlice";
import Button from "../button/Button";

export const FirstItem = ({children, title = __('No Data Found')}) => {
	const dispatch = useDispatch()
	return <>
		{
			children ? children : <>
				<TableTd>
					<span className="ctx-sr-only"></span>
				</TableTd>
				<TableTd classes={''}>
					<div style={{'box-shadow': '0 3px 10px rgb(0 0 0 / 0.2)'}} className="ctx-flex ctx-translate-x-1/3 ctx-w-96 ctx-bg-white ctx-py-2 ctx-my-3">
						<div className="ctx-bg-white ctx-max-w-sm ctx-text-center">
							<svg
								className="ctx-mx-auto  ctx-h-12 ctx-w-12 ctx-text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									vectorEffect="non-scaling-stroke"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
								/>
							</svg>
							<h3 className="ctx-mt-2 ctx-text-sm ctx-font-medium ctx-text-gray-900">Create your first dynamic attribute</h3>
							<p className="ctx-mt-1 ctx-text-sm ctx-text-gray-500 ctx-py-2">Using Dynamic Attribute you can modify or change your product information easily with conditions.</p>
							<Button
								onClick={() => {
									dispatch(clearSingleAttribute(defaultSingleAttribute))
									dispatch(openModal({displayModal: true, addNew: true}));
								}}
								style={{"whiteSpace": "nowrap"}}
								buttonStyle={'buttonOne'}
								iconPosition={"before"}
								classNames={'ctx-mb-2 '}
								icon={
									<PlusIconOutline
										className="ctx-h-4 ctx-w-4"
										aria-hidden="true"
									/>
								}
							>
								Add New Dynamic Attribute
							</Button>
						</div>
					</div>
				</TableTd>
				<TableTd>
					<span className="ctx-sr-only"></span>
				</TableTd>
			</>
		}
	</>
};
