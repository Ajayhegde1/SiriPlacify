import { useSelector } from "react-redux"

export default function ModeOfSelection ({
  modeOfSelection,
  setModeOfSelection,
  finalDesc,
  setFinalDesc,
  isEdit
}) {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
        Mode of selection
      </h1>
      <div class='mt-4 md:mt-10 mr-4 md:mr-20'>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Test mode</div>
            <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={modeOfSelection}
              onChange={(e) => setModeOfSelection(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
        </div>
        <div class='py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200'>
          <div className='text-gray-700 font-bold font-Heading col-span-1 my-auto'>Final selection</div>
          <input
              className={isEdit ? 'border-2 border-gray-300 text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4' : 'text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4'}
              type="text"
              value={finalDesc}
              onChange={(e) => setFinalDesc(e.target.value)}
              disabled={isEdit && user.accType === '2' ? false : true}
            />
        </div>
      </div>
    </div>
  )
}
