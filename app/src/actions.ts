const timeScaleFactor = 0.5

const timeScale = (time: number) => {
    return time * timeScaleFactor;
}

export const SIMPLE_TALK = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: timeScale(0),
            duration: timeScale(4),
        }
    };
}

export const I_DIDNT_GUESS = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: timeScale(8),
            duration: timeScale(5),
        }
    };
}

export const I_TOLD_YOU = () => {
    return {
        type: "ANIMATE",
        payload: {
            delay: timeScale(12),
            duration: timeScale(2.5),
        }
    };
}