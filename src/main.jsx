import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import LocationProvider from "./providers/LocationProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LocationProvider>
        <ThemeProvider>
          <>
            <ToastContainer></ToastContainer>
            <RouterProvider router={router}></RouterProvider>
          </>
        </ThemeProvider>
      </LocationProvider>
    </AuthProvider>
  </StrictMode>
);
