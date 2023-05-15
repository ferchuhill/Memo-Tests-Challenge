type MemoGameType = {
    name: string;
    id: number;
    high_score: number;
    user_name: string;
    images: {
        id: number;
        url: string;
    }[];
};

type PairsType = {
    id: number;
    state: string;
    position_a: number;
    position_b: number;
    image_id: number;
}[];

type GameSessionType = {
    memoTest: MemoGameType;
    pairs: PairsType;
    id: number;
    state: string;
    score: number;
};

type CardType = {
    id: number;
    key: string;
    state: "Flipped" | "Paired" | "Hidden";
    position: number;
    image_id: number;
    url: string;
};

// _app.tsx
type ContextType = {
    token: string | null;
    setToken: (theme: string | null) => void;
    username: string | null;
    setUsername: (username: string | null) => void;
};

// Index.tsx
type MemoGameGraphqlType = {
    memoTest: {
        paginatorInfo: {
            currentPage: number;
            count: number;
            hasMorePages: boolean;
        };
        data: MemoGameType[];
    };
};

type SessionGameIdType = {
    id: number;
    memoTest: MemoGameType;
};

type SessionGameGraphqlType = {
    gameSessionsByTokenState: {
        data: SessionGameIdType[];
        paginatorInfo: {
            currentPage: number;
            count: number;
            hasMorePages: boolean;
        };
    };
};

type MemoGamesHasSessionType = {
    memoGame: MemoGameType;
    hasSession: boolean;
    sessionGameId: number;
};
