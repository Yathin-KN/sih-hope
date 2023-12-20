import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from '../../api/register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ministryImage from './ministry.png';
import backgroundImage from './img1.jpg';

const SignUpForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    age: Yup.number().min(18, 'Must be at least 18 years old').required('Age is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    department: Yup.string().required('Department is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const handleSignUp = async (values: { firstName: any; lastName: any; age: any; email: any; department: any; password: any; }, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    actions.setSubmitting(true);

    try {
      const { firstName, lastName, age, email, department, password } = values;
      const response = await registerEmployee({firstName, lastName, age, email, department, password});

      if (response) {
        actions.setSubmitting(false);
        navigate('/login');
        toast.success('Account created successfully. Please log in.');
      } else {
        actions.setSubmitting(false);
        throw new Error('Signup failed');
      }
    } catch (error:any) {
      console.error('Signup failed:', error.message);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex p-6">
      <div className=" bg-white w-1/2">
        <ToastContainer />
        <img src={ministryImage} alt="ministry" />
        <h2 className="mb-2 font-bold text-4xl text-blue-500 inline-block">Sign Up to Seva Connect</h2>
        <div className="mb-4 text-l font-medium text-gray-400 w-[853px]">
          Get started on your journey!
        </div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            department: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-m font-semibold mb-2">
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700 text-sm font-semibold mb-2">
                  Age
                </label>
                <Field
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label htmlFor="department" className="block text-gray-700 text-sm font-semibold mb-2">
                  Department
                </label>
                <Field
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Enter your department"
                  className="rounded-sm border border-spacing-4 border-inherit px-2 py-2 input-field w-full"
                />
                <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
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
                {isSubmitting ? 'Loading...' : 'Sign Up'}
              </button>
              <p>Already have an account? <a className="text-blue-500" href="/login">Log in</a></p>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex-1 w-1/2 bg-opacity-50 backdrop-filter items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Your background content */}
      </div>
    </div>
  );
};

export default SignUpForm;
