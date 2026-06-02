// ==========================================
// Lesson 7 — Arrays, Tuples & Enums
// ==========================================

// ----- Array basics -----
let names: string[] = ["Tariqul", "Rakib", "Sakib"];
let ages: Array<number> = [25, 26, 27];
const config: readonly string[] = ["development", "production"];

// ----- Exercise 1A — Uppercase All -----
function uppercaseAll(items: string[]): string[] {
  return items.map((item) => item.toUpperCase());
}

console.log(uppercaseAll(["hello", "world"])); // ["HELLO", "WORLD"]

// ----- Exercise 1B — Active Users -----
interface User {
  id: string;
  name: string;
  isActive: boolean;
}

function getActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

const users: User[] = [
  { id: "u1", name: "Tariqul", isActive: true },
  { id: "u2", name: "Rakib", isActive: false },
  { id: "u3", name: "Sakib", isActive: true },
];

console.log(getActiveUsers(users));

// ----- Exercise 2 — Tuple -----
function getUserInfo(id: string): [string, number] {
  return ["Tariqul", 25];
}

const [userName, userAge] = getUserInfo("u1");
console.log(userName, userAge); // Tariqul 25

// React useState — internally tuple
// const [count, setCount] = useState(0);
// [number, Dispatch<SetStateAction<number>>]

// ----- Exercise 3 — Enums -----
enum PostStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
  Archived = "ARCHIVED",
}

enum CommentStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

interface BlogPost {
  title: string;
  content: string;
  status: PostStatus;
}

interface Comment {
  content: string;
  status: CommentStatus;
}

const post: BlogPost = {
  title: "TypeScript",
  content: "Learning enums",
  status: PostStatus.Published,
};

// ----- Mini Project — E-commerce Order System -----

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

interface Order {
  id: string;
  userId: string;
  products: Product[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Storage
const orders: Order[] = [];

// Functions
function createOrder(
  userId: string,
  products: Product[],
  shippingAddress: ShippingAddress
): Order {
  const order: Order = {
    id: Date.now().toString(),
    userId,
    products,
    shippingAddress,
    status: OrderStatus.Pending,
    total: products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    ),
    createdAt: new Date(),
  };

  orders.push(order);
  return order;
}

function updateStatus(
  orderId: string,
  newStatus: OrderStatus
): ApiResponse<Order> {
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return { success: false, error: "Order not found" };
  }

  order.status = newStatus;
  return { success: true, data: order };
}

function getOrdersByUser(userId: string): Order[] {
  return orders.filter((order) => order.userId === userId);
}

// Tests
const newOrder = createOrder(
  "usr123",
  [
    { id: "p1", name: "MacBook", price: 1299, quantity: 1 },
    { id: "p2", name: "iPhone", price: 999, quantity: 2 },
  ],
  {
    street: "123 Main St",
    city: "Dhaka",
    country: "Bangladesh",
    zipCode: "1200",
  }
);

console.log(newOrder);
console.log(updateStatus(newOrder.id, OrderStatus.Shipped));
console.log(getOrdersByUser("usr123"));