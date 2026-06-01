// ==========================================
// Lesson 4 — Primitives, any, unknown, never
// ==========================================

// ----- Primitive Types -----
let username: string = "Tariqul";
let age: number = 25;
let isAdmin: boolean = true;
let empty: null = null;
let notDefined: undefined = undefined;

// ----- Exercise 1 — any এর বদলে proper type -----
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// ----- Exercise 2 — unknown safely use করা -----

// ❌ any দিলে unsafe
// function processInput(input: any): string {
//   return input.toUpperCase();
// }

// ✅ unknown রেখে type check করো
function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return "Not a string";
}

// ----- Exercise 3 — never -----
// never মানে এই point এ কখনো পৌঁছানো সম্ভব না
// সব case handle হয়ে গেলে default এ never থাকে
type Status = "active" | "inactive" | "banned";

function handleStatus(status: Status): string {
  switch (status) {
    case "active":
      return "User is active";
    case "inactive":
      return "User is inactive";
    case "banned":
      return "User is banned";
    default:
      const check: never = status;
      return check;
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

// ----- Mini Project — MongoDB Error Handler -----

// User type define করা
interface User {
  _id: string;
  name: string;
  email: string;
}

// Success এবং Error response এর type
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Fake UserModel — real project এ Mongoose থেকে আসবে
const UserModel = {
  findById: async (id: string): Promise<User | null> => {
    if (id === "123") {
    //   return { _id: "123", name: "Tariqul", email: "tariqul@gmail.com" };
    }
    return null;
  },
};

// MongoDB error handler — unknown দিয়ে safely error handle
async function findUserById(id: string): Promise<ApiResponse<User>> {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error: unknown) {
    // error directly access করা যাবে না — আগে check করতে হবে
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unknown error occurred" };
  }
}

// Test 
const test = async () => {
  const result1 = await findUserById("123");
  console.log(result1); // { success: true, data: { _id: '123', ... } }

  const result2 = await findUserById("999");
  console.log(result2); // { success: false, error: 'User not found' }
};

test();


// ১. catch block এ error সবসময় unknown
// catch (error: unknown) { ... }

// // ২. unknown use করতে হলে আগে check
// if (error instanceof Error) {
//   error.message // ✅ safe
// }

// // ৩. Generic type — T মানে যেকোনো type হতে পারে
// type ApiResponse<T> =
//   | { success: true; data: T }
//   | { success: false; error: string };
// // Lesson 13 এ Generics বিস্তারিত 