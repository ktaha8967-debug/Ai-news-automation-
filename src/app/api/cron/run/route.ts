import { NextResponse } from 'next/server';
import { runScheduledNewsAutomationPipeline } from '@/lib/automation/pipeline';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await runScheduledNewsAutomationPipeline(10);
    return NextResponse.json({
      success: true,
      schedule: '3x Daily Cron (0 0,8,16 * * *)',
      message: result.logMessage,
      result
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Cron execution failed' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
