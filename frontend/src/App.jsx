import Header from "./components/header/header";
// import Hero  from "./components/hero/hero";
// import Companies from "./components/companies/Companies";
// import Resedencies from "./components/Resedencies/Resedencies";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Info from "./components/info/Info";
import Uni from "./components/university/Uni";
import Admin from "./components/admin/Admin";
import StudentInfo from "./components/StudentInfo/StudentInfo";
import MainPage from "./components/MainPage/MainPage";
const router = createBrowserRouter([
  {
    path: "/student",
    element: <StudentInfo></StudentInfo>,
    
  },
  {
    path: "/",
    element: <MainPage></MainPage>,
    
  },
  {
    path:"/uni",
    element:<Uni></Uni>
  },
  {
    path:"/admin",
    element:<Admin></Admin>
  }
]);



function App() {
  return (
      <div className="app">
    <div>
    <div className="white-grad"/>
    <Header></Header>
    
    {/* <Hero></Hero> */}

    </div>
  
    <RouterProvider router={router} />
    {/* <Companies></Companies> */}
    {/* <Resedencies></Resedencies>   */}
     </div>
  );
}

export default App;
