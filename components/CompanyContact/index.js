export default function CompanyContact ({
  contactName,
  contactEmail,
  contactPhone
}) {
  return (
    <div>
      <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
        Company contact
      </h1>
      <div class='mt-4 md:mt-10 mr-4 md:mr-20'>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1'>Name of the contact person</div>
          <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{contactName}</div>
        </div>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1'>Contacts</div>
          <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{contactPhone}</div>
        </div>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1'>Email ID</div>
          <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{contactEmail}</div>
        </div>
      </div>
    </div>
  )
}
