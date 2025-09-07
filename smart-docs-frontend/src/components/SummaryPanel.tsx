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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            Generating AI Summary...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>📊 AI Summary</CardTitle>
          <CardDescription>
            Upload a file or fetch a repository to generate an AI-powered summary
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Main Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🎯 Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-semibold text-sm mt-1">#{index + 1}</span>
                <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }}></span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">⚡ Technical Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {summary.technicalHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-600 font-bold">•</span>
                <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: highlight }}></span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📊 Code Quality Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(summary.codeQuality).map(([key, value]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold capitalize">{key}</span>
                  <span className={`px-2 py-1 rounded text-sm font-bold ${getScoreColor(value.score)}`}>
                    {value.score}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🏗️ Project Structure Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">✅ Strengths</h4>
              <ul className="space-y-2">
                {summary.projectStructure.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-700 mb-3">🔧 Improvements</h4>
              <ul className="space-y-2">
                {summary.projectStructure.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚡</span>
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                <span className="text-amber-600 font-bold text-lg">💡</span>
                <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: rec }}></span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📈 Project Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{summary.metrics.linesOfCode.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Lines of Code</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{summary.metrics.components}</div>
              <div className="text-sm text-gray-600">Components</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{summary.metrics.pages}</div>
              <div className="text-sm text-gray-600">Pages</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{summary.metrics.utilities}</div>
              <div className="text-sm text-gray-600">Utilities</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{summary.metrics.testCoverage}%</div>
              <div className="text-sm text-gray-600">Test Coverage</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-600">{summary.metrics.bundleSize}</div>
              <div className="text-sm text-gray-600">Bundle Size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
