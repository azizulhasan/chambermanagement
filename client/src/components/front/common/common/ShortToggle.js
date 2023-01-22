import React from 'react'
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ShortToggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="ctx-group ctx-relative ctx-inline-flex ctx-h-5 ctx-w-10 ctx-flex-shrink-0 ctx-cursor-pointer ctx-items-center ctx-justify-center ctx-rounded-full focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-500 focus:ctx-ring-offset-2"
    >
      <span className="ctx-sr-only">Use setting</span>
      <span aria-hidden="true" className="ctx-pointer-events-none ctx-absolute ctx-h-full ctx-w-full ctx-rounded-md ctx-bg-white" />
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'bg-themeColor' : 'bg-gray-200',
          'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
        )}
      />
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
        )}
      />
    </Switch>
  )
}
