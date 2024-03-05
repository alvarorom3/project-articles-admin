import { nanoid } from 'nanoid';

import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import NativeSelect from '@mui/material/NativeSelect';

export default function TablePagination(props) {
    const { count, page, totalPages, onPageChange } = props;
    const options = []

    for (let i = 1; i <= totalPages; i++) {
        const opt = <option key={nanoid()} value={i} style={{ textAlign: 'center' }}>{i}</option>
        options.push(opt)
    }

    function handleFirstPageButtonClick() {
        onPageChange(1);
    };

    function handleBackButtonClick() {
        onPageChange(page - 1);
    };

    function handleNextButtonClick() {
        onPageChange(page + 1);
    };

    function handleLastPageButtonClick() {
        onPageChange(totalPages);
    };

    return (
        <Box sx={{ marginBlock: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
                variant='text'
                onClick={handleFirstPageButtonClick}
                disabled={page <= 1}
            >
                first
            </Button>
            <Button
                variant='text'
                onClick={handleBackButtonClick}
                disabled={page <= 1 || totalPages <= 1}
            >
                prev
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <FormLabel variant='standard' htmlFor='uncontrolled-native'>
                    Página
                </FormLabel>
                <NativeSelect
                    id='uncontrolled-native'
                    value={page}
                    onChange={(event) => onPageChange(event.target.value)}
                    disabled={page > totalPages || totalPages <= 1}
                >
                    {options.map(opt => opt)}
                </NativeSelect>
                <Typography>de {totalPages}</Typography>
            </Box>
            <Button
                variant='text'
                onClick={handleNextButtonClick}
                disabled={page >= totalPages}
            >
                next
            </Button>
            <Button
                variant='text'
                onClick={handleLastPageButtonClick}
                disabled={page >= totalPages}
            >
                last
            </Button>
        </Box>
    );
}
