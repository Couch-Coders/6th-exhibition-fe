const { kakao } = window;

export default function KakaoMapScript(lng, lat) {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(lng, lat),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);
    const markerPos = new kakao.maps.LatLng(lng, lat);
    const marker = new kakao.maps.Marker({
        position: markerPos
    })
    marker.setMap(map);
}