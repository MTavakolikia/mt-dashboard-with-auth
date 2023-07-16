import { storageKeys } from "../constants/storageKeys";
import { Product } from "../models/Product";

const storageKey = storageKeys.products;
export const productService = {
  delete: (item: Product) => {
    let products = productService.getAll();
    products = products.filter((q) => q.id != item.id);
    localStorage.setItem(storageKey, JSON.stringify(products));
  },
  insert: (item: Product) => {
    debugger;
    let products = productService.getAll();
    products = [...products, item];
    localStorage.setItem(storageKey, JSON.stringify(products));
  },
  update: (item: Product) => {
    let products = productService.getAll();
    const index = products.findIndex((q) => q.id == item.id);
    products[index] = item;
    localStorage.setItem(storageKey, JSON.stringify(products));
  },
  getAll: (count?: number) => {
    const products: Array<Product> = JSON.parse(
      localStorage.getItem(storageKey)!
    );
    if (count) return products.slice(0,count);

    return products;
  },
  setInitailProductsInLocalStorage: () => {
    if (localStorage.getItem(storageKey)) return;

    const products: Array<Product> = [
      {
        id: 1,
        title: "Asus 1020",
        price: "900",
        colors: ["red", "black", "silver"],
        editMode: false,
        thumbnail:
          "https://dkstatics-public.digikala.com/digikala-products/bda3801986a3b6d75d0998f3691959a0b7ca4c57_1618317535.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80",
      },
      {
        id: 2,
        title: "HP Pavilion",
        price: "1100",
        colors: ["black", "silver"],
        editMode: false,
        thumbnail:
          "https://dkstatics-public.digikala.com/digikala-products/6969c6df7ef275fbfce054beecb546a970b6341f_1637680475.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80",
      },
      {
        id: 3,
        title: "Levono 7850",
        price: "1200",
        colors: ["yellow", "black", "silver"],
        editMode: false,
        thumbnail:
          "https://dkstatics-public.digikala.com/digikala-products/3ae6e96450603a8ac8d9fcf1b99f6b2a346b9733_1625481410.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80",
      },
      {
        id: 4,
        title: "Apple Macbook",
        price: "1850",
        colors: ["black", "silver"],
        editMode: false,
        thumbnail:
          "https://dkstatics-public.digikala.com/digikala-products/eba3fab9bfe4c82fdbb8a85a7433a6cb8473d642_1654508060.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80",
      },
      {
        id: 5,
        title: "Surface 128",
        price: "1500",
        colors: ["red"],
        editMode: false,
        thumbnail: "",
      },
      {
        id: 6,
        title: "Dell 8050",
        price: "1300",
        colors: ["blue", "black"],
        editMode: false,
        thumbnail: "",
      },
      {
        id: 7,
        title: "Toshiba 7450",
        price: "800",
        colors: ["red", "black", "silver"],
        editMode: false,
        thumbnail: "",
      },
    ];

    localStorage.setItem(storageKey, JSON.stringify(products));
  },
};

// products
// pododucts
// prodacts
