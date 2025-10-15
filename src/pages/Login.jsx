import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../contexts/LoadingContext";
const Login = () => {
  const { data, setData } = useContext(DataContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const [authParam, setAuthParam] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/baseroute/login", { authParam, password });
      setData(res.data.data);
      setMessage({ text: res.data.msg, type: "success" });
      navigate("/user");
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || "Login failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (Object.keys(data).length !== 0) navigate("/user");
    else navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="h-full w-full bg-[#ebe3d9] flex items-center justify-center py-12">
      {/* <Drag/> */}
      <div className="w-full max-w-md bg-[#ece3d9] shadow-2xl border-4 border-[#EBCB90] rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-[#3396D3] mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username / Email */}
          <input
            type="text"
            value={authParam}
            onChange={(e) => {
              setMessage({ text: "", type: "" });
              setAuthParam(e.target.value);
            }}
            placeholder="Username or Email"
            autoComplete="username"
            className="w-full h-12 px-3 text-[#3396D3] bg-[#e4e4e4] focus:bg-[#f5f1f1] border-2 border-[#EBCB90] rounded-md outline-none caret-[#3396D3]"
            required
          />

          {/* Password */}
          <div className="flex items-center bg-[#e4e4e4] focus-within:bg-[#f5f1f1] h-12 border-2 border-[#EBCB90] rounded-md">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setMessage({ text: "", type: "" });
                setPassword(e.target.value);
              }}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-3 outline-none text-[#3396D3] caret-[#3396D3]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((prev) => !prev)}
              className="h-6 w-6 mr-3 text-[#3396D3]"
            >
              {showPw ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                    <circle cx="128" cy="140" r="20" stroke="#000" strokeWidth="16" fill="none" />
                    <line x1="128" y1="160" x2="128" y2="184" stroke="#000" strokeWidth="16" />
                    <rect x="40" y="88" width="176" height="128" rx="8" stroke="#000" strokeWidth="16" fill="none" />
                    <path d="M92,88V52a36,36,0,0,1,72,0" stroke="#000" strokeWidth="16" fill="none" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 1262 1710.258">
                    <path d="M1196.495,713.258H1090V459.592c0-253.285-205.802-459.35-459.001-459.35C377.799,0.242,172,206.442,172,459.892v253.366H66.686C30.195,713.258,0,742.241,0,778.731v766.42c0,91.079,74.712,165.106,165.792,165.106h931.597c91.08,0,164.611-74.027,164.611-165.106v-766.42C1262,742.241,1232.985,713.258,1196.495,713.258zM304,459.892c0-180.588,146.664-327.508,326.999-327.508C811.335,132.384,958,279.168,958,459.592v253.666H304V459.892zM1130,1545.151c0,18.218-14.395,33.106-32.611,33.106H165.792c-18.216,0-33.792-14.889-33.792-33.106V845.258h998V1545.151z"/>
                    <path d="M631,1409.707c36.491,0,66-29.58,66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07c-36.49,0-66,29.58-66,66.07v237.854C565,1380.127,594.509,1409.707,631,1409.707z"/>
                  </svg>
                )}
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`w-full text-center py-2 rounded-md text-white font-medium transition-all duration-500 ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#3396D3] text-white text-lg font-medium hover:bg-[#2679b5] transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-md bg-[#f1f1eec5] border border-[#d4d4d4] text-[#333]"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          Not registered yet?{" "}
          <Link
            to="/user/signup"
            className="text-[#468ee7] hover:text-[#0a75f7] hover:underline underline-offset-2"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

