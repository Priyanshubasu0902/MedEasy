import React, { useContext, useState } from "react";
import home from "../assets/home.png";
import appointment from "../assets/doctor-appointment.png";
import injection from "../assets/injection.png";
import report from "../assets/medical-result.png";
import prescription from "../assets/prescription.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import person_icon from "../assets/person_icon.svg";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = ({ section }) => {
  const navigate = useNavigate();

  const { view, userData, userToken, backendUrl, setUserToken, setUserData } =
    useContext(AppContext);

  const logout = () => {
    setUserToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };

  const deleteUser = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/deleteUser", {
        headers: { token: userToken },
      });
      if (data.success) {
        setUserToken(null);
        setUserData(null);
        localStorage.removeItem("token");
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={`text-white bg-[#814de5] ${
          view ? "md:w-2/5 max-md:absolute z-2 min-h-screen" : "max-lg:hidden"
        } lg:w-1/5`}
      >
        <div className={`flex flex-col gap-10 pt-8 p-5`}>
          <div className="flex px-3 py-2 gap-5 items-center">
            <img
              className="w-16 h-16 rounded-full border border-gray-300 object-contain"
              src={userData.image ? userData.image : person_icon}
              alt=""
            />
            <span className="font-medium text-2xl">{userData.name}</span>
          </div>
          <div className="w-full gap-6 px-3 flex">
            <button
              onClick={deleteUser}
              className="w-1/2 font-bold rounded-lg border-white border-3 hover:text-[#692be0] hover:bg-white px-1 py-1 cursor-pointer"
            >
              Delete Account
            </button>
            <button
              onClick={logout}
              className="w-1/2 font-bold rounded-lg border-white border-3 hover:text-[#692be0] hover:bg-white px-1 py-1 cursor-pointer"
            >
              Logout
            </button>
          </div>
          <ul className="flex flex-col gap-5">
            <li
              onClick={() => navigate("/home")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "home" ? "bg-[#9d75eb]" : ""
              }  items-center w-full cursor-pointer hover:bg-[#692be0]`}
            >
              <img className="w-8" src={home} alt="" />
              <span className="text-xl font-medium">Home</span>
            </li>
            <li
              onClick={() => navigate("/appointment")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "appointment" ? "bg-[#9d75eb] " : ""
              }  items-center w-full cursor-pointer hover:bg-[#692be0]`}
            >
              <img className="w-8" src={appointment} alt="" />
              <span className="text-xl font-medium">Appointments</span>
            </li>
            <li
              onClick={() => navigate("/readings")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "readings" ? "bg-[#9d75eb]" : ""
              }  items-center w-full cursor-pointer hover:bg-[#692be0]`}
            >
              <img className="w-8" src={injection} alt="" />
              <span className="text-xl font-medium">Readings</span>
            </li>
            <li
              onClick={() => navigate("/prescriptions")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "prescriptions" ? "bg-[#9d75eb]" : ""
              }  items-center w-full cursor-pointer hover:bg-[#692be0]`}
            >
              <img className="w-8" src={prescription} alt="" />
              <span className="text-xl font-medium">Prescriptions</span>
            </li>
            <li
              onClick={() => navigate("/testResults")}
              className={`flex block gap-4 px-5 py-2 rounded-xl ${
                section === "testresults" ? "bg-[#9d75eb]" : ""
              }  items-center w-full cursor-pointer hover:bg-[#692be0]`}
            >
              <img className="w-8" src={report} alt="" />
              <span className="text-xl font-medium">Test Results</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
