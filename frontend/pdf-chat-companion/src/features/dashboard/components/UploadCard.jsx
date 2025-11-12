import React from "react";
import { UploadCloudIcon } from "../../../components/ui/Icons";

// Define the glassmorphism style for cards
const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

const UploadCard = () => {
  return (
    <div
      className={`${glassCardStyle} col-span-3 lg:col-span-2 p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <UploadCloudIcon className="w-16 h-16 text-blue-600 mb-4" />
      <h3 className="text-2xl font-semibold text-slate-800 mb-2">
        Upload a New PDF
      </h3>
      <p className="text-slate-600 mb-6">
        Drag and drop your file here, or click to browse.
      </p>
      <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-blue-600/50 hover:bg-blue-600/90 transition-all duration-300 transform hover:scale-105">
        Select File
      </button>
    </div>
  );
};

export default UploadCard;
