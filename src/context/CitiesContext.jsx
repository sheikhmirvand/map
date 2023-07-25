import { createContext, useContext, useEffect, useReducer } from "react";
import propTypes from "prop-types";
const baseUrl = "https://citi-server.vercel.app";

const CitiesContext = createContext();

const initialState = {
  loading: true,
  cities: [],
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "rejected":
      return { ...state, error: action.payload };
    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };
    case "cities/currentCity":
      return { ...state, currentCity: action.payload, loading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
  }
};

const CitiesProvider = ({ children }) => {
  const [{ loading, cities, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${baseUrl}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "we have error in data fetching",
        });
      }
    };

    fetchData();
  }, []);

  const getCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${baseUrl}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "cities/currentCity", payload: data });
    } catch (error) {
      alert("we have error");
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${baseUrl}/cities`, {
        method: "POSt",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": " application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "we have error in create city" });
    }
  };

  const deletCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`${baseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deletCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("context not definde");
  return context;
};

CitiesProvider.propTypes = {
  children: propTypes.any,
};

export { useCities, CitiesProvider };
