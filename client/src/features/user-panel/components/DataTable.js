import React, { useEffect, useMemo, useState } from 'react';
import Pagination from './Pagination';

const DataTable = ({
    title = '',
    titleUnderlined = false,
    headers,
    body,
    withFilter = false,
    withPagination = false,
    rowsPerPageOptions = [5, 10, 20],
}) => {
    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [indexOfFirstRow, setIndexOfFirstRow] = useState(0);
    const [indexOfLastRow, setIndexOfLastRow] = useState(rowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredBody = body.filter((data) => filterData(data, filterText));

    function filterData(data, filterText) {
        for (let key in data) {
            for (let header of headers) {
                if (header.isFilterable) {
                    if (header.prop === key) {
                        console.log(data[key]);
                        if (
                            data[key]
                                .toString()
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

    console.log({ rowsPerPage, indexOfFirstRow, indexOfLastRow });

    useEffect(() => {
        setIndexOfFirstRow(0);
        setIndexOfLastRow(rowsPerPage);
        setCurrentPage(1);
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
                        placeholder="Enter text"
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
            <div className="mb-4 p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto">
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
                    {filteredBody.length > 0 && (
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
                    )}
                    {filteredBody.length === 0 && (
                        <div className="h-10 flex items-center">
                            No data to display
                        </div>
                    )}
                </table>
            </div>
            {withPagination && (
                <div className="mb-4">
                    <label>
                        Rows Per Page&nbsp;&nbsp;
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value));
                            }}
                            className="h-[26px] min-w-[60px] border focus:outline-none"
                        >
                            {rowsPerPageOptions.map((option) => (
                                <option
                                    value={option}
                                    key={crypto.randomUUID()}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            {/* Pagination */}
            {withPagination && (
                <div className="flex justify-end">
                    <Pagination
                        {...{
                            pageNumbers,
                            currentPage,
                            setCurrentPage,
                            setIndexOfFirstRow,
                            setIndexOfLastRow,
                            rowsPerPage,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default DataTable;
