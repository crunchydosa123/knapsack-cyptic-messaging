import React, { createContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [globalMessage, setGlobalMessage] = useState('');

    return (
        <MessageContext.Provider value={{ globalMessage, setGlobalMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;
