import React from "react";
import Button from "@mui/material/Button";
import { Product } from "models/Product";

type ProductActionsProps = {
  products: Product[];
  currentProduct: Product;
  add:any;
  remove:any;
};

const ProductActions = ({ products, currentProduct, add, remove }: ProductActionsProps) => {
  return (
    <>
      {products.findIndex((q) => q.id == currentProduct.id) > -1 ? (
        <Button
          size="small"
          color="error"
          onClick={() => remove(currentProduct)}
        >
          Remove From Basket
        </Button>
      ) : (
        <Button size="small" onClick={() => add(currentProduct)}>
          Add To Basket
        </Button>
      )}

      {/* <Button size="small" color={added ? 'primary' : 'error'} onClick={action}>
           {added ? "Add To" : "Remove From" } Basket
        </Button> */}
    </>
  );
};

export default ProductActions;
