import { toggleClassNames } from "./utilities";

const buttonGroupClick = (e) => {
	toggleClassNames(
		e.target,
		e.target.parentNode,
		["ctx-isActive"],
		"ctx-isActive"
	);
};
export const buttonGroup = [
	{
		text: "AND",
		isActive: true,
		value: 1,
		classNames: "",
		onClick: buttonGroupClick,
	},
	{
		text: "OR",
		isActive: false,
		value: 2,
		classNames: "",
		onClick: buttonGroupClick,
	},
	{
		text: "BOTH",
		isActive: false,
		value: 3,
		classNames: "",
		onClick: buttonGroupClick,
	},
];

export const configButtonGroupItems = [
	{
		text: "Attribute",
		isActive: true,
		value: "attribute",
		classNames: "",
	},
	{
		text: "Pattern",
		isActive: false,
		value: "pattern",
		classNames: "",
	},
];
export const filterButtonGroupItems = [
	{
		text: "Include",
		isActive: true,
		value: 2,
		classNames: "",
		onClick: buttonGroupClick,
	},
	{
		text: "Exclude",
		isActive: false,
		value: 3,
		classNames: "",
		onClick: buttonGroupClick,
	},
];


export const objectOptions = [
	{
		name: "data",
		value: "Data",
	},
	{
		name: "data2",
		value: "Data2",
	},
];

export const arrayOptions = [
	"data",
	"data2",
	"data3",
	"data4",
	"data5",
	"data6",
	"data7",
	"data8",
	"data9",
	"data10",
	"data11",
	"data12",
];

export const people = [
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
	{
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Member",
	},
];


export const channels = [
	{
		channel: "Google",
		name: "Google Shopping",
		file_type: "XML",
		file_url: "https://google.com/woo-feed/google.xml",
		updated: "2022-11-01 09:44:52",
		feed_id: "111",
	},
	{
		channel: "Facebook",
		name: "Facebook Catalog",
		file_type: "TXT",
		file_url: "https://google.com/woo-feed/google.xml",
		updated: "2022-11-01 09:44:52",
		feed_id: "222",
	},
	{
		channel: "Pinterest",
		name: "Pinterest Catalog",
		file_type: "CSV",
		file_url: "https://google.com/woo-feed/google.xml",
		updated: "2022-11-01 09:44:52",
		feed_id: "333",
	},
	{
		channel: "Tiktok",
		name: "Tiktok Catalog",
		file_type: "JSON",
		file_url: "https://google.com/woo-feed/google.xml",
		updated: "2022-11-01 09:44:52",
		feed_id: "444",
	}, // More people...
];

export const manageFeedHeader = [
	"Auto Update",
	"Feed Name",
	"Channel",
	"File Type",
	"Feed URL",
	"Last Updated",
	"Action",
];

export const configHeader = [
	"",
	"GoogleAttributes",
	"Prefix",
	"Type",
	"Value",
	"Suffix",
	"Output Type",
	"Command",
	"",
];
export const attributeMappingHeader = [
	"",
	"Attribute Name",
	"Preview",
	"Action",
];

export const categoryMappingHeader = [
	"",
	"Category Mapping Name",
	"Template",
	"Action",
];
export const wpOptionHeader = ["", "Option Name", "Option Value", "Action"];
export const comboboxOutput = [
	{
		name: "data",
		value: "Data",
	},
	{
		name: "data2",
		value: "Data2",
	},
];

export const endpoints = {
	dynamicAttributes: "dynamic_attributes",
	dropdownOptions: "drop_down",
};
export const filterData = [
	{
		filterTitle: "Remove On Backorder Products",
		info: "Select Yes to exclude On Backorder products.",
	},
	{
		filterTitle: "Remove Out Of Stock Products",
		info: "Select Yes to exclude Out-Of-Stock products.",
	},
	{
		filterTitle: "Include Hidden Products",
		info: "Select Yes to include hidden products.",
	},
	{
		filterTitle: "Remove Empty Description Products",
		info: "lSelect Yes to exclude empty description products.",
	},
	{
		filterTitle: "Remove Empty Image Products",
		info: "Select Yes to exclude empty image products.",
	},
	{
		filterTitle: "Remove Empty Price Products",
		info: "Select Yes to exclude empty price products.",
	},
];

export const defaultSingleAttribute = {
	"_wpnonce": "",
	"wfDAttributeName": "",
	"wfDAttributeCode": "",
	"attribute": [
		"0",
	],
	"condition": [
		"==",
	],
	"compare": [
		"",
	],
	"type": [
		"attribute",
	],
	"prefix": [
		"",
	],
	"value_attribute": [
		"0",
	],
	"value_pattern": ["",],
	"suffix": [
		"",
	],
	"default_type": "attribute",
	"default_value_attribute": "0",
	"default_value_pattern": "",
	"add-attribute": ""
}

export const dynamicAttrTitle = [
	{
		label: "Attribute Name",
		name: "wfDAttributeName",
	},
	{
		label: "Attribute Code",
		name: "wfDAttributeCode",
	}
]
