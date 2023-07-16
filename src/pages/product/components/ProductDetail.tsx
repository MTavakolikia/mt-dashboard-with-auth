import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { Product } from "../../../models/Product";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface IProductDetailComponentProps {
  product: Product;
  selected: any;
  selectItem: any;
  removeItem: any;
  changeMode: any;
  deleteItem: any;
}

//const ProductDetail = ({product:Product, selected, selectItem, removeItem, changeMode}) => {
const ProductDetail = (props: IProductDetailComponentProps) => {
  const { product, selected, selectItem, removeItem, changeMode, deleteItem } =
    props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="product-box">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src={product.thumbnail} width="95%" />
        </Grid>
        <Grid item xs={12}>
          Title : {product.title}
        </Grid>
        <Grid item xs={12}>
          Price : {product.price}
        </Grid>
        <Grid item xs={12}>
          <b>Colors:</b>
          {product.colors.map((color, index) => (
            <span
              key={index}
              className="color-box-circle"
              style={{ backgroundColor: color, color: color }}
            >
              abc
            </span>
          ))}
        </Grid>
        <Grid item xs={6} xl={3}>
          {selected ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => removeItem(product)}
            >
              <CloseIcon />
            </Button>
          ) : (
            <Button variant="contained" onClick={() => selectItem(product)}>
              <AddIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={6} xl={3}>
          <Button
            variant="outlined"
            color="info"
            onClick={() => changeMode(product.id, true)}
          >
            <EditIcon />
          </Button>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Button
            variant="contained"
            aria-describedby={id}
            color="error"
            onClick={handleClick}
          >
            <DeleteIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box style={{padding:"10px 15px"}}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                are you sure remove item ?
              </Typography>
              <Button onClick={() => deleteItem(product)}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
            </Box>
          </Popover>

          <Link to={`${product.id}`}>
            <SlideshowIcon />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
