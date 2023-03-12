/*
  This is the dropdown selector component
*/

import { useState } from 'react';
import { HiCheck, HiOutlineSelector } from 'react-icons/hi';
import { Combobox } from '@headlessui/react';

// Data set for the dropdown selector

const people = [
    { id: 1, name: 'Leslie Alexander' },
    { id: 2, name: 'Alexander' },
    { id: 2, name: 'Test 3' },
    { id: 2, name: 'Test4' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function GeneralInput() {
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState([]);

    //   Filter Data query

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });
    return (
        <Combobox
            as="div"
            value={selectedPerson}
            onChange={setSelectedPerson}
            multiple
        >
            {/* Dropdown Input field   */}
            <div className="ctx-relative ctx-z-auto">
                <Combobox.Input
                    className="ctx-block ctx-w-full ctx-max-w-lg ctx-rounded-md ctx-border-gray-300 ctx-shadow-sm focus:ctx-border-indigo-500 focus:ctx-ring-indigo-500 sm:ctx-max-w-xs sm:ctx-text-sm"
                    displayValue={(people) =>
                        people.map((person) => person.name).join(', ')
                    }
                />
                <Combobox.Button className="ctx-absolute ctx-inset-y-0 ctx-right-0 ctx-flex ctx-items-center ctx-rounded-r-md  focus:ctx-outline-none">
                    <HiOutlineSelector
                        className="ctx-h-5 ctx-w-5 ctx-text-gray-400 "
                        aria-hidden="true"
                    />
                </Combobox.Button>

                {/* Data mapping from the data set  */}
                <Combobox.Options className="ctx-absolute ctx-z-10 ctx-mt-1 ctx-max-h-60 ctx-block ctx-w-full ctx-max-w-lgoverflow-auto ctx-rounded-md ctx-bg-white ctx-py-1 ctx-text-base ctx-shadow-lg ctx-ring-1 ctx-ring-black ctx-ring-opacity-5 focus:ctx-outline-none sm:ctx-text-sm">
                    {people.map((person) => (
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
            </div>
        </Combobox>
    );
}
