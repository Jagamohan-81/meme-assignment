import React from "react";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate()
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    
    email: Yup.string().email().required(),
    password:Yup.string().required()
    
  });
  const handleSubmitLogin =(values,setSubmitting)=>{
    let Email='test@gmail.com'
    let Pass='Test@123'
    if(values.email==Email&&values.password==Pass){
      localStorage.setItem('user',JSON.stringify(values.email))
      navigate('/main')
    }else{
      alert('Enter correct email or password')
    }
    
    setSubmitting(false)
console.log(values)
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmitLogin(values,setSubmitting)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          
          /* and other goodies */
        }) => (
          <div className="login-main-div">
            <div className="login-form row shadow-none p-3  rounded">
                <h1 className="m-4">Welcome back!</h1>
              <Form onSubmit={handleSubmit} className="form-control">
                <div className="">
                  <label htmlFor="email" className="col-md-3">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="col-md-8 m-2"
                  />
                  <span className="" style={{color:'red'}}>
                  {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div>
                  <label htmlFor="password" className="col-md-3">
                    Password :
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="col-md-8 m-2"
                  />
                </div>
                <span className="" style={{color:'red'}}> {errors.password && touched.password && errors.password}</span>
               
                <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary m-20"
                >
                  Log In
                </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
