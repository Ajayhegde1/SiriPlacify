import { useSelector } from 'react-redux'

export default function CompanyContact ({
  contactName,
  setJobContactName,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  isEdit
}) {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
        Company contact
      </h1>
      <div class='mt-4 md:mt-10 mr-4 md:mr-20'>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Name of the contact person</div>
          <input
            className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
            type='text'
            value={contactName}
            onChange={(e) => setJobContactName(e.target.value)}
            disabled={!(isEdit && user.accType === '2')}
          />
        </div>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Contacts</div>
          <input
            className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
            type='text'
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            disabled={!(isEdit && user.accType === '2')}
          />
        </div>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Email ID</div>
          <input
            className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
            type='text'
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            disabled={!(isEdit && user.accType === '2')}
          />
        </div>
      </div>
    </div>
  )
}
