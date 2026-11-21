
const API_BASE =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "";

const form = document.getElementById("predictionForm");
const submitButton = document.getElementById("submitButton");

const $ = (id) => document.getElementById(id);

function updateCalculatedField() {
  const projects = Number($("number_project").value);
  const hours = Number($("average_monthly_hours").value);

  $("hours_per_project").value =
    projects > 0 && Number.isFinite(hours)
      ? (hours / projects).toFixed(2)
      : "";
}

async function checkAPI() {
  try {
    const response = await fetch(`${API_BASE}/columns`);

    if (!response.ok) throw new Error("API unavailable");

    $("apiDot").className = "status-dot online";
    $("apiStatus").textContent = "API Connected";
  } catch (error) {
    $("apiDot").className = "status-dot offline";
    $("apiStatus").textContent = "API Offline";
  }
}

function displayResult(result) {
  const probability = Number(result.leave_probability);

  if (!Number.isFinite(probability)) {
    throw new Error("Invalid probability returned by API.");
  }

  const percentage = Math.max(0, Math.min(100, probability * 100));
  const isLeaving = result.prediction === "Will Leave";

  $("emptyResult").classList.add("hidden");
  $("predictionResult").classList.remove("hidden");

  $("predictionText").textContent = isLeaving
    ? "Will Leave"
    : "Will Stay";

  $("predictionText").className = isLeaving ? "leave" : "stay";

  $("predictionDescription").textContent = isLeaving
    ? "The model predicts a potential employee attrition."
    : "The model predicts that the employee is likely to stay.";

  $("probabilityText").textContent = `${percentage.toFixed(2)}%`;

  $("probabilityBar").style.width = `${percentage}%`;
  $("probabilityBar").className = isLeaving
    ? "progress-bar leave"
    : "progress-bar";
}

form.addEventListener("input", updateCalculatedField);
form.addEventListener("change", updateCalculatedField);

form.addEventListener("reset", () => {
  setTimeout(() => {
    updateCalculatedField();

    $("emptyResult").classList.remove("hidden");
    $("predictionResult").classList.add("hidden");
    $("formMessage").textContent = "";
  }, 0);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const projects = Number($("number_project").value);

  if (projects <= 0) {
    $("formMessage").textContent = "Number of projects must be greater than zero.";
    return;
  }

  const payload = {
    satisfaction_level: Number($("satisfaction_level").value),
    last_evaluation: Number($("last_evaluation").value),
    number_project: projects,
    average_monthly_hours: Number($("average_monthly_hours").value),
    years_at_company: Number($("years_at_company").value),
    hours_per_project:
      Number($("average_monthly_hours").value) / projects,
    department: $("department").value,
    salary: $("salary").value,
    work_accident: Number($("work_accident").value),
    promotion_last_5years: Number($("promotion_last_5years").value)
  };

  submitButton.disabled = true;
  submitButton.textContent = "Predicting...";
  $("formMessage").textContent = "";

  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Prediction API returned ${response.status}`);
    }

    const result = await response.json();

    if (!result.prediction || result.leave_probability === undefined) {
      throw new Error("Unexpected API response.");
    }

    displayResult(result);
  } catch (error) {
    console.error(error);
    $("formMessage").textContent =
      "Prediction failed. Check your FastAPI server and model.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Predict Attrition";
  }
});

updateCalculatedField();
checkAPI();
