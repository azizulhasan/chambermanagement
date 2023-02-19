import {ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/20/solid'

const Pagination = () => {
	return (
		<nav
			className="ctx-flex ctx-items-center ctx-justify-between ctx-border-t ctx-border-gray-200 ctx-px-4 sm:ctx-px-0 ctx-mt-3">
			<div className="ctx--mt-px ctx-flex ctx-w-0 ctx-flex-1 ctx-pl-4">
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-pt-4 ctx-pr-1 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					<ArrowLongLeftIcon className="ctx-mr-3 ctx-h-5 ctx-w-5 ctx-text-gray-400" aria-hidden="true"/>
					Previous
				</a>
			</div>
			<div className=" md:ctx--mt-px md:ctx-flex">
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					1
				</a>
				{/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-indigo-500 ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-indigo-600"
					aria-current="page"
				>
					2
				</a>
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					3
				</a>
				<span
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500">
          ...
        </span>
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					8
				</a>
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					9
				</a>
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-px-4 ctx-pt-4 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					10
				</a>
			</div>
			<div className="ctx--mt-px ctx-flex ctx-w-0 ctx-flex-1 ctx-justify-end ctx-pr-6">
				<a
					href="wp-content/plugins/webappick-product-feed-for-woocommerce-pro/libs/webappick-product-feed-for-woocommerce/V5/src/components/common/Pagination#"
					className="ctx-inline-flex ctx-items-center ctx-border-t-2 ctx-border-transparent ctx-pt-4 ctx-pl-1 ctx-text-sm ctx-font-medium ctx-text-gray-500 hover:ctx-border-gray-300 hover:ctx-text-gray-700"
				>
					Next
					<ArrowLongRightIcon className="ctx-ml-3 ctx-h-5 ctx-w-5 ctx-text-gray-400" aria-hidden="true"/>
				</a>
			</div>
		</nav>
	);
};

export default Pagination;
