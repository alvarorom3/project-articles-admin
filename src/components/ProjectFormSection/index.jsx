import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

import TextInput from '../formComponents/TextInput';
import RadioInput from '../formComponents/RadioInput';
import AutocompleteInput from '../formComponents/AutocompleteInput';
import FileUpload from '../formComponents/FileUpload';

import { PROYECT_TYPES, TECNOLOGIES } from '../../constants/projectValues'
import MarkdownInput from '../formComponents/MarkdownInput';
import { getInputImage } from './getImages'

export default function ProjectFormSection({
    projectId = null,
    title,
    description,
    mdBody,
    author,
    githubRepo,
    demo = null,
    phoneImg = null,
    desktopImg = null,
    projectType,
    tecnologies,
    submitAction
}) {
    let desktopImageSrc = getInputImage(desktopImg);
    let phoneImageSrc = getInputImage(phoneImg);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title,
            description,
            author,
            githubRepo,
            demo,
            projectType,
            tecnologies,
            phoneImg,
            desktopImg,
            mdBody
        }
    })

    const onSubmit = (data) => {
        let formData = new FormData();

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('author', data.author)
        formData.append('githubRepo', data.githubRepo)
        formData.append('projectType', data.projectType)
        formData.append('tecnologies', JSON.stringify(data.tecnologies))
        formData.append('mdBody', data.mdBody)

        if (data.phoneImg) {
            formData.append('phoneImg', data.phoneImg)
        }
        if (data.desktopImg) {
            formData.append('desktopImg', data.desktopImg)
        }
        if (data.demo && data.demo.length !== 0) {
            formData.append('demo', data.demo)
        }

        submitAction({ formData, projectId })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <Box sx={{
                    display: 'flex',
                    gap: '2em'
                }}>
                    <Button type='submit' variant='contained' >Enviar</Button>
                    <Button variant='outlined' onClick={reset}>Reiniciar todos los campos</Button>
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 1fr)',
                    gap: '1em'
                }}>
                    <Box sx={{
                        gridArea: '1/1/2/5'
                    }}>
                        <TextInput
                            name='title'
                            control={control}
                            label='Título'
                            rules={{
                                required: { value: true, message: 'Campo requerido' },
                                maxLength: { value: 280, message: 'No más de 280 carácteres' }
                            }}
                        />
                        <TextInput
                            name='description'
                            control={control}
                            label='Descripción'
                            rules={{
                                required: { value: true, message: 'Campo requerido' },
                                maxLength: { value: 400, message: 'No más de 400 carácteres' }
                            }}
                        />
                        <TextInput
                            name='author'
                            control={control}
                            label='Autor'
                            rules={{
                                required: { value: true, message: 'Campo requerido' },
                                maxLength: { value: 100, message: 'No más de 100 carácteres' }
                            }}
                        />
                        <TextInput
                            name='githubRepo'
                            control={control}
                            label='Repositorio en Github'
                            rules={{
                                required: { value: true, message: 'Campo requerido' },
                            }}
                        />
                        <TextInput
                            name='demo'
                            control={control}
                            label='Demo'
                        />
                        <RadioInput
                            name='projectType'
                            control={control}
                            label='Tipo de proyecto'
                            rules={{
                                required: { value: true, message: 'Campo requerido' }
                            }}
                            formErrors={errors.projectType}
                            options={PROYECT_TYPES}
                        />
                        <AutocompleteInput
                            name='tecnologies'
                            control={control}
                            label='Tecnologias usadas en el proyecto'
                            rules={{
                                required: { value: true, message: 'Campo requerido' }
                            }}
                            formErrors={errors.tecnologies}
                            options={TECNOLOGIES}
                        />
                        <FileUpload
                            name='phoneImg'
                            control={control}
                            label='Vista de movil (Solo proyectos con demo)'
                            formErrors={errors.phoneImg}
                            imgInput={phoneImageSrc}
                        />
                        <FileUpload
                            name='desktopImg'
                            control={control}
                            label='Vista de escritorio (Solo proyectos con demo)'
                            formErrors={errors.desktopImg}
                            imgInput={desktopImageSrc}
                        />
                    </Box>
                    <Box sx={{
                        gridArea: '1/5/2/11'
                    }}>
                        <MarkdownInput
                            name='mdBody'
                            control={control}
                            label='Articulo sobre el proyecto'
                            formErrors={errors.mdBody}
                            rules={{
                                required: { value: true, message: 'Campo requerido' }
                            }}
                        />
                    </Box>
                </Box>
            </form>
        </div>
    )
}
