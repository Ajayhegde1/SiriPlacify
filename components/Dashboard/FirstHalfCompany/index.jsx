import StonksUpComponent from "../StonksUpComponent"

export default function FirstHalfCompany(){
    return(
        <div className='col-span-1 2xl:col-span-2 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4'>
            <StonksUpComponent
                title='Planned hiring'
                count={250}
                stonksType={4}
            />
            <StonksUpComponent
                title='Hired candidates'
                count={190}
                stonksType={5}
            />
            <StonksUpComponent
                title='Colleges/ Universities'
                count={25}
                stonksType={2}
            />
            <StonksUpComponent
                title='Total Applicants'
                count={12250}
                stonksType={2}
            />
            <StonksUpComponent
                title='Shortlisted candidates'
                count={2860}
                stonksType={6}
            />
            <StonksUpComponent
                title='Student in test stage'
                count={1892}
                stonksType={7}
            />
            <StonksUpComponent
                title='Rejected candidates'
                count={9860}
                stonksType={8}
            />
            <StonksUpComponent
                title='Interviewed candidates'
                count={1560}
                stonksType={9}
            />
        </div>
    )
}