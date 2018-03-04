import pickle
import os

f = open(os.path.dirname('predict.py')+'classifier.pk', 'rb')
clf = pickle.load(f)
a = 0
while a!=-1:
    to_pred = input()
    try:
        a = int(to_pred)
    except:
        pass
    to_pred = to_pred.split('|')
    if not a:
        print(*clf.predict(to_pred))
