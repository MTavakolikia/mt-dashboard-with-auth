import React, {useState} from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import TopProducts from '../product/TopProducts';
import Welcome from './Welcome'
import type { RootState } from "state-management/store";
import { useSelector } from "react-redux";

const Home = () => {
  const [productCount, setProductCount] = useState<number>(3);
  const productsWithThunks = useSelector((state: RootState) => state.catalog);

  const productCountChange = (event:any) => {
    console.log(event.target.value);
    setProductCount(event.target.value);
  }

  return (
    <>
      <Container maxWidth="sm">
        (Products Count : {productsWithThunks.data.length})
        <Welcome />
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <TextField
            label="Item Count :"
            variant="standard"
            defaultValue={productCount}
            onChange={productCountChange}
          />
        <TopProducts itemCount={productCount} />
      </Container>
    </>
  );
};

export default Home;
