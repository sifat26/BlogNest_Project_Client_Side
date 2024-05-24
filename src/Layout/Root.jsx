import { Outlet } from "react-router-dom";
import { NavBar } from "../Pages/Shared/NavBar";
import Footer from "../Pages/Shared/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <div>
            <NavBar/>
            <Outlet></Outlet>
            <Footer/>
            <Toaster/>
            
        </div>
    );
};

export default Root;