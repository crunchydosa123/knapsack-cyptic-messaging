import React, { createContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [sentMessage, setSentMessage] = useState('');

    return (
        <MessageContext.Provider value={{ sentMessage, setSentMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;
