import React, {useEffect, useState} from 'react';

const {kakao} = window;

const MainMapComponent = ({}) => {

    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.58303, 126.98033),
            level: 6
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        var imageSrc = "/img/logo-neona.png",
            imageSize = new kakao.maps.Size(40, 40),
            imageOption = {offset: new kakao.maps.Point(27, 69)};

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        geocoder.addressSearch('', function (result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: markerImage
                });

                var content = `<div class="customoverlay">
                    <a href="https:\\map.kakao.com\?q=` + mapLocation + `" target="_blank">
                    <span class="title">동네 위치</span>
                    </a>
                    </div>`;

                var customOverlay = new kakao.maps.CustomOverlay({
                    map: map,
                    position: coords,
                    content: content,
                    yAnchor: 0
                });

                map.setCenter(coords);
            }
        })
    }, []);

    return (
        <div id='myMap' style={{
            border: '1px solid whitesmoke',
            borderRadius: '20px',
            margin: '0 auto',
            width: '500px',
            height: '500px'
        }}/>

    );
}

export default MainMapComponent;