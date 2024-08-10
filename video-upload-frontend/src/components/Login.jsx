import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { loginValidationSchema } from "../utils/validation";
import { useDispatch } from "react-redux";
import { LOGIN_ACCOUNT } from "../redux/features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    return dispatch(LOGIN_ACCOUNT(values))
      .unwrap()
      .then((_) => {
        return window.location.reload();
      })
      .catch((_) => {
        setSubmitting(false);
        return;
      });
  };

  const formInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {formInputs.map((input, index) => (
                <div className="mb-4" key={index}>
                  <label
                    htmlFor={input.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {input.label}
                  </label>
                  <Field
                    type={input.type}
                    id={input.name}
                    name={input.name}
                    placeholder={input.placeholder}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name={input.name}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <div>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
