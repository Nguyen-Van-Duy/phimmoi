import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input (props) {
  const { label, name, ...rest } = props
  return (
    <div className="group">
      <label htmlFor={name} className="label">{label}</label>
      <Field id={name} name={name} {...rest} className="input" />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input