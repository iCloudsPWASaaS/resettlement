"use client";

import { useSession } from "next-auth/react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faBriefcase,
  faEdit,
  faSave,
  faTimes,
  faCamera
} from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    bio: "",
    role: ""
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize profile data from session or user context
    if (session?.user || user) {
      setProfileData({
        name: session?.user?.name || user?.name || "",
        email: session?.user?.email || user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        dateOfBirth: user?.dateOfBirth || "",
        occupation: user?.occupation || "",
        bio: user?.bio || "",
        role: session?.user?.role || user?.role || "USER"
      });
    }
  }, [session, user]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (profileData.phone && !/^\+?[\d\s\-\(\)]+$/.test(profileData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: Implement API call to update user profile
      console.log("Saving profile data:", profileData);
      if (selectedFile) {
        console.log("Uploading profile picture:", selectedFile);
        // TODO: Implement file upload to server
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      // Here you would typically make an API call to update the user's profile
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: session?.user?.name || user?.name || "",
      email: session?.user?.email || user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      dateOfBirth: user?.dateOfBirth || "",
      occupation: user?.occupation || "",
      bio: user?.bio || "",
      role: session?.user?.role || user?.role || "USER"
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                  <span>{isLoading ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="px-6 py-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profileData.name.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="profile-picture-input"
                  />
                  <label
                    htmlFor="profile-picture-input"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
                  </label>
                </>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name || "User"}</h2>
              <p className="text-gray-600">{profileData.role}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-gray-400" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.name || "Not provided"}</p>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-gray-400" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.email || "Not provided"}</p>
              )}
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-gray-400" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.phone || "Not provided"}</p>
              )}
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 mr-2 text-gray-400" />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.dateOfBirth || "Not provided"}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-gray-400" />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.address || "Not provided"}</p>
              )}
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 mr-2 text-gray-400" />
                Occupation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.occupation || "Not provided"}</p>
              )}
            </div>

            {/* Role (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">{profileData.role}</p>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.bio || "No bio provided"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}