export default function ApplicableCoursesSelector({
  departmentsByDegree = [],
  jobSection,
  setJobSection
}) {
  const setDegreeSection = (degree) => {
    setJobSection(degree);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 border-b-2 border-gray-300'>
      {Object.keys(departmentsByDegree).map((degree) => (
        <div
          key={degree}
          onClick={() => setDegreeSection(degree)}
          className={jobSection === degree ? 'cursor-pointer pb-1 border-b-4 border-green-900' : 'cursor-pointer'}
        >
          <span className='text-lg font-Heading font-semibold text-black pr-2'>
            {degree}
          </span>
        </div>
      ))}
    </div>
  );
}
