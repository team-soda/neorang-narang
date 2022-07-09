import React, {useEffect, useState} from 'react';
import {boardService} from "../../service/BoardService";

const {kakao} = window;

const MainMapComponent = () => {

    const boardInfoState = {dtoList: []};
    const [mapLocation, setMapLocation] = useState(boardInfoState);

    useEffect(() => {

        boardService.getBoardList().then((res) => {
            setMapLocation(res.data.dto);
        });

        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(36.58303, 127.56),
            level: 13
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            imageSize = new kakao.maps.Size(24, 34);

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        mapLocation.dtoList.map((locations) => {
            geocoder.addressSearch(locations.location, function (result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                        image: markerImage
                    });
                }
            })
        });
    }, []);

    return (
        <div id='myMap' style={{
            border: '1px solid whitesmoke',
            borderRadius: '20px',
            margin: '0 auto',
            marginBottom: 40,
            width: '100%',
            height: 400
        }}/>
    );
}

export default MainMapComponent;