import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import { useAnswerRecognition } from "../hooks/useAnswerRecognition";
import { speak } from "../utils";
import { answer, Guess, start, win } from "../utils/api";
import { getAnsweredIndex } from "../utils/getAnsweredIndex";
import { shouldTryToGuess } from "../utils/shouldTryToGuess";
import {RenderContainer} from "../components/RenderContainer";
import {reducerContext, useReducerContext} from "../App";
import {Link} from "react-router-dom";
import {I_DIDNT_GUESS, I_TOLD_YOU, SIMPLE_TALK} from "../actions";

export const Game: React.FC = () => {
  const {state, dispatch} = useReducerContext();
  const { startRecognizing, isRecognizing, answers, resetAnswers } =
    useAnswerRecognition();

  const questionCountRef = useRef(0);

  const shouldTryToWin = shouldTryToGuess(questionCountRef.current);

  const isAnswered = useMemo(
    () => answers.some((answer) => answer.selected),
    [answers]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [guess, setGuess] = useState<Guess | null>(null);

  const onQuestionChanged = useCallback(
    async (q: string) => {
      questionCountRef.current++;
      setIsLoading(false);
      setQuestion(q);
      if (!shouldTryToGuess(questionCountRef.current)) {
        speak(q);
        dispatch(SIMPLE_TALK());
        setTimeout(() => {
          startRecognizing();
        }, 2000);
      }
    },
    [startRecognizing]
  );

  const onYesPress = useCallback(() => {
    console.log("NAVIGATE TO CONGRATS SCREEN AND START AGAIN");
  }, []);

  const onNoPress = useCallback(() => {
    setGuess(null);
    speak(question);
    dispatch(SIMPLE_TALK());
  }, [question]);

  useEffect(() => {
    setIsLoading(true);
    start().then((res) => {
      onQuestionChanged(res.question || "");
    });
  }, [onQuestionChanged]);

  useEffect(() => {
    if (isAnswered) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        const answerIndex = getAnsweredIndex(answers);
        if (answerIndex === -1) {
          return;
        } else if(answerIndex !== 0) {
          dispatch(I_DIDNT_GUESS())
        } else if(answerIndex === 0) {
          dispatch(I_TOLD_YOU())
        }
        resetAnswers();
        answer(answerIndex).then((res) => {
          onQuestionChanged(res.question || "");
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [answers, isAnswered, onQuestionChanged, resetAnswers, shouldTryToWin]);

  useEffect(() => {
    if (shouldTryToWin) {
      speak("I will try to quess the character now");
      dispatch(SIMPLE_TALK());
      setIsLoading(true);
      win()
        .then((res) => {
          const guess = res.guesses[0];
          setGuess(guess);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [shouldTryToWin]);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === "Space") {
        startRecognizing();
      }
    };

    document.addEventListener("keypress", listener);
    return () => document.removeEventListener("keypress", listener);
  }, [startRecognizing]);

  return (
      <>
        <div className={"container p-5"}>
          <div className={"row"}>
            <div className={"col container-fluid"}>
              <RenderContainer action={state.animation}/>
            </div>
            <div className={"col container-fluid"}>
              {guess ? (
                  <div className="card w-100 mb-5">
                    <img src={guess.absolute_picture_path} alt={guess.description} className="card-img-top mx-auto p-5" />
                    <div className="card-body">
                      <h5 className="card-title fs-1">I think it is {guess.name}</h5>
                      <p className="card-text fs-4">
                        {guess.description}
                      </p>
                      <Link to="/finish">
                        <button className={"btn w-25 btn-info text-uppercase mx-1"} onClick={()=>{
                          dispatch({type: "SET_GUESS", payload: {
                            picture: guess.absolute_picture_path,
                            description: guess.description,
                            name: guess.name
                          }})
                          onYesPress();
                        }}>Yes</button>
                      </Link>
                      <button className={"btn w-25 btn-warning text-uppercase mx-1"} onClick={onNoPress}>No</button>
                    </div>
                  </div>
              ) : (
                  <>
                    <div className="card mb-5" >
                      <div className="card-body">
                        <h5 className="card-title">Question</h5>
                        <p className={"text-warning"} style={{height: '1rem'}}>
                          {isLoading && 'Loading...'}
                          {isRecognizing && 'Recognizing...'}
                        </p>
                        <p className={'fs-6'} style={{height: '1rem'}}>{question}</p>
                      </div>
                    </div>
                    <div className={"d-flex flex-column h-50 justify-content-around"}>
                      {answers.map((answer) => (
                          <p className={`btn ${answer.selected ? 'btn-light' : 'btn-primary'} text-uppercase`} key={answer.text}>
                            {answer.text}
                          </p>
                      ))}
                    </div>
                  </>
              )}
            </div>
          </div>
          <div className={"row"}>
            <Link className={"align-self-end"} to="/">
              <button className={"btn w-25 btn-danger text-uppercase"}>EXIT</button>
            </Link>
          </div>
        </div>
      </>
  );
};


// <div>
//   <h4>I think it is {guess.name}</h4>
//   <p>{guess.description}</p>
//   <img src={guess.absolute_picture_path} alt={guess.description} />
//   <button onClick={onYesPress}>Yes</button>
//   <button onClick={onNoPress}>No</button>
// </div>