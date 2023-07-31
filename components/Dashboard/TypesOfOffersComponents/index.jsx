import StonksUpComponent from "../StonksUpComponent"
import TierTableComponent from "../TierTableComponent"

export default function TypesOfOfferComponents() {
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
                <div className='col-span-1'>
                    <div className="grid grid-rows-2 gap-0 md:gap-4">
                        <StonksUpComponent
                            title='Number of internship offers'
                            count={250}
                            stonksType={2}
                        />
                        <StonksUpComponent
                            title='Number of PPOS rolled out'
                            count={360}
                            stonksType={3}
                        />
                    </div>
                </div>
                <div className='col-span-2'>
                    <TierTableComponent />
                </div>
            </div>
        </div>
    )
}