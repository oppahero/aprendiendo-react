import { AUTO_LANGUAGE } from '../constants';
import { Action, FromLanguage, Language, type State } from '../types';
import { useReducer } from 'react';

// 1. Create initialstate
export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

// 2. Create a reducer
export function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGE') {
    if (state.fromLanguage === AUTO_LANGUAGE ) return state
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      results: '',
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  // 3. Use the useReducer hoook

  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //   No devuelvas directamente los dispatch 
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGE' })
  }

  const setFromLanguage = (payload : FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload: payload })
  }

  const setToLenguage = (payload : Language) => {   
    dispatch({ type: 'SET_TO_LANGUAGE', payload: payload })
  }

  const setFromText = (payload : string) => { 
    dispatch({ type: 'SET_FROM_TEXT', payload: payload })
  }

  const setResult = (payload : string) => {
    dispatch({ type: 'SET_RESULT', payload: payload})
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLenguage,
    setFromText,
    setResult
  };
}
