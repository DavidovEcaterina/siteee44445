import { Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleChangeData = (e, key) => {
        if (key === 'email') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK}auth/authenticate`, { email, password });
            localStorage.setItem('user', response.data.token);
            navigation('/');
        } catch (e) {
            console.error(e);
            setError('Invalid email or password');
        }
    };

    return (
        <Container maxWidth={'sm'} sx={{ marginTop: '200px' }}>
            <form onSubmit={handleSubmit}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 30 }} textAlign={'center'} gutterBottom>
                            Login
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'email')} fullWidth label={'Email'} type={'email'} name={'email'} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'password')} fullWidth name={'password'} type={'password'} label={'Password'} />
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography sx={{ color: 'red' }} textAlign={'center'}>{error}</Typography>
                        )}
                        <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/register" color="primary">
                                Register here
                            </Link>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button variant={'contained'} type={'submit'} color={'success'}>
                            Sign in
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
};

export default Auth;
