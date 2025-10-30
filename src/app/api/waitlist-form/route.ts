// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { eq, sql } from 'drizzle-orm';
import { Waitlist } from '@/lib/db/schema';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log('Email',email)
    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await db
      .select()
      .from(Waitlist)
      .where(eq(Waitlist.email, email.toLowerCase()))
      .limit(1);

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered', alreadyExists: true },
        { status: 409 }
      );
    }

    // Insert new email
    await db.insert(Waitlist).values({
      email: email.toLowerCase(),
    });

    // Get updated count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(Waitlist);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist!',
        count: Number(count)
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist registration error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get total count of waitlist signups
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(Waitlist);

    return NextResponse.json(
      { 
        count: Number(count),
        remaining: Math.max(0, 100 - Number(count)),
        percentage: Math.min(100, Number(count))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist count error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
}