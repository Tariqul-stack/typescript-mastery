// ==========================================
// Lesson 11 — Inheritance & Abstract Classes
// ==========================================

// ----- Exercise 1 — Inheritance -----

class Person {
  constructor(
    public name: string,
    public email: string,
    public age: number
  ) {}

  introduce(): string {
    return `Hi, I am ${this.name}. Contact: ${this.email}.`;
  }
}

class Student extends Person {
  constructor(
    name: string,
    email: string,
    age: number,
    public studentId: string,
    public major: string
  ) {
    super(name, email, age);
  }

  override introduce(): string {
    return `${super.introduce()} I am a student majoring in ${this.major} (ID: ${this.studentId}).`;
  }
}

class Teacher extends Person {
  constructor(
    name: string,
    email: string,
    age: number,
    public subject: string,
    public yearsOfExperience: number
  ) {
    super(name, email, age);
  }

  override introduce(): string {
    return `Hello, I am Prof. ${this.name}. I teach ${this.subject} and have ${this.yearsOfExperience} years of experience.`;
  }
}

const student = new Student("Rakib", "rakib@gmail.com", 20, "STU001", "CSE");
const teacher = new Teacher("Karim", "karim@gmail.com", 45, "Mathematics", 15);

console.log(student.introduce());
console.log(teacher.introduce());

// ----- Exercise 2 — Abstract Notification -----

abstract class NotificationService {
  abstract send(to: string, message: string): void;
  abstract getTemplate(): string;

  log(message: string): void {
    console.log(`[LOG - ${new Date().toLocaleTimeString()}]: ${message}`);
  }
}

class EmailNotification extends NotificationService {
  send(to: string, message: string): void {
    this.log(`Sending email to ${to}`);
    console.log(`Email Sent to ${to}: ${message}`);
  }

  getTemplate(): string {
    return "<h1>Default Email Template</h1>";
  }
}

class SMSNotification extends NotificationService {
  send(to: string, message: string): void {
    this.log(`Sending SMS to ${to}`);
    console.log(`SMS Sent to ${to}: ${message}`);
  }

  getTemplate(): string {
    return "SMS: [Your OTP is...]";
  }
}

const emailNotif = new EmailNotification();
const smsNotif = new SMSNotification();

emailNotif.send("user@gmail.com", "Welcome!");
smsNotif.send("01700000000", "Your OTP is 123456");

// ----- Exercise 3 — Abstract class rules -----

abstract class Logger {
  abstract log(message: string): void;

  logWithTimestamp(message: string): void {
    this.log(`[${new Date().toISOString()}] ${message}`);
  }
}

// Problem 1: abstract method implement না করলে error
// Problem 2: abstract class এর instance বানানো যায় না

class ConsoleLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }
}

const consoleLogger = new ConsoleLogger();
consoleLogger.logWithTimestamp("Hello World!");

// ----- Mini Project — Express Router Architecture -----

interface Request {
  params: Record<string, string>;
}

interface Response {
  json(data: unknown): void;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RouteHandler = (req: Request, res: Response) => void;

interface Route {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
}

abstract class BaseRouter {
  protected routes: Route[] = [];

  constructor(protected basePath: string) {}

  protected addRoute(
    method: HttpMethod,
    path: string,
    handler: RouteHandler
  ): void {
    this.routes.push({
      method,
      path: this.basePath + path,
      handler,
    });
  }

  getRoutes(): Route[] {
    return this.routes;
  }

  protected abstract setupRoutes(): void;
}

class UserRouter extends BaseRouter {
  constructor() {
    super("/users");
    this.setupRoutes();
  }

  protected setupRoutes(): void {
    this.addRoute("GET", "/", this.getAllUsers);
    this.addRoute("GET", "/:id", this.getUserById);
    this.addRoute("POST", "/", this.createUser);
    this.addRoute("PUT", "/:id", this.updateUser);
    this.addRoute("DELETE", "/:id", this.deleteUser);
  }

  getAllUsers: RouteHandler = (req, res) => {
    res.json({ users: [] });
  };

  getUserById: RouteHandler = (req, res) => {
    res.json({ user: null });
  };

  createUser: RouteHandler = (req, res) => {
    res.json({ created: true });
  };

  updateUser: RouteHandler = (req, res) => {
    res.json({ updated: true });
  };

  deleteUser: RouteHandler = (req, res) => {
    res.json({ deleted: true });
  };
}

class ProductRouter extends BaseRouter {
  constructor() {
    super("/products");
    this.setupRoutes();
  }

  protected setupRoutes(): void {
    this.addRoute("GET", "/", this.getAllProducts);
    this.addRoute("POST", "/", this.createProduct);
  }

  getAllProducts: RouteHandler = (req, res) => {
    res.json({ products: [] });
  };

  createProduct: RouteHandler = (req, res) => {
    res.json({ created: true });
  };
}

// Tests
const userRouter = new UserRouter();
const productRouter = new ProductRouter();

console.log(userRouter.getRoutes());
console.log(productRouter.getRoutes());