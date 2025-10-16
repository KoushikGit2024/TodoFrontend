import React, { useContext, useState } from 'react'
import { DataContext } from '../contexts/DataContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { LoadingContext } from '../contexts/LoadingContext';

const Signup = () => {
  const { data } = useContext(DataContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const [togglePW, setToggle] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('/DefaultSignupImg.png');
  const [UserOk, setOk] = useState(false);

  async function checkUserName(e) {
    if(e.target.value===''){
      setOk(false);
      return;
    }
    try {
      const okState = await axios.get(`/api/baseroute/signup?search=${e.target.value.toLowerCase()}`, {
        // params: { search: e.target.value.toLowerCase() }
      });
      const res = okState.data;
      if (res.code === 100) {
        alert(res.msg);
        setOk(false);
      } else {
        setOk(true);
        setUserName(e.target.value.toLowerCase());
      }
    } catch (error) {
      console.error('UserName validation failed.....');
    }
  }

  function isNumeric(str) {
    if (str.length === 0) return false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch < '0' || ch > '9') return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag = true;
    if (fullName.length < 10 || fullName.length > 50) {
      alert("Full Name should be min of 10 and max 50");
      flag = false;
    }
    if (mobile.length !== 10 || !isNumeric(mobile)) {
      flag = false;
    }
    if (password.length < 10) {
      alert('Password should be minimum of 10 characters');
      flag = false;
    }
    if (flag && UserOk) {
      setLoading(true);
      try {
        const newUser = await axios.post('/api/baseroute/signup', {
          fullName,
          email,
          password,
          userName,
          mobile,
          profileImg: profile,
        });
        const res = (newUser.data);
        if (res.code === 1000) {
          alert(res.msg);
          navigate('/user/login');
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (Object.keys(data).length !== 0) navigate("/user");
    else navigate("/");
  };

  return (
    <div className="h-full w-full bg-[#ebe3d9] flex items-center justify-center py-12">
      <div className="w-full max-w-xl bg-[#ece3d9] shadow-2xl border-4 border-[#ebcb90] rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-[#3396D3] mb-6">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#e4e4e4] focus:bg-[#f5f1f1] outline-none caret-[#3396D3] h-12 px-3 text-[#3396D3] border-2 border-[#EBCB90] rounded-md"
            required
          />

          {/* Email & Mobile */}
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              autoComplete="new-email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-3 text-base bg-[#e4e4e4] focus:bg-[#f5f1f1] text-[#3396D3] border-2 border-[#EBCB90] rounded-md outline-none caret-[#3396D3]"              
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              onChange={(e) => setMobile(e.target.value)}
              className="w-full py-2.5 px-3 text-base bg-[#e4e4e4] focus:bg-[#f5f1f1] text-[#3396D3] border-2 border-[#EBCB90] rounded-md outline-none caret-[#3396D3]"
              required
            />
          </div>

          {/* Username & Password */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2 w-full flex items-center bg-[#e4e4e4] focus-within:bg-[#f5f1f1] h-12 border-2 border-[#EBCB90] rounded-md">
              <input
                type="text"
                placeholder="User Name"
                onChange={(e) => checkUserName(e)}
                autoComplete="userName"
                className="w-full py-2.5 px-3 outline-none text-[#3396D3] caret-[#3396D3]"
                required
              />
              <img
                src="/greenTick.png"
                alt="ok"
                style={{ visibility: UserOk ? 'visible' : 'hidden' }}
                className="h-6 w-6 m-2"
              />
            </div>

            <input
              type={togglePW ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="sm:w-1/2 w-full py-2.5 px-3 text-base bg-[#e4e4e4] focus:bg-[#f5f1f1] text-[#3396D3] border-2 border-[#EBCB90] rounded-md outline-none caret-[#3396D3]"
              required
            />
          </div>

          {/* Profile Image */}
          <input
            type="url"
            placeholder="Profile Image"
            onChange={(e) => {
              if (e.target.value === '') setProfile('/DefaultSignupImg.png')
              else setProfile(e.target.value)
            }}
            className="w-full bg-[#e4e4e4] focus:bg-[#f5f1f1] outline-none caret-[#3396D3] h-12 px-3 text-[#3396D3] border-2 border-[#EBCB90] rounded-md"
          />

          {/* Image Preview & Buttons */}
          <div className="flex items-center justify-between mt-4">
            <img
              src={profile}
              alt="profile preview"
              className="object-cover object-center h-24 w-24 border-2 border-dashed border-[#ebcb90] rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/DefaultSignupImg.png'
              }}
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-[#3396D3] text-white text-lg font-medium hover:bg-[#2679b5] transition"
              >
                Signup
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-md bg-[#f1f1eec5] border border-[#d4d4d4] text-[#333]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          Already registered?{" "}
          <Link
            to="/user/login"
            className="text-[#468ee7] hover:text-[#0a75f7] hover:underline underline-offset-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
