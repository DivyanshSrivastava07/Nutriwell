var currentStep = 1;
var prevButton = document.getElementById('prevBtn');
var progressBar = document.getElementById('progressBar');

function nextStep(step) {
  var currentDiv = document.getElementById('step' + currentStep);
  if (stepForwardAllowed(currentDiv)) {
    currentDiv.style.display = 'none';
    currentStep++;
    var nextDiv = document.getElementById('step' + currentStep);
    if (nextDiv) {
      nextDiv.style.display = 'block';
      prevButton.style.display = 'block';
      updateProgressBar();
    } else {
      prevButton.style.display = 'none'; // Hide the previous button on the last step
    }
  }
}

function prevStep() {
  var currentDiv = document.getElementById('step' + currentStep);
  currentDiv.style.display = 'none';
  currentStep--;
  var prevDiv = document.getElementById('step' + currentStep);
  prevDiv.style.display = 'block';
  if (currentStep === 1) {
    prevButton.style.display = 'none'; // Hide the previous button on the first step
  }
  updateProgressBar();
}

function stepForwardAllowed(currentDiv) {
  var inputs = currentDiv.querySelectorAll('input, select');
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      return false;
    }
  }
  return true;
}

function updateProgressBar() {
  var totalSteps = document.querySelectorAll('.step').length;
  var progress = (currentStep - 1) / (totalSteps - 1) * 100;
  progressBar.style.width = progress + '%';
}

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById('infoForm');
  form.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      nextStep(currentStep);
    }
  });
});
