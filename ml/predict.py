import sys
import pickle
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer

args = sys.argv

to_pred = args[1]

f = open('/home/svyatoslav/Foodhack/ml/classifier.pk', 'rb')

clf = pickle.load(f)

print(clf.predict([to_pred])[0])
