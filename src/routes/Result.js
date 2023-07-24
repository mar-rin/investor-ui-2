import React from 'react';
import { BrowserRouter as useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import { dummyText } from '../utils/dummyText';


const ResultComponent = () => {
    const { state } = useLocation();
    const analysis = state.analysis;
    const newBilbo = dummyText;
  
    // Dummy function, replace with the one below
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text(newBilbo, 10, 10);
        doc.save("result.pdf");
        };

    // const handleExportPDF = () => {
    //   const doc = new jsPDF();
    //   doc.text(analysis, 10, 10);
    //   doc.save("result.pdf");
    // };
  
    return (
      <div>
        {/* change to  "analysis" !!! */}
        <p>{newBilbo}</p>
        <button onClick={handleExportPDF}>Export as PDF</button>
      </div>
    );
  };

  export default ResultComponent;