import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            // Store the attempted URL for redirecting after login
            navigate('/login', { 
                state: { from: location.pathname }
            });
        }
    }, [user, navigate, location]);

    return user ? children : null;
}

export default RequireAuth