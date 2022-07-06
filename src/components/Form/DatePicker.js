import React from 'react'
// import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker (props) {
  const { label, name, ...rest } = props
  return (
    <div className='group'>
      <label className='label' htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} className="date" />
        {/* {({ form, field }) => {
          console.log(form, field)
          const { setFieldValue } = form
          const { value } = field
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={val => setFieldValue(name, val)}
            />
          )
        }}
      </Field> */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default DatePicker
