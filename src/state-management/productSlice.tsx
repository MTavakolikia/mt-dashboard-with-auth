import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../models/IProduct";
import http from "../utility/http-common";

export const fetchProductList = createAsyncThunk(
  "product/productListLoading",
  async () => {
    let response = await http.get<Array<IProduct>>("/Products");
    return response.data;
  }
);

export interface IProductState {
  status: string;
  data: IProduct[];
  error: any;
}

const initialState: IProductState = {
  status: "idle",
  data: [],
  error: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, () => ({
        status: "loading",
        data: [],
        error: {},
      }))
      .addCase(fetchProductList.fulfilled, (state, action) => ({
        status: "done",
        data: action.payload,
        error: {},
      }))
      .addCase(fetchProductList.rejected, (state, action) => ({
        status: "error",
        data: [],
        error: action.payload,
      }));
  },
});

export default productSlice.reducer;
