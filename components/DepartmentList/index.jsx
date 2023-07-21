import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getDepartment } from '@/redux/Sagas/requests/features';
import { notificationTypes, openNotification } from '@/utils/notifications';
import { Spin } from 'antd';

export default function DepartmentList({ selectedOptions, handleSelect }) {
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartment()
      .then((res) => {
        if (res.data.status === 200) {
          let departments = res.data.data;
          departments = departments.map((department) => {
            return {
              value: department.id,
              label: department.depName,
            };
          });
          setDepartmentList(departments);
          setLoading(false); // Set loading to false when the list is loaded
        } else {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
          setLoading(false); // Set loading to false even if there's an error
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error', err.message);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <div className='my-6 w-full'>
      <label className='block font-Poppins text-black text-md font-bold mb-2' htmlFor='username'>
        Select Streams
      </label>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-5'>
        <Select
          options={departmentList}
          placeholder='Select Streams'
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable
          components={makeAnimated()}
          closeMenuOnSelect={false}
          isMulti
          styles={{ width: '100%' }} 
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
