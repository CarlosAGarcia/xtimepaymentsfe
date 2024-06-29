// DataContext.tsx
import axios from 'axios';
import React, { createContext, useState, ReactNode } from 'react';

// QUICK ref to user store
// Everything included in context - VARS + FNS
interface CountTokensContextType {
    // LOGIN
    getContextTokens: (vars: { text: string }, source?: any) => void;
    contextTokensVars: { tokenIndexes?: number[], contextTokensTotal?: number, contextTokensLoading: boolean, contextTokensErr: boolean };

    setTextState: (text: string) => void;
    text: string;
}

const CountTokenContext = createContext<CountTokensContextType | undefined>(undefined);
const CountTokenContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // logs in user - /api/tokens/count - POST
    // updates the state vars for login - { tokenIndexes, contextTokensTotal, contextTokensLoading, contextTokensErr }
    const [{ tokenIndexes, contextTokensTotal, contextTokensLoading, contextTokensErr }, setContextTokensVars ] = useState<{ tokenIndexes?: number[], contextTokensTotal?: number, contextTokensLoading: boolean, contextTokensErr: boolean }>({ tokenIndexes: [], contextTokensTotal: 0, contextTokensLoading: false, contextTokensErr: false });
    const getContextTokens = async (vars: { text: string }, source?: any) => {
        setContextTokensVars({ tokenIndexes: undefined, contextTokensTotal: undefined, contextTokensLoading: true, contextTokensErr: false });

       try {
            await axios.post('/api/tokens/count', vars, { cancelToken: source.token })
                .then((response) => {
                    console.log("Context tokens fetched:", response.data);
                    setContextTokensVars({ tokenIndexes: response.data.tokenIndexes, contextTokensTotal: response.data.contextTokensTotal, contextTokensLoading: false, contextTokensErr: false });
                })
                .catch((error) => {
                    console.error("Error fetching context tokens:", error);
                    setContextTokensVars({ tokenIndexes: undefined, contextTokensTotal: undefined, contextTokensLoading: false, contextTokensErr: true });
                });
        } catch (err) {
            if (axios.isCancel(err)) return;
            setContextTokensVars({ tokenIndexes: undefined, contextTokensTotal: undefined, contextTokensLoading: false, contextTokensErr: true });
        }
    }

    // updates the the state for the text that we're going to be using for the context tokens
    const [ text, setText ] = useState<string>('');
    const setTextState = (text: string) => setText(text);

    return (
        <CountTokenContext.Provider value={{
            getContextTokens, contextTokensVars: { tokenIndexes, contextTokensTotal, contextTokensLoading, contextTokensErr },
            setTextState, text
        }}>
            {children}
        </CountTokenContext.Provider>
    );
};

export { CountTokenContext, CountTokenContextProvider };
