import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import appointment from "../assets/doctor-appointment.png";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import { toast } from "react-toastify";
import Loading from "./Loading";

const HomeMain = () => {
  const { view, userData, setUserData, fetchUserData, userToken, backendUrl } =
    useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorName, setDoctorName ] = useState(null)
  const [doctorSpeciality, setDoctorSpeciality ] = useState(null)
  const [doctorNumber, setDoctorNumber ] = useState(null)

  const [detailEdit, setDetailEdit] = useState(false);

  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/appointments/getAppointments",
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/doctors/getDoctor", {
        headers: { token: userToken },
      });
      if (data.success) {
        setLoading(false);
        setDoctors(data.doctor);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const doctorSubmitHandler = async(e) => {
    setLoading(true);
    e.preventDefault()
    try {
      const {data} = await axios.post(backendUrl + '/api/doctors/addDoctor', {name:doctorName, speciality:doctorSpeciality, number:doctorNumber}, {headers:{token:userToken}})
      if(data.success) {
        setLoading(false);
        toast.success(data.message);
        fetchDoctors();
        setDoctorName('')
        setDoctorSpeciality('')
        setDoctorNumber('')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const detailOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/users/editDetails",
        { name, age, gender },
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
        fetchUserData();
        setDetailEdit(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteDoctor = async(id) => {
    setLoading(true);
    try {
      const {data} = await axios.get( backendUrl + `/api/doctors/deleteDoctor/${id}`,
        { headers: { token: userToken }})
        if(data.success) {
          setLoading(false);
          toast.success(data.message)
          fetchDoctors()
        }
        else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  return !loading? (
    <div className={`min-h-screen w-4/5 ${view ? "max-md:relative max-md:w-full" : "w-full"} px-8 py-10`}>
      <h1 className="text-5xl font-bold md:text-5xl md:font-bold">
        My Health Record
      </h1>
      <div className="py-5">
        <div className="flex flex-col py-6 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Patient Information</h3>
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => setDetailEdit(!detailEdit)}
              src={editIcon}
              alt=""
            />
          </div>
          {!detailEdit ? (
            <>
              <div className="flex gap-3 pt-2">
                <h5 className="font-semibold text-lg">Name:</h5>
                <span className="">{userData.name}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <h5 className="font-semibold text-lg">Age:</h5>
                <span>{userData.age}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <h5 className="font-semibold text-lg">Gender:</h5>
                <span>{userData.gender}</span>
              </div>
            </>
          ) : (
            <>
              <form
                onSubmit={(e) => detailOnSubmit(e)}
                className="flex flex-col"
                action=""
              >
                <label className="flex gap-3 pt-3" htmlFor="">
                  <span className="font-semibold text-lg">Name:</span>
                  <input
                    className="border-b focus:outline-none"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    required
                  />
                </label>
                <label className="flex gap-3 pt-2" htmlFor="">
                  <span className="font-semibold text-lg">Age:</span>
                  <input
                    className="border-b focus:outline-none"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    min="1"
                    required
                  />
                </label>
                <label className="flex gap-3 pt-3" htmlFor="">
                  <span className="font-semibold text-lg">Gender:</span>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    className="border rounded mt-1"
                    required
                  >
                    <option value="" hidden>
                      Select Gender
                    </option>
                    <option
                      selected={gender == "male" ? true : false}
                      value="male"
                    >
                      Male
                    </option>
                    <option
                      selected={gender == "female" ? true : false}
                      value="female"
                    >
                      Female
                    </option>
                    <option
                      selected={gender == "others" ? true : false}
                      value="others"
                    >
                      Others
                    </option>
                  </select>
                </label>
                <div className="w-full flex justify-end">
                  <input
                    className="bg-[#814de5] text-white font-semibold w-13 py-1 rounded-lg cursor-pointer"
                    type="submit"
                    value="Save"
                  />
                </div>
              </form>
            </>
          )}
        </div>
        <div className="border-b border-gray-300 py-6">
          <h3 className="text-2xl font-bold">Doctors</h3>
          {doctors.length > 0 ? (
            <table className="mt-2">
              <thead>
                <tr>
                  <th className="text-start py-1 pr-10">Name</th>
                  <th className="text-start py-1 pr-10">Specialist</th>
                  <th className="text-start py-1 pr-10">Number</th>
                  <th className="text-start py-1 pr-10">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((a, index) => (
                  <tr key={index}>
                    <td className="text-start py-2 pr-10">{a.name}</td>
                    <td className="text-start py-2 pr-10">{a.speciality}</td>
                    <td className="text-start py-2 pr-10">{a.number}</td>
                    <td className="text-start py-2 pr-10"><button onClick={()=>deleteDoctor(a._id)} className="cursor-pointer bg-red-300 px-2 py-1 rounded-lg">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl text-gray-400 text-center">
              No doctor record
            </p>
          )}
          <form onSubmit={(e)=>doctorSubmitHandler(e)} className="flex gap-6 mt-5 items-center" action="">
            <label htmlFor="">
              <input className="border-b w-20 focus:outline-none" required value={doctorName} onChange={(e)=>setDoctorName(e.target.value)} type="text" placeholder="Name" />
            </label>
            <label htmlFor="">
              <input className="border-b w-25 focus:outline-none" required value={doctorSpeciality} onChange={(e)=>setDoctorSpeciality(e.target.value)} type="text" placeholder="Speciality" />
            </label>
            <label htmlFor="">
              <input className="border-b w-26 focus:outline-none" value={doctorNumber} onChange={(e)=>setDoctorNumber(e.target.value)} type="number" placeholder="Number" />
            </label>
            <input type="submit" value="Add" className="bg-[#814de5] text-white font-semibold w-27 py-1 rounded-lg cursor-pointer" />
          </form>
        </div>
        <div className="py-5">
          <h3 className="text-2xl font-bold">Upcoming Appointments</h3>
          {appointments.filter((a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0)).length>0?appointments
            .filter((a) => new Date(a.date) >= new Date().setHours(0, 0, 0, 0))
            .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
            .map((a, index) => (
              <div
                key={index}
                className={`flex items-center gap-5 p-2 mt-3 h-full md:w-2/4 lg:w-1/4 cursor-pointer text-white bg-[#ba9df1] rounded-xl`}
                onClick={() => navigate("/appointment")}
              >
                <div className=" w-15 h-full p-3 flex rounded-xl items-center justify-center">
                  <img className="h-8" src={appointment} alt="" />
                </div>
                <div>
                  <p className="font-bold">
                    {moment(a.date).format("DD-MM-YYYY")}, {a.time}
                  </p>
                  <p className="text-white text-sm font-semibold ">
                    {a.doctorName}, {a.purpose}
                  </p>
                </div>
              </div>
            )):<p className="text-xl text-gray-400 pt-5 text-center">
              No Upcoming Appointments
            </p>}
        </div>
      </div>
    </div>
  ):<Loading/>;
};

export default HomeMain;
