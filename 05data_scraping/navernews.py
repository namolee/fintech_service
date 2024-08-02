import os

import requests
import pandas as pd

from dotenv import load_dotenv 
from sqlalchemy import create_engine
from naverinfo import db, dbtype, user, pw, host, database
import pymysql
import time
from datetime import date
load_dotenv()


url = "https://openapi.naver.com/v1/search/news.json"
payload = {'query':'핀테크','display':100, 'start':1,'sort':'date'}
headers = {"X-Naver-Client-Id" : os.getenv('client_id'), "X-Naver-Client-Secret" : os.getenv('client_secret')}
r = requests.get(url, params=payload, headers=headers)
print(r.url)
if(r.status_code==200):
    data=r.json()
    
else:
    print("Error Code:" + r.status_code)


today=date.today()

formatted_date = today.strftime('%d %b %Y')

def text_clean(x):
    x=x.replace("&quot;","").replace("<b>", "").replace("</b>","")
    return x


result={}
for item in data['items']:
    if formatted_date in item['pubDate']:
        for key in item.keys():
            result.setdefault(key,[]).append(text_clean(item[key]))
            
    else:
        break


df=pd.DataFrame(result)

pymysql.install_as_MySQLdb()

def db_connect():
    engine = create_engine("%s+%s://%s:%s@%s/%s" % (db, dbtype, user, pw, host, database))
    conn = engine.connect()
    return conn

# DB에 접속해서 저장하는 함수
def exi_to_db(table_name, df):
    conn = db_connect()
    df.to_sql(table_name, con=conn, if_exists='append', index=False) 
    conn.close()
    
    return print("완료")

if __name__=="__main__":
    db_connect()
    exi_to_db("navernews", df)