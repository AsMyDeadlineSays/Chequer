import sys
import pickle
import os
from json import dumps
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer

args = sys.argv

to_pred = ' '.join(args[1:])

to_pred = to_pred.split('|')

f = open(os.path.realpath(__file__)[:-10] + 'classifier.pk', 'rb')
clf = pickle.load(f)

print(*clf.predict(to_pred))
