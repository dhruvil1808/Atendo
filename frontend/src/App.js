
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout, Landing, Login, Logout, Register, Nav, NewSession, StudentDashboard } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "teacher-dashboard",
        element: <Dashboard />,
      },
      {
        path: "student-dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "create-session",
        element: <NewSession />,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <Nav />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
