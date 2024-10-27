document.addEventListener("DOMContentLoaded", function () {
  const progressElement = document.getElementById("myProgress");
  const barElement = progressElement.querySelector(".bar");
  const labelElement = document.querySelector(".label");

  function getLabelProgress(percent) {
    return `👑 Lâm Vương - Current brightness ${percent}%`;
  }

  // Initialize the progress bar
  function initializeProgress() {
    const percent = progressElement.getAttribute("data-percent");
    barElement.style.width = `${percent}%`;
    labelElement.textContent = getLabelProgress(percent);
  }

  // Function to set the progress percentage
  function setProgress(percent) {
    progressElement.setAttribute("data-percent", percent);
    barElement.style.width = `${percent}%`;
    labelElement.textContent = getLabelProgress(percent);

    // Min brightness 40, max brightness 100
    const minBrightness = 40;
    const brightnessValue =
      ((percent / 100) * (100 - minBrightness) + minBrightness) / 100;

    if (brightnessValue >= 0) {
      window.brightnessAPI
        .setBrightness(brightnessValue)
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
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
