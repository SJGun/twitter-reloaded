import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import Home from '../routes/home';

export default function ProtectedRoute({ children }) {
    const user = auth.currentUser;
    if (user === null) {
        return <Navigate to="/login" />;
    }
    
    return (
        <div>
            {children || <Home />}
        </div>
    );
}
