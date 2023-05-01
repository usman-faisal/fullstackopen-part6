import {createContext, useContext, useEffect} from "react";
import {useReducer} from "react";

const NotificationContext = createContext(null);

const reducer = (state,action) => {
    switch (action.type){
        case "SHOW":
            state = action.payload;
            return state;
        case "RESET":
            state = "";
            return state;
        default:
            return state;
    }
}
export const NotificationContextProvider = ({children}) => {
    const [notification,notificationDispatch] = useReducer(reducer,"");
    useEffect(() =>{
        setTimeout(() => {
            notificationDispatch({type: "RESET"})
        },5000)
    },[notification])
    return (
        <NotificationContext.Provider value={[notification,notificationDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}


export const useNotificationValue = () => {
    const context = useContext(NotificationContext);
    return context[0];
}

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);
    return context[1];
}

