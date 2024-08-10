import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/loginPage";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./PrivateRoute";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";
import Userall from "./pages/user-all";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} restricted={true} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<Signup />} restricted={true} />}
        />

        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route
          path="/view-user-videos/:id"
          element={<PrivateRoute element={<Userall />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "sans-serif",
            background: "#6821f9cf",
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default App;
