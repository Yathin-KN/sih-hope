"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../../store/userStore';
import { loginToEmployeeAPI } from '../../api/signIn';
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
  

  const navigate=useNavigate();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  
  const updateUserDetails = useUserStore((state: { updateUser: any; }) => state.updateUser);

  const handleLogin = async (values: any, actions: { setSubmitting: (arg0: boolean) => void }) => {
    actions.setSubmitting(true);
    try {
      const { email, password } = values;
  
      const { accessToken, refreshToken } = await loginToEmployeeAPI(email, password);
      if (accessToken && refreshToken) {
        updateUserDetails(accessToken, refreshToken, email);
  
        actions.setSubmitting(false);
        
        navigate("/dashboard")
      } else {
        actions.setSubmitting(false);
        throw new Error('Login failed: Invalid credentials'); 
      }
    } catch (error:any) {
      console.error('Login failed:', error.message);
      actions.setSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-center text-3xl font-bold mb-4">Login</h2>
      <a href={'/dashboard'} >Dashboard</a>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary"
              >
                {isSubmitting ? 'Loading...' : 'Login'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
