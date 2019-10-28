import React, { useReducer } from 'react';
import { fetchCommits, Commit } from '../fetchCommits';

interface CLState {
    isLoading: boolean;
    commits: Commit[];
    error: string | null;
}

type CLAction =
    | { type: 'requesting' }
    | { type: 'load_success', value: Commit[] }
    | { type: 'page_success', value: Commit[] }
    | { type: 'request_failed', error: string };

interface ListContext extends CLState {
    loadMore: () => void;
}

const ListContext = React.createContext<ListContext>({} as any);
ListContext.displayName = 'ListContext';

const initialState: CLState = {
    isLoading: false,
    commits: [],
    error: null
}

const reducer = (state: CLState, action: CLAction) => {
    switch (action.type) {
        case 'requesting':
            return { ...state, isLoading: true }
        case 'load_success':
            return { ...state, isLoading: false, commits: action.value }
        case 'page_success': {
            const merged = [...state.commits, ...action.value];
            return { ...state, isLoading: false, commits: merged }
        }
        case 'request_failed':
            return { ...state, isLoading: false, error: action.error }
        default:
            return state
    }
}

const ListProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { commits } = state;
    const latestSha = commits.length !== 0 ? commits[commits.length - 1].id : undefined

    const loadMore = () => {
        dispatch({ type: 'requesting' })
        try {
            fetchCommits(latestSha).then((data) => {
                dispatch({ type: 'page_success', value: data })
            }).catch((e) => {
                dispatch({ type: 'request_failed', error: e.message })
            });
        } catch (e) {
            dispatch({ type: 'request_failed', error: 'Unknown error' })
        }
    };

    const values = {
        ...state,
        loadMore
    }

    return (
        <ListContext.Provider value={values}>
            {children}
        </ListContext.Provider>
    )
}

export { ListProvider, ListContext };