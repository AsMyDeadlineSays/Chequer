from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import pandas as pd
import pickle

data = pd.read_csv('data.csv', delimiter='|')


clf = SGDClassifier()

pipe = Pipeline([('vect', CountVectorizer()),('clf', clf)])
pipe = pipe.fit(data['descr'], data['cat'])

f = open('classifier.pk', 'wb')
pickle.dump(pipe, f)