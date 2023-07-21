import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getSectors } from '@/redux/Sagas/requests/features';
import { notificationTypes, openNotification } from '@/utils/notifications';
import { Spin } from 'antd';

export default function JobSectorSelect({
    isEdit = true,
    sector,
    handleSector
}) {
    const [jobSectorList, setJobSectorList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSectors()
            .then((res) => {
                if (res.data.status === 200) {
                    let sectors = res.data.message;
                    sectors = sectors.map((sector) => {
                        return {
                            value: sector.id,
                            label: sector.sectorName,
                        };
                    });
                    setJobSectorList(sectors);
                    setLoading(false); 
                } else {
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message);
                    setLoading(false); 
                }
            })
            .catch((err) => {
                openNotification(notificationTypes.ERROR, 'Error', err.message);
                setLoading(false); 
            });
    }, []);

    return (
        <div className='mt-8 mb-6'>
            <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-5'>
                    <Select
                        options={jobSectorList}
                        placeholder='Select Sectors'
                        value={sector}
                        onChange={handleSector}
                        isSearchable={true}
                        components={makeAnimated()}
                        closeMenuOnSelect={false}
                        isDisabled={!isEdit}
                        isMulti
                    />
                </div>
                <div>
                    {loading ? (
                        <Spin size='large' style={{ marginRight: '10px' }} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
