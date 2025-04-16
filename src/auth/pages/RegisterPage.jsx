import { AuthLayout } from '../layout'
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  displayName: "",
  email: "",
  password: ""
}

const formValidations = {
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [(value) => value.length >= 6, "La contraseña debe tener minimo 6 caracteres"],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const { displayName, email, password, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations)

  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Register'>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField label="Nombre completo" type="text" placeholder="Nombre completo" name='displayName' value={displayName} fullWidth onChange={onInputChange} error={!!displayNameValid && formSubmitted} helperText={displayNameValid}/>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField label="Correo" type="email" placeholder="correo@google.com" name='email' fullWidth value={email} onChange={onInputChange} error={!!emailValid && formSubmitted} helperText={emailValid}/>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField label="Constraseña" type="password" placeholder="Contraseña" name='password' fullWidth value={password} onChange={onInputChange} error={!!passwordValid && formSubmitted} helperText={passwordValid}/>
            </Grid>
            <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
              <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type='submit' disabled={isCheckingAuthentication}>Crear cuenta</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">Ingresar</Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
