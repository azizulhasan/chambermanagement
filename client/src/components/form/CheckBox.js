export default function CheckBox({ children, label = 'Default Checkbox' }) {
    return (
        <div className="flex items-center mb-4 justify-center pt-4">
            <input id="tems_and_conditions" type="checkbox" value="" className="w-4 h-4 text-themeColor bg-gray-100 border-gray-300 rounded dark:focus:ring-themeColor dark:ring-offset-themeColor focus:ring-2 dark:bg-themeColor dark:border-themeColor" />
            <label htmlFor="tems_and_conditions" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    );
}
