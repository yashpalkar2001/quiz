import { useState } from "react";
import { Link } from "react-router-dom";
// import Quiz from "./Quiz";

const InitialPage = () => {
  const [formValue, setFormValue] = useState({
    category: "9",
    dificulty: "easy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return (
    <div className="w-full h-screen bg-[#f9f9f9] flex items-center justify-center">
      <div className="w-full h-screen md:w-[50%] md:h-fit shadow-xl border-2 border-gray-300 rounded-xl bg-white bg-opacity-10  p-5 list-none ">
        <h3 className="text-xl text-center font-semibold">Select Category</h3>

        <div className="mt-3">
          <select
            name="category"
            className="w-full p-3 my-2 rounded-md text-lg text-center border border-gray-300"
            value={formValue.category}
            onChange={handleChange}
          >
            <option value="9">General knowledge</option>
            <option value="21">Sport</option>
            <option value="23">History</option>
            <option value="25">Art</option>
            <option value="27">Animal</option>
          </select>

          <select
            name="dificulty"
            className="w-full p-3 my-2 rounded-md text-lg text-center border border-gray-300"
            value={formValue.dificulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <div className=" w-full flex items-center justify-center mt-4 md:justify-end">
            <Link
              to={{
                pathname: "/quiz",
                search: `?category=${formValue.category}&difficulty=${formValue.dificulty}`,
              }}
              className=" text-lg px-5 rounded-md border border-gray-300 font-semibold"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
