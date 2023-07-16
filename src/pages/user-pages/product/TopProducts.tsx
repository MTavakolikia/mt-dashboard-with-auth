import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button  from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import type { RootState } from "state-management/store";
import { useDispatch, useSelector } from "react-redux";
import { add,remove } from "state-management/basketSlice";

import { productService } from "../../../services/productService";
import { Product } from "../../../models/Product";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions"

type TopProductsType = {
  itemCount: number;
};

const TopProducts = ({ itemCount }: TopProductsType) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const basketProducts = useSelector(
    (state: RootState) => state.basket.products
  );

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProducts(itemCount);
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      getProducts(itemCount);
    } else {
      setProducts([]);
    }
  }, [itemCount]);

  const getProducts = (count: number) => {
    const result = productService.getAll(count);
    //setProducts(result);
    setProducts([...result]);
  };

  const showModal = (item: Product) => {
    setSelectedProduct(item);
    handleOpen();
  };

  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography>{product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => showModal(product)}>
                  View
                </Button>
                <ProductActions products={basketProducts} currentProduct={product} add={() => dispatch(add(product))} remove={() => dispatch(remove(product))}/>

                {/* {basketProducts.findIndex((q) => q.id == product.id) > -1 ? (
                  <Button size="small" color="error" onClick={() => dispatch(remove(product))}>
                    Remove From Basket
                  </Button>
                ) : (
                  <Button size="small" onClick={() => dispatch(add(product))}>
                    Add To Basket
                  </Button>
                )} */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProductDetails
          product={selectedProduct!}
          products={basketProducts}
          close={handleClose}
          addToBasket={() => dispatch(add(selectedProduct!))}
          remove={() => dispatch(remove(selectedProduct!))}
        />
      </Modal>
    </>
  );
};

export default TopProducts;
