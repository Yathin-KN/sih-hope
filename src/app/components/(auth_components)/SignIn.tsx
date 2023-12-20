// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { loginToEmployeeAPI } from '../../api/signIn';
// import useUserStore from '../../store/userStore';
// import { ToastContainer, toast } from 'react-toastify';

// const SignInForm = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const updateUserDetails = useUserStore((state) => state.updateUser);

//   const handleLogin = async (values: { email: any; password: any; }, actions: { setSubmitting: (arg0: boolean) => void; }) => {
//     actions.setSubmitting(true);

//     try {
//       const { email, password } = values;
//       const { accessToken, refreshToken } = await loginToEmployeeAPI(email, password);

//       if (accessToken && refreshToken) {
//         updateUserDetails(accessToken, refreshToken, email);
//         actions.setSubmitting(false);
//         navigate('/dashboard');
//         toast.success("Sucessfully logged in")
//       } else {
//         actions.setSubmitting(false);
//         throw new Error('Login failed: Invalid credentials');
//       }
//     } catch (error:any) {
//       console.error('Login failed:', error.message);
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     // <div className="flex justify-end ">
//       <div className="h-screen flex items-center justify-center bg-cover" style={{backgroundImage: 'url("./img1.jpg")'}} >
//       <div className='bg-blue-500'></div>
//     <div className="  p-16 bg-white drop-shadow-md rounded-lg">
//     <ToastContainer/>
//       <h2 className="mb-2 font-semibold inline-block ">Login to Seva.ai</h2>
//       <div className=" mb-4 text-l font-medium text-gray-400  w-[853px]">
//             It's not long before you embark on this journey!
//           </div>
//       <Formik
//         initialValues={{ email: '', password: '' }}
//         validationSchema={validationSchema}
//         onSubmit={handleLogin}
//       >
//         {({ isSubmitting }) => (
//           <Form className="flex flex-col space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-gray-700 text-m font-semibold mb-2">
//                 Email
//               </label>
//               <Field
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="rounded-sm  border border-spacing-4 border-inherit px-2 py-2 input-field "
//               />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
//                 Password
//               </label>
//               <Field
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 className="rounded-sm  border border-spacing-4 border-inherit px-2 py-2 input-field"
//               />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded m hover:bg-blue-600 hover:font-bold hover:text-m hover:drop-shadow-xl"
//             >
//               {isSubmitting ? 'Loading...' : 'Login'}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//     </div>
    
//   );
// };

// export default SignInForm;



import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginToEmployeeAPI } from '../../api/signIn';
import useUserStore from '../../store/userStore';
import { ToastContainer, toast } from 'react-toastify';
import Ing from "./img1.jpg"
import Min from "./ministry.png"
const SignInForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const updateUserDetails = useUserStore((state) => state.updateUser);

  const handleLogin = async (values: { email: any; password: any; }, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    actions.setSubmitting(true);

    try {
      const { email, password } = values;
      const { accessToken, refreshToken } = await loginToEmployeeAPI(email, password);

      if (accessToken && refreshToken) {
        updateUserDetails(accessToken, refreshToken, email);
        actions.setSubmitting(false);
        navigate('/dashboard');
        toast.success("Successfully logged in")
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
    <div className="flex p-10 ">
      
        <div className="p-16 bg-white   w-1/2">
          <ToastContainer />
          <img src={Min} alt="ministry" />
          <h2 className="mb-2 font-bold text-4xl text-blue-500 inline-block ">Login to Seva Connect</h2>
          <div className="mb-4 text-l font-medium text-gray-400 w-[853px]">
            It's not long before you embark on this journey!
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-m font-semibold mb-2">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded m hover:bg-blue-600 hover:font-bold hover:text-m hover:drop-shadow-xl"
                >
                  {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                <p>Havent created an account yet <a className='text-blue-500' href='/signup'>( sign in )</a></p>
              </Form>
            )}
          </Formik>
        </div>
      
      <div className="flex-1 w-1/2 bg-opacity-50 backdrop-filter items-center justify-center " style={{ backgroundColor: '#085569' }}>
            <img src={Ing} alt="ministry of comerce and industries" className = " h-full  object-contain mt-10 " />
      </div>
    </div>
  );
};

export default SignInForm;

