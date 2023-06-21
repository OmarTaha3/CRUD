import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./state/index";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const DetailPost = React.lazy(() => import("./pages/DetailPost"));

const loaderHandler = (id, Component) => {
  if (isNaN(id)) {
    throw new Response("Bad Request", {
      statusText: "Please make sure to insert correct post ID",
      status: 400,
    });
  }
  return <Component />;
};

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback="Loading Please Wait...">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="Loading Please Wait...">
            <EditPost />
          </Suspense>
        ),
        loader: ({ params }) => {
          return loaderHandler(params.id, EditPost);
        },
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback="Loading Please Wait...">
            <DetailPost />
          </Suspense>
        ),
        loader: ({ params }) => {
          return loaderHandler(params.id, DetailPost);
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);
