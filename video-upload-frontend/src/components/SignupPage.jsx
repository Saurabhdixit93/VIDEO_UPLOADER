import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signupValidationSchema } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_ACCOUNT } from "../redux/features/userSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    return dispatch(CREATE_ACCOUNT(values))
      .unwrap()
      .then(() => {
        resetForm();
        return navigate("/login");
      })
      .catch((_) => {
        return;
      });
  };

  const fieldInputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      required: true,
    },

    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      required: true,
    },

    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {fieldInputs.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`${
                  isSubmitting || loading
                    ? " cursor-not-allowed opacity-50  "
                    : ""
                } w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
