import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileUploader } from '@/components/FileUploader';
import { RepoFetcher } from '@/components/RepoFetcher';
import { SummaryPanel } from '@/components/SummaryPanel';
import { docs, recentQAs } from '@/data/mockData';
import { FileText, MessageCircle, TrendingUp, Clock } from 'lucide-react';

export function Dashboard() {
  const [uploadedContent, setUploadedContent] = useState<{ content: string; filename: string } | null>(null);
  const [repoFiles, setRepoFiles] = useState<Array<{ name: string; content: string; type: string }>>([]);

  const upToDateDocs = docs.filter(doc => doc.status.includes('Up-to-date')).length;
  const needsUpdateDocs = docs.filter(doc => doc.status.includes('Needs Update')).length;
  const outdatedDocs = docs.filter(doc => doc.status.includes('Outdated')).length;

  const handleFileContent = (content: string, filename: string) => {
    setUploadedContent({ content, filename });
    setRepoFiles([]); // Clear repo files when uploading a single file
  };

  const handleRepoFetched = (files: Array<{ name: string; content: string; type: string }>) => {
    setRepoFiles(files);
    setUploadedContent(null); // Clear uploaded file when fetching repo
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your documentation and recent activity
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Docs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{docs.length}</div>
              <p className="text-xs text-muted-foreground">
                Documentation pages
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Up to Date</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{upToDateDocs}</div>
              <p className="text-xs text-muted-foreground">
                Current documentation
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Update</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{needsUpdateDocs}</div>
              <p className="text-xs text-muted-foreground">
                Requiring attention
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outdated</CardTitle>
              <FileText className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{outdatedDocs}</div>
              <p className="text-xs text-muted-foreground">
                Needs urgent update
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader>
              <CardTitle>Latest Documents</CardTitle>
              <CardDescription>Recently updated documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {docs.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Updated: {doc.updated}
                      </p>
                    </div>
                    <Badge
                      variant={
                        doc.status.includes('Up-to-date')
                          ? 'success'
                          : doc.status.includes('Needs Update')
                            ? 'warning'
                            : 'destructive'
                      }
                    >
                      {doc.status.replace(/[✅⚠️❌]/g, '').trim()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Recent Q&A</span>
              </CardTitle>
              <CardDescription>Latest questions and answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQAs.slice(0, 3).map((qa) => (
                  <div key={qa.id} className="space-y-2">
                    <p className="text-sm font-medium">{qa.question}</p>
                    <p className="text-xs text-muted-foreground">
                      {qa.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Summary */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Summary</CardTitle>
            <CardDescription>AI-generated insights about your documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                • Your documentation is {Math.round((upToDateDocs / docs.length) * 100)}% up-to-date
              </p>
              <p className="text-sm">
                • {needsUpdateDocs + outdatedDocs} documents need attention
              </p>
              <p className="text-sm">
                • Most recent update was on {docs[0].updated}
              </p>
              <p className="text-sm text-muted-foreground">
                Consider updating the "User Onboarding Flow" and "Deployment Guide" documents for better coverage.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Features Section */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Document Analysis</h2>
          <p className="text-muted-foreground">
            Upload files or fetch repositories to generate AI-powered insights
          </p>
        </div>

        {/* File Upload and Repo Fetcher */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FileUploader onFileContent={handleFileContent} />
          <RepoFetcher onRepoFetched={handleRepoFetched} />
        </div>

        {/* Summary Panel */}
        <SummaryPanel
          content={uploadedContent?.content}
          filename={uploadedContent?.filename}
          repoFiles={repoFiles}
        />
      </motion.div>
    </div>
  );
}
