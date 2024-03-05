import {
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    Box
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';

export default function RadioInput({ name, control, label, rules = {}, formErrors, options }) {
    const generateRadioOptions = () => {
        return options.map((opt) => {
            return (
                <FormControlLabel
                    key={nanoid()}
                    value={opt.value}
                    label={opt.label}
                    control={<Radio />}
                />
            )
        });
    };

    return (
        <Box sx={{ marginBlock: '2em' }}>
            <FormControl component='fieldset' >
                <FormLabel component='legend'>{label}</FormLabel>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <RadioGroup {...field} row >
                            {generateRadioOptions()}
                        </RadioGroup>
                    )}
                />
                {formErrors && (
                    <FormHelperText error>{formErrors.message}</FormHelperText>
                )}

            </FormControl>
        </Box>

    )

}
