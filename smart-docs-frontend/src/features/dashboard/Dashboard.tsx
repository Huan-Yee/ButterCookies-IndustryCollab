import { useState } from 'react';
import { motion } from 'framer-motion';
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
    setSummary(null);
  };

  const handleRepoContent = (content: string) => {
    setCurrentContent(content);
    setSummary(null);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-slate-800 mb-6 tracking-tight">
            Smart Documentation
            <span className="block text-slate-600 font-normal">Assistant</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Intelligent analysis and insights for your documentation.
            Upload files or connect repositories to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 lg:grid-cols-2 mb-12"
        >
          <FileUploader onFileContent={handleFileContent} />
          <RepoFetcher onRepoContent={handleRepoContent} />
        </motion.div>

        {currentContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <Button
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/25"
            >
              {isGeneratingSummary ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Documentation...
                </div>
              ) : (
                'Generate Analysis'
              )}
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <SummaryPanel summary={summary} isLoading={isGeneratingSummary} />
        </motion.div>
      </div>
    </div>
  );
}