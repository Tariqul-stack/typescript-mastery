// ==========================================
// Lesson 3 — Type Annotations & Type Inference
// ==========================================

// ----- Exercise 1 — Annotation vs Inference -----

// A: Inference যথেষ্ট — value দেখেই TypeScript বোঝে
let city = "Dhaka";

// B: Annotation দরকার — value এখনো নেই
let score: number;
score = 100;

// C: Function parameter — সবসময় Annotation দরকার
function double(n: number): number {
  return n * 2;
}

// D: Inference যথেষ্ট — object এর shape দেখেই বোঝে
let product = { name: "Phone", price: 999 };

// ----- Exercise 2 — Type Inference error -----

// let isActive = true;
// isActive = "yes"; // ❌ Type 'string' is not assignable to type 'boolean'

// Correct — Option 1: Inference
let isActive = true;
isActive = false; // ✅

// Correct — Option 2: Annotation
let isActiveExplicit: boolean = true;
isActiveExplicit = false; // ✅

// ----- Exercise 3 — API Response typing -----

interface User {
  name: string;
  email: string;
  age: number;
}

const fetchUser = async (): Promise<User> => {
  const res = await fetch("/api/user");
  const data: User = await res.json();
  return data;
};

// ----- Mini Project — User Profile System -----

type UserProfile = {
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
  skills: string[];
};

// currentUser — হয় UserProfile, নয়তো null
let currentUser: UserProfile | null = null;

const userProfile: UserProfile = {
  name: "Tariqul Islam",
  email: "tariqul@gmail.com",
  age: 25,
  isAdmin: false,
  skills: ["React", "Node.js", "MongoDB"],
};

function updateProfile(
  user: UserProfile,
  newName: string,
  newAge: number
): UserProfile {
  user.name = newName;
  user.age = newAge;
  return user;
}

function displayUser(user: UserProfile): string {
  return `${user.name} (${user.age}) - ${
    user.isAdmin ? "Admin" : "User"
  }`;
}

// Test করে দেখো
currentUser = userProfile;
console.log(displayUser(updateProfile(userProfile, "Tariqul", 26)));