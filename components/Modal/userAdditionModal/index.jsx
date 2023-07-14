import { useRef, useEffect } from 'react'
import { utils, writeFile } from 'xlsx'

import styles from '@/styles/modal.module.css'
import sheet from '../../../public/sheets.png'
import close from '../../../public/close.png'
import Image from 'next/image'

export default function UserAdditionModal({
  showModal,
  setShowModal,
  ImportExcel,
  departmentList
}) {
  const modalRef = useRef(null)
  const hiddenFileInput = useRef(null)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handleExport = () => {
    const headings = [
      [
        'id',
        'Department Short Form',
        'Department Name'
      ]
    ]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    const outdata = JSON.stringify(departmentList, [
      'id',
      'depAbbrievation',
      'depName'
    ])
    const output = JSON.parse(outdata)
    utils.sheet_add_json(ws, output, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Students List')
    writeFile(wb, 'departmentList.xlsx')
  }

  useEffect(() => {
    if (showModal) {
      modalRef.current.style.top = '0'
      modalRef.current.style.opacity = '1'
    } else {
      modalRef.current.style.top = '120vh'
      modalRef.current.style.opacity = '0'
    }
  }, [showModal])

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.cardContainer5}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 underline underline-offset-4 ml-4 text-black font-bold font-DMSANS text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              User Addition
            </h2>
          </div>
          <div className={styles.close}>
            <a onClick={closeModal}>
              <Image
                src={close}
                className='h-14'
                alt='close button'
              />
            </a>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className='mt-5 mb-6 ml-4 mr-10'>
            <p className='text-gray-700'>
              Define rules for adding users. The Excel sheet should contain columns for studentName, email, and accountType.
            </p>
            <ul className='list-disc list-inside mt-4 text-gray-700'>
              <li>The Student Name should have alphanumeric characters and it should match the entries in the database.</li>
              <li>The Email should be unique, valid and must have alphanumeric characters.</li>
              <li>The Account Type should be either 0 or 1, where 0 represents TPO and 1 represents student.</li>
              <li>The department field should be in numeric form. It should contain the department Id. Please check the department sheet for the relevant department ID</li>
            </ul>
          </div>
        </div>
        <div className='pt-5 pl-5 rounded-3xl'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="col-span-1">
              <a
                href="/sample.xlsx"
                download="sample.xlsx"
                className="block bg-blue-300 hover:bg-green-700 text-black font-bold py-3 px-6 text-base rounded-lg focus:outline-none focus:shadow-outline text-center"
              >
                Download Sample Sheet
              </a>
            </div>
            <div className="col-span-1">
              <button
                onClick={handleExport}
                className="block bg-blue-300 hover:bg-green-700 text-black font-bold py-3 px-6 text-base rounded-lg focus:outline-none focus:shadow-outline text-center"
              >
                Download Department List
              </button>
            </div>
            <div className="col-span-1">
              <button
                onClick={handleClick}
                className="flex bg-customBlueFour hover:bg-green-700 border-2 border-black text-black font-bold pt-2 pb-3 px-6 text-base rounded-lg focus:outline-none focus:shadow-outline text-center"
              >
                <input
                  type="file"
                  ref={hiddenFileInput}
                  name="file"
                  required
                  onChange={(event) => ImportExcel(event)}
                  id="fu"
                  style={{ display: "none" }}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <Image
                  src={sheet}
                  alt="Import excel sheet"
                  className="my-auto h-8 w-8 mr-2"
                />
                <span className='my-auto'>Import From Excel</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
