'use client'
import React from 'react';
import { Formik, FieldArray } from 'formik';
import clsx from 'clsx';

const labelCustomStyle="text-sm text-slate-600 py-1"
const inputCustomStyle="py-2 border border-slate-300 rounded-md focus:outline-none px-2 text-gray-800"
const TicketForm = () => (
  <div className='w-full px-6 relative'>
    <h1 className='text-md font-semibold'>Create a new Ticket</h1>
    <Formik
      initialValues={{
        requester: '',
        customer: '',
        tags: [''],
        type: '',
        priority: '',
        description: '',
        productArea: '',
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className={clsx(labelCustomStyle)}>Requester</label>
            <input
              type="text"
              name="requester"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.requester}
              className={clsx(inputCustomStyle)}
            />
          </div>
          <div className='flex flex-col'>
            <label className={clsx(labelCustomStyle)}>Customer</label>
            <input
              type="text"
              name="customer"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.customer}
              className={inputCustomStyle}
            />
          </div>
          <div className='flex flex-col'>
            <label className={clsx(labelCustomStyle)}>Tags*</label>
            <FieldArray name="tags"  >
              {({ push, remove }) => (
                <div className=' flex flex-wrap justify-between items-center'>
                  <div className='flex gap-2'>
                  {values.tags.map((tag, index) => (
                    <div key={index} className='flex items-center'>
                      <input
                        type="text"
                        name={`tags.${index}`}
                        value={tag}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={clsx(inputCustomStyle,{
                            "w-[40px] py-0 text-sm text-center":(index===(values.tags.length-1)),
                            "bg-gray-500 py-0 text-sm  text-white w-[40px]":(index!==(values.tags.length-1))
                        })}
                      />
                      {index > 0 && (
                        <button type="button" className='bg-gray text-xs w-5 h-5 mx-1  text-gray-500 border rounded-full aspect-square' onClick={() => remove(index)}>
                          <span>
                            x
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  </div>
                  <button type="button" className='bg-blue-500 text-xs  h-fit py-1 my-auto px-2  text-white border rounded-md' onClick={() => push('')}>
                    Add Tag
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
          <div className='flex w- gap-4  items-center'>
          <div className='flex flex-col'>
            <label className={labelCustomStyle}>Type</label>
            <input
              type="text"
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              className={clsx(inputCustomStyle)}
            />
          </div>
          <div className='flex flex-col'>
  <label className={clsx(labelCustomStyle)}>Priority</label>
  <select
    name="priority"
    onChange={handleChange}
    onBlur={handleBlur}
    value={values.priority}
  >
    <option value="">Select Priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>
          </div>
          

          <div className='flex flex-col'>
            <label className={clsx(labelCustomStyle)}>Description*</label>
            <textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className={clsx(inputCustomStyle)}
            />
          </div>
          <div className='flex flex-col'>
            <label className={clsx(labelCustomStyle)}>Product Area</label>
            <input
              type="text"
              name="productArea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.productArea}
              className={clsx(inputCustomStyle)}
            />
          </div>
          <button type="submit" className='w-full  text-center bg-gray-700 text-white text-sm rounded-md mt-8 py-2 px-3' disabled={isSubmitting}>
            Create Ticket
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default TicketForm;
