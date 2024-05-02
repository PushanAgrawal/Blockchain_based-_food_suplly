import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
// import Hero  from "./components/hero/hero";
// import Companies from "./components/companies/Companies";
// import Resedencies from "./components/Resedencies/Resedencies";
import {
  BrowserRouter,
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
      <div className="app flex flex-col gap-6">

    <Header></Header>
    
    <RouterProvider router={router} />
    <BrowserRouter router={router}>
    <Footer></Footer>
    </BrowserRouter>
     </div>
  );
}

export default App;
