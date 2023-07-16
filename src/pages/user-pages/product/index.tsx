import React, {useEffect, useState} from 'react'

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import http from '../../../utility/http-common'
import { IProduct } from '../../../models/IProduct';

import type { RootState,AppDispatch } from "state-management/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "state-management/productSlice";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

const ProductList = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const productsWithThunks = useSelector((state: RootState) => state.catalog);
  
    const dispatch = useDispatch<AppDispatch>();

    const getProducts = async() => {
        setLoading(true);
        setProducts([]);
        const result = await http.get<Array<IProduct>>("/Products");
        setProducts(result.data);
        setLoading(false);
    }

    useEffect(() => {
     getProducts();
    }, [])

    const getProductWithThunk = async() => {
      await dispatch(fetchProductList());
    }
    
  return (
   <>
    <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h4" color="inherit" noWrap>
              Basket Items: 
            </Typography>
            <Button variant="contained" color='primary' onClick={async () => await getProductWithThunk()}>
              
              Get Products with Redux-Thunk :(productsWithThunks Count :{productsWithThunks.data.length})
              </Button>
              <p>Result :{JSON.stringify({status:productsWithThunks.status,count:productsWithThunks.data.length, errro:productsWithThunks.error})}</p>
           <hr />
            <div>
              <Button disabled={loading} onClick={async () => await getProducts()} variant="contained" color='error'>
                Get Products from APITester.ir
                {loading ? <CircularProgress color="secondary" /> : null}
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">CategoryName</StyledTableCell>
                    <StyledTableCell align="right">SupplierName</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        {product.productName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.unitPrice}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.categoryName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.supplierName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button>
                            Test
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {loading ? <> <Typography variant="h5" color="inherit" noWrap>loading data from server...</Typography></> : null}
          </Grid>
        </Grid>
      </Container>
   </>
  )
}

export default ProductList