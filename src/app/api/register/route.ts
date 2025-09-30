import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

// Import prisma with proper error handling for build time
let prisma: any;
try {
  prisma = require("@/lib/prisma");
} catch (error) {
  console.warn("Prisma not available during build:", error);
}

export async function POST(req: Request) {
  try {
    // Check if prisma is available (not during build time)
    if (!prisma) {
      return NextResponse.json(
        { message: "Database not available" },
        { status: 503 }
      );
    }

    const { name, email, password, role } = await req.json();
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "User registered successfully", 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}