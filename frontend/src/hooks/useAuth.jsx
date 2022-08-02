import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import React from 'react';

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;