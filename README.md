# Employee Attrition Prediction

A small web application that predicts whether an employee is likely to leave a company. It combines a trained Random Forest model with a FastAPI backend and a clean HTML/CSS frontend.

## Features

- Predict employee attrition as **Will Stay** or **Will Leave**
- Show the estimated leave probability
- Check whether the prediction API is running
- Automatically calculate average hours spent per project
- Validate required employee information before submission
- Serve prediction results through a simple REST API

## Tech Stack

- **Backend:** FastAPI, Uvicorn
- **Machine learning:** scikit-learn, pandas, Joblib
- **Frontend:** HTML, CSS, JavaScript
- **Model:** Random Forest Classifier
- **Dataset:** `HR_comma_sep.csv`

## Project Structure

```text
Employee-Attrition-Prediction/
├── Dataset/
│   └── HR_comma_sep.csv
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Models/
│   └── best_rf_model.pkl
├── NOteBook/
│   └── Rayhan_043.ipynb
├── main.py
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rayhan043/Employee-Attrition-Prediction.git
cd Employee-Attrition-Prediction
```

### 2. Create and activate a virtual environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install the required packages

```bash
pip install fastapi uvicorn pandas scikit-learn joblib
```

### 4. Start the API

Run this from the project root:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 5. Start the frontend

Open `Frontend/index.html` directly in a browser, or serve the frontend locally:

```bash
python -m http.server 5500 --directory Frontend
```

Then visit:

```text
http://127.0.0.1:5500
```

The frontend is configured to communicate with the API at `http://127.0.0.1:8000`.

## API

### Check model columns

```http
GET /columns
```

This returns the feature names expected by the trained model.

### Make a prediction

```http
POST /predict
Content-Type: application/json
```

Example request:

```json
{
  "satisfaction_level": 0.65,
  "last_evaluation": 0.75,
  "number_project": 4,
  "average_monthly_hours": 200,
  "years_at_company": 3,
  "work_accident": 0,
  "promotion_last_5years": 0,
  "department": "sales",
  "salary": "medium",
  "hours_per_project": 50
}
```

Example response:

```json
{
  "prediction": "Will Stay",
  "leave_probability": 0.18
}
```

The available department values include `sales`, `accounting`, `hr`, `technical`, `support`, `management`, `IT`, `product_mng`, and `RandD`. Salary values are `low`, `medium`, and `high`.

## Model Notes

The notebook contains the data exploration and model training workflow. The trained model is stored in `Models/best_rf_model.pkl` and is loaded when the API starts.

The current frontend sends categorical department and salary values together with the employee's numerical information. The API converts the request into a pandas DataFrame in the same feature order expected by the model.

## Disclaimer

This project is intended for learning and demonstration. A prediction should not be used as the only basis for employment decisions. Real-world HR systems should include fairness checks, human review, and appropriate data-governance practices.
