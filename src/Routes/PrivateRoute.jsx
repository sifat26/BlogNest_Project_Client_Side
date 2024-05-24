import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

const PrivateRoute = ({children}) => {
    const{user,loading} =useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <Loader></Loader>
    }
    if(!user){
        return <Navigate to="/login" state={location?.pathname || '/'} />;
    }
    return (
        <div>
            {children}
        </div>
    )
};

export default PrivateRoute;
PrivateRoute.propTypes={
    children: PropTypes.node

}