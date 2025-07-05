 
import Dashboard from "./components/Dashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
 
import Login from "./components/Login"
import Users from "./components/Users"
import Form from "./components/Form"
import Events from "./components/Events"
import { Provider } from "react-redux"
import appStore from './utils/appStore'
import Customers from "./components/Customers"
import AddEvent from "./components/AddEvent"
import Roles from "./components/Roles"
import PrivateRoute from "./components/PrivateRoute";
 
function App() {
const router = createBrowserRouter(
      [
        {
          path:"/",
          element: (
           <PrivateRoute>
            <Customers />
          </PrivateRoute>
         ),
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:'/customers',
          element: (
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        ),
        }
        ,
        {
          path: "/customers/new",              
          element: <Form />                    
        },
        {
          path:'/users',
          element:<Users/>
        },
        {
          path:'/events',
          element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
          ),
        },
         {
          path:'/roles',
          element: (
          <PrivateRoute>
            <Roles />
          </PrivateRoute>
         ),
        },
        {
          path:'/events/addEvent',
          element: (
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
          ),
        },
         {
          path:'/dashboard',
          element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        }
      ]
     )
  return (
 
     
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Provider store={appStore}>
        <RouterProvider router={router} /> 
        </Provider>
    </div>
  )
 
}

export default App;