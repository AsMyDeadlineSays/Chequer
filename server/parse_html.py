import requests as re
from bs4 import BeautifulSoup
# import argparse
import json
from datetime import datetime
from time import mktime
import Stemmer
stem = Stemmer.Stemmer('russian')

def check(from_card, bill):
    """
    функция проверяет есть ли слово from_card в строке из массива bill
    возвращает index bill'a, если есть и -1 если нет
    >>> from_card
        'хлеб'
    >>> bill
        ['Хлеб 365 ДНЕЙ Дарницкий нар 650г']
    """

    for i, position in enumerate(bill):
        if stem.stemWord(from_card.lower()) in list(map(lambda s: stem.stemWord((s.lower())), 
                                                position.split())):
            return i
    return -1

def update_card(card, bill):
    """
    возвращает массив тех продуктов, которые не купили
    """
    not_bought = []
    for i, product in enumerate(card):
        index = check(product, bill)
        # если не нашли продукт, добавляем в not_bought
        if index == -1:
            not_bought.append(product)
        # если нашли, удаляем позицию из чека
        bill.pop(index)
        # если чек кончилась, обрываем
        if len(bill) == 0:
            break
    return not_bought

def getPositions(html):
    soup = BeautifulSoup(html, 'html.parser')
    positions = []
    for div in soup.find_all(class_='position'):
        positions.append(div.get_text())
    return positions

def getSums(html):
    soup = BeautifulSoup(html, 'html.parser')
    sums = []
    i = 0
    one_sum = True
    while one_sum:
        one_sum = soup.find('span', id='vmb_I19A446CC8372029315_vblock{}_ctl32_fld_IE0CAD4E15'.format(i))
        if one_sum is None:
            return sums
        sums.append(one_sum.get_text())
        i += 1
    return sums

def getCounts(html):
    soup = BeautifulSoup(html, 'html.parser')
    counts = []
    i = 0
    one_count = True
    while one_count:
        one_count = soup.find('span', id='vmb_I19A446CC8372029315_vblock{}_ctl27_fld_I65BDE5075'.format(i))
        if one_count is None:
            return counts
        counts.append(one_count.get_text())
        i += 1
    return counts

def getTime(html):
    soup = BeautifulSoup(html, 'html.parser')
    return soup.find('span', id='fld_I3304D483A').get_text()

def main(url, file_name):
    # url = config.url
    # file_name = config.file

    with open(file_name, 'r') as file:
        card = list(map(lambda s: s.replace('\n', ''), file.readlines()))

    page = re.get(url)

    time_parse = getTime(page.content)
    day, month, year = list(map(int, time_parse.split()[0].split('.')))
    hour, minute = list(map(int, time_parse.split()[1].split(':')))
    time = int(mktime(datetime(year, month, day, hour, minute).timetuple()))

    positions = getPositions(page.content)[:-1]
    sums = getSums(page.content)
    counts = getCounts(page.content)

    new_card = update_card(card=card.copy(), bill=positions.copy())

    bill = {'bought' : [],
            'time' : time,
            'newToBuy': new_card
    }

    for i in range(len(positions)):
        bill['bought'].append({
                    'value' : positions[i],
                    'amount' : counts[i],
                    'price' : sums[i]
        })

    print(json.dumps(bill, ensure_ascii=False))
    return 0



if __name__ == '__main__':
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--url', type=str)
    # parser.add_argument('--file', type=str)
    print('up')
    while True:
        url, file_name = input().split() 
        main(url, file_name)
