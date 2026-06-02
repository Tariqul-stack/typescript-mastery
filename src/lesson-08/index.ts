// ==========================================
// Lesson 8 — Functions & Overloads
// ==========================================

// ----- Function syntax -----
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

type MathOperation = (a: number, b: number) => number;
const divide: MathOperation = (a, b) => a / b;

function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"} ${name}`;
}

function createUser(
  name: string,
  role: string = "user"
): object {
  return { name, role };
}

// ----- Rest Parameters -----
function sumAll(...numbers: number[]): number {
  return numbers.reduce((sum, n) => sum + n, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15

// ----- Exercise 1A — Filter Above -----
function filterAbove(
  numbers: number[],
  threshold: number
): number[] {
  return numbers.filter((n) => n > threshold);
}

console.log(filterAbove([1, 5, 3, 8, 2, 9], 4)); // [5, 8, 9]

// ----- Exercise 1B — Sort By Field (Generic) -----
function sortByField<T>(
  items: T[],
  field: keyof T
): T[] {
  return items.sort((a, b) =>
    a[field] > b[field] ? 1 : -1
  );
}

const sortedUsers = sortByField(
  [
    { name: "Rakib", age: 26 },
    { name: "Tariqul", age: 25 },
    { name: "Sakib", age: 24 },
  ],
  "age"
);
console.log(sortedUsers);

// ----- Exercise 2 — Function Overload -----
function processWords(input: string): string[];
function processWords(input: string[]): string;
function processWords(
  input: string | string[]
): string | string[] {
  if (typeof input === "string") {
    return input.split(" ");
  }
  return input.join(" ");
}

console.log(processWords("Hello World"));        // ["Hello", "World"]
console.log(processWords(["Hello", "World"]));   // "Hello World"

// ----- Exercise 3 — Higher Order Function -----
function applyTransform(
  value: string,
  transform: (input: string) => string
): string {
  return transform(value);
}

console.log(applyTransform("hello", (s) => s.toUpperCase())); // "HELLO"
console.log(applyTransform("  hello  ", (s) => s.trim()));    // "hello"

// ----- Mini Project — Express Middleware System -----

// Types
interface Request {
  method: string;
  url: string;
  body: Record<string, unknown>;
}

interface Response {
  status(code: number): Response;
  json(data: unknown): void;
}

type NextFunction = () => void;

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface Route {
  method: string;
  path: string;
  handler: Middleware;
}

// Logger Middleware
function createLogger(prefix: string): Middleware {
  return function (req, res, next) {
    console.log(`[${prefix}] ${req.method} ${req.url}`);
    next();
  };
}

// Validate Body Middleware
function validateBody(requiredFields: string[]): Middleware {
  return function (req, res, next) {
    const missing = requiredFields.filter(
      (field) => !req.body[field]
    );

    if (missing.length > 0) {
      res.status(400).json({
        error: `Missing fields: ${missing.join(", ")}`,
      });
      return;
    }

    next();
  };
}

// Handle Request
function handleRequest(
  method: string,
  path: string,
  handler: Middleware
): Route {
  return { method, path, handler };
}

// getUser — Overload
interface User {
  _id: string;
  name: string;
  email: string;
}

function getUser(id: string): User;
function getUser(id: undefined): User[];
function getUser(id: string | undefined): User | User[] {
  if (id) {
    return { _id: id, name: "Tariqul", email: "t@gmail.com" };
  }
  return [
    { _id: "1", name: "Tariqul", email: "t@gmail.com" },
    { _id: "2", name: "Rakib", email: "r@gmail.com" },
  ];
}

// Tests
const logger = createLogger("AUTH");
const validate = validateBody(["email", "password"]);
const loginRoute = handleRequest("POST", "/login", logger);

console.log(loginRoute);
console.log(getUser("123"));      // single User
console.log(getUser(undefined));  // User[]