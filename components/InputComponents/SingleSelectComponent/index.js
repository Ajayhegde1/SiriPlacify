import inputStyles from '../../../styles/Input.module.css'

// Constants
import { defaultInputMargin } from '@/constants/appConstants'

const SingleSelectComponent = ({
  value,
  options = [],
  onChangeHandler,
  margin = defaultInputMargin,
  required = false,
  isDisabled = false
}) => {
  return (
    <div
      style={{
        margin
      }}
      className={inputStyles.wrapper}
    >

      <select
        className={isDisabled === true ? 'cursor-not-allowed bg-gray-300 border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-none focus:shadow-outline' : 'border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-none focus:shadow-outline'}
        onChange={onChangeHandler}
        value={value}
        disabled={isDisabled}
      >
        {options.map((option) => (
          <option
            key={option.id}
            className={inputStyles.option}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SingleSelectComponent
