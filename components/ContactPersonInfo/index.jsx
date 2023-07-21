import TextField from "../InputComponents/TextField"

export default function ContactPersonInfo ({
    contactPersonName,
    contactPersonPhoneNumber,
    contactPersonEmail,
    setContactPersonName,
    setContactPersonPhoneNumber,
    setContactPersonEmail
}){
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <TextField
                label='Name of the contact person'
                placeholder='ABC sharma'
                type='text'
                value={contactPersonName}
                onChangeHandler={(e) => setContactPersonName(e.target.value)}
            />
            <TextField
                label='Phone Number of the contact person'
                placeholder='9123123123'
                type='text'
                value={contactPersonPhoneNumber}
                onChangeHandler={(e) => setContactPersonPhoneNumber(e.target.value)}
            />
            <TextField
                label='Email ID of the contact person'
                placeholder='Btech@gmail.com'
                type='email'
                value={contactPersonEmail}
                onChangeHandler={(e) => setContactPersonEmail(e.target.value)}
            />
        </div>
    )
}