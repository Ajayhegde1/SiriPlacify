import inputStyles from '../../../styles/Input.module.css'

// Constants
import { defaultInputMargin } from '@/constants/appConstants'

const SingleSelectComponent = ({
  value,
  options = [],
  onChangeHandler,
  margin = defaultInputMargin,
  required = false
}) => {
  return (
    <div
      style={{
        margin
      }}
      className={inputStyles.wrapper}
    >

      <select
        className={inputStyles.container1}
        onChange={onChangeHandler}
        value={value}
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
