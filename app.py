from flask import Flask, render_template, request
import numpy as np
from pickle import load

app = Flask(__name__)

# Load the trained model and scaler
model = load(open('model/finalized_model.sav', 'rb'))
scaler = load(open('model/scaler.sav', 'rb'))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    # Get form data (60 features)
    input_data = [float(request.form[f'feature_{i}']) for i in range(60)]

    # Convert to numpy array and reshape
    input_array = np.array(input_data).reshape(1, -1)

    # Scale the input data
    scaled_input = scaler.transform(input_array)

    # Make prediction
    prediction = model.predict(scaled_input)[0]

    # Interpret result
    result = "Mine" if prediction == 1 else "Rock"

    return render_template('result.html', prediction=result)


@app.route('/visualizations')
def visualizations():
    return render_template('visualizations.html')


if __name__ == '__main__':
    app.run(debug=True)