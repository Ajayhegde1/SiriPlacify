export default function Button ({
  type="button",
  btnText,
  onClickHandler,
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      disabled={disabled}
      className={disabled === true ? 'cursor-not-allowed bg-gray-400 w-full text-white font-medium py-2 px-4 rounded' : 'w-full bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded'}
    >
      {btnText}
    </button>
  )
}
