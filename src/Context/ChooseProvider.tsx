import React, {useReducer, useContext, createContext, Dispatch } from "react";

export const initialValue = {number: 'one'};

interface State {
  number: string
}

type Action = 
  {type: string; number: string}

type SampleDispatch = Dispatch<Action>;

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<SampleDispatch | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "a":
      return {
        ...state,
        number: 'one'
      };
    case "b":
      return {
        ...state,
        number: 'two'
      };
    case "c":
      return {
        ...state,
        number: 'three'
      }
    default:
      throw new Error('unhandled action');
  }
}

export function ChooseProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {
    number: 'one'
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const state = useContext(StateContext);
  if(!state) throw new Error('Cannot find StateProvider');
  return state;
}

export function useDispatchContext() {
  const dispatch = useContext(DispatchContext);
  if(!dispatch) throw new Error('Cannot find DispatchProvider');
  return dispatch
}