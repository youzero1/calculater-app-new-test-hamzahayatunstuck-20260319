import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/data-source';
import { Calculation } from '@/entities/Calculation';
import { AppDataSource } from '@/lib/data-source';

// Helper function to evaluate expression safely
function evaluateExpression(expression: string): number {
  // Remove any whitespace
  const cleaned = expression.replace(/\s+/g, '');
  
  // Validate expression: only digits, operators, and decimal points
  if (!/^[0-9+\-*/.]+$/.test(cleaned)) {
    throw new Error('Invalid expression');
  }

  // Check for division by zero
  if (/\/0(?:[^0-9]|$)/.test(cleaned)) {
    throw new Error('Division by zero');
  }

  // Use Function constructor for evaluation (caution: in production, consider a safer parser)
  try {
    // Replace repeated operators or invalid sequences
    const sanitized = cleaned.replace(/[+\-*/]{2,}/g, match => {
      // If multiple operators, take the last one
      return match.slice(-1);
    });
    
    const result = Function(`"use strict"; return (${sanitized})`)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid result');
    }
    
    return parseFloat(result.toFixed(10)); // Prevent floating point weirdness
  } catch (error) {
    throw new Error('Evaluation failed');
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const { expression } = await request.json();

    if (!expression || typeof expression !== 'string') {
      return NextResponse.json(
        { error: 'Expression is required and must be a string' },
        { status: 400 }
      );
    }

    const result = evaluateExpression(expression);
    
    // Save to database
    const calculation = new Calculation();
    calculation.expression = expression;
    calculation.result = result;
    
    const calculationRepo = AppDataSource.getRepository(Calculation);
    await calculationRepo.save(calculation);

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Calculation failed' },
      { status: 400 }
    );
  }
}