import { FcInfo } from "react-icons/fc"
import { HiExclamation } from "react-icons/hi"

/*
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
const notificationMethods = [
    { id: 'yes', title: 'Yes', label:'Remove On Backorder Products' },
    { id: 'no', title: 'No', label:'Remove On Backorder Products' },

  ]

  export default function RadioGroup() {
    return (
      <div>
       <fieldset className="">
          <legend className="ctx-sr-only">Notification method</legend>
          <div className="ctx-space-y-4 sm:ctx-flex sm:ctx-items-center sm:ctx-space-y-0 sm:ctx-space-x-10">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="ctx-flex ctx-items-center">
                <input
                  id={notificationMethod.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={notificationMethod.id === 'email'}
                  className="ctx-h-4 ctx-w-4 ctx-border-gray-300 ctx-text-themeColor focus:ctx-ring-indigo-500"
                />
                <label htmlFor={notificationMethod.id} className="ctx-ml-3 ctx-block ctx-text-sm ctx-font-medium ctx-text-gray-700">
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }
