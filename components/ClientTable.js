import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: innerHeight-200,
  }
});

const OBTENER_CLIENTES_VENDEDOR = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id,
      nombre,
      apellido,
      empresa,
      email,
    }
  }
`;

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 170 },
  { id: 'apellido', label: 'Apellido', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
  { id: 'empresa', label: 'Empresa', minWidth: 170, align: 'left' },
  { id: 'id', label: 'Acciones', minWidth: 170, align: 'left' }
];

function ClientTable({data}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
          // Obtener una copia del objeto del caché
          const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_VENDEDOR });        
          // Reescribir el cache
          cache.writeQuery({
            query: OBTENER_CLIENTES_VENDEDOR,
            data: {
              obtenerClientesVendedor: obtenerClientesVendedor.filter((clienteActual) => clienteActual.id !== id)
            }
          })
        }
      });

    function confirmarEliminarCliente() {
      Swal.fire({
        title: '¿Estás seguro que deseas eliminar este cliente?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then( async (result) => {
        if (result.value) {
          try {
            // Eliminar cliente
            const { data } = await  eliminarCliente({
              variables: {
                id
              }
            })
    
            // Mostrar alerta
            Swal.fire(
              'Eliminado!',
              data.eliminarCliente,
              'success'
            )
          } catch (error) {
            Swal.fire(
              'Error',
              error.message,
              'error'
            )
          }
        }
      });
    }

    function editarCliente() {
      Router.push({
        pathname: '/editarcliente/[id]',
        query: { id }
      })
    }

    return (
      <>
        <div className="overflow-y-auto overflow-x-hidden rounded-lg h-full shadow-lg bg-red-100">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                            <TableCell align="left" className="">
                              {row.nombre}
                            </TableCell>
                            <TableCell align="left">
                              {row.apellido}
                            </TableCell>
                            <TableCell align="left">
                              {row.email}
                            </TableCell>
                            <TableCell align="left">
                              {row.empresa}
                            </TableCell>
                            <TableCell align="left" className="flex">
                              <div className="flex">

                                <button
                                  type="button"
                                  className="focus:outline-none hover:opacity-50 flex justify-center items-center py-2 px-4 text-lava rounded text-xs uppercase font-medium"
                                  onClick={() => confirmarEliminarCliente(row.id)}
                                >
                                Eliminar
                                <svg fill="currentColor" className="w-5 h-5 ml-2" viewBox="0 0 20 20"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>
                                </button>
                                <button
                                  type="button"
                                  className="focus:outline-none hover:opacity-50 flex justify-center items-center py-2 px-4 text-success rounded text-xs uppercase font-medium"
                                  onClick={() => editarCliente(row.id)}
                                >
                                Editar
                                <svg fill="currentColor" className="w-5 h-5 ml-2" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                                </button>
                              </div>
                            </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={() =>{}}
              onChangeRowsPerPage={() => {}}
            />
          </Paper>
        </div>
        <style jsx>{`
          tr:nth-child(even) {
            background: #edf2f7;
          }
          .text-lava {
            color: #EB5757;
          }
          .text-success {
            color: #00DB72;
          }
        `}</style>
      </>
    );
    
}

export default ClientTable;