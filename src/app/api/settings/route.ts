import { NextRequest, NextResponse } from 'next/server';
import { getSettingsFromDb, saveSettingsToDb } from '@/lib/db';
import { StoreSettings } from '@/types/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSettingsFromDb();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newSettings = (await req.json()) as StoreSettings;
    const saveResult = await saveSettingsToDb(newSettings);

    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed saving settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings: newSettings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid settings data' },
      { status: 400 }
    );
  }
}
