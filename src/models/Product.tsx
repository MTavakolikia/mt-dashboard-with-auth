export interface Product{
    id:number | string | null;
    title:string;
    price:string;
    colors:Array<string>;
    editMode:boolean;
    thumbnail:string;
}