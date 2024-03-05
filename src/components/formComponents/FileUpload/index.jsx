import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Box,
    Button,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import ImgModal from './ImgModal';
import { useModal } from '../../../hooks/useModal';


export default function FileUpload({ name, control, label, rules = {}, formErrors, imgInput }) {
    const [open, handleOpen, handleClose] = useModal();
    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        } else {
            setImage(null)
        }
    }

    return (
        <Box sx={{ marginBlock: '2em' }}>
            <FormControl  >
                <FormLabel >{label}</FormLabel>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <>
                                <input
                                    {...field}
                                    value={value?.fileName}
                                    accept='.jpg,.jpeg,.png,.gif'
                                    onChange={(event) => {
                                        onImageChange(event)
                                        onChange(event.target.files[0]);
                                    }}
                                    id={name}
                                    type='file'
                                    style={{ display: 'none' }}
                                    aria-label='Subir archivo'
                                />
                                <Box sx={{ display: 'flex', gap: '1em', justifyContent: 'space-between', marginBlock: '1em' }}>
                                    <label htmlFor='raised-button-file'>
                                        <Button
                                            variant='outlined'
                                            component='label'
                                            htmlFor={name}
                                        >
                                            Subir archivo
                                        </Button>

                                    </label>
                                    <Button
                                        variant='outlined'
                                        disabled={value === null}
                                        onClick={handleOpen}
                                    >
                                        Ver imagen
                                    </Button>
                                </Box>
                                {value?.name && <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <FormHelperText>{value?.name}</FormHelperText>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={(event) => {
                                            onImageChange(event)
                                            onChange(null);
                                        }}
                                    >
                                        Borrar
                                    </Button>
                                </Box>}
                                <ImgModal
                                    open={open}
                                    handleClose={handleClose}
                                    title={label}
                                    imgSrc={value && value.buffer !== undefined ? imgInput : image}
                                    serverImage={value && value.buffer !== undefined}
                                />
                            </>
                        )
                    }}

                />
                {formErrors && (
                    <FormHelperText error>{formErrors.message}</FormHelperText>
                )}
            </FormControl>
        </Box>
    )
}