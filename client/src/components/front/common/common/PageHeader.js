import { HiOutlineArrowRight } from "react-icons/hi";
import Button from "./button/Button";
import PrimaryButton from "./button/PrimaryButton";
import Table from "./table/Table";
import { HiOutlineMenu, HiTrash, HiPlus } from "react-icons/hi";
import GeneralInput from "./common/GeneralInput"; /*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const people = [
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

export default function PageHeader({}) {
	return (
		<div className="ctx-mt-4">
			<form className="ctx-space-y-8 ctx-divide-y ctx-divide-gray-200 ctx-mb-5 ctx-bg-white ctx-shadow-md sm:ctx-p-4">
				<div className="ctx-space-y-8 ctx-divide-y ctx-divide-gray-200 sm:ctx-space-y-5">
					<div className="ctx-space-y-6 sm:ctx-space-y-5">
						<div className="ctx-space-y-4 sm:ctx-space-y-3">
							<div className="sm:ctx-grid sm:ctx-grid-cols-4 sm:ctx-items-start sm:ctx-gap-4 sm:ctx-pt-3">
								<label
									htmlFor="last-name"
									className="sm:ctx-col-span-2 ctx-block ctx-text-sm ctx-font-medium ctx-text-gray-700 sm:ctx-mt-px sm:ctx-pt-1"
								>
									Attribute Name<span className="ctx-text-red-500 ctx-text-md">*</span>
								</label>
								<div className="ctx-mt-1 sm:ctx-col-span-1 sm:ctx-mt-0">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="ctx-block ctx-w-full ctx-max-w-lg ctx-rounded-md ctx-border-gray-300 ctx-shadow-sm focus:ctx-border-indigo-500 focus:ctx-ring-indigo-500 sm:ctx-max-w-xl sm:ctx-text-sm"
									/>
								</div>
							</div>

							<div className="sm:ctx-grid sm:ctx-grid-cols-4 sm:ctx-items-start sm:ctx-gap-4 sm:ctx-border-t sm:ctx-border-gray-200 sm:ctx-pt-3">
								<label
									htmlFor="last-name"
									className="sm:ctx-col-span-2 ctx-block ctx-text-sm ctx-font-medium ctx-text-gray-700 sm:ctx-mt-px sm:ctx-pt-1"
								>
									Attribute Code<span className="ctx-text-red-500 ctx-text-md">*</span>
								</label>
								<div className="ctx-mt-1 sm:ctx-col-span-1 sm:ctx-mt-0">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="ctx-block ctx-w-full ctx-max-w-lg ctx-rounded-md ctx-border-gray-300 ctx-shadow-sm focus:ctx-border-indigo-500 focus:ctx-ring-indigo-500 sm:ctx-max-w-xl sm:ctx-text-sm"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>

		</div>
	);
}
