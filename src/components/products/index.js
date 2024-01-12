import { Box, Button, Container, Grid } from "@mui/material";
import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Products() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [items, setItems] = useState([])

    const getImage = () => {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }
  const fetchData = async () => {
      try {
          const token = localStorage.getItem('user')
          const response = await axios.get(`${process.env.REACT_APP_BACK}product`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          setItems(response.data.map(item => ({...item, image: getImage()})))
      } catch (e) {
          console.log(e)
      }
  }

    useEffect(() => {
        fetchData()
    }, []);

  return (
    <Container>
      <Grid        
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
          {
              items?.map((product) => (
                  <Grid item key={product.id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
                      {matches ? (
                          <SingleProduct product={product} matches={matches} />
                      ) : (
                          <SingleProductDesktop product={product} matches={matches} />
                      )}
                  </Grid>
              ))
          }
      </Grid>
    </Container>
  );
}
