import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioButtons (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='group'>
      <label className='label'>{label}</label>
      <div className='radio-group'>
      <Field className='radio' name={name} >
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label style={{marginRight: "20px"}} htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default RadioButtons