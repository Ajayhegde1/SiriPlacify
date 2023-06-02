export default function CollegeItem({
    colleges,
    offerColleges,
    setOfferColleges,
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
                                    </tr>
                                )
                    }
                </tbody>
            </table>
        </div>
    )
}
