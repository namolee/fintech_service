import pandas as pd
import os
import requests
from bs4 import BeautifulSoup as bs
import time
from datetime import date


page=1
page_size=100
final_result_df=pd.DataFrame()
while True:
    url="https://kind.krx.co.kr/corpgeneral/corpList.do"
    payload=dict(method='searchCorpList',pageIndex=page,currentPageSize=page_size,comAbbrv='',beginIndex='',orderMode=3,orderStat='D',isurCd='',repIsuSrtCd='',searchCodeType='',marketType='',searchType=13,industry='',fiscalYearEnd='all',comAbbrvTmp='',location='all')
    r=requests.get(url, params=payload)
    

    soup=bs(r.text,'lxml')
    keys=soup.select_one("table.list.type-00.tmt30")['summary'].split(", ")

    total_items=int(soup.select_one(".info.type-00 > em").text.replace(",",""))
    total_pages=total_items//page_size +1
    print(f"{page}/{total_pages} 수집중", end="\r")
    
    result={}
    for tr in soup.select('tr'):
        for idx,(key,td) in enumerate( zip(keys,(tr.select('td')))):
            if idx==0:
                kinds = [img['alt'] for img in td.select('img')]
                kind = ", ".join(kinds)
                code=td.select_one("a")['onclick'].split("'")[1]+"0" # 회사종목코드 추출
                result.setdefault('증권종류', []).append(kind)
                result.setdefault(key,[]).append(td.text)
                result.setdefault('종목코드', []).append(code)
            elif idx==6:
                home_link=(td.select_one('a')['href'] if td.string==None else "")
                result.setdefault(key,[]).append(home_link)
            else:   
                result.setdefault(key,[]).append(td.text)
        

        

    result_df=pd.DataFrame(result)
    final_result_df=pd.concat([final_result_df,result_df])

    if page <total_pages:
        page+=1
        time.sleep(5)
    else:
        break


from sqlalchemy import create_engine, text
import pymysql
pymysql.install_as_MySQLdb()

db = "mysql"
dbtype = "pymysql"
user = "root"
password = "1234"
host = "127.0.0.1:3306"
database = "korean_stock"

engine = create_engine(f"{db}+{dbtype}://{user}:{password}@{host}")
conn = engine.connect()

# 데이터베이스에 접속 후 데이터베이스 생성

conn.execute(text('CREATE DATABASE IF NOT EXISTS korean_stock'))

engine = create_engine(f"{db}+{dbtype}://{user}:{password}@{host}/{database}")
conn = engine.connect()

#DataFrame을 MySQL 테이블로 저장

final_result_df.to_sql('company_info',con=engine, if_exists='replace', index=False)
conn.close()