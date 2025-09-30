export default function TailwindTest() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 rounded-lg text-white">Red Box</div>
        <div className="bg-green-500 p-4 rounded-lg text-white">Green Box</div>
        <div className="bg-blue-500 p-4 rounded-lg text-white">Blue Box</div>
      </div>
      
      <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        Test Button
      </button>
    </div>
  );
}