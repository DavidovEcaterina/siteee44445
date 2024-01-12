import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const handleChangeData = (e, key) => {
        if (key === 'firstname') {
            setFirstname(e.target.value);
        } else if (key === 'lastname') {
            setLastname(e.target.value);
        } else if (key === 'email') {
            setEmail(e.target.value);
        } else if (key === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                firstname,
                lastname,
                email,
                password,
            };

            // Assuming your registration endpoint is '/register'
            const response = await axios.post(`${process.env.REACT_APP_BACK}auth/register`, userData);

            // Redirect to login page after successful registration
            navigation('/login');
        } catch (e) {
            console.error(e);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth={'sm'} sx={{ marginTop: '200px' }}>
            <form onSubmit={handleRegistration}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 30 }} textAlign={'center'} gutterBottom>
                            Register
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'firstname')} fullWidth label={'First Name'} type={'text'} name={'firstname'} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'lastname')} fullWidth label={'Last Name'} type={'text'} name={'lastname'} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'email')} fullWidth label={'Email'} type={'email'} name={'email'} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleChangeData(e, 'password')} fullWidth name={'password'} type={'password'} label={'Password'} />
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography sx={{ color: 'red' }} textAlign={'center'}>
                                {error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button variant={'contained'} type={'submit'} color={'primary'}>
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
};

export default Registration;
