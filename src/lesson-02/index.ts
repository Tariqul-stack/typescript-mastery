// ==========================================
// Lesson 2 — Setup & tsconfig Basics
// ==========================================

// ----- Exercise 1 -----
// strict: true থাকলে এই code error দেবে
// strict: false থাকলে TypeScript চুপচাপ 'any' দিয়ে দেয়

// strict: false হলে valid — any type secretly assign হয়
// strict: true হলে error — type দিতেই হবে
function addWithoutTypes(a: number, b: number): number {
  return a + b;
}

// ----- Exercise 2 -----
// commonjs — Node.js / Express এর জন্য
// compile হলে: const express = require("express")

// esnext — Next.js / Modern bundlers এর জন্য
// compile হলে: import express from "express" (হুবহু থাকে)

// ----- Exercise 3 -----
// rootDir এবং outDir না থাকলে compiled files
// src/ এর ভেতরেই তৈরি হয় — source আর build মিশে যায়
// তুমি নিজেই এটা দেখেছিলে lesson 1 setup এ!

// ----- Mini Project -----
// tsconfig এর effect practically দেখা

function addNumbers(a: number, b: number): number {
  return a + b;
}

const result = addNumbers(10, 20);
console.log(`Result: ${result}`);

// res.status().json() chain ভাঙা — void return fix
function handleUserLogin(
  req: { body: { email: string; password: string } },
  res: { status: (code: number) => void; json: (data: object) => void }
) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ error: "Missing fields" });
    return;
  }

  res.json({ success: true, email });
}