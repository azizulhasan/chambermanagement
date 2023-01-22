import React, {useState} from "react";
import {
	TableTr,
	TableTd,
} from "../table/Table";

export default function Loader({
								   row = 5,
								   col = 3,
								   columnWidth = [],
								   columnHeight = [],
								   tdClasses = [],
									loaderHtml= ''
							   }) {

	const getLoaderHtml = ( heightClass, widthClass ) => {
		return <div className={["ctx-bg-slate-200 dark:ctx-bg-slate-700 ctx-rounded-full", heightClass, widthClass ].join(' ')}></div>;
	}

	const generateTable = () => {
		let table = [];
		for (let i = 0; i < row; i++) {
			let children = [];
			let heightClass = "";
			if (columnHeight[i]) {
				heightClass = "ctx-h-" + columnHeight[i];
			} else {
				heightClass = "ctx-h-4";
			}

			for (let j = 0; j < col; j++) {
				let widthClass = "";
				if (columnWidth[j]) {
					widthClass =  columnWidth[j];
				} else {
					widthClass = "ctx-w-32";
				}
				let tdClass = '';
				if(j === tdClasses[1]){
					tdClass = tdClasses[0]
				}
				children.push(
					<TableTd classes={["ctx-px-1", tdClass].join(' ')}>
						{loaderHtml? loaderHtml : getLoaderHtml( heightClass, widthClass)}
					</TableTd>
				);
			}
			table.push(
				<TableTr key={i} classes="ctx-w-full animate-pulse">
					{children}
				</TableTr>
			);
		}
		return table;
	};

	return (
		generateTable()
	);
}
