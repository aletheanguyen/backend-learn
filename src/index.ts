console.log("hello world");

interface Product {
    name: string
}

let prod: Product = {
    name: "ho hieu"
}

console.log(prod);

const sum = (a, b) => a + b
let products: Product[] = []
products.map(p => p.name)