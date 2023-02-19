import React from "react";
import WooFeedLogo from "../../assets/img/woo-feed-icon.svg";
import {
	FaYoutube,
	FaBook,
} from "react-icons/fa";
import Button from "../button/Button";
import { HiSupport } from "react-icons/hi";

export default function LinkBar() {
	return (
		<div className="ctx-inset-x-0 ctx-bottom-0 ctx-pb-2 sm:ctx-pb-5">
			<div className="ctx-rounded-lg ctx-bg-white ctx-border ctx-p-2 ctx-shadow-lg sm:ctx-p-3">
				<div className="ctx-flex ctx-flex-wrap ctx-items-center ctx-justify-between">
					<div className="ctx-flex ctx-w-0 ctx-flex-1 ctx-items-center">
						<img src={WooFeedLogo} alt="CTX-Feed" />

						<p className="ctx-ml-3 ctx-truncate ctx-font-medium  ctx-text-slate-700">
							<span className="md:ctx-inline ctx-text-xl">CTX Feed</span>
						</p>
					</div>

					<div className="ctx-order-2 ctx-flex-shrink-0 sm:ctx-order-3 sm:ctx-ml-2">
						<a
							target="_blank"
							href={
								"https://webappick.com/docs/?utm_source=proPlugin&utm_medium=pro_plugin_doc&utm_campaign=pro&utm_term=wooFeedv"
							}
						>
							<Button
								onClick={() => {
									console.log("checked");
								}}
								buttonStyle={"buttonThree"}
								classNames="!ctx-bg-slate-600 ctx-text-white transition duration-300 ease-in-out  focus:ctx-outline-none  ctx-rounded-r-none "
								iconPosition={"before"}
								addBgColor={false}

								icon={
									<FaBook
										className="ctx-h-4 ctx-w-4 ctx-mr-2"
										aria-hidden="true"
									/>
								}
							>
								Documentation
							</Button>
						</a>
						<Button
							onClick={() => {
								window.open(
									"https://www.youtube.com/playlist?list=PLapCcXJAoEenI-35wc6YnnsAAgoYRxDr7",
									"_blank"
								);
							}}
							buttonStyle={"buttonThree"}
							classNames="!ctx-bg-red-500 ctx-text-white  transition duration-300 ease-in-out hover:ctx-text-white ctx-rounded-none focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-red-500 focus:ctx-bg-red-500 focus:ctx-ring-offset-0"
							iconPosition={"before"}
							addBgColor={false}
							icon={
								<FaYoutube
									className="ctx-h-4 ctx-w-4 ctx-mr-2"
									aria-hidden="true"
								/>
							}
						>
							Video Tutorials
						</Button>
						<Button
							onClick={() => {
								window.open(
									"https://wordpress.org/support/plugin/webappick-product-feed-for-woocommerce/",
									"_blank"
								);
							}}
							buttonStyle={"buttonThree"}
							classNames="!ctx-bg-cyan-500 ctx-text-white transition duration-300 ease-in-out hover:ctx-text-white ctx-rounded-l-none focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-cyan-500 focus:ctx-bg-cyan-500 focus:ctx-ring-offset-0"
							iconPosition={"before"}
							addBgColor={false}
							icon={
								<HiSupport
									className="ctx-h-4 ctx-w-4 ctx-mr-2"
									aria-hidden="true"
								/>
							}
						>
							Get Support
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
