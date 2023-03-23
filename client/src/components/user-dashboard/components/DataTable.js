import React, { useEffect, useMemo, useState } from 'react';

const DataTable = ({
    title = '',
    titleUnderlined = false,
    headers,
    body,
    withFilter = false,
}) => {
    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [indexOfFirstRow, setIndexOfFirstRow] = useState(0);
    const [indexOfLastRow, setIndexOfLastRow] = useState(rowsPerPage);
    const [prevPage, setPrevPage] = useState(1);
    const filteredBody = body.filter((data) => filterData(data, filterText));

    function filterData(data, filterText) {
        for (let key in data) {
            for (let header of headers) {
                if (header.isFilterable) {
                    if (header.prop === key) {
                        if (
                            data[key]
                                .toLowerCase()
                                .includes(filterText.trim().toLowerCase())
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    const pageCount = useMemo(() => {
        return Math.ceil(filteredBody.length / rowsPerPage);
    }, [filteredBody.length, rowsPerPage]);

    const pageNumbers = useMemo(() => {
        let pageNums = [];
        for (let i = 1; i < pageCount + 1; i++) {
            pageNums.push(i);
        }
        return pageNums;
    }, [pageCount]);

    useEffect(() => {
        setIndexOfFirstRow(0);
        setIndexOfLastRow(rowsPerPage);
    }, [rowsPerPage]);

    return (
        <div className="w-full">
            {title.length > 0 && (
                <h2
                    className={`pb-1 text-lg font-medium ${
                        titleUnderlined ? 'underline underline-offset-4' : ''
                    }`}
                >
                    {title}
                </h2>
            )}
            {withFilter && (
                <div className="w-64 ml-auto flex mb-4">
                    <input
                        type="text"
                        placeholder="Filter"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-56 p-1 border border-r-0 border-gray-300 focus:border-themeColor focus:outline-none rounded-l-sm"
                    />
                    <div
                        className="w-8 p-1 border border-themeColor flex justify-center items-center text-white bg-themeColor font-bold cursor-pointer rounded-r-sm"
                        onClick={() => setFilterText('')}
                    >
                        &#215;
                    </div>
                </div>
            )}
            <div className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto">
                <table className="text-sm md:text-base w-full min-w-min overflow-auto">
                    <thead className="border-b border-gray-300">
                        <tr className="h-10">
                            {headers.map((header) => (
                                <th
                                    className="text-start"
                                    key={crypto.randomUUID()}
                                >
                                    {header.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBody
                            .slice(indexOfFirstRow, indexOfLastRow)
                            .map((data) => (
                                <tr
                                    key={crypto.randomUUID()}
                                    className="border-b border-gray-200/50 h-10"
                                >
                                    {headers.map((header) => (
                                        <td key={crypto.randomUUID()}>
                                            {data[header.prop]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <label>
                Rows Per Page
                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(e.target.value);
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={70}>70</option>
                    <option value={100}>100</option>
                </select>
            </label>
            <div className="flex gap-[2px]">
                {pageNumbers.map((page) => {
                    return (
                        <div
                            key={page}
                            className="px-3 py-1 bg-themeColor text-white cursor-pointer"
                            onClick={() => {
                                if (prevPage < page) {
                                    setIndexOfFirstRow(
                                        (prev) => prev + rowsPerPage
                                    );
                                    setIndexOfLastRow(
                                        (prev) => prev + rowsPerPage
                                    );

                                    setPrevPage(page);
                                } else {
                                    setIndexOfFirstRow(
                                        (prev) => prev - rowsPerPage
                                    );
                                    setIndexOfLastRow(
                                        (prev) => prev - rowsPerPage
                                    );

                                    setPrevPage(page);
                                }
                            }}
                        >
                            {page}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DataTable;
