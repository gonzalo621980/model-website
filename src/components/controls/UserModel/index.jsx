import React, { useState, useEffect } from 'react';
import { func, number, bool } from 'prop-types';
import validator from 'validator';

import { REQUEST_METHOD } from "../../../consts/requestMethodType";
import { APIS } from '../../../config/apis';
import { ServerRequest } from '../../../utils/apiweb';
import { useForm } from '../../hooks/useForm';
import Loading from '../../common/Loading';

import "./index.css";


const UserModel = (props) => {

  //hooks
  const [state, setState] = useState({
    loading: false,
    error: null,
    entity: {
      id: 0,
      login: '',
      name: '',
      email: ''
    }
  });

  const mount = () => {

    if (props.id > 0) {
      FindUser();
    }

    const unmount = () => {}
    return unmount;
  }
  useEffect(mount, []);

  const [ formValues, formHandle, formReset, formSet ] = useForm({
    login: '',
    name: '',
    email: ''
  });

  //handles
  const handleClickAceptar = () => {
    if (isFormValid()) {
      if (props.id == 0) {
        AddUser();
      }
      else {
        ModifyUser();
      }
    };
  };

  //funciones
  const isFormValid = () => {
    if (formValues.login.length === 0) {
        setState(prevState => {
            return {...prevState, error: 'Login incorrecto'};
        });
        return false;
    }
    else if (formValues.name.length === 0) {
        setState(prevState => {
            return {...prevState, error: 'Nombre incorrecto'};
        });
        return false;
    }
    else if (!validator.isEmail(formValues.email)) {
        setState(prevState => {
            return {...prevState, error: 'E-mail incorrecto'};
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

  const FindUser = () => {
    
    setState(prevState => {
      return {...prevState, loading: true, error: ''};
    });

    const callbackSuccess = (response) => {
        response.json()
        .then((data) => {
            setState(prevState => {
                return {...prevState, loading: false, entity: data};
            });
            formSet({
              login: data.login,
              name: data.name,
              email: data.email
            });
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
        const message = 'Error de conexión :' + error.message;
        setState(prevState => {
            return {...prevState, loading: false, error: message};
        });
    };

    const paramsUrl = `/${props.id}`;

    ServerRequest(
        REQUEST_METHOD.GET,
        null,
        true,
        APIS.URLS.USER,
        paramsUrl,
        null,
        callbackSuccess,
        callbackNoSuccess,
        callbackError
    );

  }

  const AddUser = () => {
    const method = REQUEST_METHOD.POST;
    const paramsUrl = null;
    SaveUser(method, paramsUrl);
  }

  const ModifyUser = () => {
    const method = REQUEST_METHOD.PUT;
    const paramsUrl = `/${props.id}`;
    SaveUser(method, paramsUrl);
  }

  const SaveUser = (method, paramsUrl) => {

    setState(prevState => {
      return {...prevState, loading: true, error: ''};
    });

    const callbackSuccess = (response) => {
      response.json()
      .then((row) => {
          setState(prevState => {
              return {...prevState, loading: false};
          });
        props.onConfirm(row.id);
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
        const message = 'Error de conexión :' + error.message;
        setState(prevState => {
            return {...prevState, loading: false, error: message};
        });
    };

    const dataBody = {
      ...state.entity,
      "login": formValues.login,
      "name": formValues.name,
      "email": formValues.email
    };

    ServerRequest(
        method,
        null,
        true,
        APIS.URLS.USER,
        paramsUrl,
        dataBody,
        callbackSuccess,
        callbackNoSuccess,
        callbackError
    );

  }


  return (
    <>

    <Loading visible={state.loading}></Loading>

    <div className="modal modal-block" role="dialog" data-keyboard="false" data-backdrop="static" >
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <h5 className="modal-title">Usuario: {(props && props.id > 0) ? state.entity.name : "Nuevo"}</h5>
          </div>
          <div className="modal-body">
            
            {state.error && (
                <div className="mb-3 label-error">
                    {state.error}
                </div>
            )}

            <div className="mb-3 col-12">
                <label htmlFor="login" className="form-label">Login</label>
                <input
                    name="login"
                    type="text"
                    placeholder="Login"
                    className="form-control"
                    value={ formValues.login }
                    onChange={ formHandle }
                    disabled={props.disabled}
                />
            </div>
            <div className="mb-3 col-12">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    value={ formValues.name }
                    onChange={ formHandle }
                    disabled={props.disabled}
                />
            </div>
            <div className="mb-3 col-12">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input
                    name="email"
                    type="text"
                    placeholder="E-Mail"
                    className="form-control"
                    value={ formValues.email }
                    onChange={ formHandle }
                    disabled={props.disabled}
                />
            </div>

          </div>
          <div className="modal-footer">
            {!props.disabled &&
              <button className="btn btn-primary" data-dismiss="modal" onClick={ (event) => handleClickAceptar() }>Aceptar</button>
            }
            <button className="btn btn-outline-primary" data-dismiss="modal" onClick={ (event) => props.onDismiss() }>Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

UserModel.propTypes = {
  id: number.isRequired,
  disabled: bool,
  onConfirm: func.isRequired,
  onDismiss: func.isRequired,
};

UserModel.defaultProps = {
  disabled: false
};

export default UserModel;