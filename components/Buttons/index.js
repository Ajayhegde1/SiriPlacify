export default function Button({
    btnText
}) {
    return (
        <button 
            class="w-full bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
        >
            {btnText}
        </button>
    )
}