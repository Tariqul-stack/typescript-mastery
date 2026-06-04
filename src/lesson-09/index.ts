// ==========================================
// Lesson 9 — Type Narrowing & Type Guards
// ==========================================

// ----- typeof Narrowing -----

// Exercise 1
function describeValue(
  input: string | number | boolean
): string {
  if (typeof input === "string") {
    return `Word count: ${input.split(" ").length}`;
  }
  if (typeof input === "number") {
    return input % 2 === 0 ? "Even number" : "Odd number";
  }
  return input ? "Yes" : "No";
}

console.log(describeValue("Hello World")); // Word count: 2
console.log(describeValue(42));            // Even number
console.log(describeValue(true));          // Yes

// ----- instanceof Narrowing -----
class ApiError {
  constructor(
    public message: string,
    public statusCode: number
  ) {}
}

class ValidationError {
  constructor(
    public message: string,
    public field: string
  ) {}
}

function handleError(
  error: ApiError | ValidationError
): string {
  if (error instanceof ApiError) {
    return `API Error ${error.statusCode}: ${error.message}`;
  }
  return `Validation Error on ${error.field}: ${error.message}`;
}

// ----- Exercise 2 — Custom Type Guard -----
interface FreeUser {
  type: "free";
  name: string;
  storageLimit: number;
}

interface PremiumUser {
  type: "premium";
  name: string;
  storageLimit: number;
  extraFeatures: string[];
}

type AppUser = FreeUser | PremiumUser;

function isPremiumUser(user: AppUser): user is PremiumUser {
  return user.type === "premium";
}

function getUserFeatures(user: AppUser): string {
  if (isPremiumUser(user)) {
    return `Premium: ${user.extraFeatures.join(", ")}`;
  }
  return `Free user — upgrade to get more features!`;
}

// ----- Exercise 3 — React FetchState -----
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

interface User {
  id: string;
  name: string;
}

function renderUserState(state: FetchState<User>): string {
  switch (state.status) {
    case "idle":
      return "Waiting to fetch";
    case "loading":
      return "Loading...";
    case "success":
      return `User: ${state.data.name}`;
    case "error":
      return `Error: ${state.message}`;
  }
}

console.log(renderUserState({ status: "idle" }));
console.log(renderUserState({ status: "loading" }));
console.log(renderUserState({ status: "success", data: { id: "1", name: "Tariqul" } }));
console.log(renderUserState({ status: "error", message: "Not found" }));

// ----- Mini Project — Auth Guard System -----

// Types
type Permission = "read" | "write" | "delete";
type Role = "user" | "admin" | "superAdmin";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

// Token validation
interface TokenValid {
  valid: true;
  user: AuthUser;
}

interface TokenInvalid {
  valid: false;
  error: string;
}

type TokenValidationResult = TokenValid | TokenInvalid;

function validateToken(token?: string): TokenValidationResult {
  if (!token) {
    return { valid: false, error: "No token provided" };
  }
  if (token.length < 10) {
    return { valid: false, error: "Invalid token" };
  }
  return {
    valid: true,
    user: {
      id: "usr123",
      name: "Tariqul",
      email: "t@gmail.com",
      role: "admin",
      permissions: ["read", "write", "delete"],
    },
  };
}

// Authorization
interface Authorized {
  authorized: true;
}

interface Unauthorized {
  authorized: false;
  error: string;
}

type AuthorizationResult = Authorized | Unauthorized;

function authorizeRequest(
  user: AuthUser,
  requiredPermission: Permission
): AuthorizationResult {
  const hasPermission = user.permissions.includes(requiredPermission);

  if (!hasPermission) {
    return {
      authorized: false,
      error: `Missing permission: ${requiredPermission}`,
    };
  }

  return { authorized: true };
}

// Protected route
type ProtectedRouteResult =
  | { success: true; message: string; user: AuthUser }
  | { success: false; error: string };

function handleProtectedRoute(
  token: string,
  requiredPermission: Permission
): ProtectedRouteResult {
  const tokenResult = validateToken(token);

  if (!tokenResult.valid) {
    return { success: false, error: tokenResult.error };
  }

  const authResult = authorizeRequest(
    tokenResult.user,
    requiredPermission
  );

  if (!authResult.authorized) {
    return { success: false, error: authResult.error };
  }

  return {
    success: true,
    message: "Access granted",
    user: tokenResult.user,
  };
}

// Tests
console.log(handleProtectedRoute("short", "read"));
console.log(handleProtectedRoute("validtoken123", "write"));
console.log(handleProtectedRoute("validtoken123", "delete"));