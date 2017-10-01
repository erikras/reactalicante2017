import React from 'react'
import ReactDOM from 'react-dom'
import { reduxForm, Field } from 'redux-form'
import showResults from './showResults'
import provinces from '../data/provinces'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 5) {
    errors.firstName = 'Too long!'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  return errors
}

const makeRenderer = render => ({ input, meta, label, ...rest }) => {
  return (
    <div
      className={[
        meta.active ? 'active' : '',
        meta.touched && meta.error ? 'error' : ''
      ].join(' ')}
    >
      <label>
        {label}
      </label>
      {render(input, label, rest)}
      {meta.touched &&
        meta.error &&
        <span>
          {meta.error}
        </span>}
    </div>
  )
}

const renderInput = makeRenderer((input, label) =>
  <input {...input} placeholder={label} />
)

const renderSelect = makeRenderer((input, label, { children }) =>
  <select {...input}>
    {children}
  </select>
)

let DemoForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(showResults)}>
      <Field name="firstName" component={renderInput} label="First Name" />
      <Field name="lastName" component={renderInput} label="Last Name" />
      <Field name="email" component={renderInput} label="Email" />
      <Field name="province" component={renderSelect} label="Province">
        <option />
        {provinces.map(province =>
          <option key={province} value={province}>
            {province}
          </option>
        )}
      </Field>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" onClick={reset} disabled={pristine || submitting}>
          Reset Form
        </button>
      </div>
    </form>
  )
}

DemoForm = reduxForm({
  form: 'demoForm',
  destroyOnUnmount: false,
  validate
})(DemoForm)

export default DemoForm
