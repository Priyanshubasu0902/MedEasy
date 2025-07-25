import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MainAddReading = () => {
  const { view, backendUrl, userToken } = useContext(AppContext);
  const [reading, setReading] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [type, setType] = useState("sugar");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post(
          backendUrl + "/api/readings/addReadings",
          { reading, date, time, type },
          { headers: { token: userToken } }
        );
        if (data.success) {
          toast.success("Reading added")
          setReading("");
          setDate("");
          setTime("");
        } else {
          toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
          className={`min-h-screen w-4/5 ${view ? "max-md:relative max-md:w-full" : "w-full"} px-10 py-10 flex flex-col gap-6`}

    >
      <h1 className="text-5xl font-semibold">Add Readings</h1>
      <p className="text-gray-500">Add your readings here</p>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => setType("sugar")}
          className={`${
            type == "sugar" ? "bg-gray-200" : "bg-gray-300"
          } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
        >
          Sugar
        </button>
        <button
          onClick={() => setType("pressure")}
          className={`${
            type == "pressure" ? "bg-gray-200" : "bg-gray-300"
          } px-2 py-1 rounded-lg max-sm:text-sm cursor-pointer`}
        >
          Pressure
        </button>
      </div>
      {type == "sugar" ? (
        <div>
          <h2 className="text-3xl font-semibold">Sugar Reading</h2>
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-5 w-full p-5 pb-8"
          >
            <label htmlFor="sugar" className="text-lg font-semibold">
              Sugar Reading (mg/dl)
              <br />
              <input
                className="w-1/2 max-sm:w-full mt-1 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="Text"
                id="sugar"
                placeholder="Enter Suger level"
                onChange={(e) => setReading(e.target.value)}
                value={reading}
                required
              />
            </label>
            <label htmlFor="date" className="text-lg font-semibold">
              Date
              <br />
              <input
                className="appearance-none max-sm:w-full mt-1 w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="date"
                id="date"
                placeholder="Select date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
            </label>
            <label htmlFor="time" className="text-lg font-semibold">
              Time
              <br />
              <input
                className="outline-none max-sm:w-full mt-1 w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="time"
                id="time"
                placeholder="Select Time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                required
              />
            </label>
            <button
              className="bg-blue-500 text-white h-[50px] w-[200px] rounded-3xl cursor-pointer text-center"
              type="Submit"
            >
              Add Sugar Reading
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold">Pressure Reading</h2>
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-5 w-full p-5"
          >
            <label htmlFor="pressure" className="text-lg font-semibold">
              Pressure Reading (mmHg)
              <br />
              <input
                className="w-1/2 max-sm:w-full mt-1 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="text"
                id="pressure"
                placeholder="Enter Pressure level"
                onChange={(e) => setReading(e.target.value)}
                value={reading}
                required
              />
            </label>
            <label htmlFor="date" className="text-lg font-semibold">
              Date
              <br />
              <input
                className="appearance-none max-sm:w-full mt-1 w-1/2 h-[50px] outline-none border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="date"
                id="date"
                placeholder="Select date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
            </label>
            <label htmlFor="time" className="text-lg font-semibold">
              Time
              <br />
              <input
                className="outline-none max-sm:w-full mt-1 w-1/2 h-[50px] border border-gray-100 rounded-xl bg-gray-100 text-sm p-5"
                type="time"
                id="time"
                placeholder="Select Time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                required
              />
            </label>
            <button
              className="bg-blue-500 text-white h-[50px] w-[200px] rounded-3xl cursor-pointer text-center"
              type="Submit"
            >
              Add Pressure Reading
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainAddReading;
