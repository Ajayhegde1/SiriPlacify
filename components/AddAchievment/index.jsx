import { useState } from "react"
import { CloseCircleOutlined } from '@ant-design/icons'
import Image from "next/image"

import TextField from "../InputComponents/TextField"
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import TextArea from "../InputComponents/TextArea"

import AddAchievmentModal from "../Modal/AddAchievementModal"

import excel from '@/public/sheets.png'

export default function AddAchievment({
    achievements, setAchievements
}) {
    const [showAchievementsModal, setShowAchievementsModal] = useState(false)

    const handleDeleteTier = (index) => {
        const updatedList = [...placementTrend]
        updatedList.splice(index, 1)
        setAchievements(updatedList)
    }

    const handleAddAchievement = () => {
        setShowAchievementsModal(true)
    }

    const handleCTCChange = (index, field, value) => {
        const updatedList = [...placementTrend]
        updatedList[index] = {
            ...updatedList[index],
            [field]: parseInt(value)
        }
        setAchievements(updatedList)
    }

    return (
        <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-2">
                <h1 className="mt-2 text-2xl font-bold mb-4">Add Achievements</h1>
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
            <div className={`mt-6 flex flex-wrap gap-4 ${achievements.length > 0 ? "h-40 overflow-y-auto" : ""}`}>
                {
                    achievements.map((item, index) =>
                        <div
                            className="border-2 border-gray-300 shadow-xl p-4 rounded-lg shadow-md flex-grow mb-4"
                            key={index}
                        >
                            <div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-2 mb-6">
                                        <label className="font-bold">
                                            Date
                                        </label>
                                        <DateTimePicker
                                            value={item.Year}
                                            onChange={(e) => handleCTCChange(index, 'Year', e)}
                                        />
                                    </div>
                                    <TextField
                                        label='Domain'
                                        type='text'
                                        placeholder='Design'
                                        value={item.domain}
                                        onChangeHandler={e => handleCTCChange(index,'domain', e.target.value)}
                                    />
                                </div>
                                <TextField
                                    label='Title'
                                    type='text'
                                    placeholder='200'
                                    value={item.title}
                                    onChangeHandler={e => handleCTCChange(index,'title', e.target.value)}
                                />
                                <TextArea
                                    label='Description'
                                    placeholder='Your message...'
                                    rows='2'
                                    value={item.description}
                                    onChangeHandler={e => handleCTCChange(index,'description', e.target.value)}
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
                    onClick={handleAddAchievement}
                >
                    Add Achievement
                </button>
            </div>
            <AddAchievmentModal
                showModal={showAchievementsModal}
                setShowModal={setShowAchievementsModal}
                setAchievements={setAchievements}
            />
        </div>
    )
}