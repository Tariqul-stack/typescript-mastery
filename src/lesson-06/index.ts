// ==========================================
// Lesson 6 — Union & Intersection Types
// ==========================================

// ----- Union Type basics -----
type ID = string | number;

let userId: ID = "abc123"; // ✅
userId = 42;               // ✅

// ----- Exercise 1 — Union + Narrowing -----
function processValue(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }
  return value * 2;
}

console.log(processValue("hello")); // 5
console.log(processValue(21));      // 42

// ----- Exercise 2 — Discriminated Union -----
interface CardPayment {
  type: "card";
  cardNumber: string;
  expiryDate: string;
}

interface BankPayment {
  type: "bank";
  accountNumber: string;
  routingNumber: string;
}

interface CryptoPayment {
  type: "crypto";
  walletAddress: string;
  currency: string;
}

type Payment = CardPayment | BankPayment | CryptoPayment;

function processPayment(payment: Payment): string {
  switch (payment.type) {
    case "card":
      return `Processing card payment: ${payment.cardNumber}`;
    case "bank":
      return `Processing bank payment: ${payment.accountNumber}`;
    case "crypto":
      return `Processing crypto payment in ${payment.currency}`;
  }
}

// ----- Exercise 3 — Intersection Type -----
interface Auditable {
  createdBy: string;
  updatedBy: string;
}

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface SoftDeletable {
  isDeleted: boolean;
  deletedAt: Date | null;
}

type BlogPost = Auditable &
  Timestamps &
  SoftDeletable & {
    title: string;
    content: string;
    published: boolean;
  };

const post: BlogPost = {
  title: "TypeScript is awesome",
  content: "Learning TS with MERN stack...",
  published: true,
  createdBy: "Tariqul",
  updatedBy: "Tariqul",
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
  deletedAt: null,
};

// ----- Mini Project — React Alert System -----
interface ErrorAlert {
  type: "error";
  message: string;
  code: number;
}

interface WarningAlert {
  type: "warning";
  message: string;
  onDismiss?: () => void;
}

interface SuccessAlert {
  type: "success";
  message: string;
}

type AlertProps = ErrorAlert | WarningAlert | SuccessAlert;

function Alert(props: AlertProps): string {
  if (props.type === "error") {
    return `ERROR ${props.code}: ${props.message}`;
  }
  if (props.type === "warning") {
    return `WARNING: ${props.message} ${
      props.onDismiss ? "(dismissible)" : ""
    }`;
  }
  return `SUCCESS: ${props.message}`;
}

// ----- applyTheme — Intersection -----
interface BaseElement {
  id: string;
  className: string;
}

interface Theme {
  color: string;
  fontSize: string;
  backgroundColor: string;
}

type ThemedElement = BaseElement & Theme;

function applyTheme(
  element: BaseElement,
  theme: Theme
): ThemedElement {
  return { ...element, ...theme };
}

// ----- checkAccess — Union Role -----
type UserRole = "user" | "admin" | "superAdmin";

interface AuthUser {
  name: string;
  role: UserRole;
}

function checkAccess(user: AuthUser, requiredRole: UserRole): boolean {
  return user.role === requiredRole || user.role === "superAdmin";
}

// Tests
console.log(Alert({ type: "error", message: "Not found", code: 404 }));
console.log(Alert({ type: "warning", message: "Low stock", onDismiss: () => {} }));
console.log(Alert({ type: "success", message: "Order placed!" }));

const themed = applyTheme(
  { id: "btn1", className: "button" },
  { color: "white", fontSize: "16px", backgroundColor: "blue" }
);
console.log(themed);

console.log(checkAccess({ name: "Tariqul", role: "admin" }, "admin"));    // true
console.log(checkAccess({ name: "Tariqul", role: "user" }, "admin"));     // false
console.log(checkAccess({ name: "Tariqul", role: "superAdmin" }, "admin")); // true