import React from "react"
import { useState } from "react"
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik"
import * as Yup from "yup"
import TextError from "./TextError"

const initialValues = {
  // the keys must be named acordingly to the name attribute in the input
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
}

const savedValues = {
  name: "André",
  email: "andregn26@gmail.com",
  channel: "Youtube",
  comments: "Olá Mundo",
  address: "Av. heróis da liberdade 11 7dto",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
}

const onSubmit = (values, onSubmitProps) => {
  //in a real case example this field should be filled with an API
  console.log("form data -->", values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  channel: Yup.string().required("Required!"),
  //   comments: Yup.string().required("Required!"),
})

const validadeComments = (value) => {
  let error
  if (!value) {
    error = "Required!"
  }
  return error
}

const YoutubeForm = () => {
  const [formValues, setFormValues] = useState(null)
  return (
    <Formik
      // initialValues={initialValues}
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      //   validateOnMount // good for small forms
      //   validateOnChange={false}
      //   validateOnBlur={false}
    >
      {(formik) => {
        console.log("formik -->", formik)
        return (
          <Form className="formBox">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="Type the name of the channel"
              />
              <ErrorMessage name="channel" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                type="text"
                id="comments"
                name="comments"
                validate={validadeComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumber[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone Number</label>
              <Field type="text" id="secondaryPh" name="phoneNumber[1]" />
            </div>

            <div className="form-control">
              <label htmlFor="">List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  //   console.log("form errors -->", form.errors)
                  return (
                    <div>
                      {phNumbers.map((phone, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>
            </div>

            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button>
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Save Data
            </button>
            <button
              type="reset"
              disabled={formik.isValid || formik.isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={
                !(formik.dirty && formik.isValid) || formik.isSubmitting
              }
            >
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default YoutubeForm
