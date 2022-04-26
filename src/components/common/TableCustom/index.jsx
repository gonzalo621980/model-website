import React from 'react';
import { array, string} from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './index.css';


function TableCustom(props) {


    return (

        <div className={props.className}>

            <ReactTable
                columns={props.columns}
                data={props.data}

                minRows={1}
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                defaultPageSize={10}

                previousText={'Anterior'}
                nextText={'Siguiente'}
                loadingText={'Cargando...'}
                noDataText={'No se encontraron registros'}
                pageText={'Página'}
                ofText={'de'}
                rowsText={'registros'}
            />

        </div>

    )
}

TableCustom.propTypes = {
    className: string,
    columns: array,
    data: array
};

TableCustom.defaultProps = {
    className: "",
    columns: [],
    data: []
};

export default TableCustom;
