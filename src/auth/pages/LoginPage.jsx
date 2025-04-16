import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { startLoginWithEmailPassword, startGoogleSignIn } from "../../store/auth"
import { useMemo } from "react"

const formData = {
  email: "",
  password: ""
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const {email, password, onInputChange, formState} = useForm(formData)

  const isAutheticating = useMemo(() => status === "checking", [status]);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField label="Correo" type="email" placeholder="correo@google.com" name="email" value={email} onChange={onInputChange} fullWidth/>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField label="Constraseña" type="password" placeholder="Contraseña" name="password" value={password} onChange={onInputChange} fullWidth/>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth type="submit" disabled={isAutheticating}>Login</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth disabled={isAutheticating} onClick={onGoogleSingIn}>
                  <Google/>
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">Crear cuenta</Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}