import { Button } from "@mui/material";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductCatalog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <>
  <div>ProductCatalog for ID : {id}</div>
  <Button onClick={() => navigate(-1)}>back to list</Button>
  </>;
};

export default ProductCatalog;
