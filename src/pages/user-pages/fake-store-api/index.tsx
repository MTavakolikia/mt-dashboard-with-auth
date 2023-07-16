import React, {useState} from 'react'
import http from '../../../utility/http-common'

type FakeProductRate = {
    rate:number;
    count:number;
}

type FakeProduct = {
    id?:number;
    title:string;
    description:string;
    price:number,
    image:string,
    rating?:FakeProductRate
};

const baseFakeAPIUrl = 'https://fakestoreapi.com';

const FakeStoreAPISample = () => {

    const [products, setProducts] = useState<FakeProduct[]>([]);
    const [limitProducts, setLimitProducts] = useState<FakeProduct[]>([]);
    const [addResult, setAddResult] = useState<FakeProduct>();


    const getAllProducts = () => {
        http.get<FakeProduct[]>(`${baseFakeAPIUrl}/products`).then(response => {
            setProducts(response.data);
            //console.log(products); //غلط است...چون هنوز استیت مربوطه به روزرسانی نشده است 
            console.table(response.data);
        });
    }

    // function getLimitProductsTest(limit:number=5){

    // }

    const getLimitProducts = (limit:number=5) => {
        //http.get<FakeProduct[]>(baseFakeAPIUrl + "/products?limit=" + limit).then(response => {
        http.get<FakeProduct[]>(`${baseFakeAPIUrl}/products?limit=${limit}`).then(response => {
            setLimitProducts(response.data);
            //console.log(products); //غلط است...چون هنوز استیت مربوطه به روزرسانی نشده است 
            console.table(response.data);
        });
    }

    const addNewProduct = () => {
        let product:FakeProduct = {description:"insert test", price:105, title:"test insert", image:"image url"};
        http.post<FakeProduct>(`${baseFakeAPIUrl}/products`, product).then(response => {
            setAddResult(response.data);
            //console.log(products); //غلط است...چون هنوز استیت مربوطه به روزرسانی نشده است 
            console.table(response.data);
        });
    }

  return (
    <div>
        <h1>Call API from https://fakestoreapi.com/docs</h1>
        <hr />
        <div>
            <h3>Get all products : (Count:{products.length})</h3>
            <button onClick={() => getAllProducts()}>Get all products</button>

        </div>

        <div>
            <h3>Get Limit products : (Count:{limitProducts.length})</h3>
            <button onClick={() => getLimitProducts(12)}>Get Limit products</button>

        </div>

        <div>
            <h3>Add new Product : (Insert Product Id:{addResult?.id})</h3>
            <button onClick={() => addNewProduct()}>Add New Product</button>

        </div>
    </div>
  )
}

export default FakeStoreAPISample