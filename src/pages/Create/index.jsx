import ProjectFormSection from '../../components/ProjectFormSection';
import { EMPTY_PROJECT } from '../../constants/projectValues';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewProject } from '../../api/projectsService';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button
} from '@mui/material';
import { useModal } from '../../hooks/useModal';

export default function Create() {
    const [mutationError, setMutationError] = useState(false)
    const [serverError, setServerError] = useState(false)

    const [openSuccess, handleOpenSuccess, handleCloseSuccess] = useModal()

    const navigate = useNavigate();
    const {
        title,
        description,
        mdBody,
        author,
        githubRepo,
        demo,
        phoneImg,
        desktopImg,
        projectType,
        tecnologies,
    } = EMPTY_PROJECT

    const queryClient = useQueryClient()

    const {
        isPending: isPendingMutation,
        mutate: createProjectMutation
    } = useMutation({
        mutationFn: async ({ formData }) => {
            try {
                const data = await createNewProject(formData)

                return data
            } catch (error) {
                return { error: error }
            }
        },
        onSuccess: (data) => {
            if (!!data.error) {
                setServerError(true)
            } else {
                queryClient.invalidateQueries();
                handleOpenSuccess()
            }
        },
        onError: () => {
            setMutationError(true)
        }
    });

    function onSnackbarClose() {
        setMutationError(false)
        setServerError(false)
    }


    return (
        <div>
            <h1>Crear un nuevo proyecto</h1>
            <ProjectFormSection
                title={title}
                description={description}
                mdBody={mdBody}
                author={author}
                githubRepo={githubRepo}
                demo={demo}
                phoneImg={phoneImg}
                desktopImg={desktopImg}
                projectType={projectType}
                tecnologies={tecnologies}
                submitAction={createProjectMutation}
            />

            <Snackbar
                open={isPendingMutation}
                message='Creando documento...'
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            />

            <Dialog open={openSuccess}>
                <DialogContent>
                    <Alert severity='success' variant='filled'>
                        Éxito: Proyecto creado.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => navigate('/')}>
                        Volver al inicio
                    </Button>
                    <Button variant='outlined' onClick={() => navigate(0)}>
                        Crear un nuevo proyecto
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
                    Server Error. Proyecto no se pudo crear.
                </Alert>
            </Snackbar>

        </div>
    )
}
