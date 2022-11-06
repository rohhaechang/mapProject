import React, {useRef, useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const Container = styled.div`
  flex: 2;
`;

const MapContainer = styled.div`
  position: relative;
  top: -40px;
  z-index: 1;
`;

const SearchContainer = styled.div`
  position: relative;
  top: 1rem;
  width: 300px;
  height: 40px;
  z-index: 2;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 260px;
  line-height: 40px;
  opacity: 0.8;
  box-sizing: border-box;
`;

const IconContainer = styled.button`
  width: 35px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  box-sizing: border-box;
  line-height: 40px;
`;

const Mapp = () => {
  const [LatLng, setLatLng] = useState({
    x: 37.5757,
    y: 126.9769
  })
  
  const mapElement = useRef<HTMLInputElement>(null);
  
  // 지도 만들기
  const initMap = useCallback(() => {
    const { naver } = window;
    if(!mapElement.current || !naver) return null;

    // 처음 켰을 때 지도 렌더링하는 곳
    const location = new naver.maps.LatLng(LatLng.x, LatLng.y);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    let marker = new naver.maps.Marker({
      position: location,
      map
    });
    let infoWindow = new naver.maps.InfoWindow({
      content: 'hi',
      disableAnchor: true,
    })
    infoWindow.open(map, marker);


  }, [LatLng]);

  // 검색창 만들기
  const [inputValue, setInputValue] = useState('');

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  /**
   * 이상한 점: 주소 검색해서 불러온 값의 x, y 값이 바뀌어 있음
   * 객체의 요소들이 전부 string이기 때문에 타입변환을 해주었음(Number) */ 
  function searchAddress() {
    naver.maps.Service.geocode({
      query: inputValue
    }, function(status, response) {
      if(status === naver.maps.Service.Status.ERROR) {
        console.log('오류');
      }
      let item = response.v2.addresses[0];
      setLatLng({
        x: Number(item.y),
        y: Number(item.x)
      })
    })
  }
  
  useEffect(() => {
    initMap();
  }, [initMap]);
  return (
    <Container>
      <SearchContainer>
        <Input placeholder="검색" onChange={onChangeValue} value={inputValue}/>
        <IconContainer>
          <AiOutlineSearch size='20' color='green' style={{marginBottom: '-5px'}} onClick={() => {
            searchAddress()
            }}/>
        </IconContainer>
      </SearchContainer>
      <MapContainer>
        <div ref={mapElement} style={{minHeight: '600px'}}></div>
      </MapContainer>
    </Container>
  );
}

export default Mapp;