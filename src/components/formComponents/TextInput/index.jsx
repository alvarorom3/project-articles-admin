import { Box } from '@mui/material';
import { TextField, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form'

export default function TextInput({ name, control, label, rules = {} }) {
    return (
        <Box sx={{ marginBlock: '2em' }}>
            <FormLabel >{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                }) => (
                    <TextField
                        sx={{ width: '100%' }}
                        helperText={error ? error.message : null}
                        size='small'
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        variant='outlined'
                    />
                )}
            />
        </Box>
    )
}
