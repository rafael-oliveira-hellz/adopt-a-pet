import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseFlashMessage from './useFlashMessage';

const useAuth = () => {
    
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = UseFlashMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        } 
    }, []);

    async function register(user) {

        let messageText = 'Cadastro realizado com sucesso!';
        let messageType = 'success';
        
        try {
            const data = await api.post('/users/register', user)
            .then(response => {
                return response.data
            })

            await authUser(data);
        } catch (failure) {
            messageText = failure.response.data.error;
            messageType = 'error';
        }

        setFlashMessage(messageText, messageType);
    }

    async function authUser(data) {

        setAuthenticated(true);

        localStorage.setItem('token', JSON.stringify(data.token));

        navigate('/');
    }

    function logout() {
        const messageText = 'Logout realizado com sucesso!';
        const messageType = 'success';

        localStorage.removeItem('token');
        setAuthenticated(false);
        api.defaults.headers.Authorization = null;
        navigate('/');

        setFlashMessage(messageText, messageType);
    }

    return { register, authenticated, logout };
};

export default useAuth;