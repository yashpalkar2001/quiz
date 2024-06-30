// import React from "react";
import Quetions from "./Quetions";
import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import data from "../assets/data";
// import check from "../img/check.svg";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [post, setPosts] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timer, setTimer] = useState(15);

  // API call purpose

  // const [filterParams] = useSearchParams();
  // filterParams.get("catergory");
  // filterParams.get("difficulty");
  // const quizDetail = async () => {
  //   const response = await fetch(
  //     `https://opentdb.com/api.php?amount=5&catergory=${filterParams.get(
  //       "catergory"
  //     )}&difficulty=${filterParams.get("difficulty")}&type=multiple`

  //     // `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
  //   );
  //   const data = await response.json();
  //   setPosts(data.results);
  // };
  // useEffect(() => {
  //   quizDetail();
  // }, []);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const arrayOption = [option1, option2, option3, option4];

  const answerTrue = (event, answer) => {
    if (lock == false) {
      if (post.answer === answer) {
        event.target.style.border = "2px solid green";
        setScore((preScore) => preScore + 1);
        setLock(true);
      } else {
        event.target.style.border = "2px solid red";
        arrayOption[post.answer - 1].current.style.border = "2px solid green";
        setLock(true);
      }
    }
  };
  const nextBtn = () => {
    if (lock == true) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setPosts(data[index]);
      setTimer(15);
      setLock(false);
      arrayOption.map((option) => {
        option.current.style.background = "";
        option.current.style.border = "";
      });
    }
  };
  const prevBtn = () => {
    if (index == 0) {
      // setResult(true);
      return 0;
    }
    if (lock == false) {
      setIndex(--index);
      setPosts(data[index]);
      setLock(false);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (index < data.length - 1) {
        setIndex(++index);
        setPosts(data[index]);
        setTimer(15);
        arrayOption.map((option) => {
          option.current.style.background = "";
          option.current.style.border = "";
        });
      } else {
        if (index == data.length - 1) {
          setResult(true);
          return 0;
        }
      }
    }, 1000);
    return () => clearInterval(myInterval);
  }, [timer, post, index]);

  useEffect(() => {
    const handleNavigationKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevButtonRef.current?.focus();
        prevButtonRef.current?.click();
      } else if (e.key === "ArrowRight") {
        nextButtonRef.current?.focus();
        nextButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleNavigationKeyDown);

    return () => {
      document.removeEventListener("keydown", handleNavigationKeyDown);
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-[#f9f9f9]  flex items-center justify-center">
        <div className="w-full lg:w-[50%] h-fit border rounded-xl shadow-xl border-gray-400 p-5 list-none">
          {!result ? (
            <div>
              <div className="flex item-center justify-between">
                <Quetions Quetion={`${index + 1}. ${post.question}`} />
                <div className="text-lg text-center mt-5">{timer}</div>
              </div>
              <h4 className="text-sm">Select One:</h4>

              <li
                ref={option1}
                className="w-full border rounded-xl  border-gray-300 p-3 list-none text-lg my-2 flex items-center justify-between"
                onClick={(e) => {
                  answerTrue(e, 1);
                }}
              >
                {post.option1}
                {/* <div className="bg-green-500 h-5 w-5 rounded-full"></div> */}
                {/* <img src={check} alt="" /> */}
              </li>
              <li
                ref={option2}
                className="w-full border rounded-xl  border-gray-300 p-3 list-none text-lg my-2"
                onClick={(e) => {
                  answerTrue(e, 2);
                }}
              >
                {post.option2}
              </li>
              <li
                ref={option3}
                className="w-full border rounded-xl  border-gray-300 p-3 list-none text-lg my-2"
                onClick={(e) => {
                  answerTrue(e, 3);
                }}
              >
                {post.option3}
              </li>
              <li
                ref={option4}
                className="w-full border rounded-xl  border-gray-300 p-3 list-none text-lg my-2"
                onClick={(e) => {
                  answerTrue(e, 4);
                }}
              >
                {post.option4}
              </li>

              <div
                className={`flex ${
                  index > 0 ? "justify-between" : "justify-end"
                } mt-5 items-center`}
              >
                {index > 0 && (
                  <button
                    onClick={prevBtn}
                    className="text-lg px-5 rounded-md  border border-gray-300 font-semibold"
                    ref={prevButtonRef}
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={nextBtn}
                  ref={nextButtonRef}
                  className="text-lg px-5 rounded-md  border border-gray-300 font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[50%]">
              <h1 className="text-xl font-semibold text-center">
                Score: {score} / {data.length}
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
