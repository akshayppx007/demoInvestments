import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/layouts/loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getUserProfile } from "../actions/userActions";

const ProtectedRoutes = ({admin}) => {
	const dispatch = useDispatch();
    const { loading, error, user, isAuthenticated } = useSelector(
		(state) => state.persistedReducer.user
	);

    useEffect(() => {
        if(!user) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated, user, loading, dispatch]);

    if (loading) {
        return <Loader />;
      } else if (
        isAuthenticated === true &&
        user &&
        user.isAdmin === true &&
        admin === true
      ) {
        return <Outlet />;
      } else if (
        isAuthenticated === true &&
        user &&
        user.isAdmin === false &&
        admin === false
      ) {
        return <Outlet />;
      } else if (isAuthenticated === true && user && user.isAdmin === false) {
        return (
            <Navigate to="/home" />
        );
      } else {
        // toast.error("authorization required to access protected routes");
        return <Navigate to="/" />;
      }
    
};

export default ProtectedRoutes;
