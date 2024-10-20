import React, { createContext, useState } from 'react';

const ReceivedMessageContext = createContext();

export const ReceivedMessageProvider = ({ children }) => {
    const [incomingMessage, setIncomingMessage] = useState('');

    return (
        <ReceivedMessageContext.Provider value={{ incomingMessage, setIncomingMessage }}>
            {children}
        </ReceivedMessageContext.Provider>
    );
};

export default ReceivedMessageContext;
