"use client"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react'; 
import { useAtom } from 'jotai';
import { ticketDataIdInView } from './../../../app/(pages)/dashboard/page';
import { closeTicket } from './../../../app/api/closeTicket';
import useUserStore from './../../../app/store/userStore';
import { refetchAtomTrigger } from './../../../app/(pages)/layout';

function ResolutionForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const initialValues = {
    resolutionComment: '',
  };

  const validationSchema = Yup.object().shape({
    resolutionComment: Yup.string().required('Resolution comment is required'),
  });
  const [ticketId,_]=useAtom(ticketDataIdInView)
  const accessToken=useUserStore.getState().accessToken;
  const[__,refetchTrigger]=useAtom(refetchAtomTrigger)
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { resolutionComment } = values;

    try {
      if (ticketId) {
        await closeTicket(ticketId, resolutionComment,accessToken || "");

        console.log('Ticket closed successfully');
      } else {
        console.error('No ticket ID available to close');
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error closing ticket:', error);
      // Handle error scenarios here
    }finally{
      refetchTrigger((prev)=>!prev)
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-[30vw] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer focus:outline-none"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-semibold mb-4">Submit as Solved</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4">
                <Field
                  as="textarea"
                  name="resolutionComment"
                  placeholder="Enter resolution comment"
                  className="border border-gray-300 rounded p-2"
                />
                {errors.resolutionComment && touched.resolutionComment && (
                  <div className="text-red-500 text-sm">{errors.resolutionComment}</div>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
}

export default ResolutionForm;
