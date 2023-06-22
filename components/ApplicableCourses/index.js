import { useState } from 'react'

import ApplicableCoursesSelector from '../ApplicableCoursesSelector'
import Button from '../Buttons'

export default function ApplicableCourses() {
  const [jobSection, setJobSection] = useState(1)

  return (
    <>
      <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white rounded-lg'>
        <h1 className='border-b-2 p-4 border-gray-300 rounded-2xl'>Applicable courses*</h1>
        <div className='p-4 md:p-10'>
          <ApplicableCoursesSelector jobSection={jobSection} setJobSection={setJobSection} />
          <div className='ml-3 md:ml-6 mt-10'>
            <div class='flex flex-col'>
              <div class='mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
                <input
                  class='relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300'
                  type='checkbox'
                  id='inlineCheckbox1'
                  value='option1'
                />
                <label
                  class='mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading '
                  for='inlineCheckbox1'
                >Visual Design Design
                </label>
              </div>
              <div class='mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
                <input
                  class='relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300'
                  type='checkbox'
                  id='inlineCheckbox1'
                  value='option1'
                />
                <label
                  class='mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading'
                  for='inlineCheckbox1'
                >Interaction Design
                </label>
              </div>
              <div class='mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
                <input
                  class='relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300'
                  type='checkbox'
                  id='inlineCheckbox2'
                  value='option2'
                />
                <label
                  class='mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading'
                  for='inlineCheckbox2'
                >Product Design
                </label>
              </div>
              <div class='mb-[1rem] inline-block min-h-[1.5rem] pl-[1.5rem]'>
                <input
                  class='relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300'
                  type='checkbox'
                  id='inlineCheckbox3'
                  value='option3'
                />
                <label
                  class='mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading'
                  for='inlineCheckbox3'
                >Communication Design
                </label >
              </div>
            </div>
          </div>
        </div>
        <div
          className='pb-8 ml-auto mr-10 w-1/6'
        >
          <Button btnText='Save' />
        </div>
      </div>
    </>
  )
}
