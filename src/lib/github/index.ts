import { APP_CONFIG } from '@/lib/config';

/**
 * Interface for file-based persistence via GitHub API
 */
export interface IGitHubStorageService {
  getFileContent<T>(filePath: string): Promise<T | null>;
  commitFileContent<T>(
    filePath: string,
    content: T,
    commitMessage: string
  ): Promise<{ success: boolean; sha?: string; error?: string }>;
}

/**
 * Server-side GitHub Storage Service implementation.
 * Persists JSON files (products.json, orders.json, settings.json, etc.) directly to the GitHub repository.
 */
export class GitHubStorageService implements IGitHubStorageService {
  private get owner(): string {
    return APP_CONFIG.github.owner;
  }

  private get repo(): string {
    return APP_CONFIG.github.repo;
  }

  private get branch(): string {
    return APP_CONFIG.github.branch || 'main';
  }

  private get token(): string {
    return APP_CONFIG.github.token;
  }

  /**
   * Retrieves raw file content from the GitHub repository
   */
  async getFileContent<T>(filePath: string): Promise<T | null> {
    if (!this.token || !this.owner || !this.repo) {
      return null;
    }

    try {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${APP_CONFIG.github.dataPath}/${filePath}?ref=${this.branch}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      let rawJson = '';

      if (data.content) {
        rawJson = Buffer.from(data.content, 'base64').toString('utf-8');
      } else if (data.download_url) {
        const rawRes = await fetch(data.download_url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          cache: 'no-store',
        });
        if (!rawRes.ok) return null;
        rawJson = await rawRes.text();
      } else {
        return null;
      }

      return JSON.parse(rawJson) as T;
    } catch (error) {
      console.error(`[GitHubStorage] Error reading ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Commits updated file content to the GitHub repository
   */
  async commitFileContent<T>(
    filePath: string,
    content: T,
    commitMessage: string
  ): Promise<{ success: boolean; sha?: string; error?: string }> {
    if (!this.token || !this.owner || !this.repo) {
      return {
        success: false,
        error: 'GitHub credentials not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.',
      };
    }

    try {
      // 1. Fetch current file SHA if exists
      const fileUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${APP_CONFIG.github.dataPath}/${filePath}?ref=${this.branch}`;
      const existingResponse = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      });

      let sha: string | undefined;
      if (existingResponse.ok) {
        const existingData = await existingResponse.json();
        sha = existingData.sha;
      }

      // 2. Commit update
      const serialized = JSON.stringify(content, null, 2);
      const encoded = Buffer.from(serialized).toString('base64');

      const commitResponse = await fetch(fileUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encoded,
          branch: this.branch,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!commitResponse.ok) {
        const errorText = await commitResponse.text();
        return { success: false, error: `GitHub API error: ${errorText}` };
      }

      const result = await commitResponse.json();
      return { success: true, sha: result.content?.sha };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown GitHub API error',
      };
    }
  }
}

export const githubStorage = new GitHubStorageService();
