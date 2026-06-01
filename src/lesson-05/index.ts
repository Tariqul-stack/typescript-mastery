// ==========================================
// Lesson 5 — Interfaces & Type Aliases
// ==========================================

// ----- Interface basics -----
interface User {
//   readonly _id: string;
  name: string;
  email: string;
//   age?: number;
  readonly createdAt: Date;
}

// ----- Exercise 1 — Product interface -----
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
}

const Product: Product = {
  id: "p001",
  name: "iPhone 15",
  price: 999,
  inStock: true,
  category: "Electronics",
};

// ----- Exercise 2 — Interface extending -----
interface Vehicle {
  brand: string;
  speed: number;
}

interface Car extends Vehicle {
  doors: number;
  fuelType: "petrol" | "diesel" | "electric";
}

const tesla: Car = {
  brand: "Tesla",
  speed: 250,
  doors: 4,
  fuelType: "electric",
};

// ----- Exercise 3 — Interface vs Type -----

// A: Object shape — Interface
interface UserShape {
  id: string;
  name: string;
}

// B: Union — Type
// type Status = "loading" | "success" | "error";

// C: Function signature — Type
type GetUser = (id: string) => Promise<UserShape>;

// D: Extending — Interface
interface AdminShape extends UserShape {
  permissions: string[];
}

// ----- Mini Project — Next.js Product API -----
interface ApiSuccess<T> {
  success: true;
  data: T;
}

interface ApiError {
  success: false;
  error: string;
}

// type ApiResponse<T> = ApiSuccess<T> | ApiError;

const products: Product[] = [
  {
    id: "p1",
    name: "MacBook",
    price: 1299,
    inStock: true,
    category: "Laptops",
  },
  {
    id: "p2",
    name: "iPhone",
    price: 999,
    inStock: false,
    category: "Phones",
  },
];

function getProducts(category?: string): Product[] {
  if (category) {
    return products.filter(
      (product) => product.category === category
    );
  }
  return products;
}

function getProductById(id: string): ApiResponse<Product> {
  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return { success: false, error: "Product not found" };
  }

  return { success: true, data: product };
}

function createProduct(
  data: Omit<Product, "id">
): ApiSuccess<Product> {
  const newProduct: Product = {
    ...data,
    id: Date.now().toString(),
  };

  products.push(newProduct);

  return { success: true, data: newProduct };
}

// Test
console.log(getProducts());
console.log(getProducts("Laptops"));
console.log(getProductById("p1"));
console.log(getProductById("p99"));
console.log(createProduct({
  name: "iPad",
  price: 799,
  inStock: true,
  category: "Tablets",
}));