from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import pandas as pd
import pickle
import os

data = pd.read_csv('data.csv', delimiter='|')


clf = SGDClassifier()

pipe = Pipeline([('vect', CountVectorizer()),('clf', clf)])
pipe = pipe.fit(data['descr'], data['cat'])

f = open(os.path.realpath(__file__)[:-8] + 'classifier.pk', 'wb')
pickle.dump(pipe, f)
