export function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Smart Docs Assistant</h1>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-200">Home</a>
          <a href="#" className="hover:text-blue-200">About</a>
        </div>
      </div>
    </nav>
  );
}
