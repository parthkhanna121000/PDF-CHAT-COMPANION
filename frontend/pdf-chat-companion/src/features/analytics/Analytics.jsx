import React from "react";
import DataChart from "./components/DataChart.jsx";

// --- Mock Analytics Data ---
// In a real app, you'd fetch this from your API, maybe with a hook.
const mockChartData = {
  labels: ["Doc 1", "Doc 2", "Doc 3", "Doc 4", "Doc 5"],
  datasets: [
    {
      label: "Questions Asked",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(59, 130, 246, 0.5)", // Blue
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
};
// ----------------------------

function Analytics() {
  // We'll just pass the mock data directly for this example
  const chartData = mockChartData;

  return (
    <main className="flex-1 p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      {/* Main Chart Container */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Document Interaction
        </h2>

        {/* The DataChart component will render the actual chart */}
        <div className="h-96">
          {" "}
          {/* Set a height for the chart canvas */}
          <DataChart data={chartData} />
        </div>
      </section>

      {/* You could add more stat cards here */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Documents</h3>
          <p className="text-3xl font-bold text-gray-800">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Questions</h3>
          <p className="text-3xl font-bold text-gray-800">41</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Avg. Questions / Doc</h3>
          <p className="text-3xl font-bold text-gray-800">8.2</p>
        </div>
      </section>
    </main>
  );
}

export default Analytics;
