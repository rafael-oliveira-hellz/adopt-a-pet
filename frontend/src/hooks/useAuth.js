import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseFlashMessage from './useFlashMessage';

const useAuth = () => {

    async function register(user) {

        const { setFlashMessage } = UseFlashMessage();

        let messageText = 'Cadastro realizado com sucesso!';
        let messageType = 'success';
        
        try {
            const data = await api.post('/users/register', user)
            .then(response => {
                return response.data
            })

            console.log(data);
        } catch (failure) {
            messageText = failure.response.data.error;
            messageType = 'error';
        }

        setFlashMessage(messageText, messageType);
    }

    return { register };
};

export default useAuth;