import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editTransaction } from "../store/transactionSlice";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const TransactionDetail = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const transaction = useSelector((state) =>
    Object.values(state.transactions).find((t) => t.id === parseInt(id))
  );

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Id is required"),
    payer: Yup.string().required("Payer is required"),
    payee: Yup.string().required("Payee is required"),
    amount: Yup.number().required("Amount is required"),
    status: Yup.string().required("Status is required"),
    transactionDate: Yup.string().required("Transaction Date is required"),

    invoiceNumber: Yup.string().required("Invoice Number Date is required"),
  });

  const handleSubmit = (values) => {
    dispatch(editTransaction({ id: transaction.id, data: values }));
    alert("Saved Succefully!");
    setIsEditMode(false);
  };

  if (!transaction) {
    return <div className="text-center mt-4">Transaction not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit" : null} Transaction Details
      </h2>
      <Formik
        initialValues={{
          id: transaction.id,
          transactionDate: transaction.transactionDate,
          payer: transaction.payer,
          payee: transaction.payee,
          amount: transaction.amount,
          status: transaction.status,
          invoiceNumber: transaction.invoiceNumber,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block font-semibold mb-1"
                htmlFor="transactionDate"
              >
                Transaction Date
              </label>
              <Field
                type="date"
                id="transactionDate"
                name="transactionDate"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              />
              {errors.transactionDate && touched.transactionDate && (
                <div className="text-red-500 mt-1">
                  {errors.transactionDate}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block font-semibold mb-1"
                htmlFor="invoiceNumber"
              >
                Invoice Number
              </label>
              <Field
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              />
              {errors.invoiceNumber && touched.invoiceNumber && (
                <div className="text-red-500 mt-1">{errors.invoiceNumber}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="payer">
                Payer
              </label>
              <Field
                type="text"
                id="payer"
                name="payer"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              />
              {errors.payer && touched.payer && (
                <div className="text-red-500 mt-1">{errors.payer}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="payee">
                Payee
              </label>
              <Field
                type="text"
                id="payee"
                name="payee"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              />
              {errors.payee && touched.payee && (
                <div className="text-red-500 mt-1">{errors.payee}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="amount">
                Amount
              </label>
              <Field
                type="number"
                id="amount"
                name="amount"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              />
              {errors.amount && touched.amount && (
                <div className="text-red-500 mt-1">{errors.amount}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="status">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className={`w-full p-2 border rounded ${
                  isEditMode ? "disabled" : "cursor-not-allowed"
                }`}
                disabled={!isEditMode}
              >
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
              </Field>
              {errors.status && touched.status && (
                <div className="text-red-500 mt-1">{errors.status}</div>
              )}
            </div>
            <div className="flex justify-between">
              {isEditMode ? (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              ) : (
                <span
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </span>
              )}

              <Link
                to="/"
                className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
              >
                Back
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionDetail;
