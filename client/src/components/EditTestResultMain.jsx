import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditTestResultMain = () => {
  const { view, userToken, backendUrl } = useContext(AppContext);

  const [testResult, setTestResult] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileDescription, setFileDescription] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate()

  const{id} = useParams();

  const fetchTestResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/testResults/getTestResult/${id}`,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false);
         setFileName(data.testResult.fileName)
         setFileDescription(data.testResult.fileDescription)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("fileDescription", fileDescription);
      formData.append("testResult", testResult);

      const { data } = await axios.post(
        backendUrl + `/api/testResults/editTestResult/${id}`,
        formData,
        { headers: { token: userToken } }
      );
      if (data.success) {
        setLoading(false)
         toast.success(data.message);
         navigate('/testResults')
        setFileName("");
        setFileDescription("");
        setTestResult("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchTestResults();
  }, []);

  return !loading? (
    <div
      className={`min-h-screen w-4/5 ${
        view ? "max-md:relative max-md:w-full" : "w-full"
      } px-10 py-10 flex flex-col gap-5`}
    >
      <h1 className="text-6xl font-semibold">Test Results</h1>
      <p className="text-gray-500">Edit your test result</p>
      <div className="lg:w-3/4">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-5"
          action=""
        >
          <div className="flex w-full gap-3">
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Name:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter file name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </label>
            <label className="w-1/2" htmlFor="">
              <span className="text-lg font-medium">File Description:</span>
              <br />
              <input
                className="w-full pl-1 h-8 bg-gray-100 border border-gray-500 rounded mt-1"
                placeholder="Enter test details"
                type="text"
                onChange={(e) => setFileDescription(e.target.value)}
                value={fileDescription}
              />
            </label>
          </div>
          <div className="w-full h-80 border border-dashed border-gray-500 flex flex-col items-center justify-center gap-1">
            <h3 className="text-center text-lg font-medium">
              Drag and Drop or browse to upload
            </h3>
            <p className="text-center mt-2">Accepted file types: PDF, Docs</p>
            <label
              className="text-center cursor-pointer bg-[#814de5] font-semibold text-white p-2 h-9 pt-1 mt-2 rounded-md font-semibold"
              htmlFor="file"
            >
              Browse Files
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".pdf, .doc, .docx"
                onChange={(e) => setTestResult(e.target.files[0])}
              />
            </label>
              <p>{testResult? testResult.name:fileName+'.pdf'}</p>
          </div>
          <input
            className="w-full bg-[#814de5] font-semibold text-white h-8 cursor-pointer "
            type="submit"
            value="Save Changes"
          />
        </form>
      </div>
    </div>
  ):<Loading/>;
};

export default EditTestResultMain;
