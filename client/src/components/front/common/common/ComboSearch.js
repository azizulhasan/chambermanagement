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
import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { HiCheck } from 'react-icons/hi';

const people = [
    { id: 1, name: 'Leslie Alexander' },
    { id: 1, name: 'Leslie Alexander' },
    { id: 1, name: 'Leslie Alexander' },
    { id: 1, name: 'Leslie Alexander' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ComboSearch() {
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
            <div className=" ctx-mt-1">
                <Combobox.Input
                    className="ctx-block sm:ctx-w-72 ctx-max-w-lg ctx-rounded-md ctx-border ctx-border-gray-300 ctx-bg-white ctx-py-2 ctx-pl-3 ctx-pr-10 ctx-shadow-sm focus:ctx-border-indigo-500 focus:ctx-outline-none focus:ctx-ring-1 focus:ctx-ring-indigo-500 sm:ctx-max-w-xs sm:ctx-text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person) => person?.name}
                />
                {/* <Combobox.Button className="ctx-absolute ctx-inset-y-0 ctx-right-0 ctx-flex ctx-items-center ctx-rounded-r-md ctx-px-2 focus:ctx-outline-none">
          <ChevronUpDownIcon className="ctx-h-5 ctx-w-5 ctx-text-gray-400" aria-hidden="true" />
        </Combobox.Button> */}

                {filteredPeople.length > 0 && (
                    <Combobox.Options className="ctx-absolute ctx-z-auto ctx-mt-1 ctx-max-h-60 ctx-w-full ctx-overflow-auto ctx-rounded-md ctx-bg-white ctx-py-1 ctx-text-base ctx-shadow-lg ctx-ring-1 ctx-ring-black ctx-ring-opacity-5 focus:ctx-outline-none sm:ctx-text-sm">
                        {filteredPeople.map((person) => (
                            <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active
                                            ? 'bg-themeColor text-white'
                                            : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                'block truncate',
                                                selected && 'font-semibold'
                                            )}
                                        >
                                            {person.name}
                                        </span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active
                                                        ? 'text-white'
                                                        : 'text-themeColor'
                                                )}
                                            >
                                                <HiCheck
                                                    className="ctx-h-5 ctx-w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}
