import React from "react";
import type { RootState } from "../../../state-management/store";
import { useDispatch, useSelector } from "react-redux";
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
import {remove} from "state-management/basketSlice"

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


const Basket = () => {
  const basketProducts = useSelector(
    (state: RootState) => state.basket.products
  );

  const dispatch = useDispatch();

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h4" color="inherit" noWrap>
              Basket Items:
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Colors</StyledTableCell>
                    <StyledTableCell align="right">Thumbnail</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basketProducts.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.colors}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <img src={product.thumbnail} width="150"/>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={() => dispatch(remove(product))}>
                            Remove
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Basket;
