// ==========================================
// Lesson 10 — Classes & Access Modifiers
// ==========================================

// ----- Access Modifiers basics -----
class BankAccount {
  constructor(
    public accountHolder: string,
    private balance: number,
    protected accountType: string
  ) {}

  public getBalance(): number {
    return this.balance;
  }

  private validateAmount(amount: number): boolean {
    return amount > 0 && amount <= this.balance;
  }

  public withdraw(amount: number): string {
    if (this.validateAmount(amount)) {
      this.balance -= amount;
      return `Withdrawn: ${amount}`;
    }
    return "Invalid amount";
  }
}

const account = new BankAccount("Tariqul", 5000, "savings");
console.log(account.accountHolder);  // ✅
console.log(account.getBalance());   // ✅
console.log(account.withdraw(1000)); // ✅

// ----- Exercise 1 — Rectangle -----
class Rectangle {
  constructor(
    private width: number,
    private height: number
  ) {}

  get area(): number {
    return this.width * this.height;
  }

  get perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);       // 50
console.log(rect.perimeter);  // 30

// ----- Exercise 2 — Static Methods -----
type Currency = "USD" | "BDT" | "EUR";

class CurrencyConverter {
  static rates: Record<Currency, number> = {
    USD: 1,
    BDT: 122,
    EUR: 0.92,
  };

  static convert(
    amount: number,
    from: Currency,
    to: Currency
  ): number {
    const usdAmount = amount / CurrencyConverter.rates[from];
    return usdAmount * CurrencyConverter.rates[to];
  }

  static formatCurrency(
    amount: number,
    currency: Currency
  ): string {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

console.log(CurrencyConverter.convert(100, "USD", "BDT")); // 12200
console.log(CurrencyConverter.formatCurrency(1220, "BDT")); // "1220.00 BDT"

// ----- Exercise 3 — Access Modifiers -----
class PasswordManager {
  private masterPassword: string;
  private passwords: Map<string, string>;
  public userId: string;

  constructor(userId: string, masterPassword: string) {
    this.userId = userId;
    this.masterPassword = masterPassword;
    this.passwords = new Map();
  }

  public addPassword(site: string, password: string): void {
    this.passwords.set(site, password);
  }

  public getPassword(
    site: string,
    masterAttempt: string
  ): string | null {
    if (masterAttempt !== this.masterPassword) {
      return null;
    }
    return this.passwords.get(site) ?? null;
  }
}

const pm = new PasswordManager("usr123", "master@123");
pm.addPassword("github.com", "gh_pass");
console.log(pm.getPassword("github.com", "master@123")); // "gh_pass"
console.log(pm.getPassword("github.com", "wrongpass"));  // null

// ----- Singleton Pattern -----
class Database {
  private static instance: Database | null = null;
  private isConnected: boolean = false;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(uri: string): void {
    this.isConnected = true;
    console.log(`Connected to ${uri}`);
  }

  get status(): boolean {
    return this.isConnected;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true

// ----- Mini Project — MongoDB Model Class -----
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type CreateProductInput = Omit
  Product,
  "_id" | "createdAt" | "updatedAt"
>;

type UpdateProductInput = Partial<CreateProductInput>;

class ProductModel {
  private products: Product[] = [];
  private nextId = 1;

  create(data: CreateProductInput): Product {
    const product: Product = {
      _id: this.nextId.toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.nextId++;
    this.products.push(product);
    return product;
  }

  findById(id: string): Product | null {
    return this.products.find((p) => p._id === id) ?? null;
  }

  findAll(filter?: Partial<CreateProductInput>): Product[] {
    if (!filter) return this.products;
    return this.products.filter((product) =>
      Object.entries(filter).every(
        ([key, value]) => product[key as keyof Product] === value
      )
    );
  }

  updateById(
    id: string,
    data: UpdateProductInput
  ): Product | null {
    const index = this.products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    this.products[index] = {
      ...this.products[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  deleteById(id: string): boolean {
    const index = this.products.findIndex((p) => p._id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  count(): number {
    return this.products.length;
  }
}

// Tests
const productModel = new ProductModel();

const p1 = productModel.create({
  name: "MacBook",
  price: 1299,
  category: "Laptops",
  inStock: true,
});

const p2 = productModel.create({
  name: "iPhone",
  price: 999,
  category: "Phones",
  inStock: false,
});

console.log(productModel.count());          // 2
console.log(productModel.findById(p1._id)); // MacBook
console.log(productModel.findAll({ inStock: true })); // [MacBook]
console.log(productModel.updateById(p1._id, { price: 1199 }));
console.log(productModel.deleteById(p2._id)); // true
console.log(productModel.count());          // 1