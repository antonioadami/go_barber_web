import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Content, AnimationContainer, Backgorund } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { addToast } = useToast();

    const location = useLocation();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Confirmação incorreta',
                    ),
                });

                await schema.validate(data, { abortEarly: false });

                const { password, password_confirmation } = data;
                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error();
                }

                await api.post('/password/reset', {
                    password,
                    password_confirmation,
                    token,
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na resetar senha',
                    description:
                        'Ocorreu um erro ao resetar sua senha, cheque as credenciais.',
                });
            }
        },
        [addToast, history, location.search],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Nova senha"
                        />

                        <Input
                            name="password_confirmation"
                            icon={FiLock}
                            type="password"
                            placeholder="Confirmar senha"
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Backgorund />
        </Container>
    );
};

export default ResetPassword;
