import { Update } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import AddOrEdit from "./components/AddOrEdit";
import ProductDetail from "./components/ProductDetail";
import "./product.css";
// import { v4 as uuidv4 } from 'uuid';
import { v4 } from "uuid";
import { Product } from "../../models/Product";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import {PageHeader} from '../../components/page-header'
import Button from "@mui/material/Button";
import { productService } from "../../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    getProducts();
  }, [])
  
  const getProducts = () => {
    const products = productService.getAll();
    setProducts(products);
  }

  const addToList = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);

    let tempTotal = parseInt(product.price);
    selectedProducts.forEach((product) => {
      tempTotal += parseInt(product.price);
    });
    setTotalPrice(tempTotal);
  };

  const removeFromList = (product: Product) => {
    //debugger
    const temp = selectedProducts.filter((q) => q.id != product.id);
    setSelectedProducts([...temp]);
    setTotalPrice(totalPrice - parseInt(product.price));
  };

  const addNewItem = () => {
    if (products.find((q) => q.id == null)) return;

    const emptyItem: Product = {
      id: null,
      title: "",
      price: "",
      colors: [],
      editMode: true,
      thumbnail:"",
    };
    setProducts([...products, emptyItem]);
  };

  const changeEditMode = (id: number | null, mode: boolean) => {
    if (id == null) {
      // insert mode
      let temp = [...products].filter((q) => q.id != null);
      setProducts([...temp]);
    } else {
      //edit model
      let temp = [...products];
      const index = temp.findIndex((q) => q.id == id);
      temp[index].editMode = mode;
      setProducts([...temp]);
    }
  };

  const save = (item: Product) => {
    if (item.id == null) {
      //insert item in products
      insert(item);
    } else {
      //update item in products
      update(item);
    }
  };

  const insert = (item: Product) => {
    //??? => id
    item.id = v4();
    item.editMode = false;

    let temp = [...products].filter((q) => q.id != null);
    setProducts([...temp, item]);
    productService.insert(item);
  };

  const update = (item: Product) => {
    item.editMode = false;
    let temp = [...products];
    const index = temp.findIndex((q) => q.id == item.id);
    temp[index] = item;
    setProducts([...temp]);
    updateSelectedItems(item);
    productService.update(item);
  };

  const updateSelectedItems = (item: Product): void => {
    let temp = [...selectedProducts];
    const index = temp.findIndex((q) => q.id == item.id);
    temp[index] = item;
    setSelectedProducts([...temp]);

    let tempTotal: number = 0;
    temp.forEach((product) => {
      tempTotal += parseInt(product.price);
    });
    setTotalPrice(tempTotal);
  };

  const deleteProduct = (item:Product):void => {
    productService.delete(item);
    getProducts();
  }

  return (
    <>
      <b>Typescript Syntax</b>
      <div>
        Selected Products : {selectedProducts.length} - Total Price :{" "}
        {totalPrice}
      </div>
      <Button variant="contained" onClick={addNewItem}>Add New Product</Button>
      <div className="product-container">
        <Grid container spacing={2}>
          {products.map((item, index) =>
            item.editMode ? (
              <Grid item xl={3} xs={6} key={item.id}>
                <AddOrEdit
                  product={item}
                  commit={save}
                  cancel={(id: number) => changeEditMode(id, false)}
                />
              </Grid>
            ) : (
              <Grid item xl={3} xs={6} key={item.id}>
                <ProductDetail
                  product={item}
                  selectItem={addToList}
                  removeItem={removeFromList}
                  changeMode={changeEditMode}
                  deleteItem={deleteProduct}
                  selected={
                    selectedProducts.findIndex((q) => q.id == item.id) != -1
                  }
                />
              </Grid>
            )
          )}
        </Grid>
      </div>
      <Outlet />
      {/* <Helmet>
        <title>Product List</title>
      </Helmet> */}
      <PageHeader title='Product List'/>
    </>
  );
};

export default ProductList;
