import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/data-source';
import { Calculation } from '@/entities/Calculation';
import { AppDataSource } from '@/lib/data-source';

export async function GET() {
  try {
    await initializeDatabase();
    const calculationRepo = AppDataSource.getRepository(Calculation);
    const history = await calculationRepo.find({
      order: { timestamp: 'DESC' },
      take: 50, // Limit to 50 most recent
    });
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await initializeDatabase();
    const calculationRepo = AppDataSource.getRepository(Calculation);
    await calculationRepo.clear();
    return NextResponse.json({ message: 'History cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    return NextResponse.json(
      { error: 'Failed to clear history' },
      { status: 500 }
    );
  }
}