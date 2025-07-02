import Dashboard from "./components/Dashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
 
import Login from "./components/Login"
import Users from "./components/Users"
import Events from "./components/Events"
import { Provider } from "react-redux"
import appStore from './utils/appStore'
import Customers from "./components/Customers"
import AddEvent from "./components/AddEvent"
import Roles from "./components/Roles"
function App() {
const router = createBrowserRouter(
      [
        {
          path:"/",
          element:<>
          <Customers/>
          </>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:'/customers',
          element:<Customers/>
        }
        ,
        {
          path:'/users',
          element:<Users/>
        },
        {
          path:'/events',
          element:<Events/>,
        },
         {
          path:'/roles',
          element:<Roles/>,
        },
        {
          path:'/events/addEvent',
          element:<AddEvent/> 
        },
         {
          path:'/dashboard',
          element:<Dashboard/>
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
export default App