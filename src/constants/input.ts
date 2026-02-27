export const defaultIntegerMinValue = -2147483647 // postgres integer min value
export const defaultIntegerMaxValue = 2147483647 // postgres integer max value

const integerMinValue = parseInt(process.env.INTEGER_MIN_VALUE || defaultIntegerMinValue.toString())
const integerMaxValue = parseInt(process.env.INTEGER_MAX_VALUE || defaultIntegerMaxValue.toString())

export const INTEGER_MIN_VALUE = isNaN(integerMinValue) ? defaultIntegerMinValue : integerMinValue
export const INTEGER_MAX_VALUE = isNaN(integerMaxValue) ? defaultIntegerMaxValue : integerMaxValue
