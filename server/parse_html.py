import requests as re
from bs4 import BeautifulSoup
import argparse
import json


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

    print(json.dumps(bill, ensure_ascii=False))
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', type=str)
    main(config=parser.parse_args())