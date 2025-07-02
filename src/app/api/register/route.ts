import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from 'models/Users';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, dateOfBirth, email, password } = await req.json();

    if (!name || !dateOfBirth || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      dateOfBirth: new Date(dateOfBirth),
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
