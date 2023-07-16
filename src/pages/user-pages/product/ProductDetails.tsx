import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Product} from '../../../models/Product';
import ProductActions from './ProductActions'
import { remove } from "state-management/basketSlice";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

type ProductDetailsPropType = {
    product:Product,
    close:any,
    addToBasket:any,
    products:Product[],
    remove:any
};

const ProductDetails = ({product, close, addToBasket, products, remove}:ProductDetailsPropType) => {
  return (
    <>
      <Box sx={style} key={product.id}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia component="img" image={product.thumbnail} alt="random" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography>{product.price}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={close}>Close</Button>
            <ProductActions currentProduct={product} add={addToBasket} remove={remove} products={products}/>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
