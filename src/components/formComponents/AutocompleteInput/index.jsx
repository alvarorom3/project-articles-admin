import {
    FormControl,
    FormLabel,
    FormHelperText,
    MenuItem,
    TextField,
    Autocomplete,
    Checkbox,
    Box
} from '@mui/material';
import { Controller } from 'react-hook-form';

function capitalizedValue(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function AutocompleteInput({ name, control, label, rules = {}, formErrors, options }) {

    return (
        <Box sx={{ marginBlock: '2em' }}>
            <FormControl sx={{ width: '100%' }}>
                <FormLabel >{label}</FormLabel>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => {
                        const { value, onChange, ref } = field;
                        return (
                            <Autocomplete
                                multiple
                                disableCloseOnSelect
                                value={value}
                                onChange={(event, newValue) => {
                                    onChange(newValue)
                                }}
                                options={options}
                                renderOption={(props, option, { selected }) => (
                                    <MenuItem {...props} value={option}>
                                        <Checkbox
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {capitalizedValue(option)}
                                    </MenuItem>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant='standard'
                                        inputRef={ref}
                                    />
                                )}
                            />
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
