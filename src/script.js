document.addEventListener("DOMContentLoaded", function () {
  const progressElement = document.getElementById("myProgress");
  const barElement = progressElement.querySelector(".bar");

  // Initialize the progress bar
  function initializeProgress() {
    const percent = progressElement.getAttribute("data-percent");
    barElement.style.width = `${percent}%`;
  }

  // Function to set the progress percentage
  function setProgress(percent) {
    progressElement.setAttribute("data-percent", percent);
    barElement.style.width = `${percent}%`;
  }

  // Click event to update progress based on click position
  progressElement.addEventListener("click", function (event) {
    // Get the width of the progress bar
    const progressWidth = progressElement.clientWidth;

    // Calculate the click position as a percentage of the progress width
    const clickPosition = event.offsetX;
    const percent = Math.round((clickPosition / progressWidth) * 100);

    // Set the new progress value
    setProgress(percent);
    console.log(`Progress set to: ${percent}%`);
  });

  // Initialize the progress bar when the page loads
  initializeProgress();
});
