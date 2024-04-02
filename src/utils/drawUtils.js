export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  // detections.forEach(prediction => {

  //   // Extract boxes and classes
  //   const [x, y, width, height] = prediction['bbox'];
  //   const text = prediction['class'];

  //   // Set styling
  //   const color = Math.floor(Math.random()*16777215).toString(16);
  //   ctx.strokeStyle = '#' + color
  //   ctx.font = '18px Arial';

  //   // Draw rectangles and text
  //   ctx.beginPath();
  //   ctx.fillStyle = '#' + color
  //   ctx.fillText(text, x, y);
  //   ctx.rect(x, y, width, height);
  //   ctx.stroke();
  // });

  //   detections.forEach((prediction) => {
  //     // Extract boxes and classes
  //     const [x, y, width, height] = prediction["bbox"];
  //     const text = prediction["class"];

  //     // Set styling
  //     ctx.strokeStyle = "#000000"; // Black border color
  //     ctx.fillStyle = "rgba(255, 132, 0, 0.1)"; // Orange background color with transparency
  //     ctx.lineWidth = 2; // Border width
  //     ctx.font = "18px Arial";

  //     // Draw rectangles and text
  //     ctx.beginPath();
  //     ctx.fillRect(x, y, width, height); // Draw filled rectangle for background
  //     ctx.strokeRect(x, y, width, height); // Draw border rectangle
  //     ctx.fillStyle = "#000000"; // Set text color to black
  //     ctx.fillText(text, x, y - 5); // Draw class label above the box
  //   });

  detections.forEach((prediction) => {
    // Extract boxes, classes, and scores
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    const score = prediction["score"];

    // Set styling
    ctx.strokeStyle = "#000000"; // Black border color
    ctx.fillStyle = "rgba(255, 165, 0, 0.3)"; // Orange background color with transparency
    ctx.lineWidth = 2; // Border width
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillRect(x, y, width, height); // Draw filled rectangle for background
    ctx.strokeRect(x, y, width, height); // Draw border rectangle
    ctx.fillStyle = "#000000"; // Set text color to black
    ctx.fillText(`${text} (${Math.round(score * 100)}%)`, x, y - 5); // Draw class label and score above the box
  });
};
