import StonksUpComponent from "../StonksUpComponent"

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
                    <div class="bg-white rounded-lg p-4">
                        <h2 class="ml-3 mt-2 mb-3 text-2xl font-bold mb-2">Tier Offers</h2>
                        <table class="w-full">
                            <tr class="border-b border-gray-300">
                                <td class="py-2 px-4 text-base md:text-xl font-medium">Tier 1</td>
                                <td class="py-2 px-4 text-base md:text-xl text-left font-medium">340 offers</td>
                            </tr>
                            <tr class="border-b border-gray-300">
                                <td class="py-2 px-4 text-base md:text-xl font-medium">Tier 2</td>
                                <td class="py-2 px-4 text-base md:text-xl text-left font-medium">341 offers</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4 text-base md:text-xl font-medium">Tier 3</td>
                                <td class="py-2 px-4 text-base md:text-xl text-left font-medium">343 offers</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}