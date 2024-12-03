from flask import Flask, jsonify
import pymysql
from dbenv import id, pw, host, database  # MySQL 연결 정보

app = Flask(__name__)

# MySQL 연결 정보
db_config = {
    "host": host.split(":")[0],
    "port": int(host.split(":")[1]) if ":" in host else 3306,
    "user": id,
    "password": pw,
    "database": database
}

# 가게 정보 가져오기
@app.route('/api/stores', methods=['GET'])
def get_stores():
    connection = pymysql.connect(**db_config)
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            query = "SELECT store_id, store_name, address, kakao_rating, google_rating, naver_rating FROM stores"
            cursor.execute(query)
            stores = cursor.fetchall()
        return jsonify(stores)
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        connection.close()

# 특정 가게의 리뷰 가져오기
@app.route('/api/reviews/<int:store_id>', methods=['GET'])
def get_reviews(store_id):
    connection = pymysql.connect(**db_config)
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            query = "SELECT review_date, review_text, platform FROM reviews WHERE store_id = %s"
            cursor.execute(query, (store_id,))
            reviews = cursor.fetchall()
        return jsonify(reviews)
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
