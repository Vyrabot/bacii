import React from "react";

function Input({ index, onScoreChange, title, img, percentage, color }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onScoreChange(index, value); // Send the value to parent
  };

  return (
    <div className="flex justify-between overflow-hidden max-w-[380px] xl:max-w-[400px] max-h-[120px] gap-[10px] bg-Primery rounded-md shadow-xl">
      <div className="w-[120px]">
        <img
          src={img}
          alt="khmer-book"
          className="w-full h-full hover:scale-[0.9] transition"
        />
      </div>
      <div className="flex flex-col justify-around items-start py-2 w-full h-auto md:w-[280px] mr-2">
        <p className="text-xl mb-1 text-accent font-semibold">{title}</p>
        <div className="w-[70%] h-1 bg-blue-300 rounded-lg overflow-hidden">
          <div
            className={`h-full rounded-sm ${color}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <input
          type="number"
          placeholder="បញ្ចូលពិន្ទុរបស់អ្នក..."
          className="text-red-500 text-xl font-semibold font-JetBrainsMono px-3 w-[100%] h-[45px] rounded-md border-none focus:outline-none placeholder:text-md placeholder:font-khmer placeholder:font-normal caret-accent-hover"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Input;
