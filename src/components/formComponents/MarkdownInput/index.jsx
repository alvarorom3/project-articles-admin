import { Controller } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
import {
    FormLabel,
    FormHelperText,
    Box,
} from '@mui/material';
import './index.css'

export default function MarkdownInput({ name, control, label, rules = {}, formErrors }) {

    return (
        <Box sx={{ marginBlock: '2em', width: '100%' }}>
            <FormLabel >{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { value, onChange } }) => {
                    return (
                        <MDEditor
                            value={value}
                            onChange={onChange}
                            preview='edit'

                        />
                    )
                }}
            />
            {formErrors && (
                <FormHelperText error>{formErrors.message}</FormHelperText>
            )}

            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </Box>
    )
}
