import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { motion } from "framer-motion";

const ProfileManager = () => {
  const { data, setData } = useContext(DataContext);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    userName: "",
    profileImg: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (data) {
      setProfile({
        fullName: data.fullName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        userName: data.userName || "",
        profileImg: data.profileImg || "",
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await axios.patch(
        "/api/user/profile",
        {updateBlock:{ ...profile }},
        { withCredentials: true }
      );

      if (res.data.updated) {
        setData(res.data.user);
        setMessage({ text: "Profile updated successfully!", type: "success" });
      } else {
        setMessage({ text: "No changes detected.", type: "error" });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || "Failed to update profile",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#ece3d9] to-[#f7f7f7] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-[#004f58] text-center mb-4">
          Profile Manager
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2 w-full">
          <img
            src={profile.profileImg || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <input
            type="text"
            value={profile.profileImg}
            onChange={(e) => handleChange("profileImg", e.target.value)}
            placeholder="Full Name"
            className="p-2 border-2 border-[#EBCB90] rounded-md outline-none w-full"
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Full Name"
            className="p-2 border-2 border-[#EBCB90] rounded-md outline-none"
          />
          <input
            type="text"
            value={profile.userName}
            onChange={(e) => handleChange("userName", e.target.value.toLowerCase())}
            placeholder="Username"
            className="p-2 border-2 border-[#EBCB90] rounded-md outline-none"
          />
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
            placeholder="Email"
            className="p-2 border-2 border-[#EBCB90] rounded-md outline-none"
          />
          <input
            type="text"
            value={profile.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            placeholder="Mobile"
            className="p-2 border-2 border-[#EBCB90] rounded-md outline-none"
          />

          {message.text && (
            <div
              className={`p-2 text-center rounded-md font-medium text-white ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-[#2eeaff] text-[#004f58] font-semibold rounded-xl hover:bg-[#22bfd0] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileManager;
