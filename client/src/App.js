import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Etable from "./component/Etable";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },{
      path:'/expenses' ,
      element:<Etable/>
    }
  ])
  return (
    <div>
    
    <RouterProvider router={router} />
  
    </div>
  );
}

export default App;
