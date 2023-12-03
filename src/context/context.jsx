import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer.jsx";
import {
  DATA_FETCHING_STARTED,
  DATA_FETCHING_SUCCESS,
  DATA_FETCHING_FAIL,
  DELETE_ITEM,
  SVUOTA_CARRELLO,
  AUMENTA_QTY,
  DIMINUISCI_QTY,
  COSTO_TOTALE,
  ITEM_TOTALI,
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

  // cancella un singolo elemento
  const deleteItem = (_id) => {
    dispatch({type: DELETE_ITEM, payload: _id})
    console.log("eliminato");
  }

  // cancella tutto il carrello
  const svuotaCarrello = () => {
    dispatch({type: SVUOTA_CARRELLO})
    console.log("Carrello svuotato");
  }

  //aumenta di quantità
  const aumentaQty = (_id) => {
    dispatch({type: AUMENTA_QTY, payload: _id})
    console.log("Quantità aumentata");
  }

  //diminusci di quantità
  const diminuisciQty = (_id) => {
    dispatch({type: DIMINUISCI_QTY, payload: _id})
    console.log("Quantità diminuita");
  }

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

  useEffect(()=>{
    dispatch({type: COSTO_TOTALE})
    dispatch({type: ITEM_TOTALI})
  }, [state.products])

  return (
    <AppContext.Provider value={{ ...state, deleteItem, svuotaCarrello, aumentaQty, diminuisciQty }}>
        {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider };
