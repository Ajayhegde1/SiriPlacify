import { Dropdown, Tooltip } from 'antd'
import { utils, writeFile } from 'xlsx'
import Image from 'next/image'

import download from '@/public/download.png'
import arrowDown from '@/public/arrowdown.png'

export default function DownloadApplicants({
    studentList
}) 
{
    const items = [
      {
        key: '1',
        label: (
          <Tooltip title="All">
            <div onClick={() => handleExport("6")}>
              All
            </div>
          </Tooltip>
        ),
      },
      {
        key: '2',
        label: (
          <Tooltip title="Applied">
            <div onClick={() => handleExport("0")}>
              Applied
            </div>
          </Tooltip>
        ),
      },
      {
        key: '3',
        label: (
          <Tooltip onClick={() => handleExport("1")}>
            <div>
              Shortlist
            </div>
          </Tooltip>
        ),
      },
      {
        key: '4',
        label: (
          <Tooltip title="Test">
            <div onClick={() => handleExport("2")}>
              Test
            </div>
          </Tooltip>
        ),
      },
      {
        key: '5',
        label: (
          <Tooltip title="Interview">
            <div onClick={() => handleExport("3")}>
              Interview
            </div>
          </Tooltip>
        ),
      },
      {
        key: '6',
        label: (
          <Tooltip title="Hired">
            <div onClick={() => handleExport("4")}>
              Hired
            </div>
          </Tooltip>
        ),
      },
      {
        key: '7',
        label: (
          <Tooltip title="Rejected">
            <div onClick={() => handleExport("5")}>
              Rejected
            </div>
          </Tooltip>
        ),
      }
    ]

    const handleExport = (status) => {
      let list = []
      if (status === "6") {
        list = studentList
      }
      else {
        list = studentList.filter((student) => student.studentStatus === status)
      }
  
      const headings = [
        [
          'uid',
          'studentID',
          'username',
          'email',
          'contactNo',
          'tenthMarks',
          'twelthMarks',
          'studentUGMarks',
          'studentPGMarks',
          'status',
          'studentDescription'
        ]
      ]
      const wb = utils.book_new()
      const ws = utils.json_to_sheet([])
      utils.sheet_add_aoa(ws, headings)
      const outdata = JSON.stringify(list, [
        'uid',
        'studentId',
        'username',
        'email',
        'contactNo',
        'tenthMarks',
        'twelthMarks',
        'studentUGMarks',
        'studentPGMarks',
        'studentStatus',
        'studentDescription'
      ])
      const output = JSON.parse(outdata)
      utils.sheet_add_json(ws, output, { origin: 'A2', skipHeader: true })
      utils.book_append_sheet(wb, ws, 'Students List')
      writeFile(wb, 'candidatesData.xlsx')
    }

    return(
        <div className='flex ml-auto mb-1'>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow="true"
          >
            <button>
              <div
                className='px-2 py-1 rounded cursor-pointer ml-auto flex flex-row'
              >
                <Image
                  src={download}
                  alt='arrow-left'
                  className='mt-1 h-6 w-6 mr-3'
                />
                <p className='mt-1 text-lg font-Heading font-bold text-black pr-1'>

                  Download
                </p>
                <Image
                  src={arrowDown}
                  alt='arrow-left'
                  className='mt-4 h-2 w-3 ml-1'
                />
              </div>
            </button>
          </Dropdown>
        </div>
    )
}