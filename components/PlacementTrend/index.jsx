import TextField from "../InputComponents/TextField"

import AddTrendsModal from "../Modal/AddTrendsModal"

import { useState } from "react"
import { CloseCircleOutlined } from '@ant-design/icons'
import Image from "next/image"

import excel from '@/public/sheets.png'

export default function PlacementTrend({
    placementTrend,
    setPlacementTrend
}) {
    const [showPlacementTrendModal, setShowPlacementTrendModal] = useState(false)

    const handleDeleteTier = (index) => {
        const updatedList = [...placementTrend]
        updatedList.splice(index, 1)
        setPlacementTrend(updatedList)
    }

    const handleAddTrend = () => {
        setShowPlacementTrendModal(true)
    }

    const handleCTCChange = (index, field, value) => {
        const updatedList = [...placementTrend]
        updatedList[index] = {
            ...updatedList[index],
            [field]: parseInt(value)
        }
        setPlacementTrend(updatedList)
    }


    return (
        <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-2">
                <h1 className="mt-2 text-3xl font-bold mb-4">Placement Trend</h1>
                <button
                    className='ml-auto flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
                >
                    <Image
                        src={excel}
                        alt='Import excel sheet'
                        className='h-7 w-7 mt-1 mr-2'
                    />
                    <span className='my-auto'>Import from excel</span>
                </button>
            </div>
            <div className={`mt-6 flex flex-wrap gap-4 ${placementTrend.length > 0 ? "h-72 overflow-y-auto" : ""}`}>
                {
                    placementTrend.map((item, index) =>
                        <div
                            className="border-2 border-gray-300 shadow-xl p-4 rounded-lg shadow-md flex-grow mb-4"
                            key={index}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
                                <TextField
                                    label='Year'
                                    placeholder='2023'
                                    type='number'
                                    value={item.Year}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'Year', e.target.value)}
                                />
                                <TextField
                                    label='No Of Students'
                                    placeholder='200'
                                    type='number'
                                    value={item.NoOfStudents}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'NoOfStudents', e.target.value)}
                                />
                                <TextField
                                    label='No Of Companies'
                                    placeholder='100'
                                    type='number'
                                    value={item.noOfCompanies}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'noOfCompanies', e.target.value)}
                                />
                                <TextField
                                    label='No Of Offers'
                                    placeholder='100'
                                    type='number'
                                    value={item.noOfOffers}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'noOfOffers', e.target.value)}
                                />
                                <TextField
                                    label='Students Placed'
                                    placeholder='100'
                                    type='number'
                                    value={item.studentsPlaced}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'studentsPlaced', e.target.value)}
                                />
                                <TextField
                                    label='No of Internships'
                                    placeholder='100'
                                    type='number'
                                    value={item.noOfInternships}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'noOfInternships', e.target.value)}
                                />
                                <TextField
                                    label='PPOs Offered'
                                    placeholder='100'
                                    type='number'
                                    value={item.noOfPPOs}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'noOfPPOs', e.target.value)}
                                />
                                <div className="flex justify-center mt-4">
                                    <button
                                        className='my-auto'
                                        onClick={() => handleDeleteTier(index)}
                                    >
                                        <CloseCircleOutlined style={{ fontSize: '24px' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-end mb-4 md:col-start-6 md:col-span-2">
                <button
                    className="cursor-pointer bg-green-500 text-white font-bold rounded-lg py-2 px-4"
                    onClick={handleAddTrend}
                >
                    Add Trend
                </button>
            </div>
            <AddTrendsModal
                showModal={showPlacementTrendModal}
                setShowModal={setShowPlacementTrendModal}
                setPlacementTrend={setPlacementTrend}
            />
        </div>
    )
}