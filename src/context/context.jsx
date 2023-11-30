import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer.jsx";
import {
  DATA_FETCHING_STARTED,
  DATA_FETCHING_SUCCESS,
  DATA_FETCHING_FAIL,
} from "./actions";
import axios from "axios";
const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const initialState = {
  products: [],
  isLoading: true,
  isError: false,
  total: 0,
  itemCounter: 0,
};

// Creo il context per essere utilizzato dai miei componenti
const AppContext = React.createContext();

const AppProvider = ( {children} ) => {
  //Utilizzo useReducer con state iniziale
  const [state, dispatch] = useReducer(reducer, initialState);

  //Data Fetching
  useEffect(() => {
    //IIFE funzione solo quando viene chiamata
    (async () => {
      dispatch({ type: DATA_FETCHING_STARTED });
      try {
        const res = await axios.get(url);
        // console.log(res.data.data);
        dispatch({ type: DATA_FETCHING_SUCCESS, payload: res.data.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: DATA_FETCHING_FAIL });
      }
    })();
  }, []);
  return (
    <AppContext.Provider value={{ ...state }}>
        {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
