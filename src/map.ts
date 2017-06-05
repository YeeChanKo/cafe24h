declare const daum: any;

export class Map {

    map: any; // 메인 지도 객체
    ps: any; // 장소 검색 객체

    mapContainer = document.getElementById("map"); // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    zoomControl = new daum.maps.ZoomControl();

    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    infowindow = new daum.maps.InfoWindow({
        zIndex: 1
    });

    constructor() {
        this.initBinding();
        this.createMap();
    }

    initBinding() {
        // current-location-button click event setup
        $("#search-box").on("click", "#current-location-button", () => {
            this.getLocation(this.setCenter);
        });
    }

    createMap() {
        // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
        this.map = new daum.maps.Map(this.mapContainer, this.mapOption);
        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
        this.map.addControl(this.zoomControl, daum.maps.ControlPosition.RIGHT);
        // 장소 검색 객체를 생성합니다
        this.ps = new daum.maps.services.Places(this.map);
    }

    getLocation(cb: PositionCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            alert("geolocation is not supported in current browser!");
        }
    }

    // 콜백으로 쓰기 때문에 this가 바뀐다..;; arrow로 바꿔줌
    setCenter = (position: Position) => {
        // 이동할 위도 경도 위치를 생성합니다
        const moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // 지도 중심을 이동 시킵니다
        this.map.setCenter(moveLatLon);
        this.searchCafe();
    }

    panTo = (position: Position) => {
        // 이동할 위도 경도 위치를 생성합니다
        const moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        this.map.panTo(moveLatLon);
    }

    searchCafe() {
        this.ps.categorySearch("CE7", this.placesSearchCB, {
            useMapBounds: true
        });
    }

    // 검색 완료 시 호출되는 콜백함수
    placesSearchCB = (status: any, data: any, pagination: any) => {
        if (status === daum.maps.services.Status.OK) {
            for (var i = 0; i < data.places.length; i++) {
                this.displayMarker(data.places[i]);
            }
        }
    }

    // 지도에 마커 표시
    displayMarker(place: any) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new daum.maps.Marker({
            map: this.map,
            position: new daum.maps.LatLng(place.latitude, place.longitude)
        });

        // 마커에 클릭이벤트를 등록합니다
        daum.maps.event.addListener(marker, 'click', () => {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.title + '</div>');
            this.infowindow.open(this.map, marker);
        });
    }
}