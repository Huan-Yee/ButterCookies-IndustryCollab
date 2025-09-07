import { Navbar } from '../components/Navbar';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          About Smart Docs Assistant
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            Smart Docs Assistant is a prototype application that helps analyze and summarize documentation files using AI technology.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Upload markdown and text files for analysis</li>
            <li>Fetch documentation from GitHub repositories</li>
            <li>Generate AI-powered summaries and insights</li>
            <li>Clean, responsive interface built with React and Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
