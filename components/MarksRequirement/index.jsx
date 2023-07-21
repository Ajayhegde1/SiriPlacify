import TextField from "../InputComponents/TextField"

export default function MarksRequirement({
    tenthMarks,
    twelfthMarks,
    UGCgpa,
    setTenthMarks,
    setTwelfthMarks,
    setUGCgpa
}) {
    function sanitizeCTCInput(inputValue) {
        return inputValue.replace(/[^0-9.]/g, '')
    }
    
    return (
        <>
            <h1
                className='text-center md:text-left pb-6 mt-10 text-xl md:text-2xl font-Heading font-bold text-gray-800'>
                Marks Requirement
            </h1>
            <div className='grid grid-cols-3 gap-4'>
                <TextField
                    label='10th Marks (in %)'
                    placeholder='95.00'
                    type='text'
                    value={tenthMarks}
                    onChangeHandler={(e) => setTenthMarks(sanitizeCTCInput(e.target.value))}
                />
                <TextField
                    label='12th Marks (in %)'
                    placeholder='95.00'
                    type='text'
                    value={twelfthMarks}
                    onChangeHandler={(e) => setTwelfthMarks(sanitizeCTCInput(e.target.value))}
                />
                <TextField
                    label='UG Cgpa (on a scale of 10)'
                    placeholder='0.0'
                    type='text'
                    value={UGCgpa}
                    onChangeHandler={(e) => setUGCgpa(sanitizeCTCInput(e.target.value))}
                />
            </div>
        </>
    )
}