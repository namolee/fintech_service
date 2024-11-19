from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # CORS 허용 설정

# MySQL 연결 설정
db = mysql.connector.connect(
    host="127.0.0.1",     # MySQL 호스트
    user="root",          # MySQL 사용자 이름
    password="1234",      # MySQL 비밀번호
    database="review_db",  # 데이터베이스 이름
    charset="utf8mb4"  # UTF-8 문자셋 지정
)

# 특정 테이블의 모든 리뷰 가져오기
@app.route('/reviews', methods=['GET'])
def get_reviews():
    source = request.args.get('source')
    if not source:
        return jsonify({"error": "source parameter is required"}), 400

    table_name = f"{source}_reviews"
    cursor = db.cursor(dictionary=True)
    try:
        query = f"SELECT review AS Review, date AS Review_Date FROM {table_name}"
        cursor.execute(query)
        results = cursor.fetchall()

        # JSON 응답 설정
        return app.response_class(
            response=json.dumps(results, ensure_ascii=False),  # ensure_ascii=False로 설정
            status=200,
            mimetype='application/json'
        )
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# 서버 실행
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
