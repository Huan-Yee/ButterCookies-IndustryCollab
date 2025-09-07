import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SummaryData {
  summary: string;
  keyPoints: string[];
  technicalHighlights: string[];
  recommendations: string[];
  codeQuality: {
    readability: { score: number; description: string };
    maintainability: { score: number; description: string };
    performance: { score: number; description: string };
    security: { score: number; description: string };
  };
  projectStructure: {
    strengths: string[];
    improvements: string[];
  };
  metrics: {
    linesOfCode: number;
    components: number;
    pages: number;
    utilities: number;
    testCoverage: number;
    bundleSize: string;
  };
}

interface SummaryPanelProps {
  summary: SummaryData | null;
  isLoading: boolean;
}

export function SummaryPanel({ summary, isLoading }: SummaryPanelProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-slate-800 font-medium">
              <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
              Analyzing Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-3 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-3 bg-slate-100 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-slate-100 rounded animate-pulse w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!summary) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 font-medium">Analysis Results</CardTitle>
            <CardDescription className="text-slate-600">
              Upload a file or fetch a repository to generate comprehensive insights
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Main Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed">{summary.summary}</p>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100"
              >
                <span className="text-slate-500 font-medium text-sm mt-1 min-w-[24px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*/g, '') }}></span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Highlights */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Technical Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {summary.technicalHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: highlight.replace(/\*\*/g, '') }}></span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Quality Metrics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Quality Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(summary.codeQuality).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium capitalize text-slate-700">{key}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(value.score)}`}>
                    {value.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Structure */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Structure Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-slate-700 mb-4">Strengths</h4>
              <ul className="space-y-3">
                {summary.projectStructure.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-600">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-4">Improvements</h4>
              <ul className="space-y-3">
                {summary.projectStructure.improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-600">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-lg"
              >
                <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: rec.replace(/\*\*/g, '') }}></span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Metrics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 font-medium">Project Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Lines of Code', value: summary.metrics.linesOfCode.toLocaleString(), color: 'bg-blue-50 text-blue-700' },
              { label: 'Components', value: summary.metrics.components.toString(), color: 'bg-emerald-50 text-emerald-700' },
              { label: 'Pages', value: summary.metrics.pages.toString(), color: 'bg-purple-50 text-purple-700' },
              { label: 'Utilities', value: summary.metrics.utilities.toString(), color: 'bg-amber-50 text-amber-700' },
              { label: 'Test Coverage', value: `${summary.metrics.testCoverage}%`, color: 'bg-red-50 text-red-700' },
              { label: 'Bundle Size', value: summary.metrics.bundleSize, color: 'bg-slate-50 text-slate-700' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-4 border border-slate-200 rounded-lg"
              >
                <div className={`text-2xl font-semibold mb-1 ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
