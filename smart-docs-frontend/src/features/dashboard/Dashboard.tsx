import { useState } from 'react';
import { FileUploader } from '../../components/FileUploader';
import { RepoFetcher } from '../../components/RepoFetcher';
import { SummaryPanel } from '../../components/SummaryPanel';
import { Button } from '../../components/ui/button';
import { generateSummary } from '../../lib/api';
import { Navbar } from '../../components/Navbar';

export function Dashboard() {
  const [currentContent, setCurrentContent] = useState<string>('');
  const [summary, setSummary] = useState<any>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleFileContent = (content: string) => {
    setCurrentContent(content);
    setSummary(null); // Reset summary when new content is loaded
  };

  const handleRepoContent = (content: string) => {
    setCurrentContent(content);
    setSummary(null); // Reset summary when new content is loaded
  };

  const handleGenerateSummary = async () => {
    if (!currentContent) return;

    setIsGeneratingSummary(true);
    try {
      const summaryData = await generateSummary(currentContent);
      setSummary(summaryData);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🤖 Smart Documentation Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your documentation files or fetch from GitHub repositories to get AI-powered insights, summaries, and recommendations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <FileUploader onFileContent={handleFileContent} />
          <RepoFetcher onRepoContent={handleRepoContent} />
        </div>

        {currentContent && (
          <div className="text-center mb-6">
            <Button
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isGeneratingSummary ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Analyzing Documentation...
                </div>
              ) : (
                '✨ Generate AI Summary'
              )}
            </Button>
          </div>
        )}

        <div className="mt-6">
          <SummaryPanel summary={summary} isLoading={isGeneratingSummary} />
        </div>
      </div>
    </div>
  );
}
