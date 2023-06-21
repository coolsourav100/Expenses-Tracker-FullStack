import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Etable from "./component/Etable";
import Forgotpassword from "./component/Forgotpassword";



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
    }
  ])
  return (
    <div>
    
    <RouterProvider router={router} />
  
    </div>
  );
}

export default App;
