import Swal from "sweetalert2";
import Notify from "../components/front/common/Notify";

/**
 *
 * @param config
 * @returns {*&{focusConfirm: boolean, icon: string, showCloseButton: boolean, title: string, showCancelButton: boolean, confirmButtonText: string, cancelButtonText: string}}
 */
export function getSwalOptions(config) {
	return {
		...{
			title: 'Are You Sure?',
			icon: 'warning',
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			confirmButtonText:
				'Confirm',
			cancelButtonText:
				'Cancel',
		},
		...config
	}
}

/**
 *
 * @param config
 */
export function cancelConfirm(config = {}) {
	let options = {
		...config,
		...{
			title: 'Cancelled',
			icon: 'error',
			showCloseButton: false,
			showCancelButton: false,
			focusConfirm: false,
			showConfirmButton: false,
			timer: 900
		}
	}
	ctxSwal.fire(options)
}

/**
 *
 * @param config
 */
export function deleteConfirm(config = {}) {
	let options = {
		...config,
		...{
			title: 'Deleted',
			icon: 'success',
			showCloseButton: false,
			showCancelButton: false,
			focusConfirm: false,
			showConfirmButton: false,
			timer: 900
		}
	}
	ctxSwal.fire(options)
}

/**
 * Design sweetalert
 * @type {{fire: {<T=any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>>, <T=any>(title?: string, html?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult<Awaited<T>>>}, mixin(options: SweetAlertOptions): typeof Swal, isVisible(): boolean, update(options: Pick<SweetAlertOptions, SweetAlertUpdatableParameters>): void, close(result?: Partial<SweetAlertResult>): void, getContainer(): (HTMLElement | null), getPopup(): (HTMLElement | null), getTitle(): (HTMLElement | null), getProgressSteps(): (HTMLElement | null), getHtmlContainer(): (HTMLElement | null), getImage(): (HTMLElement | null), getCloseButton(): (HTMLButtonElement | null), getIcon(): (HTMLElement | null), getIconContent(): (HTMLElement | null), getConfirmButton(): (HTMLButtonElement | null), getDenyButton(): (HTMLButtonElement | null), getCancelButton(): (HTMLButtonElement | null), getActions(): (HTMLElement | null), getFooter(): (HTMLElement | null), getTimerProgressBar(): (HTMLElement | null), getFocusableElements(): readonly HTMLElement[], enableButtons(): void, disableButtons(): void, showLoading(buttonToReplace: (HTMLButtonElement | null)): void, hideLoading(): void, isLoading(): boolean, clickConfirm(): void, clickDeny(): void, clickCancel(): void, showValidationMessage(validationMessage: string): void, resetValidationMessage(): void, getInput(): (HTMLInputElement | null), disableInput(): void, enableInput(): void, getValidationMessage(): (HTMLElement | null), getTimerLeft(): (number | undefined), stopTimer(): (number | undefined), resumeTimer(): (number | undefined), toggleTimer(): (number | undefined), isTimerRunning(): (boolean | undefined), increaseTimer(n: number): (number | undefined), isValidParameter(paramName: string): paramName is keyof SweetAlertOptions, isUpdatableParameter(paramName: string): paramName is SweetAlertUpdatableParameters, argsToParams<T>(params: (SweetAlertArrayOptions | readonly [SweetAlertOptions<T>])): SweetAlertOptions<T>, DismissReason: DismissReason, version: string}}
 */
export const ctxSwal = Swal.mixin({
	customClass: {
		confirmButton: 'ctx-inline-flex ctx-items-center ctx-border ctx-border-transparent ctx-shadow-sm ctx-font-medium focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2 ctx-rounded ctx-px-3 ctx-py-2 -ctx-ml-2 ctx-mr-2 ctx-text-sm ctx-bg-themeColor ctx-text-white hover:ctx-bg-themeColor',
		cancelButton: 'ctx-inline-flex ctx-items-center ctx-border ctx-border-transparent ctx-shadow-sm ctx-font-medium focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2 ctx-rounded ctx-px-3 ctx-py-2 ctx-text-sm ctx-bg-red-700 ctx-text-white hover:ctx-bg-red-700',
		closeButton: ' focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2 ctx-bg-red-700 ctx-text-white hover:ctx-bg-red-700 '
	},
	buttonsStyling: false
})


export const notify = ({ message = '' }) => {
	if (message) {
		<Notify display={true} message={message} />
	}
}
