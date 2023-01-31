import React from "react"
import { useFormik } from "formik"

const YoutubeForm = () => {
  const formik = useFormik({
    // the keys must be named acordingly to the name attribute in the input
    initialValues: {
      name: "",
      email: "",
      channel: "",
    },
  })

  console.log("form values -->", formik.values)

  return (
    <div>
      <form className="formBox" action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default YoutubeForm
