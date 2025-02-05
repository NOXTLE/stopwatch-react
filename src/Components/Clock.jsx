import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [lap, setLap] = useState([]);
  let interval;

  useEffect(() => {
    if (start) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    if (document.getElementById("scroll")) {
      if (
        document.getElementById("scroll").scrollWidth >
        document.getElementById("bar").clientWidth
      ) {
        document.getElementById("scroll").scrollLeft =
          document.getElementById("scroll").scrollWidth;
      }
    }
  }, [lap]);

  return (
    <>
      <div
        id="bar"
        className={`container h-20 ${
          lap.length > 0 ? "flex" : "hidden"
        } items-center  mx-auto `}
      >
        <div className="w-full flex">
          <h1 className="mx-5 ">Laps</h1>
          <div id="scroll" className="scroll  overflow-x-scroll h-full flex ">
            {lap.map((l, i) => {
              return (
                <div
                  className={`lapbox ${
                    i == lap.length - 1 ? "text-green-500" : "text-white"
                  } ${
                    i == lap.length - 1 ? "text-xl" : "text-lg"
                  } border-l-2  border-white px-2   `}
                >
                  {
                    <div className="w-full flex justify-center gap-1  bg-zinc-00 rounded-2xl translate ">
                      <span>
                        {("0" + Math.floor((l / 60000) % 60)).slice(-2)}
                      </span>
                      :
                      <span>
                        {("0" + Math.floor((l / 1000) % 60)).slice(-2)}
                      </span>
                      :
                      <span>
                        {("0" + Math.floor((l / 10) % 100)).slice(-2)}
                      </span>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="clock max-sm:w-[300px] max-sm:h-[200px] w-[50%] lg:w-[25%] h-70 flex flex-col justify-between p-5 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-zinc-900 border-4 items-center rounded-2xl ">
        <div>
          <h1>Stopwatch</h1>
        </div>
        <div className="w-full flex justify-center gap-1 text-6xl bg-zinc-00 rounded-2xl py-4">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>:
          <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="w-full flex justify-center gap-5">
          <button
            className={`${start ? "bg-red-800" : "bg-green-800"} ${
              start ? "hover:bg-red-700" : "hover:bg-green-700"
            } hover:cursor-pointer px-6 rounded-lg py-2 `}
            onClick={() => {
              start ? setStart(false) : setStart(true);
            }}
          >
            {start ? "Stop" : "Start"}
          </button>
          <button
            className={`bg-orange-400 ${
              start ? "flex" : "hidden"
            }  hover:bg-orange-600 hover:cursor-pointer px-6 rounded-lg py-2 `}
            onClick={() => {
              setLap((prev) => [...prev, time]);
            }}
          >
            Lap
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-600 hover:cursor-pointer px-6 rounded-lg py-2 "
            onClick={() => {
              setTime(0);
              setStart(false);
              setLap([]);
            }}
          >
            reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Clock;
