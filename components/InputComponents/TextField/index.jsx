import Label from "../Label";

export default function TextField({
  label,
  placeholder,
  onChangeHandler,
  onClickHandler,
  regex,
  value,
  onBlur,
  maxLength = 500,
  type = "text",
  required = false,
  disabled = false,
}) {
  return (
    <div className="mb-6">
      <Label label={label} />
      <input
        onBlur={onBlur}
        pattern={regex}
        className={
          disabled === true
            ? "cursor-not-allowed bg-gray-300 border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-green-800  focus:shadow-outline"
            : "border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-green-800  focus:shadow-outline"
        }
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onClick={onClickHandler}
        value={String(value)}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
