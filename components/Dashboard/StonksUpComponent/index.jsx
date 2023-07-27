import stonksUp from '@/public/stonksUp.png'
import stonksDown from '@/public/stonksDown.png'
import NIRF from '@/public/NIRF.png'

import Image from 'next/image'

export default function StonksUpComponent({
    title,
    count,
    stonksType = 2
}) {
    return (
        <div className='mb-6 py-2 bg-white rounded-xl'>
            <div className='flex flex-col justify-center'>
                <div>
                    <h1 className='ml-6 font-DMSANS text-sm text-gray-600 text-left font-medium my-2'>
                        {title}
                    </h1>
                </div>
                <div class="pb-2 flex gap-2">
                    <div class="ml-6 flex items-center">
                        <h1 class="font-DMSANS font-medium text-black text-center text-lg md:text-2xl lg:text-lg xl:text-4xl">
                            {count < 10 ? `0${count}` : count}
                        </h1>
                    </div>
                    <div class="my-auto ml-auto mr-4 flex items-center gap-1">
                        <Image
                            src={stonksType === 1 ? NIRF : stonksType === 2 ? stonksUp : stonksDown}
                            alt="stonks up"
                            class={stonksType !== 1 ? "w-6 h-6" : 'w-8 h-8'}
                        />
                        {
                            stonksType === 1 ?
                                <>
                                </>
                                :
                                stonksType === 2 ?
                                    <span className='text-xs font-Heading'>
                                        +10% inc
                                    </span>
                                    :
                                    <span className='text-xs font-Heading'>
                                        -10% dec
                                    </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}