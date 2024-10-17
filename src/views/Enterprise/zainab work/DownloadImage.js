import React, { useState, useEffect } from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng, toJpeg, toPdf, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";

function downloadImage(dataUrl, format) {

  const a = document.createElement('a');
  let extension;

  switch (format) {
    case 'png':
      extension = 'png';
      break;
    case 'jpeg':
      extension = 'jpeg';
      break;
    case 'pdf':
      extension = 'pdf';
      break;
    case 'svg':
      extension = 'svg';
      break;
    default:
      extension = 'png';
  }

  a.setAttribute('download', `reactflow.${extension}`);
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton({ reactFlowInstance, theme }) {
  const { getNodes } = useReactFlow();
  const [selectedFormat, setSelectedFormat] = useState('png');

  useEffect(() => {
    const viewport = document.querySelector('.react-flow__viewport');
    if (viewport) {
      viewport.classList.remove('dark_bgcolor', 'default_bgcolor', 'light_bgcolor');
      viewport.classList.add(`${theme}_bgcolor`);
    }
  }, [theme]);

  // const onClick = () => {
  //   const nodesBounds = getRectOfNodes(getNodes());
  //   const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

  //   const viewport = document.querySelector('.react-flow__viewport');

  //   let promise;

  //   switch (selectedFormat) {
  //     case 'png':
  //       promise = toPng(document.querySelector('.react-flow__viewport'), {
  //         width: imageWidth,
  //         height: imageHeight,
  //         style: {
  //           width: imageWidth,
  //           height: imageHeight,
  //           backgroundColor: '${theme}_bgcolor',
  //           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //         },
  //       });
  //       break;
  //     case 'jpeg':
  //       promise = toJpeg(document.querySelector('.react-flow__viewport'), {
  //         // backgroundColor: 'white',
  //         // backgroundColor: '${theme}_bgcolor',
  //         width: imageWidth,
  //         height: imageHeight,
  //         style: {
  //           width: imageWidth,
  //           height: imageHeight,
  //           backgroundColor: '${theme}_bgcolor',
  //           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //         },
  //       });
  //       break;
  //     case 'pdf':
  //       promise = new Promise((resolve, reject) => {
  //         toPng(document.querySelector('.react-flow__viewport'), {
  //           backgroundColor: 'white',
  //           width: imageWidth,
  //           height: imageHeight,
  //           style: {
  //             width: imageWidth,
  //             height: imageHeight,
  //             transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //           },
  //         }).then((dataUrl) => {
  //           console.log(dataUrl); // Check the data URL of the PNG image
  //           const img = new Image();
  //           img.onload = function () {
  //             console.log('Image dimensions:', img.width, img.height); // Log the dimensions of the PNG image
  //             const pdf = new jsPDF({
  //               unit: 'pt',
  //               marginLeft: 0,
  //               marginTop: 0,
  //             });
  //             pdf.addImage(dataUrl, 'PNG', 0, 0, 400, 300); // Use the actual image dimensions in addImage
  //             resolve(pdf.output('bloburl'));
  //           };
  //           img.src = dataUrl;
  //         }).catch((error) => {
  //           console.error('Error converting to PNG:', error);
  //           reject(error); // Reject the promise if there's an error
  //         });
  //       });
  //       break;
  //     case 'svg':
  //       promise = toSvg(document.querySelector('.react-flow__viewport'), {
  //         width: imageWidth,
  //         backgroundColor: 'white',
  //         height: imageHeight,
  //         style: {
  //           width: imageWidth,
  //           height: imageHeight,
  //           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //         },
  //       });
  //       break;
  //     default:
  //       promise = toPng(document.querySelector('.react-flow__viewport'), {
  //         width: imageWidth,
  //         height: imageHeight,
  //         style: {
  //           width: imageWidth,
  //           height: imageHeight,
  //           backgroundColor: '${theme}_bgcolor',
  //           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //         },
  //       });
  //   }

  //   promise.then((dataUrl) => {
  //     downloadImage(dataUrl, selectedFormat);
  //     viewport.classList.remove(`${theme}_bgcolor`); // Remove the theme class after capture
  //   });

  //   promise.then((dataUrl) => downloadImage(dataUrl, selectedFormat));
  // };

  const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
    const viewport = document.querySelector('.react-flow__viewport');
  
    let promise;
  
    switch (selectedFormat) {
      case 'png':
        promise = toPng(viewport, {
          width: imageWidth,
          height: imageHeight,
          style: {
            width: imageWidth,
            height: imageHeight,
            backgroundColor: `${theme}_bgcolor`,
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
          },
        });
        break;
      case 'jpeg':
        promise = toJpeg(viewport, {
          width: imageWidth,
          height: imageHeight,
          backgroundColor: `${theme}_bgcolor`,
          style: {
            width: imageWidth,
            height: imageHeight,
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
          },
        });
        break;
      case 'pdf':
        promise = new Promise((resolve, reject) => {
          toPng(viewport, {
            backgroundColor: `${theme}_bgcolor`,
            width: imageWidth,
            height: imageHeight,
            style: {
              width: imageWidth,
              height: imageHeight,
              transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
          }).then((dataUrl) => {
            const img = new Image();
            img.onload = function () {
              const pdf = new jsPDF({
                unit: 'pt',
                marginLeft: 0,
                marginTop: 0,
              });
              pdf.addImage(dataUrl, 'PNG', 0, 0, 400, 300);
              resolve(pdf.output('bloburl'));
            };
            img.src = dataUrl;
          }).catch((error) => {
            console.error('Error converting to PNG:', error);
            reject(error);
          });
        });
        break;
      case 'svg':
        promise = toSvg(viewport, {
          width: imageWidth,
          height: imageHeight,
          backgroundColor: `${theme}_bgcolor`,
          style: {
            width: imageWidth,
            height: imageHeight,
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
          },
        });
        break;
      default:
        promise = toPng(viewport, {
          width: imageWidth,
          height: imageHeight,
          style: {
            width: imageWidth,
            height: imageHeight,
            backgroundColor: `${theme}_bgcolor`,
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
          },
        });
    }
  
    promise.then((dataUrl) => {
      downloadImage(dataUrl, selectedFormat);
    });
  };
  

  return (
    <Panel position="top-right">
      <div className="download-dropdown">
        <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="pdf">PDF</option>
          <option value="svg">SVG</option>
        </select>
        <button className="download-btn" onClick={onClick}>
          Download
        </button>
      </div>
    </Panel>
  );
}

export default DownloadButton;

