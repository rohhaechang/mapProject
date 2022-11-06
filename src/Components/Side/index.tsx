import React, {useEffect, useReducer, useCallback} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

import { useDispatchContext, useStateContext } from '../../Context/ChooseProvider';

const Container = styled.div`
  box-sizing: border-box;
  flex: 1;
  border: 1px solid black;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
`;

const Icon = styled.button`
  flex: 1;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: beige;
  &:hover {
    background-color: ${(lighten(0.1, 'beige'))};
  }
  &:active {
    background-color: ${(darken(0.1, 'beige'))};
  }
`;

const ListContainer = styled.div`
  flex: 4;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-wrap: no-wrap;
`;

const Inside = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
  line-height: 95.04px;
  background-color: white;
  &:hover {
    background-color: ${(lighten(0.1, 'lightgray'))};
  }
  &:active {
    background-color: ${(darken(0.1, 'lightgray'))};
  }
  font-size: 16px;
  white-space: nowrap;
`;

interface State {
  loading: boolean,
  data: Data | null,
  error: string | null | unknown
}

interface Data {
  viewAmenitiesInfo : Va,
  stayLodgeInfo : Va,
  touristFoodInfo: Va,
}

interface Va {
  row: string
}

type ReducerProps = 
  | {type: 'LOADING'; }
  | {type: 'SUCCESS'; data: Data | null}
  | {type: 'ERROR'; error: string | null | unknown }


const reducer = (state: State, action: ReducerProps) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default: 
    throw new Error(`unhandled action`);
  }
}

const viewAmenitiesInfo = 'viewAmenitiesInfo';
const stayLodgeInfo = 'stayLodgeInfo';
const touristFoodInfo = 'touristFoodInfo';

const Side = () => {
  const chooseDispatch = useDispatchContext();
  const chooseState = useStateContext();

  const setChoose = useCallback((a: string, b: string) => {
    chooseDispatch({type: a, number: b})
  }, [chooseDispatch])

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  })

  const fetchUsers = async (a: string, b: number) => {
    dispatch({ type: 'LOADING'});
    try {
      const response = await axios.get(
        `http://openapi.seoul.go.kr:8088/486857594b726863383574794f4669/json/${a}/1/${b}/`
      );
      dispatch({ type: 'SUCCESS', data: response.data});
    } catch (e) {
      dispatch({ type: 'ERROR', error: e})
    }
  }

  /**
   * useEffect로 처음 렌더링 시 데이터를 불러오는 곳
   */
  useEffect(() => {
    fetchUsers(viewAmenitiesInfo, 5);
    setChoose('a', 'one');
  }, [setChoose]);

  /**
   * 불러온 데이터에 따라 렌더링되는 곳
   */
  let array1 = [];


  if(state.loading) return (
    <Container>
      <IconContainer>
        <Icon onClick={() => {
          fetchUsers(viewAmenitiesInfo, 5);
          setChoose('a', 'one')
        }}>장애인 관광편의시설</Icon>
        <Icon onClick={() => {
          fetchUsers(stayLodgeInfo, 5);
          setChoose('b', 'two')
        }}>장애인 관광숙박시설</Icon>
        <Icon onClick={() => {
          fetchUsers(touristFoodInfo, 5);
          setChoose('c', 'three')
        }}>장애인 관광음식점</Icon>
      </IconContainer>
      <ListContainer>
        로딩 중
      </ListContainer>
    </Container>
  )
  if(state.error) return (
    <Container>
      <IconContainer>
        <Icon onClick={() => {
          fetchUsers(viewAmenitiesInfo, 5);
          setChoose('a', 'one')
        }}>장애인 관광편의시설</Icon>
        <Icon onClick={() => {
          fetchUsers(stayLodgeInfo, 5);
          setChoose('b', 'two')
        }}>장애인 관광숙박시설</Icon>
        <Icon onClick={() => {
          fetchUsers(touristFoodInfo, 5);
          setChoose('c', 'three')
        }}>장애인 관광음식점</Icon>
      </IconContainer>
      <ListContainer>
        에러
      </ListContainer>
    </Container>
  )
  if(!state.data) return null;
  if(state.data && chooseState.number === 'one') {
    for(let i=0; i<5; i++) {
      array1[i] = state.data.viewAmenitiesInfo.row[i];
    }
  }
  if(state.data && chooseState.number === 'two') {
    for(let i=0; i<5; i++) {
      array1[i] = state.data.stayLodgeInfo.row[i];
    }
  }
  if(state.data && chooseState.number === 'three') {
    for(let i=0; i<5; i++) {
      array1[i] = state.data.touristFoodInfo.row[i];
    }
  }
  return (
    <Container>
      <IconContainer>
        <Icon onClick={() => {
          fetchUsers(viewAmenitiesInfo, 5);
          setChoose('a', 'one')
        }}>장애인 관광편의시설</Icon>
        <Icon onClick={() => {
          fetchUsers(stayLodgeInfo, 5);
          setChoose('b', 'two')
        }}>장애인 관광숙박시설</Icon>
        <Icon onClick={() => {
          fetchUsers(touristFoodInfo, 5);
          setChoose('c', 'three')
        }}>장애인 관광음식점</Icon>
      </IconContainer>
      <ListContainer>
        {array1.map((e: any) => <Inside key={e.SISULNAME}>{e.SISULNAME} ({e.ADDR})</Inside>)}
      </ListContainer>
    </Container>
  )
}

export default Side;