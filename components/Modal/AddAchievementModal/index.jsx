import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import styles from "@/styles/modal.module.css";

import { notificationTypes, openNotification } from "@/utils/notifications";
import close from "../../../public/close.png";

export default function AddAchievmentModal({
    showModal,
    setShowModal,
    setAchievements
}) {
    const modalRef = useRef(null);

    const [newTrend, setNewTrend] = useState({
        Year: new Date(),
        domain: '',
        title: '',
        description: ''
    });

    const handleNewTierChange = (field, value) => {
        setNewTrend((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleAddTrend = () => {
        const requiredFields = [
            "Year",
            "domain",
            "title",
            "description"
        ];

        const missingFields = requiredFields.filter((field) => !newTrend[field]);

        if (missingFields.length === 0) {
            console.log(newTrend)
            setAchievements((prevList) => [...prevList, newTrend]);
            setNewTrend({
                Year: new Date(),
                domain: '',
                title: '',
                description: ''
            });
            setShowModal(false);
        } else {
            console.log(newTrend);
            openNotification(
                notificationTypes.ERROR,
                "Missing fields",
                `Please fill the following fields: ${missingFields.join(", ")}`
            )
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            modalRef.current.style.top = "0";
            modalRef.current.style.opacity = "1";
        } else {
            modalRef.current.style.top = "120vh";
            modalRef.current.style.opacity = "0";
        }
    }, [showModal]);

    return (
        <div ref={modalRef} className={styles.wrapper}>
            <div className={styles.cardContainer1}>
                <div className={styles.header}>
                    <h2 className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'>
                        Add Achievement
                    </h2>
                    <div className={styles.close}>
                        <a onClick={closeModal}>
                            <Image src={close} className="h-14" alt="close button" />
                        </a>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className="mt-6 ml-4 mr-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 mb-6">
                                <label className="font-bold">
                                    Date
                                </label>
                                <DateTimePicker
                                    value={newTrend.Year}
                                    onChange={e => handleNewTierChange('Year', e)}
                                />
                            </div>
                            <TextField
                                label='Domain'
                                type='text'
                                placeholder='Design'
                                value={newTrend.domain}
                                onChangeHandler={e => handleNewTierChange('domain', e.target.value)}
                            />
                        </div>
                        <TextField
                            label='Title'
                            type='text'
                            placeholder='200'
                            value={newTrend.title}
                            onChangeHandler={e => handleNewTierChange('title', e.target.value)}
                        />
                        <TextArea
                            label='Description'
                            placeholder='Your message...'
                            rows='2'
                            value={newTrend.description}
                            onChangeHandler={e => handleNewTierChange('description', e.target.value)}
                        />
                        <button
                            className="flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4"
                            onClick={handleAddTrend}
                        >
                            Add Achievement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
