import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';

import { formatDate } from '../../utils/formDate'
import { deleteProject } from '../../api/projectsService';
import { useModal } from '../../hooks/useModal';

function createData(title, projectType, createdAt, updatedAt, githubRepo, id) {
    return { title, projectType, createdAt, updatedAt, githubRepo, id };
}

function getCurrentProject(projects, projectId) {
    let currentProject
    projects.map(p => {
        if (p.id === projectId) {
            currentProject = p
        }
    })
    return currentProject
}

export default function ProjectList({ projects, isFetching }) {
    const rows = projects.map(p => {
        return createData(p.title, p.projectType, p.createdAt, p.updatedAt, p.githubRepo, p._id)
    })
    const [open, handleOpen, handleClose] = useModal()

    const [mutationSuccess, setMutationSuccess] = useState(false)
    const [mutationError, setMutationError] = useState(false)
    const [currentProjectId, setCurrentProjectId] = useState(null)

    const queryClient = useQueryClient();
    const {
        isPending: isPendingMutation,
        data: mutationResponse,
        error: mutationErrorMessage,
        mutate: deleteProjectMutation
    } = useMutation({
        mutationFn: (id) => deleteProject(id),
        onSuccess: () => {
            setMutationSuccess(true)

            queryClient.invalidateQueries();
        },
        onError: () => {
            setMutationError(true)
        }
        // retry: 3,
    });

    function onSnackbarClose() {
        setMutationSuccess(false)
        setMutationError(false)
    }

    function handleDeleteClick(projectId) {
        setCurrentProjectId(projectId)
        handleOpen()
    }

    function handleConfirmDelete(projectId) {
        deleteProjectMutation(projectId)
        setCurrentProjectId(null)
        handleClose()
    }

    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Creado</TableCell>
                            <TableCell>Últ. vez modificado</TableCell>
                            <TableCell align='center'>Repositorio</TableCell>
                            <TableCell align='center'>Edición</TableCell>
                            <TableCell align='center'>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={nanoid()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.title}
                                </TableCell>
                                <TableCell>{row.projectType}</TableCell>
                                <TableCell>{formatDate(row.createdAt)}</TableCell>
                                <TableCell>{formatDate(row.updatedAt)}</TableCell>
                                <TableCell align='center'>
                                    <a href={row.githubRepo} target='_blank'>
                                        <Button variant='outlined' color='secondary' disabled={isPendingMutation || isFetching}>Repo</Button>
                                    </a>
                                </TableCell>
                                <TableCell align='center'>
                                    <Link to={`/edit/${row.id}`} >
                                        <Button variant='outlined' disabled={isPendingMutation || isFetching}>
                                            Editar
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        onClick={() => handleDeleteClick(row.id)}
                                        variant='contained'
                                        color='error'
                                        disabled={isPendingMutation || isFetching}
                                    >
                                        Eliminar
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id='alert-dialog-title'>
                    Confirmar acción
                </DialogTitle>
                <DialogContent>
                    <Typography>¿Está seguro de que quiere eliminar este documento?</Typography>
                    <Typography sx={{ fontWeight: 700, textAlign: 'center' }}>
                        {currentProjectId != null ? getCurrentProject(rows, currentProjectId).title : null}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={handleClose}>Cancelar</Button>
                    <Button
                        color='error'
                        variant='contained'
                        onClick={() => handleConfirmDelete(currentProjectId)}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={isPendingMutation}
                message='Borrando documento...'
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            />
            <Snackbar
                open={mutationError}
                autoHideDuration={6000}
                onClose={onSnackbarClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Alert
                    severity='error'
                    variant='filled'
                >
                    Error: {mutationErrorMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={mutationSuccess}
                message={`Éxito: ${mutationResponse?.message ? mutationResponse.message : 'Proyecto eliminado.'}`}
                autoHideDuration={6000}
                onClose={onSnackbarClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Alert
                    severity='success'
                    variant='filled'
                >
                    Éxito: {mutationResponse?.message ? mutationResponse.message : 'Proyecto eliminado.'}
                </Alert>
            </Snackbar>


        </>
    )
}
