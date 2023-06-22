import { Dialog, DialogContent, DialogTitle, Box, IconButton, TextField, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { firebasedb } from "../../services/firebase/db";


export default function Login({ open, onClose }) {

    const [joinUs, setJoinUs] = useState(false);

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '', 
        password: ''
    });


    const handleJoinUsSubmit = async (event) => {
        event.preventDefault();

        try {
           await firebasedb.register({...form})
        } catch(error) {
            console.log(error);
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await firebasedb.login({...form})
        } catch(error) {
            console.log(error);
        }
    };

    const handleFormFieldUpdate = (value, field) => {
        setForm({...form, [field] : value});
    }

    return (

        <Dialog open={open}>
            <DialogTitle>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    Login
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                {
                    joinUs ? 
                    <Box display={"flex"} flexDirection="column"
                    sx={{ width: '100%' }}>
                        <form onSubmit={handleJoinUsSubmit}>
                    <TextField
                        label="First name"
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.firstname}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'firstname')}
                    />
                    <TextField
                        label="Last name"
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.lastname}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'lastname')}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.email}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'email')}
                    />
                    <TextField
                        label="Password"
                        type={"password"}
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.password}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'password')}
                    />
                    <Button fullWidth type="submit" variant="contained">Sign up</Button>
                    </form>
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="caption">
                            Don't have an account?{" "}
                            <Button onClick={() => setJoinUs(false)}>Login</Button>
                        </Typography>
                    </Box>
                </Box> : (
                    <Box display={"flex"} flexDirection="column"
                    sx={{ width: '100%' }}>
                        <form onSubmit={handleLoginSubmit}>
                    <TextField
                        label="Email"
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.email}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'email')}
                    />
                    <TextField
                        label="Password"
                        type={"password"}
                        variant="standard"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={form.password}
                        onChange={(event) => handleFormFieldUpdate(event.target.value, 'password')}
                    />
                    <Button fullWidth type="submit" variant="contained">Login</Button>
                    </form>
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="caption">
                            Have an account?{" "}
                            <Button onClick={() => setJoinUs(true)}>Sign up</Button>
                        </Typography>
                    </Box>
                </Box>
                )
                }
                
            </DialogContent>
        </Dialog>
    );
}