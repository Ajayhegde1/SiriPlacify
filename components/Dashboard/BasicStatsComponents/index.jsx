import StonksUpComponent from '@/components/Dashboard/StonksUpComponent'

export default function BasicStatsComponents() {
    return (
    <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8'>
        <StonksUpComponent
            title='Current NIRF ranking'
            count={5}
            stonksType={1}
        />
        <StonksUpComponent
            title='Number of students graduating'
            count={4085}
            stonksType={2}
        />
        <StonksUpComponent
            title='Number of students registered'
            count={2052}
            stonksType={2}
        />
        <StonksUpComponent
            title='Number of students placed'
            count={520}
            stonksType={2}
        />
        <StonksUpComponent
            title='Number of companies visited'
            count={64}
        />
        <StonksUpComponent
            title='Number of offers rolled out'
            count={35}
            stonksType={2}
        />
    </div>
    )
}