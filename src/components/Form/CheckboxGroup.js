import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function CheckboxGroup (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='group'>
      <label className='label'>{label}</label>
      <div className='checkbox-group'>
      <Field className='checkbox_list' name={name}>
        {({ field }) => {
          return options.map(option => {
            return (
              <div className='checkbox_item' key={option.key}>
                <input
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label className='label-checkbox' htmlFor={option.value}>{option.key}</label>
              </div>
            )
          })
        }}
      </Field>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default CheckboxGroup