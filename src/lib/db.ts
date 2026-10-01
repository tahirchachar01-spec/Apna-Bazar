import path from 'path';
import { APP_CONFIG } from '@/lib/config';
import { githubStorage } from '@/lib/github';
import { Product } from '@/types/product';
import { Order } from '@/types/order';
import { Category } from '@/types/category';
import { Customer } from '@/types/customer';
import { StoreSettings } from '@/types/settings';

// Static fallbacks in case local filesystem access fails in serverless environments
import defaultProducts from '@/data/products.json';
import defaultCategories from '@/data/categories.json';
import defaultOrders from '@/data/orders.json';
import defaultCustomers from '@/data/customers.json';
import defaultSettings from '@/data/settings.json';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

const STATIC_FALLBACKS: Record<string, unknown> = {
  'products.json': defaultProducts,
  'categories.json': defaultCategories,
  'orders.json': defaultOrders,
  'customers.json': defaultCustomers,
  'settings.json': defaultSettings,
};

// Safe server-only filesystem loader
async function getFs() {
  if (typeof window === 'undefined') {
    try {
      return await import('fs/promises');
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Safely read JSON data:
 * 1. Tries GitHub repository API first (if GITHUB_TOKEN, OWNER, REPO are set)
 * 2. Tries local filesystem
 * 3. Falls back to static imported JSON bundled with the app
 */
export async function readJsonDb<T>(fileName: string): Promise<T> {
  // 1. Try reading live from GitHub repository if configured
  if (APP_CONFIG.github.token && APP_CONFIG.github.owner && APP_CONFIG.github.repo) {
    try {
      const gitData = await githubStorage.getFileContent<T>(fileName);
      if (gitData) {
        return gitData;
      }
    } catch (err) {
      console.warn(`[DB] GitHub fetch failed for ${fileName}, falling back to local storage.`, err);
    }
  }

  // 2. Try reading from local filesystem (works in local development)
  try {
    const fs = await getFs();
    if (fs) {
      const filePath = path.join(DATA_DIR, fileName);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (error) {
    // Expected on serverless or cold starts
  }

  // 3. Fallback to bundled static JSON (essential for Vercel/Netlify cold starts without credentials)
  if (STATIC_FALLBACKS[fileName]) {
    return STATIC_FALLBACKS[fileName] as T;
  }

  throw new Error(`Data collection ${fileName} not available`);
}

/**
 * Persist JSON data:
 * 1. Commits directly to GitHub repository (critical for Vercel/Netlify serverless runtime)
 * 2. Writes to local filesystem when in local development environment
 */
export async function writeJsonDb<T>(
  fileName: string,
  data: T,
  commitMessage: string = `Update ${fileName} via APNA Bazar Admin`
): Promise<{ success: boolean; gitSha?: string; error?: string }> {
  let localWritten = false;
  let localError: string | null = null;

  // 1. Attempt to write to local filesystem (works during local dev)
  try {
    const fs = await getFs();
    if (fs) {
      const filePath = path.join(DATA_DIR, fileName);
      const content = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, content, 'utf-8');
      localWritten = true;
    }
  } catch (error) {
    localError = error instanceof Error ? error.message : 'Local file system is read-only';
    console.warn(`[DB] Local filesystem write skipped or failed (${fileName}):`, localError);
  }

  // 2. Commit to GitHub repository if credentials are configured
  if (APP_CONFIG.github.token && APP_CONFIG.github.owner && APP_CONFIG.github.repo) {
    try {
      const gitRes = await githubStorage.commitFileContent<T>(fileName, data, commitMessage);
      if (gitRes.success) {
        return { success: true, gitSha: gitRes.sha };
      } else {
        console.warn(`[DB] GitHub commit warning for ${fileName}:`, gitRes.error);
        if (!localWritten) {
          return { success: false, error: gitRes.error };
        }
      }
    } catch (err) {
      console.warn(`[DB] GitHub commit error for ${fileName}:`, err);
      if (!localWritten) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Failed to commit changes to GitHub',
        };
      }
    }
  }

  // If local write succeeded (e.g. dev mode without GitHub token)
  if (localWritten) {
    return { success: true };
  }

  return {
    success: false,
    error:
      'GitHub credentials are not configured and local filesystem is read-only. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in your environment variables.',
  };
}

// ----------------- Data Access Methods ----------------- //

export async function getProductsFromDb(): Promise<Product[]> {
  return readJsonDb<Product[]>('products.json');
}

export async function saveProductsToDb(products: Product[]): Promise<{ success: boolean; error?: string }> {
  return writeJsonDb<Product[]>('products.json', products, 'Update products catalog');
}

export async function getOrdersFromDb(): Promise<Order[]> {
  return readJsonDb<Order[]>('orders.json');
}

export async function saveOrdersToDb(orders: Order[]): Promise<{ success: boolean; error?: string }> {
  return writeJsonDb<Order[]>('orders.json', orders, 'Update orders database');
}

export async function getCategoriesFromDb(): Promise<Category[]> {
  return readJsonDb<Category[]>('categories.json');
}

export async function saveCategoriesToDb(categories: Category[]): Promise<{ success: boolean; error?: string }> {
  return writeJsonDb<Category[]>('categories.json', categories, 'Update product categories');
}

export async function getCustomersFromDb(): Promise<Customer[]> {
  return readJsonDb<Customer[]>('customers.json');
}

export async function saveCustomersToDb(customers: Customer[]): Promise<{ success: boolean; error?: string }> {
  return writeJsonDb<Customer[]>('customers.json', customers, 'Update customer directory');
}

export async function getSettingsFromDb(): Promise<StoreSettings> {
  return readJsonDb<StoreSettings>('settings.json');
}

export async function saveSettingsToDb(settings: StoreSettings): Promise<{ success: boolean; error?: string }> {
  return writeJsonDb<StoreSettings>('settings.json', settings, 'Update store configuration');
}

/**
 * Test connectivity to the GitHub repository database
 */
export async function testGitHubConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
  details?: {
    owner: string;
    repo: string;
    branch: string;
    filesFound: number;
    fileNames?: string[];
  };
}> {
  const { owner, repo, branch, token, dataPath } = APP_CONFIG.github;

  if (!token || !owner || !repo) {
    return {
      configured: false,
      connected: false,
      message:
        'GitHub credentials are not configured in environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO). Operating in Local Database mode.',
    };
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dataPath}?ref=${branch}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        configured: true,
        connected: false,
        message: `GitHub API responded with HTTP ${res.status}: ${errText}`,
      };
    }

    const items = await res.json();
    const fileNames = Array.isArray(items) ? items.map((i: { name: string }) => i.name) : [];

    return {
      configured: true,
      connected: true,
      message: `Successfully connected to GitHub repository: ${owner}/${repo} (branch: ${branch})`,
      details: {
        owner,
        repo,
        branch,
        filesFound: fileNames.length,
        fileNames,
      },
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      message: error instanceof Error ? error.message : 'Unknown network connection error',
    };
  }
}
