import defaultSettings from '@/data/settings.json';
import { StoreSettings } from '@/types/settings';
import { getSettingsFromDb } from '@/lib/db';

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    return await getSettingsFromDb();
  } catch {
    return defaultSettings as StoreSettings;
  }
}
