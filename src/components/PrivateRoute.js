import React,{useContext} from 'react';
import {Navigate} from 'react-router-dom';
import{AuthContext} from '../contexts/AuthContext';
 const PrivateRoute= ({component: Component})=>{
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Component/>: <Navigate to="/login"/>;

 };
 export default PrivateRoute;