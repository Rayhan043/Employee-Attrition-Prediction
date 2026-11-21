import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

model = joblib.load('Models/best_rf_model.pkl')

app = FastAPI(title='HR Attrition Prediction API')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])


@app.get('/columns')
def columns():
    return list(model.feature_names_in_)


@app.post('/predict')
def predict(data: dict):
    df = pd.DataFrame([data])[list(model.feature_names_in_)]
    pred = int(model.predict(df)[0])
    proba = float(model.predict_proba(df)[0][1])
    return {'prediction': 'Will Leave' if pred == 1 else 'Will Stay', 'leave_probability': round(proba, 4)}


frontend_dir = Path(__file__).parent / 'Frontend'
app.mount('/', StaticFiles(directory=frontend_dir, html=True), name='frontend')