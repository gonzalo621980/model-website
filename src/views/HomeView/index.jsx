import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearLog } from '../../context/redux/actions/logAction';


function HomeView() {

    const dispatch = useDispatch();

    const {username} = useSelector( (state) => state.auth );
    const {messages} = useSelector( (state) => state.log );

    const handleClick = () => {
        dispatch( clearLog() );
    }

    return (
        <section className='mt-3'>

            <h2>Home</h2>
            <hr />

            <div className="mb-3 col-6">
                <label htmlFor="name" className="form-label">Usuario logueado</label>
                <input
                    name="username"
                    type="text"
                    className="form-control"
                    value={ username }
                    readOnly
                />
            </div>

            <div className="mb-3">
                Log de operaciones:
            </div>
            <div className="mb-3">
                {messages.length === 0 && (
                    <div className="mb-3 label-error">
                        No hay operaciones registradas
                    </div>
                )}
                <ul>
                    {messages.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-3 m-bottom-50">
                <button className="btn btn-primary" onClick={ handleClick }>Borrar log</button>
            </div>

        </section>
    )
}

export default HomeView;
