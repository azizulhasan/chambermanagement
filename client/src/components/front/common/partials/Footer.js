import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../../../database';

/**
 *
 * Utilities
 */
import { addCSS, getData } from '../../../../utilities/utilities';

const {
    basic: {
        trademark: {
            texts: { title, subTitle },
            logo: { image },
        },
    },
    footer: { sectionsOrder, socialMediaLinks, menus },
} = database;

export default function Footer() {
    addCSS(['/assets/front/css/footer.css']);

    const divider = sectionsOrder.length;

    const sectionWidth =
        '[&>*]:w-full sm:[&>*]:max-w-[33%] md:[&>*]:max-w-[' +
        Math.floor(100 / divider) +
        '%] md:[&>*]:px-4';

    return (
        <div>
            <footer
                aria-label="Site Footer"
                className="bg-themeColor w-full pt-5"
            >
                <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-6 sm:px-6 lg:px-2 lg:pt-5">
                    <div
                        className={`flex  justify-center flex-wrap gap-12 md:gap-0 md:flex-row sm:justify-around ${sectionWidth}`}
                    >
                        {sectionsOrder.map((section, index) => {
                            return section === 'Trademark' ? (
                                <div
                                    key={index}
                                    className=" flex flex-col md:items-start justify-center"
                                >
                                    <div className="flex flex-shrink-0 justify-center items-center font-medium text-white">
                                        <img
                                            className="block h-16 w-auto"
                                            src={image}
                                            alt="Mind To Heart"
                                        />
                                        <div>
                                            <div className="font-semibold">
                                                {title}
                                            </div>
                                            <div className="text-sm">
                                                {subTitle}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                                        <div>
                                            <h4 className="text-2xl font-semibold text-center mb-6 text-white">
                                                Follow Us
                                            </h4>
                                            <div className="icons">
                                                {socialMediaLinks.map(
                                                    ({ name, link, icon }, i) => (
                                                        <a
                                                            href={link}
                                                            className={`icon icon--${name.toLowerCase()}`}
                                                            key={i}
                                                        >
                                                            <i
                                                                className={icon}
                                                            ></i>
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="text-center sm:text-left"
                                    key={index}
                                >
                                    <p className="text-lg font-medium text-white pb-4 text-capitalize">
                                        {section}
                                    </p>
                                    <nav aria-label="">
                                        <ul className="space-y-3 text-sm">
                                            {menus[
                                                section
                                                    .split(' ')
                                                    .map((word, index) => {
                                                        return index === 0
                                                            ? word.toLowerCase()
                                                            : word;
                                                    })
                                                    .join('')
                                            ].map(
                                                ({ name, link, icon }) => {
                                                    return (
                                                        <li key={name}>
                                                            {link ? (
                                                                <Link
                                                                    className="inline-block text-white  transition hover:text-white/75"
                                                                    to={
                                                                        link
                                                                    }
                                                                >
                                                                    {name}
                                                                </Link>
                                                            ) : null}
                                                            {icon ? (
                                                                <div className="flex items-start justify-center gap-1.5 sm:justify-start">
                                                                    {icon()}
                                                                    <span className="text-white">
                                                                        {
                                                                            name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ) : null}
                                                            {link &&
                                                                icon ? (
                                                                <div className="flex items-start justify-center gap-1.5 sm:justify-start">
                                                                    {icon()}
                                                                    <Link
                                                                        className="inline-block text-white  transition hover:text-white/75"
                                                                        to={
                                                                            link
                                                                        }
                                                                    >
                                                                        {
                                                                            name
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            ) : null}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </footer>
        </div>
    );
}
