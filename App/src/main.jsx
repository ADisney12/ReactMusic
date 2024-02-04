import * as React from "react";
import App from "./App.jsx"
import Login from "./login.jsx";
import SignUp from "./SignUp.jsx";
import Search from "./Search.jsx";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/home/:id",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },  
  {
    path: "/SignUp",
    element: <SignUp/>,
  },
  {
    path: ":id/Search/:SearchQuery",
    element: <Search />
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);