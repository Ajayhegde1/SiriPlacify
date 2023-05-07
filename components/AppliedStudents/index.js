import Candidates from "../Candidates";

export default function AppliedStudents() {
    return (
        <div className='ml-2 md:ml-10 mt-5 bg-white p-4 mr-5 lg:mr-20 rounded-lg'>
            <p className='shadow-md border-t-4 border-amber-500 pb-2 pt-5 text-black font-medium text-xl font-Heading pl-4'>Applied</p>
            <Candidates />
        </div>
    )
}