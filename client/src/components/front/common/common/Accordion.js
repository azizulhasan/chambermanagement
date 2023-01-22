import React, {useState} from "react"
import {
	FaArrowUp, FaArrowDown,
} from "react-icons/fa";
import {NotFound} from "./NotFound";


export const Accordion = ({ contentId,title='', content = null, classes = ''}) => {
	const [isOpened, setOpened] = useState(true)
	const HandleOpening = (e) => {
		if (e.target.nodeName === 'H4' || e.target.nodeName === 'DIV' || e.target.nodeName === 'svg') {
			let content = document.getElementById(contentId);
			content.style.height = isOpened ? '0px' : `${content.scrollHeight}px`;
			setOpened(!isOpened)
		}
	}
	return (
		<>
			<div className={classes} onClick={HandleOpening}>
				<div
					className="ctx-text-gray-600 ctx-bg-gray-200 hover:ctx-bg-gray-200 hover:ctx-cursor-pointer ctx-p-3 ctx-flex ctx-justify-between ">
					<h4 style={{display: 'inline'}} className="ctx-font-semibold">{title}</h4>
					{isOpened ? <FaArrowDown style={{height: '20px', float: 'right'}}/> :
						<FaArrowUp style={{height: '20px', float: 'right'}}/>}
				</div>
				{content ? content : <NotFound/>}
			</div>
		</>
	);
};
