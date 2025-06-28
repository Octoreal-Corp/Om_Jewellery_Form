import Dashboard from "./components/Dashboard"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
 
import Login from "./components/Login"
import Users from "./components/Users"
import Events from "./components/Events"
import { Provider } from "react-redux"
import appStore from './utils/appStore'
function App() {
const router = createBrowserRouter(
      [
        {
          path:"/",
          element:<>
          <Dashboard/>
          </>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:'/users',
          element:<Users/>
        },
        {
          path:'/events',
          element:<Events/>
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