import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';

export default function ImgModal({ open, handleClose, title, imgSrc, serverImage }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id='alert-dialog-title'>
                {title}
            </DialogTitle>
            <DialogContent>
                {serverImage && <img style={{ width: '100%' }} alt='preview image' src={`data:image/png;base64,${imgSrc}`} />}
                {!serverImage && <img style={{ width: '100%' }} alt='preview image' src={imgSrc} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
