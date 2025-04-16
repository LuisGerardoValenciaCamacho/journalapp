import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
    const { title, body, date, onInputChange, formState } = useForm(activeNote)
    const dateString = useMemo(() => {
        const dateActive = new Date(date);
        return dateActive.toUTCString();
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
      if(messageSaved.length > 0) {
        Swal.fire({
            title: "Nota actualizada",
            text: messageSaved,
            icon: "success"
        })
      }
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileChange = ({target}) => {
        if(target.files.length == 0) {
            return;
        }
        dispatch(startUploadingFiles(target.files))
    }

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{mb: 1}} className="animate__animated animate__fadeIn animate__faster">
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <IconButton color="primary" disabled={ isSaving } onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <input type="file" multiple onChange={ onFileChange } style={{ display: "none" }} ref={ fileInputRef } />
                <Button color="primary" sx={{padding: 2}} onClick={onSaveNote} disabled={isSaving}>
                    <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField type="text" variant="filled" fullWidth placeholder="Ingrese un titulo" label="Titulo" sx={{border: "none", mb: 1}} name="title" onChange={onInputChange} value={title}/>
                <TextField type="text" variant="filled" multiline fullWidth placeholder="¿Qué sucedio en el día de hoy?" label="¿Qué sucedio el día de hoy?" name="body" minRows={5} onChange={onInputChange} value={body}/>
            </Grid>
            <ImageGallery/>
        </Grid>
    )
}
