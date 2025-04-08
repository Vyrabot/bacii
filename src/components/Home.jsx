import React, { useState, useEffect } from "react";
import Input from "./ui/Input";
import p7 from "../assets/khmer-book.jpg";
import p1 from "../assets/enlish.jpg";
import p2 from "../assets/history.jpg";
import p3 from "../assets/kimi.jpg";
import p4 from "../assets/marth.jpg";
import p5 from "../assets/physic.webp";
import p6 from "../assets/jivak.jpg";
function Home() {
  const data = [
    { title: "អក្សរសាសន៍ខ្មែរ", img: p7 },
    { title: "គណិតវិទ្យា", img: p4 },
    { title: "គីមីវិទ្យា", img: p3 },
    { title: "រូបវិទ្យា", img: p5 },
    { title: "ជីវះវិទ្យា", img: p6 },
    { title: "ប្រវត្ដវិទ្យា", img: p2 },
    { title: "ភាសាបរទេស", img: p1 },
  ];
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [adjustedScores, setAdjustedScores] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalScore, setTotalScore] = useState(0);
  const [open, setOpen] = useState(false);

  // Apply the special adjustment to the 7th score
  useEffect(() => {
    setAdjustedScores((prev) => {
      const newScores = [...scores]; // Use the current scores
      if (newScores[6] >= 25) {
        newScores[6] = newScores[6] - 25;
      } else {
        newScores[6] = 0;
      }
      return newScores;
    });
  }, [scores]); // Run whenever scores change

  // Calculate total from adjusted scores
  useEffect(() => {
    setTotalScore(adjustedScores.reduce((sum, score) => sum + score, 0));
  }, [adjustedScores]);

  const handleScoreChange = (index, newScore) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[index] = Math.max(0, Number(newScore) || 0); // Ensure non-negative
      return updatedScores;
    });
  };
  function handleOpen() {
    scores.map((el) => {
      if (el == 0) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    });
    if (
      adjustedScores[0] == 0 ||
      adjustedScores[1] == 0 ||
      adjustedScores[2] == 0 ||
      adjustedScores[3] == 0 ||
      adjustedScores[4] == 0 ||
      adjustedScores[5] == 0 ||
      scores[6] == 0
    ) {
      alert("សូមធ្វើការបញ្ចូលពិន្ទុរបស់អ្នក​ឪ្យបានត្រឹមត្រូវ!");
    }
  }
  const getBackgroundColor = (index, score) => {
    if (index === 0 || index === 2 || index === 3 || index === 4) {
      if (score <= 37) return "bg-red-300";
      if (score <= 65) return "bg-yellow-400";
      return "bg-green-500";
    }
    if (index == 1) {
      if (score <= 50) return "bg-red-300";
      if (score <= 105) return "bg-yellow-400";
      return "bg-green-500";
    }
    if (index == 5 || index == 6) {
      if (score <= 25) return "bg-red-300";
      if (score <= 40) return "bg-yellow-400";
      return "bg-green-500";
    }
  };
  const getPercentage = (totalScore, index) => {
    if ([0, 2, 3, 4].includes(index)) {
      return (totalScore * 100) / 75;
    } else if ([1].includes(index)) {
      return (totalScore * 100) / 150;
    } else {
      return (totalScore * 100) / 50;
    }
  };
  return (
    <section className="pt-14 w-full">
      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-items-center md:gap-x-20 gap-[20px] md:gap-[40px]">
        {data.map((item, index) => (
          <Input
            {...item}
            key={index}
            index={index}
            score={scores[index]}
            onScoreChange={handleScoreChange}
            percentage={getPercentage(scores[index], index)}
            color={getBackgroundColor(index, scores[index])}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleOpen}
          className="m-5 md:mt-8 border-solid border-2 border-bg2 text-xl font-semibold w-[8rem] h-[50px] rounded-xl text-accent"
        >
          គណនា
        </button>
      </div>
      {open == true ? (
        <div className="absolute min-h-[100vh] w-full top-0 left-0 z-10 transition-all">
          <div className="fixed top-0 left-0 w-full h-full bg-overlay">
            <div className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center">
              <div className="relative w-[95%] md:w-[80%] xl:w-[55%] h-[300px] md:h-[500px] bg-bg rounded-xl p-[10px] md:p-[15px] xl:p-[45px]">
                {/* show data show title */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute grid place-items-center right-0 bottom-0 text-white bg-red-500 w-[50px] h-[30px] font-JetBrainsMono rounded-md m-[10px] z-20"
                >
                  <span className="font-khmer font-semibold">បិទ</span>
                </button>
                <div className="relative grid gap-y-4 gap-1 md:gap-[15px] place-items-cente items-start grid-cols-3 md:grid-cols-4 w-full h-[50%] md:h-[75%]">
                  {data.map((element, index) => (
                    <div
                      key={index}
                      className="text-sm p-1 h-full md:text-xl font-semibold leading-3 text-accent"
                    >
                      {element.title}
                      <div className="flex items-center w-auto gap-[30px] mt-[10px] md:mt-[20px] font-JetBrainsMono text-red-500">
                        <div className="text-[1.23rem] md:text-2xl">
                          {scores[index]}
                        </div>
                        <div className="text-[1.23rem] md:*:text-3xl flex items-center border-l-2 px-6 h-[15px] md:h-[25px] border-bg2 border-solid">
                          {index === 0 ||
                          index === 2 ||
                          index === 3 ||
                          index === 4 ? (
                            scores[index] >= 67 ? (
                              <p className="text-red-500">A</p>
                            ) : scores[index] >= 60 ? (
                              <p className="text-pink-500">B</p>
                            ) : scores[index] >= 52 ? (
                              <p className="text-red-700">C</p>
                            ) : scores[index] >= 45 ? (
                              <p className="text-green-600">D</p>
                            ) : scores[index] >= 37 ? (
                              <p className="text-blue-500">E</p>
                            ) : (
                              <p className="text-black">F</p>
                            )
                          ) : null}
                          {index === 1 ? (
                            scores[index] >= 112 ? (
                              <p className="text-red-500">A</p>
                            ) : scores[index] >= 100 ? (
                              <p className="text-pink-500">B</p>
                            ) : scores[index] >= 87 ? (
                              <p className="text-red-700">C</p>
                            ) : scores[index] >= 75 ? (
                              <p className="text-green-600">D</p>
                            ) : scores[index] >= 62 ? (
                              <p className="text-blue-500">E</p>
                            ) : (
                              <p className="text-black">F</p>
                            )
                          ) : null}
                          {index === 5 || index === 6 ? (
                            scores[index] >= 45 ? (
                              <p className="text-red-500">A</p>
                            ) : scores[index] >= 40 ? (
                              <p className="text-pink-500">B</p>
                            ) : scores[index] >= 35 ? (
                              <p className="text-red-700">C</p>
                            ) : scores[index] >= 30 ? (
                              <p className="text-green-600">D</p>
                            ) : scores[index] >= 25 ? (
                              <p className="text-blue-500">E</p>
                            ) : (
                              <p className="text-black">F</p>
                            )
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* show grad and scores */}
                <div className="z-40 m-[10px] md:m-[15px] xl:m-[45px] text-red-500 text-3xl absolute left-0 bottom-0 flex gap-4">
                  <div className="grid grid-cols-2 gap-y-1 md:gap-y-4">
                    <p className="font-khmer text-[1.23rem] md:text-md font-semibold text-accent">
                      ពិន្ទុ:
                    </p>
                    <p className="text-[1.23rem] md:text-3xl font-JetBrainsMono font-bold">
                      {totalScore}
                    </p>
                    <p className="font-khmer text-[1.23rem] md:text-md font-semibold text-accent">
                      និទ្ទេស:
                    </p>
                    <div className="text-[1.23rem] md:*:text-4xl ml-4 font-bold font-JetBrainsMono">
                      {totalScore >= 427 ? (
                        <p className="text-red-500">A</p>
                      ) : totalScore >= 380 ? (
                        <p className="text-pink-500">B</p>
                      ) : totalScore >= 332 ? (
                        <p className="text-red-700">C</p>
                      ) : totalScore >= 286 ? (
                        <p className="text-green-600">D</p>
                      ) : totalScore >= 237 ? (
                        <p className="text-blue-500">E</p>
                      ) : (
                        <p className="text-black">F</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Home;
