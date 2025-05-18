import React from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set workerSrc manually (CDN version)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfUploader = ({ setPdfText }) => {
  const extractTextFromPdf = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);

      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let text = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText + "\n";
      }

      setPdfText(text);
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPdf(file);
    } else {
      alert("❌ Please upload a valid PDF file.");
    }
  };

  // return (
  //   <div className="mb-4">
  //     <input
  //       type="file"
  //       accept="application/pdf"
  //       onChange={handleFileChange}
  //       className="block w-full text-sm text-gray-900 dark:text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
  //     />
  //   </div>
  // );
};

export default PdfUploader;
