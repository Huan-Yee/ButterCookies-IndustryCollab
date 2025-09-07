// API utilities and placeholder functions for future backend integration

export interface Doc {
  readme: string;
}

export interface Summary {
  summary: string;
  keyPoints: string[];
  recommendations: string[];
  metrics: {
    readability: number;
    completeness: number;
    structure: number;
    examples: number;
  };
}

// Mock API functions - replace with real API calls when backend is ready

export const fetchRepoData = async (repoUrl: string): Promise<Doc> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In production, this would be:
  // const response = await fetch(`/api/repo?url=${encodeURIComponent(repoUrl)}`);
  // return await response.json();

  // For now, return mock data
  const mockData = await import('../data/sampleDocs.json');
  return mockData.default;
};

export const generateSummary = async (content: string): Promise<Summary> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // In production, this would be:
  // const response = await fetch('/api/summarize', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ content })
  // });
  // return await response.json();

  // For now, return mock data
  const mockSummary = await import('../data/fakeSummary.json');
  return mockSummary.default;
};

export const validateGitHubUrl = (url: string): boolean => {
  return url.includes('github.com') && url.trim().length > 0;
};
