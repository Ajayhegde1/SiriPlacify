import { useState, useEffect } from 'react';
import ApplicableCoursesSelector from '../ApplicableCoursesSelector';
import { getDepartment } from '@/redux/Sagas/requests/features';
import { Spin } from 'antd';

export default function ApplicableCourses({
  jobDept,
  setJobDept,
  isEdit = false
}) {
  const [jobSection, setJobSection] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartment()
      .then((res) => {
        if (res.data.status === 200) {
          let departments = res.data.data;
          if (typeof departments !== 'undefined' & departments.length !== 0) {
            const departmentsByDegree = departments.reduce((result, department) => {
              const degree = department.degree;
              if (!result[degree]) {
                result[degree] = [];
              }
              result[degree].push(department);
              return result;
            }, {});
            setDepartmentList(departmentsByDegree);
            setJobSection(Object.keys(departmentsByDegree)[0]);
          }
          setLoading(false);
        } else {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error', err.message);
      });
  }, []);

  useEffect(() => {
    if (jobSection && departmentList[jobSection]) {
      setSelectedDepartments(departmentList[jobSection]);
    }
  }, [jobSection, departmentList]);

  return (
    <>
      <div className='mt-6 mr-4 md:mr-16 bg-white rounded-lg'>
        <h1 className='text-black font-bold p-4 rounded-2xl text-4xl'>Applicable courses*</h1>
        <div className='p-4 md:p-10'>
          <ApplicableCoursesSelector
            departmentsByDegree={departmentList}
            jobSection={jobSection}
            setJobSection={setJobSection}
          />
          <div className='mt-10'>
            <div className='flex flex-col'>
              {loading ? (
                <Spin style={{ size: 'large' }} />
              ) : departmentList.length === 0 ? (
                <p>No departments found</p>
              ) : jobSection && selectedDepartments.length === 0 ? (
                <p>No departments found for the selected degree</p>
              ) : (
                <div>
                  {selectedDepartments.map((department) => (
                    <div
                      className='mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'
                      key={department.id}
                    >
                      <input
                        className={isEdit ? "relative float-left accent-green-700 -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300" : "cursor-not-allowed relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300"}
                        type='checkbox'
                        id={`inlineCheckbox_${department.id}`}
                        value={department.id}
                        checked={jobDept.some((dept) => dept.id === department.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setJobDept([...jobDept, department]);
                          } else {
                            setJobDept(jobDept.filter((dept) => dept.id !== department.id));
                          }
                        }}
                        disabled={!isEdit}
                      />
                      <label
                        className='mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading'
                        htmlFor={`inlineCheckbox_${department.id}`}
                      >
                        {department.depName}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
