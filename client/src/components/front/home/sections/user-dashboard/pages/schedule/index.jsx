import React from "react";

const tableHeadings = [
  "Date",
  "Session",
  "Doctor",
  "Event",
  "Duration",
  "Action",
];

const tableData = [
  {
    id: "nbdicb87wsc394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "nbdicb87wsf5394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "nbdg5b87wsc394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "nbdicb87wg8394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "nbdicb87wsc3e3y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "nbdid387wsc394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
  {
    id: "fbdicb87wsc394y",
    date: "Feb 18, 2023",
    session: "Mental Health",
    with: "Dr. Bruno Rodrigues",
    event: "Details",
    duration: "30 mins",
    action: "Attend",
  },
];

const Schedule = () => {
  return (
    <div>
      <h2 className="pb-2 text-lg font-medium">Upcoming Sessions</h2>
      <div className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto">
        <table className=" text-sm md:text-base w-full min-w-min overflow-auto">
          <thead className="border-b border-gray-300">
            <tr className="h-10">
              {tableHeadings.map((heading) => (
                <th className="text-start" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.id} className="border-b border-gray-200/50 h-10">
                <td>{data.date}</td>
                <td>{data.session}</td>
                <td>{data.with}</td>
                <td>{data.event}</td>
                <td>{data.duration}</td>
                <td>
                  <button className="bg-green-600 drop-shadow-md text-white px-4 rounded-md">
                    {data.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
