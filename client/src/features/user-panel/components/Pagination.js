import React, { useEffect, useState } from 'react';

const Pagination = ({
    pageNumbers,
    currentPage,
    setCurrentPage,
    setIndexOfFirstRow,
    setIndexOfLastRow,
    rowsPerPage,
}) => {
    const pageCommonStyle =
        'px-3 h-full flex items-center rounded-sm font-semibold';
    const pageActiveStyle = 'bg-themeColor text-white hover:bg-themeColor ';
    const pageInactiveStyle = 'hover:bg-themeColor/30 cursor-pointer';

    const arrowCommonStyle =
        'text-3xl px-3 pb-1.5 h-full flex items-center cursor-pointer hover:bg-themeColor/30 rounded-sm';
    const arrowDisabledStyle =
        'cursor-default text-gray-400 hover:bg-transparent';

    return (
        <div className="flex h-8 gap-[1px] text-gray-800">
            <div className="flex gap-[1px] h-full">
                <div
                    className={`${arrowCommonStyle} ${
                        currentPage === 1 ? arrowDisabledStyle : ''
                    }`}
                    onClick={() => {
                        if (currentPage > 1) {
                            setIndexOfFirstRow(0);
                            setIndexOfLastRow(rowsPerPage);

                            setCurrentPage(1);
                        }
                    }}
                >
                    &laquo;
                </div>
                <div
                    className={`${arrowCommonStyle} ${
                        currentPage === 1 ? arrowDisabledStyle : ''
                    }`}
                    onClick={() => {
                        if (currentPage > 1) {
                            setIndexOfFirstRow((prev) => prev - rowsPerPage);
                            setIndexOfLastRow((prev) => prev - rowsPerPage);

                            setCurrentPage((prev) => prev - 1);
                        }
                    }}
                >
                    &lsaquo;
                </div>
            </div>
            <div className="flex gap-[1px]">
                <div
                    className={`pt-1 ${
                        currentPage === pageNumbers.length &&
                        pageNumbers.length > 2
                            ? ''
                            : 'hidden'
                    }`}
                >
                    ...
                </div>
                {pageNumbers.map((page) => {
                    return (
                        <div
                            key={page}
                            className={`${pageCommonStyle} ${
                                page === currentPage
                                    ? pageActiveStyle
                                    : pageInactiveStyle
                            } ${page > currentPage + 1 ? 'hidden' : ''} ${
                                page < currentPage - 1 ? 'hidden' : ''
                            }`}
                            onClick={() => {
                                if (currentPage !== page) {
                                    if (currentPage < page) {
                                        setIndexOfFirstRow(
                                            (prev) =>
                                                prev +
                                                rowsPerPage *
                                                    (page - currentPage)
                                        );
                                        setIndexOfLastRow(
                                            (prev) =>
                                                prev +
                                                rowsPerPage *
                                                    (page - currentPage)
                                        );

                                        setCurrentPage(page);
                                    } else if (currentPage > page) {
                                        setIndexOfFirstRow(
                                            (prev) =>
                                                prev -
                                                rowsPerPage *
                                                    (currentPage - page)
                                        );
                                        setIndexOfLastRow(
                                            (prev) =>
                                                prev -
                                                rowsPerPage *
                                                    (currentPage - page)
                                        );

                                        setCurrentPage(page);
                                    }
                                }
                            }}
                        >
                            {page}
                        </div>
                    );
                })}
                <div
                    className={`pt-1 ${
                        currentPage === 1 && pageNumbers.length > 2
                            ? ''
                            : 'hidden'
                    }`}
                >
                    ...
                </div>
            </div>
            <div className="flex gap-[1px] h-full">
                <div
                    className={`${arrowCommonStyle} ${
                        currentPage === pageNumbers.length ||
                        pageNumbers.length === 0
                            ? arrowDisabledStyle
                            : ''
                    }`}
                    onClick={() => {
                        if (currentPage < pageNumbers.length) {
                            setIndexOfFirstRow((prev) => prev + rowsPerPage);
                            setIndexOfLastRow((prev) => prev + rowsPerPage);

                            setCurrentPage((prev) => prev + 1);
                        }
                    }}
                >
                    &rsaquo;
                </div>
                <div
                    className={`${arrowCommonStyle} ${
                        currentPage === pageNumbers.length ||
                        pageNumbers.length === 0
                            ? arrowDisabledStyle
                            : ''
                    }`}
                    onClick={() => {
                        if (currentPage < pageNumbers.length) {
                            setIndexOfFirstRow(
                                (pageNumbers.length - 1) * rowsPerPage
                            );
                            setIndexOfLastRow(pageNumbers.length * rowsPerPage);

                            setCurrentPage(pageNumbers.length);
                        }
                    }}
                >
                    &raquo;
                </div>
            </div>
        </div>
    );
};

export default Pagination;
