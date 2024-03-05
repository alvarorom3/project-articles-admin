import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { formatDate } from '../../utils/formDate.js';
import { projectQuery } from '../../utils/projectQuery.js';
import { getProjectById, updateProject } from '../../api/projectsService';

import ProjectFormSection from '../../components/ProjectFormSection';
import { EMPTY_PROJECT } from '../../constants/projectValues.js';
import { useModal } from '../../hooks/useModal';


import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button
} from '@mui/material';


export const projectLoader = (queryClient) =>
    async ({ params }) => {
        const query = await queryClient.ensureQueryData(projectQuery(getProjectById, params.projectId));

        return query
    }

export default function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: project, isError } = useQuery(projectQuery(getProjectById, params.projectId))

    const [mutationError, setMutationError] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [openSuccess, handleOpenSuccess, handleCloseSuccess] = useModal()

    const {
        title,
        description,
        mdBody,
        author,
        githubRepo,
        projectType,
        tecnologies,
    } = project

    const queryClient = useQueryClient();
    const {
        isPending: isPendingMutation,
        mutate: editProjectMutation
    } = useMutation({
        mutationFn: async ({ formData, projectId }) => {
            try {
                const data = await updateProject(formData, projectId)
                return data
            } catch (error) {
                return error
            }
        },
        onSuccess: (data) => {
            if (!!data.error) {
                setServerError(true)
            } else {
                queryClient.invalidateQueries(['project', 'all']);
                queryClient.invalidateQueries(['project', params.projectId]);
                handleOpenSuccess()
            }
        },
        onError: (err) => {
            console.log(err)
            setMutationError(true)
        }
    });

    // function onDialogNavigate(event, to) {
    //     event.stopPropagation();
    //     return navigate(to)
    // }
    function onSnackbarClose() {
        setMutationError(false)
        setServerError(false)
    }

    return (
        <div>
            {
                isError || !!project.error?.message ? <h3>Server error: {project.error.message.toString()}</h3> :
                    !!project.error ? <h3>Server error: {project.error.toString()}</h3> :
                        <>
                            <h1>Editando proyecto: {project.title}</h1>
                            <Box sx={{ marginBlock: '2em', display: 'grid', gridTemplateColumns: '1fr 1fr' }} >
                                <div>Creado: {formatDate(project.createdAt)}</div>
                                <div>Última vez editado: {formatDate(project.updatedAt)}</div>
                            </Box>
                            <ProjectFormSection
                                projectId={project._id}
                                title={title}
                                description={description}
                                mdBody={mdBody}
                                author={author}
                                githubRepo={githubRepo}
                                demo={project.demo ? project.demo : EMPTY_PROJECT.demo}
                                phoneImg={project.phoneImg ? project.phoneImg : EMPTY_PROJECT.phoneImg}
                                desktopImg={project.desktopImg ? project.desktopImg : EMPTY_PROJECT.desktopImg}
                                projectType={projectType}
                                tecnologies={tecnologies}
                                submitAction={editProjectMutation}
                            />
                        </>
            }

            <Snackbar
                open={isPendingMutation}
                message='Editando proyecto...'
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            />

            <Dialog open={openSuccess} >
                <DialogContent>
                    <Alert severity='success' variant='filled'>
                        Éxito: Proyecto actualizado.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => navigate('/')}>
                        Volver al inicio
                    </Button>
                    <Button variant='outlined' onClick={() => navigate(0)}>
                        Seguir editando proyecto
                    </Button>
                </DialogActions>
            </Dialog>

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
                    Error: mutation error.
                </Alert>
            </Snackbar>

            <Snackbar
                open={serverError}
                autoHideDuration={6000}
                onClose={onSnackbarClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Alert
                    severity='error'
                    variant='filled'
                >
                    Server Error. Proyecto no se pudo editar.
                </Alert>
            </Snackbar>

        </div>
    )
}
