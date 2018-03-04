import pickle
import os

f = open(os.path.realpath(__file__)[:-10] + 'classifier.pk', 'rb')
clf = pickle.load(f)
a = 0
print('up')
while a!=-1:
    to_pred = input()
    try:
        a = int(to_pred)
    except:
        pass
    to_pred = to_pred.split('|')
    if not a:
        print(*clf.predict(to_pred))
