import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { fetchRepoData, validateGitHubUrl } from '../lib/api';

interface RepoFetcherProps {
  onRepoContent: (content: string) => void;
}

export function RepoFetcher({ onRepoContent }: RepoFetcherProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repoContent, setRepoContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRepo = async () => {
    if (!validateGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchRepoData(repoUrl);
      setRepoContent(data.readme);
      onRepoContent(data.readme);
    } catch (err) {
      setError('Failed to fetch repository. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🐙 GitHub Repository
        </CardTitle>
        <CardDescription>
          Fetch documentation from any public GitHub repository
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="https://github.com/username/repository"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleFetchRepo}
            disabled={isLoading || !repoUrl.trim()}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Fetching...
              </div>
            ) : (
              'Fetch Repo'
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
            <span className="text-red-500">❌</span>
            <span>{error}</span>
          </div>
        )}

        {repoContent && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <div>
                  <p className="font-medium text-green-800">Repository fetched successfully!</p>
                  <p className="text-sm text-green-600">README content loaded and ready for analysis</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">📄 Repository README</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto max-h-64 whitespace-pre-wrap border">
                  {repoContent}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
