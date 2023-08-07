import React, { useRef, useEffect, useState } from "react";
import close from "../../../public/close.png";
import styles from "@/styles/modal.module.css";
import Image from "next/image";
import TextField from "@/components/InputComponents/TextField";
import { notificationTypes, openNotification } from "@/utils/notifications";

export default function AddTrendsModal({
    showModal,
    setShowModal,
    setPlacementTrend,
}) {
    const modalRef = useRef(null);

    const [newTrend, setNewTrend] = useState({
        Year: 2023,
        NoOfStudents: 0,
        noOfCompanies: 0,
        noOfOffers: 0,
        studentsPlaced: 0,
        noOfInternships: 0,
        noOfPPOs: 0,
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
          "NoOfStudents",
          "noOfCompanies",
          "noOfOffers",
          "studentsPlaced",
          "noOfInternships",
          "noOfPPOs",
        ];
      
        const missingFields = requiredFields.filter((field) => !newTrend[field]);
      
        if (missingFields.length === 0) {
          const formattedTrend = {};
          for (const field of requiredFields) {
            formattedTrend[field] = parseInt(newTrend[field]);
          }
      
          setPlacementTrend((prevList) => [...prevList, formattedTrend]);
          setNewTrend({
            Year: 2023,
            NoOfStudents: 0,
            noOfCompanies: 0,
            noOfOffers: 0,
            studentsPlaced: 0,
            noOfInternships: 0,
            noOfPPOs: 0,
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
                        Add Trend
                    </h2>
                    <div className={styles.close}>
                        <a onClick={closeModal}>
                            <Image src={close} className="h-14" alt="close button" />
                        </a>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className="mt-6 ml-4 mr-10">
                        <TextField
                            label="Year"
                            type="number"
                            placeholder="2023"
                            value={newTrend.Year}
                            onChangeHandler={(e) =>
                                handleNewTierChange("Year", e.target.value)
                            }
                        />
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <TextField
                                label='No of Students'
                                type='number'
                                placeholder='200'
                                value={newTrend.NoOfStudents}
                                onChangeHandler={e => handleNewTierChange('NoOfStudents', e.target.value)}
                            />
                            <TextField
                                label='Companies Visited'
                                type='number'
                                placeholder='5'
                                value={newTrend.noOfCompanies}
                                onChangeHandler={e => handleNewTierChange('noOfCompanies', e.target.value)}
                            />
                            <TextField
                                label='Offers rolled out'
                                type='number'
                                placeholder='5'
                                value={newTrend.noOfOffers}
                                onChangeHandler={e => handleNewTierChange('noOfOffers', e.target.value)}
                            />
                            <TextField
                                label='Students Placed'
                                type='number'
                                placeholder='55'
                                value={newTrend.studentsPlaced}
                                onChangeHandler={e => handleNewTierChange('studentsPlaced', e.target.value)}
                            />
                            <TextField
                                label='Students with Internship'
                                type='number'
                                placeholder='5'
                                value={newTrend.noOfInternships}
                                onChangeHandler={e => handleNewTierChange('noOfInternships', e.target.value)}
                            />
                            <TextField
                                label='No of PPOs'
                                type='number'
                                placeholder='5'
                                value={newTrend.noOfPPOs}
                                onChangeHandler={e => handleNewTierChange('noOfPPOs', e.target.value)}
                            />
                        </div>
                        <button
                            className="flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4"
                            onClick={handleAddTrend}
                        >
                            Add Trend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
