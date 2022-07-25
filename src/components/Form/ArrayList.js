import { Field, FieldArray } from 'formik'
import React from 'react'

function ArrayList(props) {
    const { label, name, ...rest } = props
  return (
    <div className='group'>
        <label className='label' htmlFor={name}>{label}</label>
        <FieldArray name='urls'>
            {fieldArrayProps => {
            const { push, remove, form } = fieldArrayProps
            const { values } = form
            const { urls } = values
            console.log(urls);
            // console.log('fieldArrayProps', fieldArrayProps)
            // console.log('Form errors', form.errors)
            return (
                <div>
                {urls.map((phNumber, index) => (
                    <div key={index}>
                    <label>Name {index}</label>
                    <Field name={`urls[${index}].title`} />
                    <label>Url {index}</label>
                    <Field name={`urls[${index}].url`} />
                    {index > 0 && (
                        <button type='button' onClick={() => remove(index)}>
                        -
                        </button>
                    )}
                    </div>
                ))}
                <button type='button' onClick={() => push({title: '', url: ''})}>
                    +
                </button>
                </div>
            )
            }}
        </FieldArray>
        </div>
  )
}

export default ArrayList