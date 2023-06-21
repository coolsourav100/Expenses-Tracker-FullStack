import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Etable from "./component/Etable";
import Forgotpassword from "./component/Forgotpassword";
import { Newpassword } from "./component/Newpassword";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path:'/expenses' ,
      element:<Etable/>
    },
    {
      path:'/resetpassword' ,
      element:<Forgotpassword/>
    },{
      path:'/password/reset/:id',
      element:<Newpassword/>
    }
  ])
  return (
    <div>
    
    <RouterProvider router={router} />
  
    </div>
  );
}

export default App;
