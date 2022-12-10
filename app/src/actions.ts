export const SIMPLE_TALK = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: 0,
            duration: 4,
        }
    };
}

export const I_DIDNT_GUESS = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: 8,
            duration: 5,
        }
    };
}

export const I_TOLD_YOU = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: 12,
            duration: 2.5,
        }
    };
}