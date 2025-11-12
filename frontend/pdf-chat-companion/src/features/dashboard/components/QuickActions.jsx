import React from "react";
import {
  BookOpenIcon,
  FileQuestionIcon,
  CopyIcon,
} from "../../../components/ui/Icons";

// Define the glassmorphism style for cards
const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

const QuickActions = () => {
  return (
    <div className={`${glassCardStyle} p-6 space-y-4 flex flex-col`}>
      <h3 className="text-xl font-semibold text-slate-800">Quick Actions</h3>

      <a
        href="#"
        className={`group ${glassCardStyle} p-4 flex items-center gap-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
      >
        <BookOpenIcon className="w-10 h-10 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
        <div>
          <h4 className="font-semibold text-slate-800">Summarize PDF</h4>
          <p className="text-sm text-slate-600">Get a concise summary.</p>
        </div>
      </a>

      <a
        href="#"
        className={`group ${glassCardStyle} p-4 flex items-center gap-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
      >
        <FileQuestionIcon className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />
        <div>
          <h4 className="font-semibold text-slate-800">Generate Quiz</h4>
          <p className="text-sm text-slate-600">Test your knowledge.</p>
        </div>
      </a>

      <a
        href="#"
        className={`group ${glassCardStyle} p-4 flex items-center gap-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5`}
      >
        <CopyIcon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
        <div>
          <h4 className="font-semibold text-slate-800">Compare PDFs</h4>
          <p className="text-sm text-slate-600">Find key differences.</p>
        </div>
      </a>
    </div>
  );
};

export default QuickActions;
