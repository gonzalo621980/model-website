import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { REQUEST_METHOD } from "../../consts/requestMethodType";
import { APIS } from '../../config/apis';
import { ServerRequest } from '../../utils/apiweb';
import { login } from '../../context/redux/actions/authAction';
import { addLog } from '../../context/redux/actions/logAction';
import { useForm } from '../../components/hooks/useForm';
import Loading from '../../components/common/Loading';

import './index.scss';


function LoginView() {

    const [state, setState] = useState({
        loading: false,
        error: null
    });

    const [ formValues, formHandle ] = useForm({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleClick = () => {
        if (isFormValid()) {
            Login();
        }
    }

    const isFormValid = () => {
        if (formValues.username.length === 0) {
            setState(prevState => {
                return {...prevState, error: 'Username incorrecto'};
            });
            return false;
        }
        else if (formValues.password.length === 0) {
            setState(prevState => {
                return {...prevState, error: 'Password incorrecto'};
            });
            return false;
        }
        else {
            setState(prevState => {
                return {...prevState, error: null};
            });
            return true;
        }
    }

    const Login = () => {

        setState(prevState => {
            return {...prevState, loading: true, error: ''};
        });

        const callbackSuccess = (response) => {
            response.text()
            .then((token) => {
                setState(prevState => {
                    return {...prevState, loading: false};
                });
                dispatch( login(formValues.username, token) );
                dispatch( addLog(`${formValues.username}: login`) );
            })
            .catch((error) => {
                const message = 'Error procesando respuesta: ' + error;
                setState(prevState => {
                    return {...prevState, loading: false, error: message};
                });
            });
        };
        const callbackNoSuccess = (response) => {
            const message = 'Error de servidor: ' + response.statusText;
            setState(prevState => {
                return {...prevState, loading: false, error: message};
            });
        };
        const callbackError = (error) => {
            const message = 'Error de conexión: ' + error.message;
            setState(prevState => {
                return {...prevState, loading: false, error: message};
            });
        };

        const dataBody = {
            "username": formValues.username,
            "password": formValues.password
        };

        ServerRequest(
            REQUEST_METHOD.POST,
            null,
            false,
            APIS.URLS.LOGIN,
            null,
            dataBody,
            callbackSuccess,
            callbackNoSuccess,
            callbackError
        );

    };


    return (
        <section className='mt-3'>

            <Loading visible={state.loading}></Loading>

            <h2>Login</h2>
            <hr />

            {state.error && (
                <div className="mb-3 label-error">
                    {state.error}
                </div>
            )}

            <div className="mb-3 col-6">
                <label htmlFor="name" className="form-label">Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    value={ formValues.username }
                    onChange={ formHandle }
                />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="email" className="form-label">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    autoComplete="off"
                    value={ formValues.password }
                    onChange={ formHandle }
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={ handleClick }>Login</button>
            </div>

        </section>
    )
}

export default LoginView;
