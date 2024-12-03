// 지도 표시할 div
var mapContainer = document.getElementById('map');

// 지도 옵션 설정
var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
    level: 3 // 확대 레벨 (1: 가장 확대, 숫자가 클수록 축소)
};

// 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커 위치 설정
var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커 생성
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커를 지도에 표시
marker.setMap(map);
