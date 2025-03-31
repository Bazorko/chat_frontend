import { useContext } from "react";
import { DataContext } from '../contexts/UserData';

export const useData = () => {
    //Consumes context in a custom hook to be used in components requiring that data.
    const dataContext = useContext(DataContext);
    if (!dataContext) throw new Error("Error while fetching auth status.");
    return dataContext;
}

