import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './app/(pages)/dashboard/page.tsx';
import Provider from './assets/app/utils/Provider.tsx';
import SignInPage from './app/(auth)/page.tsx';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },{
    path:"/login",
    element:<SignInPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider>
       <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
