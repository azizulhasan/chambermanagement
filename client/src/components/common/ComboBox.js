import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { HiCheck, HiOutlineSelector } from 'react-icons/hi';

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

export default function ComboBox() {
    const [selected, setSelected] = useState(people[0]);
    const [query, setQuery] = useState('');

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''))
              );

    return (
        <div className="">
            <Combobox value={selected} onChange={setSelected}>
                <div className="ctx-relative ctx-mt-1">
                    <div className="ctx-relative ctx-z-auto ctx-w-full ctx-cursor-default ctx-overflow-hidden ctx-rounded-sm ctx-text-left ctx-text-gray-400 focus:ctx-outline-none focus-visible:ctx-ring-2 focus-visible:ctx-ring-white focus-visible:ctx-ring-opacity-75 focus-visible:ctx-ring-offset-2 focus-visible:ctx-ring-offset-teal-300 sm:ctx-text-sm">
                        <Combobox.Input
                            className="ctx-w-full ctx-max-w-xl sm:ctx-max-w-xl ctx-border-none ctx-py-2 ctx-pl-3 ctx-pr-10 ctx-text-sm ctx-leading-5 ctx-text-gray-400 focus:ctx-ring-0"
                            displayValue={(person) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="ctx-absolute ctx-inset-y-0 ctx-right-0 ctx-flex ctx-items-center">
                            <HiOutlineSelector
                                className="ctx-h-5 ctx-w-5 ctx-text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="ctx-absolute ctx-z-10 ctx-mt-1 ctx-max-h-60 ctx-w-full ctx-overflow-auto ctx-rounded-md ctx-bg-white ctx-py-1 ctx-text-base ctx-shadow-lg ctx-ring-1 ctx-ring-black ctx-ring-opacity-5 focus:ctx-outline-none sm:ctx-text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="ctx-relative ctx-cursor-default ctx-select-none ctx-py-2 ctx-px-4 ctx-text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? 'bg-teal-600 text-white'
                                                    : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? 'text-white'
                                                                : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <HiCheck
                                                            className="ctx-h-5 ctx-w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
