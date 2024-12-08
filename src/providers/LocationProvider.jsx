import PropTypes from "prop-types";
import { createContext } from "react";

export const LocationContext = createContext()

const LocationProvider = ({ children }) => {

    const serverDomain = 'https://cineverse-9wce3xir4-atikur-rahmans-projects-e1054064.vercel.app/'
    //const serverDomain = 'http://localhost:5000'
    const clientDomain = 'http://localhost:5173/'

    const domainInfo = {
        serverDomain: serverDomain,
        clientDomain: clientDomain
    }

    return (
        <LocationContext.Provider value={domainInfo}>
            {children}
        </LocationContext.Provider>
    );
};

LocationProvider.propTypes = {
    children: PropTypes.object,
}

export default LocationProvider;