import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Customer from '../components/customer/Customer';
import Feedback from "../components/feedback/Feedback";
import Store from "../components/store/Store";
import Login from '../components/login';
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/customer"
                    element={
                        <PrivateRoute>
                            <Customer />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/store"
                    element={
                        <PrivateRoute>
                            <Store />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/feedback"
                    element={
                        <PrivateRoute>
                            <Feedback />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}
export default AppRoute;