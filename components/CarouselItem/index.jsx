export default function CarouselItem({
    Image,
    Title,
    category,
    Para,
    Date
}) {
    return (
        <div className="bg-white pb-6 mx-0 md:mx-4 lg:mx-12 rounded-2xl relative">
            {Image}
            <div className="absolute top-4 right-4 bg-green-700 text-white rounded-2xl px-3 font-bold text-base">
                {Date}
            </div>
            <div className="p-4">
                <h2 className="font-bold bg-black text-white px-4 py-1 rounded-2xl mb-4 inline-block">
                    {category}
                </h2>
                <h1 className="text-2xl font-bold font-Heading mb-4">{Title}</h1>
                <p className="max-h-16 overflow-y-auto line-clamp-3">{Para}</p>
            </div>
        </div>
    )
}