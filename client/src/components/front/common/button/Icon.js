import {Component, lazy, Suspense} from "react";
// import * as SoloIcon from "@heroicons/react/solid";
import * as OutlineIcon from "@heroicons/react/24/outline";




// export default function Icon( iconName = 'XMarkIcon ', folder = 'solid') {
// 	const icon  = lazy(()=> import("@heroicons/react/20/"+folder+"/"+iconName))
// 	return <icon/>;
// }

const loadIcon = ( iconName = 'XMarkIcon ', folder = 'solid') => {
	 const {  XMarkIcon }  = lazy(()=> import('@heroicons/react/24/solid'))
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<XMarkIcon className="ctx-ml-0.ctx-5 ctx-mr-2 ctx-h-4 ctx-w-4" aria-hidden="true" />
		</Suspense>
	);
}
export default  loadIcon
