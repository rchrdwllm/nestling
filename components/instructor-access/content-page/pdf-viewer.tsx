import React from "react";

const PdfViewer = () => {
  return <div>PdfViewer</div>;
};

export default PdfViewer;

// "use client";

// import { useCallback, useState } from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
// import { pdfjs, Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// import type { PDFDocumentProxy } from "pdfjs-dist";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

// const resizeObserverOptions = {};

// const maxWidth = 800;

// type PDFFile = string | File | null;

// export default function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
//   const [file, setFile] = useState<PDFFile>(pdfUrl);
//   const [numPages, setNumPages] = useState<number>();
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
//   const [containerWidth, setContainerWidth] = useState<number>();

//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries;

//     if (entry) {
//       setContainerWidth(entry.contentRect.width);
//     }
//   }, []);

//   useResizeObserver(containerRef, resizeObserverOptions, onResize);

//   function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
//     const { files } = event.target;

//     const nextFile = files?.[0];

//     if (nextFile) {
//       setFile(nextFile);
//     }
//   }

//   function onDocumentLoadSuccess({
//     numPages: nextNumPages,
//   }: PDFDocumentProxy): void {
//     setNumPages(nextNumPages);
//   }

//   return (
//     <div className="Example">
//       <header>
//         <h1>react-pdf sample page</h1>
//       </header>
//       <div className="Example__container">
//         <div className="Example__container__load">
//           <label htmlFor="file">Load from file:</label>{" "}
//           <input onChange={onFileChange} type="file" />
//         </div>
//         <div className="Example__container__document" ref={setContainerRef}>
//           <Document
//             file={file}
//             onLoadSuccess={onDocumentLoadSuccess}
//             options={options}
//           >
//             {Array.from(new Array(numPages), (_el, index) => (
//               <Page
//                 key={`page_${index + 1}`}
//                 pageNumber={index + 1}
//                 width={
//                   containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
//                 }
//               />
//             ))}
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// }
