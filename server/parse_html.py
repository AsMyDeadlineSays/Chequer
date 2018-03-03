import requests as re
from bs4 import BeautifulSoup
import argparse
import json
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

def main(config):
    url = config.url
    file_name = config.file

    with open(file_name, 'r') as file:
        card = list(map(lambda s: s.replace('\n', ''), file.readlines()))

    page = re.get(url)
    positions = getPositions(page.content)[:-1]
    sums = getSums(page.content)
    counts = getCounts(page.content)
    bill = []
    for i in range(len(positions)):
        bill.append({
                    'value' : positions[i],
                    'amount' : counts[i],
                    'price' : sums[i]
        })


    new_card = update_card(card=card, bill=positions)
    bill.append(new_card)
    print(json.dumps(bill, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', type=str)
    parser.add_argument('--file', type=str)
    main(config=parser.parse_args())
