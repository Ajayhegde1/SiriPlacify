import TextField from '@/components/InputComponents/TextField'

export default function CTCBreakdown({
    ctc,
    basePay,
    variablePay,
    RSU,
    setCtc,
    setBasePay,
    setVariablePay,
    setRSU
}) {
    function sanitizeCTCInput(inputValue) {
        return inputValue.replace(/[^0-9.]/g, '')
    }

    return (
        <>
            <h1 className='text-center md:text-left pb-4 mt-3 text-xl md:text-2xl font-Heading font-bold text-gray-800'>CTC Breakdown (p.a)</h1>
            <div>
                <TextField
                    label='CTC (in Rs.)'
                    placeholder='750000.00'
                    type='text'
                    value={ctc}
                    onChangeHandler={(e) => setCtc(sanitizeCTCInput(e.target.value))}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <TextField
                        label='Base Pay (in Rs.)'
                        placeholder='750000.00'
                        type='text'
                        value={basePay}
                        onChangeHandler={(e) => setBasePay(sanitizeCTCInput(e.target.value))}
                    />
                    <TextField
                        label='Variable Pay (in Rs.)'
                        placeholder='750000.00'
                        type='text'
                        value={variablePay}
                        onChangeHandler={(e) => setVariablePay(sanitizeCTCInput(e.target.value))}
                    />
                    <TextField
                        label='RSU (in Rs.)'
                        placeholder='750000.00'
                        type='text'
                        value={RSU}
                        onChangeHandler={(e) => setRSU(sanitizeCTCInput(e.target.value))}
                    />
                </div>
            </div>
        </>
    )
}
