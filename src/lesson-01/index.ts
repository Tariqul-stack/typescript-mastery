// Exercise 1
function multiply(a:number, b:number ): number {
  return a * b;
}


// Exercise 2
function greet(name: string): string {
  return name;
}

// Exercise 3

// function UserCard({ name, age, isAdmin }): string,number,boolean {
//   return <div>{name} - {age} - {isAdmin ? "Admin" : "User"}</div>;
// }

interface UserCardProps {
  name: string;
  age: number;
  isAdmin: boolean;
}

function UserCard({ name, age, isAdmin }: UserCardProps) {
  return `${name} - ${age} - ${isAdmin ? "Admin" : "User"}`;
}

// Mini Project
interface UserCardProps {
  name: string;
  age: number;
  isAdmin: boolean;
}

function UserCards({ name, age, isAdmin }: UserCardProps) {
  return `${name} - ${age} - ${isAdmin ? "Admin" : "User"}`;
}
// function handleUserLogin(
//   req: { body: { email: string; password: string } },
//   res: { status: (code: number) => void; json: (data: object) => void }
// ) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400);
//     res.json({ error: "Missing fields" });
//     return;
//   }

//   res.json({ success: true, email });
// }

