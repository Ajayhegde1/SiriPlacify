import Label from '../Label'

export default function TextArea ({
  label,
  placeholder,
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
        className={disabled === true ? 'h-40 cursor-not-allowed bg-gray-300 block p-2.5 w-full text-sm text-black rounded border-2 border-gray-400' : 'h-40 block p-2.5 w-full text-sm text-black bg-gray-50 rounded border-2 border-gray-400'}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
