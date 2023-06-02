export default function CollegeItem({
    colleges,
    isOffered,
    addCollegeList
}) {
    return (
        <div className='overflow-auto'>
            <table className='table-auto overflow-scroll w-full mt-3 text-left'>
                <thead>
                    <th className='px-6 py-4 text-gray-600'></th>
                    <th className='px-6 py-4 text-gray-600'>College Name</th>
                    <th className='px-6 py-4 text-gray-600'>College Website</th>
                    <th className='px-6 py-4 text-gray-600'>College Contact Number</th>
                    {isOffered ? <th className='px-6 py-4 text-gray-600'>Status</th> : ''}
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
                                    <tr>
                                        <td>
                                            <input
                                                onClick={(event) => addCollegeList(event, college)}
                                                type='checkbox'
                                                className='h-6 w-6'
                                            />
                                        </td>
                                        <td className='whitespace-nowrap px-6 py-4'>{college.collegeName}</td>
                                        <td className='whitespace-nowrap px-6 py-4'>{college.collegeWebsite}</td>
                                        <td className='whitespace-nowrap px-6 py-4'>{college.contactNo}</td>
                                        {
                                            isOffered ? 
                                             college.status !== null ?
                                                college.status === '0' ?
                                                    <td className='whitespace-nowrap px-6 py-4 font-bold text-yellow-500'>
                                                        Pending
                                                    </td>
                                                    :
                                                    college.status === '1'
                                                        ? 
                                                        <td className='whitespace-nowrap px-6 py-4 font-bold text-green-700'>
                                                            Accepted
                                                        </td>
                                                        : 
                                                        <td className='whitespace-nowrap px-6 py-4 font-bold text-red-600'>
                                                            Rejected 
                                                        </td>
                                                :
                                                <td className='whitespace-nowrap px-6 py-4 font-bold text-yellow-500'>
                                                    Status Undefined
                                                </td>
                                            : ''
                                        }
                                    </tr>
                                )
                    }
                </tbody>
            </table>
        </div>
    )
}
