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
import SignUpForm from './app/components/(auth_components)/SignUp.tsx';
import Admin from './app/components/Admin.tsx';
import Knowledge from './app/components/(KnowledgeSearch)/Knowledge.tsx';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },{
    path:"/login",
    element:<SignInPage/>
  },{
    path:"/signup",
    element:<SignUpForm/>
  },{
    path:"/admin",
    element:<Admin/>
  },{
    path:"/knowledge",
    element:<Knowledge/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider>
       <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
