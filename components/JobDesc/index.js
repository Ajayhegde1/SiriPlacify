import { useSelector } from "react-redux"
import edit from '../../public/edit.png'
import Image from "next/image"

export default function JobDesc({
  companyName,
  setCompanyName,
  companyDesc,
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobPosition,
  setJobPosition,
  jobSector,
  setJobSector,
  jobCTC,
  setJobCTC,
  basePay,
  setBasePay,
  variablePay,
  setVariablePay,
  RSU,
  setRSU,
  jobDesc,
  setJobDesc,
  jobBond,
  setJobBond,
  jobCriteria,
  setJobCriteria,
  jobSection,
  isEdit,
  setIsEdit,
  handleEditFunction
}) {
  const user = useSelector((state) => state.user)

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div>
      {
        jobSection === 2 &&
        <div>
          <h1 className='mt-3 pb-4 text-lg font-bold font-Heading font-bold text-black'>
            Company Name: {companyName}
          </h1>
        </div>
      }
      {
        isEdit
          ?
          <div>
            <button
              className="mt-12 flex ml-auto mr-5 bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
              onClick={handleEditFunction}
            >
              Save Changes
            </button>
          </div>
          :
          <></>
      }
      <div className={jobSection === 2 ? 'mt-6' : 'mt-2'}>
        {
          jobSection === 1
            ?
            <div className="flex gap-8">
              <h1 className='pb-4 border-b-2 border-gray-300 text-3xl font-bold font-Heading font-bold text-black'>
                {jobTitle}
              </h1>
              <Image
                src={edit}
                alt="edit"
                className="mt-1 h-6 w-6"
                onClick={handleEdit}
              />
            </div>
            : <h1 className='pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
              Job details
            </h1>
        }
        <div class='mt-4 mr-4 md:mr-20'>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Title</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type='text'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Location</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type='text'
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Position type</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Sector</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={jobSector}
              onChange={(e) => setJobSector(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 text-2xl font-bold font-Heading col-span-1 my-auto pb-5'>CTC Breakdown</div>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>CTC</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5'}
              type="text"
              value={jobCTC}
              onChange={(e) => setJobCTC(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Base Pay</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5'}
              type="text"
              value={basePay}
              onChange={(e) => setBasePay(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Variable Pay</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5'}
              type="text"
              value={variablePay}
              onChange={(e) => setVariablePay(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>RSU</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5'}
              type="text"
              value={RSU}
              onChange={(e) => setRSU(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Job description</div>
            <textarea
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5'}
              type="text"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
              rows="4"
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Bond / Service agreement details if any</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={jobBond}
              onChange={(e) => setJobBond(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
          <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
            <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Criteria</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={jobCriteria}
              onChange={(e) => setJobCriteria(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
