import { NextResponse } from 'next/server';
import { runFullAutomationCycle } from '@/lib/services/automation-orchestrator';

export async function POST() {
  const result = await runFullAutomationCycle();
  return NextResponse.json(result);
}
