import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

const initialValues = {
  // the keys must be named acordingly to the name attribute in the input
  name: "",
  email: "",
  channel: "",
}

const onSubmit = (values) => {
  //in a real case example this field should be filled with an API
  //   console.log("form data -->", values)
}

const validate = (values) => {
  //values.name values.email values.channel
  //errors.name errors.email errors.channel
  // errors.name = "this field is required"
  // the function must return an object
  let errors = {}

  if (!values.name) {
    errors.name = " Required"
  }
  if (!values.email) {
    errors.email = " Required"
  } else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format"
  }
  if (!values.channel) {
    errors.channel = " Required"
  }

  return errors
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  channel: Yup.string().required("Required!"),
})

const OldYoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  })

  //   console.log("form errors ---> ", formik.values)
  //   console.log("form errors ---> ", formik.errors)
  console.log("form errors ---> ", formik.touched)

  return (
    <div>
      <form className="formBox" onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            //Managing the state
            onChange={formik.handleChange}
            //Check if the field was visited^(in console.log is the "touched object")
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default OldYoutubeForm
