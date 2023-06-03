export default function CollegeItem({
    jobID='#',
    colleges,
    isOffered,
    addCollegeList
}) {
    return (
        <div className='overflow-auto'>
            <table className='table-auto overflow-scroll w-full mt-3 text-left'>
                <thead className="border-2 border-gray-400">
                    {
                        !isOffered ?
                        <th>
                        </th>
                        :
                        <></>
                    }
                    <th className='px-6 py-4 text-gray-600 border-r-2 border-gray-400'>College Name</th>
                    <th className='px-6 py-4 text-gray-600 border-r-2 border-gray-400'>College Website</th>
                    <th className='px-6 py-4 text-gray-600'>College Contact Number</th>
                </thead>
                <tbody>
                    {
                        colleges === null || typeof colleges === 'undefined'
                            ? <div>
                                Loading...
                            </div>
                            : colleges.length === 0
                                ? <div className='mt-6 mb-3 ml-6 font-medium'>
                                    No colleges found found
                                </div>
                                : colleges.map((college, index) =>
                                    <tr className="border-2 border-gray-400">
                                            {
                                                !isOffered ?
                                                <td>
                                                <input
                                                    onClick={(event) => addCollegeList(event, college)}
                                                    type='checkbox'
                                                    className='ml-6 h-6 w-6'
                                                />
                                                </td>
                                                :
                                                <></>
                                            }
                                        <td className='whitespace-nowrap px-6 py-4'>{college.collegeName}</td>
                                        <td className='whitespace-nowrap px-6 py-4'>{college.collegeWebsite}</td>
                                        <td className='whitespace-nowrap px-6 py-4'>{college.contactNo}</td>
                                        {
                                            isOffered && college.status === '1' ?
                                            <td>
                                                <a href={`/jobs/companyJobs/${jobID}/${college.uid}`}>
                                                    <button className='ml-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                                        View
                                                    </button>
                                                </a>
                                            </td>
                                            :
                                            <></>
                                        }
                                    </tr>
                                )
                    }
                </tbody>
            </table>
        </div>
    )
}
