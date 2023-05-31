import { Box, Drawer, useMediaQuery } from "@mui/material";
import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";
import { useTheme } from "@mui/material/styles";
import {Typography} from "@mui/material";
import { Divider } from '@mui/material';
import { Paper } from '@mui/material';



export default function Cart() {

    const {cart, setShowCart, showCart} = useUIContext();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    const cartContent = cart.map( item => (
        <Box key={item.id}>
            <Box 
            display="flex"
            sx={{ pt:2 , pb: 2}}
            alignItems="start"
            justifyContent={"space-between"}>
                
                <Box display="flex" flexDirection={"column"}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="subtitle2">{item.description}</Typography>
                </Box>
                <Typography variant="body1" justifyContent={"end"}>
                    ${item.price}
                </Typography>
            </Box>
            <Divider variant="inset" />
        </Box>
    ));

    return(
        <Drawer 
        open={showCart} 
        onClose={() => setShowCart(false)}
        anchor="right"
        PaperProps={{
            sx: {
                width:500,
                background: Colors.light_gray,
                borderRadius:0
            }
        }}
        >
            <Box
            sx={{ p: 4}}
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignItems="center"
            >
                <Typography variant="h3" color={Colors.black}>
                    Your Cart
                </Typography>
                <Typography variant="body1" color={Colors.muted}>
                    {" "}
                    fsdgrdjkshnfosnhdjrsdhnjfhgdjghndjhgfsjhgn
                </Typography>
                <Paper
                elevation={0}
                sx={{
                    mt:2,
                    wigth: '90%',
                    padding: 4,
                }}
                >{cartContent}
                </Paper>
         
            </Box>
        </Drawer>
    );
}