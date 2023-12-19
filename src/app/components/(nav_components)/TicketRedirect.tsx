"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { sendAssignmentRequest } from '../../api/reassignTicket';
import { AssignmentRequest } from '../../types';
import useUserStore from '../../store/userStore';

const AssignmentForm = ({ticket_id}:{ticket_id:string}) => {
  
  const initialValues = {
    assigneeId: '',
    assignedType: 'new',
    assignmentReason: '',
  };

  const accessToken = useUserStore((state: { accessToken: any; }) => state.accessToken);
  
  const validationSchema = Yup.object().shape({
    assigneeId: Yup.string().required('Assignee ID is required'),
    assignedType: Yup.string().required('Assigned Type is required'),
    assignmentReason: Yup.string().required('Assignment Reason is required'),
  });

  const handleSubmit = async (values: any) => {
    console.log(values)
    try {
      const assignmentData: AssignmentRequest = {
        assigned_to: values.assigneeId,
        assignment_type: values.assignedType,
        comment: values.assignmentReason,
      };
      await sendAssignmentRequest({
        ticket_id:ticket_id,
        requestData:assignmentData,
        accessToken:accessToken || ""
      });
    } catch (error) {
      console.error('Error in submitting assignment:', error);
    }
  };

  return (
    <div className='w-fit p-4 bg-white border rounded-md shadow-md'>
         <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({  }) => (
        <Form className="w-full mx-auto min-w-max flex flex-col gap-2">
          <div className="bg-white">
            <label htmlFor="assigneeId" className="block text-gray-500 text-sm  mb-2">
              Employee ID (Assignee)
            </label>
            <Field
              id="assigneeId"
              name="assigneeId"
              type="text"
              className="w-full border rounded-md py-2 px-3 text-gray-500 text-sm leading-tight "
            />
            <ErrorMessage name="assigneeId" component="div" className="text-red-500 text-xs" />
          </div>

       

          <div className="">
            <label htmlFor="assignedType" className="block text-gray-500 text-sm  mb-2">
              Assigned Type
            </label>
            <Field
              as="select"
              id="assignedType"
              name="assignedType"
              className="w-full border rounded-md py-2 px-3 text-gray-500 text-sm leading-tight "
            >
              <option value="New">New</option>
              <option value="Reassignment">Reassignment</option>
            </Field>
            <ErrorMessage name="assignedType" component="div" className="text-red-500 text-xs" />
          </div>

          <div className="">
            <label htmlFor="assignmentReason" className="block text-gray-500 text-sm  mb-2">
              Assignment Reason
            </label>
            <Field
              as="textarea"
              id="assignmentReason"
              name="assignmentReason"
              type="text"
              className="w-full border rounded-md py-2 px-3 text-gray-500 text-sm leading-tight "
            />
            <ErrorMessage name="assignmentReason" component="div" className="text-red-500 text-xs" />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 mt-2 px-3 text-sm  rounded "
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};



export default function TicketRedirect({ticket_id}:{ticket_id:string}) {
  return (
    <div className='relative z-10'>
        <AssignmentForm ticket_id={ticket_id}/>
    </div>
  )
}
