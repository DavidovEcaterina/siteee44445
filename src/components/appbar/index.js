import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";
import { firebasedb } from "../../services/firebase/db";
import useDialogModal from "../../hooks/useDialogModal";
import Login from "../Login";

export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [LoginDialog, showLoginDialog] = useDialogModal(Login);
  
  const handleLogin = () => {
    showLoginDialog();
  }

  const handleLogout = async () => {
    try{
      await firebasedb.logout();
    } catch(error) {
      console.log(error);
    }
    
  }

  return (
    <>
      {matches ? (<AppbarMobile
      onLoginClick={handleLogin}
      onLogoutClick={handleLogout}
      matches={matches}/> 
      ) : ( 
      <AppbarDesktop 
      onLoginClick={handleLogin}
      onLogoutClick={handleLogout}
      matches={matches}/>)}
      <LoginDialog />
    </>
  );
}
