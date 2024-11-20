// 1. 고정된 현위치 설정
var lat = 37.4896537373705;
var lng = 127.032839070004;
var userLocation = new kakao.maps.LatLng(lat, lng);

// 2. 지도 생성
var mapContainer = document.getElementById('map');
var mapOption = {
    center: userLocation,
    level: 4
};
var map = new kakao.maps.Map(mapContainer, mapOption);

// 3. 현위치 마커 표시
var userMarker = new kakao.maps.Marker({
    position: userLocation,
    map: map
});

// 현위치 인포윈도우
var userInfoWindow = new kakao.maps.InfoWindow({
    content: '<div style="padding:5px;">현위치</div>'
});
userInfoWindow.open(map, userMarker);

// 4. 반경 200m 원 표시
var circle = new kakao.maps.Circle({
    center: userLocation,
    radius: 200,
    strokeWeight: 2,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    fillColor: '#FF0000',
    fillOpacity: 0.2
});
circle.setMap(map);

// 5. 음식점 데이터
var restaurantData = [
    {
        name: "뱅뱅막국수 역삼본점",
        type: "국수",
        rating: "4.4",
        lat: 37.48965570000001,
        lng: 127.0328555,
        img: "http://localhost:8080/bangbang_menu.jpg",
        phone: "0507-1392-4848",
        menu: "뱅뱅막국수, 들기름막국수, 육전",
        address: "서울 강남구 도곡로 112 서한빌딩 1층 103호",
        hours: "매일 11:00 ~ 21:00, 매일 휴게시간 15:00 ~ 16:30",
        reviewAnalysis: "http://localhost:8080/bangbang_pos_review.jpg",
        source: "kakao"
    }
];

var activeInfoWindow = null;
var reviewInfoWindow = null;

restaurantData.forEach(function (restaurant) {
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(restaurant.lat, restaurant.lng),
        map: map
    });

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, 'click', function () {
        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        if (reviewInfoWindow) {
            reviewInfoWindow.close();
            reviewInfoWindow = null;
        }

        var infoWindow = new kakao.maps.InfoWindow({
            content: `
                <div class="info-content">
                    <h4>${restaurant.name}</h4>
                    <div>⭐ ${restaurant.rating}</div>
                    <img src="${restaurant.img}" alt="${restaurant.name}">
                    <div class="details">
                        <div><b>업종:</b> ${restaurant.type}</div>
                        <div><b>전화번호:</b> ${restaurant.phone}</div>
                        <div><b>대표 메뉴:</b> ${restaurant.menu}</div>
                        <div><b>주소:</b> ${restaurant.address}</div>
                        <div><b>영업시간:</b> ${restaurant.hours}</div>
                        <a class="btn" onclick="showReviewAnalysis(${restaurant.lat}, ${restaurant.lng}, '${restaurant.reviewAnalysis}')">분석리포트 보기</a>
                        <a class="btn" onclick="showAllReviews(${restaurant.lat}, ${restaurant.lng}, '${restaurant.source}')">리뷰모아보기</a>
                    </div>
                </div>
            `
        });
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;
    });
});

function showReviewAnalysis(lat, lng, reviewImg) {
    if (reviewInfoWindow) {
        reviewInfoWindow.close();
    }

    var reviewWindowPosition = new kakao.maps.LatLng(lat, lng + 0.0001);
    reviewInfoWindow = new kakao.maps.InfoWindow({
        content: `
            <div class="info-content" style="max-width: 300px; text-align: center;">
                <div style="text-align: right; cursor: pointer;" onclick="if(reviewInfoWindow) reviewInfoWindow.close();">❌</div>
                <h4>리뷰 분석 리포트</h4>
                <img src="${reviewImg}" alt="리뷰 분석" style="max-width: 100%; height: auto;">
            </div>
        `
    });
    reviewInfoWindow.setPosition(reviewWindowPosition);
    reviewInfoWindow.open(map);
}

function showAllReviews(lat, lng, source) {
    fetch(`http://127.0.0.1:5000/reviews?source=${source}`)
        .then((response) => response.json())
        .then((data) => {
            let reviewsHtml = `
                <div style="text-align: right; cursor: pointer;" onclick="if(reviewInfoWindow) reviewInfoWindow.close();">❌</div>
                <h4>${source.toUpperCase()} 리뷰 모아보기</h4>
            `;
            if (data.length === 0) {
                reviewsHtml += `<p>리뷰가 없습니다.</p>`;
            } else {
                reviewsHtml += `
                    <div class="review-container">
                        ${generateReviewHTML(data.slice(0, 10))}
                    </div>
                `;
            }

            var reviewWindowPosition = new kakao.maps.LatLng(lat, lng + 0.0001);
            reviewInfoWindow = new kakao.maps.InfoWindow({
                content: `
                    <div class="info-content" style="max-width: 300px;">
                        ${reviewsHtml}
                    </div>
                `
            });
            reviewInfoWindow.setPosition(reviewWindowPosition);
            reviewInfoWindow.open(map);
        })
        .catch((error) => console.error('리뷰 데이터를 가져오는 중 오류 발생:', error));
}

function generateReviewHTML(reviews) {
    return reviews
        .map(
            (review) => `
            <div style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding: 5px;">
                <p><b>날짜:</b> ${review.Review_Date}</p>
                <p><b>리뷰:</b> ${review.Review}</p>
            </div>
        `
        )
        .join('');
}
