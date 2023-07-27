export default function SalaryStatsComponents() {
    return (
        <div className="mt-4 mb-6 p-4 bg-customOrange rounded-lg">
            <h1 className="text-left pt-2 text-lg font-semibold text-black mb-4">Salary package offered</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                <div className="flex gap-4 border-r-0 md:border-r-2 border-black">
                    <h1 className="text-xl md:text-3xl text-black font-bold">8.96</h1>
                    <div className="pr-4">
                        <p className="text-md text-black font-semibold">Minimum</p>
                        <p className="text-sm text-black font-semibold">(Per annum – in lakh)</p>
                    </div>
                </div>
                <div className="flex gap-0 border-r-0 xl:border-r-2 border-black">
                    <h1 className="text-xl md:text-3xl text-black font-bold mr-2">10 - 20</h1>
                    <div className="pr-2">
                        <p className="text-md text-black font-semibold">Medium</p>
                        <p className="text-sm text-black font-semibold">(Per annum – in lakh)</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <h1 className="ml-0 xl:ml-2 text-xl md:text-3xl text-black font-bold">20.34</h1>
                    <div className="pr-4">
                        <p className="text-md text-black font-semibold">Minimum</p>
                        <p className="text-sm text-black font-semibold">(Per annum – in lakh)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}