import Label from '../Label'

export default function TextArea ({
  label,
  placeholder,
  maxLength = 500,
  rows,
  onChangeHandler,
  value,
  required = false,
  disabled = false
}) {
  return (
    <div class='mb-6'>
      <Label
        label={label}
      />
      <textarea
        rows={rows}
        className={disabled === true ? 'cursor-not-allowed bg-gray-300 block p-2.5 w-full text-sm text-black rounded border-2 border-gray-400' : 'block p-2.5 w-full text-sm text-black bg-gray-50 rounded border-2 border-gray-400'}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
