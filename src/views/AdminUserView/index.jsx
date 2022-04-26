import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_METHOD } from "../../consts/requestMethodType";
import { APIS } from '../../config/apis';
import { ServerRequest } from '../../utils/apiweb';
import Loading from '../../components/common/Loading';
import TableCustom from '../../components/common/TableCustom';
import MessageModal from '../../components/common/MessageModal';
import UserModel from '../../components/controls/UserModel';
import { addLog } from '../../context/redux/actions/logAction';

import './index.scss';


function AdminUserView() {

    //hooks
    const [state, setState] = useState({
        loading: false,
        error: null,
        showMessage: false,
        showForm: false,
        modeFormEdit: false,
        rowId: 0,
        list: []
    });

    const mount = () => {

        SearchUsers();

        const unmount = () => {}
        return unmount;
    }
    useEffect(mount, []);

    const dispatch = useDispatch();

    //variables
    const {username} = useSelector( (state) => state.auth );

    //definiciones
    const cellA = (props) =>    <div className='text-center'>
                                    <a onClick={ (event) => handleClickUserAdd() } className="link">
                                        <i className="fa fa-plus" title="nuevo"></i>
                                    </a>
                                </div>

    const cellVMR = (props) =>  <div className='text-center'>
                                    <div className='cellABM'>
                                        <a onClick={ (event) => handleClickUserView(props.value) } className="link">
                                            <i className="fa fa-search" title="ver"></i>
                                        </a>
                                        <a onClick={ (event) => handleClickUserModify(props.value) } className="link">
                                            <i className="fa fa-pencil" title="modificar"></i>
                                        </a>
                                        <a onClick={ (event) => handleClickUserRemove(props.value) } className="link">
                                            <i className="fa fa-trash" title="borrar"></i>
                                        </a>
                                    </div>
                                </div>

    const tableColumns = useMemo(() => [
        { Header: 'Id', accessor: 'id', headerClassName: 'tc-header tc-width-10', className: 'tc-cell tc-width-10' },
        { Header: 'Login', accessor: 'login', headerClassName: 'tc-header tc-width-20', className: 'tc-cell tc-width-20' },
        { Header: 'Name', accessor: 'name', headerClassName: 'tc-header tc-width-30', className: 'tc-cell tc-width-30' },
        { Header: 'E-Mail', accessor: 'email', headerClassName: 'tc-header tc-width-30', className: 'tc-cell tc-width-30' },
        { Header: cellA, Cell: cellVMR, accessor: 'id', headerClassName: 'tc-header tc-width-10', className: 'tc-cell tc-width-10' }
    ], []);

    //handles
    const handleClickUserAdd = () => {
        setState(prevState => {
            return {...prevState, showForm: true, modeFormEdit: true, rowId: 0};
        });
    }
    const handleClickUserView = (id) => {
        setState(prevState => {
            return {...prevState, showForm: true, modeFormEdit: false, rowId: id};
        });
    }
    const handleClickUserModify = (id) => {
        setState(prevState => {
            return {...prevState, showForm: true, modeFormEdit: true, rowId: id};
        });
    }
    const handleClickUserRemove = (id) => {
        setState(prevState => {
            return {...prevState, showMessage: true, rowId: id};
        });
    }

    //funciones
    const SearchUsers = () => {

        setState(prevState => {
            return {...prevState, loading: true, error: '', list: []};
        });

        const callbackSuccess = (response) => {
            response.json()
            .then((data) => {
                setState(prevState => {
                    return {...prevState, loading: false, list: data};
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

        ServerRequest(
            REQUEST_METHOD.GET,
            null,
            true,
            APIS.URLS.USER,
            null,
            null,
            callbackSuccess,
            callbackNoSuccess,
            callbackError
        );

    }

    const RemoveUser = (id) => {

        setState(prevState => {
            return {...prevState, loading: true, error: ''};
        });

        const callbackSuccess = (response) => {
            response.json()
            .then((id) => {
                setState(prevState => {
                    return {...prevState, loading: false};
                });
                SearchUsers();
                dispatch( addLog(`${username}: remove user ${id}`) );
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

        const paramsUrl = `/${id}`;

        ServerRequest(
            REQUEST_METHOD.DELETE,
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


    return (
        <section className='mt-3'>

            <Loading visible={state.loading}></Loading>

            {state.showMessage && 
                <MessageModal
                    title={"Confirmación"}
                    message={"¿Está seguro de borrar el registro?"}
                    onDismiss={() => {
                        setState(prevState => {
                            return {...prevState, showMessage: false, rowId: 0};
                        });
                    }}
                    onConfirm={() => {
                        const id = state.rowId;
                        setState(prevState => {
                            return {...prevState, showMessage: false, rowId: 0};
                        });
                        RemoveUser(id);
                    }}
                />
            }

            {state.showForm && 
                <UserModel
                    id={state.rowId}
                    disabled={!state.modeFormEdit}
                    onDismiss={() => {
                        setState(prevState => {
                            return {...prevState, showForm: false, rowId: 0};
                        });
                    }}
                    onConfirm={(id) => {
                        setState(prevState => {
                            return {...prevState, showForm: false, rowId: 0};
                        });
                        SearchUsers();
                        dispatch( addLog(`${username}: update user ${id}`) );
                    }}
                />
            }

            <h2>Administración de Usuarios</h2>
            <hr />

            {state.error && (
                <div className="mb-3 label-error">
                    {state.error}
                </div>
            )}

            <div className="mb-3">
                Listado de usuarios:
            </div>
            <div className="mb-3">

                <TableCustom
                    columns={tableColumns}
                    data={state.list}
                />

            </div>

        </section>
    )
}

export default AdminUserView;
