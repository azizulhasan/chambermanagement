import React, { useState } from "react";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import {classNames} from "../../utilities/utilities";



export default  function ComboBoxMultiSelect({size, items = [], classes}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState([]);

  function isSelected(value) {
    return selectedPersons.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedPersons,
        items.find((el) => el === value)
      ];
      setSelectedPersons(selectedPersonsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedPersons.filter((el) => el !== value);
    setSelectedPersons(selectedPersonsUpdated);
    setIsOpen(true);
  }

  return (
    <div className="ctx-flex ctx-items-center ctx-justify-center">
      <div className={classNames( "ctx-w-48", classes)} >
        <Listbox
          as="div"
          className="ctx-space-y-1"
          value={selectedPersons}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>

              <div className="ctx-relative">
                <div className="ctx-z-auto ctx-inline-block ctx-w-full ctx-rounded-md ctx-shadow-sm">
                  <Listbox.Button
                    className=" z-0 ctx-cursor-default ctx-relative ctx-w-full ctx-h-8 ctx-rounded-md ctx-border ctx-border-gray ctx-bg-white ctx-px-2 ctx-py-2 ctx-text-left focus:ctx-outline-none focus:ctx-shadow-outline-blue focus:ctx-border-gray-900 ctx-transition ctx-ease-in-out ctx-duration-150 sm:ctx-text-sm sm:ctx-leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                    open={isOpen}
                  >
                    <span className="-mt-1 ctx-block ctx-truncate ctx-text-xs sm:ctx-w-24 ctx-mr-20 ctx-px-2 ctx-rounded ctx-text-gray ctx-top-1 ctx-left-0 -translate-y-0 -translate-x-0">
                      {selectedPersons.length > 0 && (
                        <>{selectedPersons.join(", ")}</>
                      )}
                    </span>
                    <span className="ctx-text-xs ctx-absolute ctx-bg-gray ctx-mr-6 ctx-px-2 ctx-rounded ctx-text-black ctx-top-2 ctx-right-0 -translate-y-0 -translate-x-0">
                      {selectedPersons.length < 1
                        ? ""
                        : `include(${selectedPersons.length})`}
                    </span>
                    <span className="ctx-block ctx-truncate ctx-relative"></span>
                    <span className="ctx-absolute ctx-inset-y-0 ctx-right-0 ctx-flex ctx-items-center ctx-r-2 ctx-pointer-events-none">
					  <HiChevronUpDown className="ctx-h-5 ctx-w-5"/>
                    </span>
                  </Listbox.Button>
                </div>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="ctx-transition ctx-ease-in ctx-duration-100"
                  leaveFrom="ctx-opacity-100"
                  leaveTo="ctx-opacity-0"
                  className="ctx-z-50 ctx-absolute ctx-mt-1 ctx-w-full rctx-ounded-md ctx-bg-white ctx-shadow-lg"
                >
                  <Listbox.Options
                    static
                    className=" ctx-z-50 ctx-max-h-60 ctx-rounded-md ctx-py-1 ctx-text-base ctx-leading-6 ctx-shadow-xs ctx-overflow-auto focus:ctx-outline-none sm:ctx-text-sm sm:ctx-leading-5"
                  >
                    {items.map((person) => {
                      const selected = isSelected(person);
                      return (
                        <Listbox.Option key={person} value={person}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "ctx-text-white ctx-bg-blue-600"
                                  : "ctx-text-gray-900"
                              } ctx-cursor-default ctx-select-none ctx-relative ctx-py-2 ctx-pl-8 ctx-pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? "ctx-font-semibold" : "ctx-font-normal"
                                } ctx-block ctx-truncate`}
                              >
                                {person}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "ctx-text-white" : "ctx-ext-blue-600"
                                  } ctx-absolute ctx-inset-y-0 ctx-left-0 ctx-flex ctx-items-center ctx-pl-1.5`}
                                >
                                  <svg
                                    className="ctx-h-5 ctx-w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                {/* <div className="pt-1 text-sm">
                  {selectedPersons.length > 0 && (
                    <>Selected persons: {selectedPersons.join(", ")}</>
                  )}
                </div> */}
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}
