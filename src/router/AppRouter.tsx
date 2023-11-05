import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../App.tsx";
import { PageNotFound } from "../pages/PageNotFound.tsx";
import { Item } from "../components/Item.tsx";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: ":id",
        element: <Item />,
      },
      {
        path: ":id/search",
        element: <Item />,
      },
    ],
  },
]);
