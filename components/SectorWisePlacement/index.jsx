import TextField from "../InputComponents/TextField"

import SectorWisePlacementModal from "../Modal/SectorWisePlacementModal"

import { useState } from "react"
import { CloseCircleOutlined } from '@ant-design/icons'
import Image from "next/image"

import excel from '@/public/sheets.png'

export default function SectorWisePlacement({
    sectorWisePlacement,
    setSectorWisePlacement
}) {
    const [showSectorWisePlacementModal, setShowSectorWisePlacementModal] = useState(false)

    const handleDeleteTier = (index) => {
        const updatedList = [...placementTrend]
        updatedList.splice(index, 1)
        setSectorWisePlacement(updatedList)
    }

    const handleAddTrend = () => {
        setShowSectorWisePlacementModal(true)
    }

    const handleCTCChange = (index, field, value) => {
        const updatedList = [...placementTrend]
        updatedList[index] = {
            ...updatedList[index],
            [field]: parseInt(value)
        }
        setSectorWisePlacement(updatedList)
    }


    return (
        <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-2">
                <h1 className="mt-2 text-2xl font-bold mb-4">Sector-Wise Placement Trend</h1>
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
            <div className={`mt-6 flex flex-wrap gap-4 ${sectorWisePlacement.length > 0 ? "h-40 overflow-y-auto" : ""}`}>
                {
                    sectorWisePlacement.map((item, index) =>
                        <div
                            className="border-2 border-gray-300 shadow-xl p-4 rounded-lg shadow-md flex-grow mb-4"
                            key={index}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                                <TextField
                                    label='Year'
                                    placeholder='2023'
                                    type='number'
                                    value={item.Year}
                                    onChangeHandler={(e) =>
                                        handleCTCChange(index, 'Year', e.target.value)}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <TextField
                                        label='No. Core Sector Offers'
                                        placeholder='200'
                                        type='number'
                                        value={item.coreOffers}
                                        onChangeHandler={(e) =>
                                            handleCTCChange(index, 'coreOffers', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <TextField
                                        label='No. IT Sector Offers'
                                        placeholder='100'
                                        type='number'
                                        value={item.ITOffers}
                                        onChangeHandler={(e) =>
                                            handleCTCChange(index, 'ITOffers', e.target.value)}
                                    />
                                </div>
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
            <SectorWisePlacementModal
                showModal={showSectorWisePlacementModal}
                setShowModal={setShowSectorWisePlacementModal}
                setSectorWisePlacement={setSectorWisePlacement}
            />
        </div>
    )
}