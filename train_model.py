import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from pickle import dump

# Load dataset
df = pd.read_csv('model/sonar.csv', header=None)

# Encode target variable (M=1, R=0)
df[60] = df[60].replace({'M': 1, 'R': 0}).astype(int)

# Split features and target
X = df.values[:, 0:60]
y = df.values[:, 60]

# Split into train and test sets
X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size=0.2, random_state=7)

# Standardize the data
scaler = StandardScaler().fit(X_train)
X_train_scaled = scaler.transform(X_train)

# Train SVM model
model = SVC(C=1.5, kernel='rbf', gamma='auto')
model.fit(X_train_scaled, Y_train)

# Save the model and scaler
dump(model, open('model/finalized_model.sav', 'wb'))
dump(scaler, open('model/scaler.sav', 'wb'))

# Generate Visualizations
# 1. Histograms
df.hist(figsize=(16, 12))
plt.tight_layout()
plt.savefig('static/images/histograms.png')
plt.close()

# 2. Density Plots
df.plot(kind='density', subplots=True, layout=(8, 8), sharex=False, figsize=(18, 14))
plt.tight_layout()
plt.savefig('static/images/density.png')
plt.close()

# 3. Correlation Matrix
correlations = df.corr()
fig = plt.figure(figsize=(18, 16))
ax = fig.add_subplot(111)
cax = ax.matshow(correlations, vmin=-1, vmax=1, interpolation='none')
fig.colorbar(cax)
ticks = np.arange(0, 60, 1)
ax.set_xticks(ticks)
ax.set_yticks(ticks)
plt.savefig('static/images/correlation.png')
plt.close()

print("Model, scaler, and visualizations saved successfully!")