import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { classNames } from '../../utilities/utilities';

export default function Toggle() {
    const [enabled, setEnabled] = useState(false);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className="ctx-group ctx-relative ctx-inline-flex ctx-h-5 ctx-w-10 ctx-flex-shrink-0 ctx-cursor-pointer ctx-items-center ctx-justify-center ctx-rounded-full focus:ctx-outline-none focus:ctx-ring-2 focus:ctx-ring-indigo-600 focus:ctx-ring-offset-2"
        >
            <span className="ctx-sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className="pointer-events-none ctx-absolute ctx-h-full ctx-w-full ctx-rounded-md ctx-bg-white"
            />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'ctx-bg-themeColor' : 'bg-gray-200',
                    'pointer-events-none ctx-absolute ctx-mx-auto ctx-h-4 ctx-w-9 ctx-rounded-full ctx-transition-colors ctx-duration-200 ctx-ease-in-out ctx-ring-1 ctx-ring-indigo-200'
                )}
            />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'ctx-translate-x-5' : 'ctx-translate-x-0',
                    'pointer-events-none ctx-absolute ctx-left-0 ctx-inline-block ctx-h-5 ctx-w-5 ctx-transform ctx-rounded-full ctx-border ctx-border-gray ctx-bg-white ctx-ring-1 ctx-ring-indigo-200 ctx-transition-transform ctx-duration-200 ctx-ease-in-out'
                )}
            />
        </Switch>
    );
}
