import { useEffect, useState } from "react"
import StonksUpComponent from "../StonksUpComponent"
import TierTableComponent from "../TierTableComponent"
import { InternshipOffers } from "@/redux/Sagas/requests/features"
import { notificationTypes, openNotification } from "@/utils/notifications"
import { Spin } from 'antd';

export default function TypesOfOfferComponents() {
    const [data, setData] = useState(null)

    useEffect(() => {
        InternshipOffers()
            .then((res) => {
                if (res.data.status === 200){
                    setData(res.data.data)
                } 
                else{
                    openNotification(
                        notificationTypes.ERROR,
                        'Error',
                        res.data.message
                    )
                }
            })
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Error in fetching data'
              )  
            })
    }, [])

    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
                <div className='col-span-1'>
                    {
                        data === null
                        ?
                        <div className="flex justify-center items-center">
                            <Spin size="large" />
                        </div>
                        :
                        Object.keys(data).length === 0
                        ?
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl font-semibold">No data to show</h1>
                        </div>
                        :
                        <div className="grid grid-rows-2 gap-0 md:gap-4">
                            <StonksUpComponent
                                title='Number of internship offers'
                                count={data.InternshipOffers}
                                stonksType={2}
                            />
                            <StonksUpComponent
                                title='Number of PPOS rolled out'
                                count={data.PPO}
                                stonksType={3}
                            />
                        </div>
                    }
                </div>
                <div className='col-span-2'>
                    <TierTableComponent />
                </div>
            </div>
        </div>
    )
}