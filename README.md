# Employee Attrition Prediction

A small web application that predicts whether an employee is likely to leave a company. It combines a trained Random Forest model with a FastAPI backend and a clean HTML/CSS frontend.


## Features

- Predict employee attrition as Will Stay or Will Leave
- Show the estimated leave probability
- Check whether the prediction API is running
- Automatically calculate average hours spent per project
- Validate required employee information before submission
- Serve prediction results through a simple REST API

  ## Tech Stack

- **Backend:** FastAPI, Uvicorn
- **Machine learning:** scikit learn, pandas, Joblib.
- **Frontend:** HTML, CSS, JavaScript
- **Model:** Random Forest Classifier
- **Dataset:** HR_comma_sep.csv

## Getting Started

###  Clone the repository

```bash
git clone https://github.com/Rayhan043/Employee-Attrition-Prediction.git
cd Employee-Attrition-Prediction
```

###  Create a virtual environment
python -m venv venv
venv\Scripts\activate

## activate a virtual environment
python3 -m venv venv
source venv/bin/activate

###  Install the required packages
pip install fastapi uvicorn pandas scikit-learn joblib


### 4. Start the API

Run this from the project root:

uvicorn main:app --reload


## Model Notes

The notebook contains the data exploration and model training workflow. The trained model is stored in `Models/best_rf_model.pkl` and is loaded when the API starts.

The current frontend sends categorical department and salary values together with the employee's numerical information. The API converts the request into a pandas DataFrame in the same feature order expected by the model.

## Disclaimer

This project is intended for learning and demonstration. A prediction should not be used as the only basis for employment decisions. Real-world HR systems should include fairness checks, human review, and appropriate data-governance practices.
