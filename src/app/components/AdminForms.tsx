"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "../context/AuthContext";

interface Website {
  id: string;
  address?: string;
  email?: string;
  telephone?: string;
  description?: string;
}

interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  active: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  altText?: string;
  order: number;
  active: boolean;
}

export default function AdminForms() {
  const { data: session } = useSession();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("website");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Website form state
  const [websiteData, setWebsiteData] = useState<Website>({
    id: "",
    address: "",
    email: "",
    telephone: "",
    description: "",
  });

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
    active: true,
  });
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    description: "",
    altText: "",
    active: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check if user is admin
  const isAdmin = (session?.user?.role === "ADMIN" || user?.role === "ADMIN");

  useEffect(() => {
    if (isAdmin) {
      fetchWebsiteData();
      fetchServices();
      fetchGallery();
    }
  }, [isAdmin]);

  const fetchWebsiteData = async () => {
    try {
      const response = await fetch("/api/website");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setWebsiteData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching website data:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(websiteData),
      });

      if (response.ok) {
        const data = await response.json();
        setWebsiteData(data);
        setMessage("Website information updated successfully!");
      } else {
        setMessage("Error updating website information");
      }
    } catch (error) {
      setMessage("Error updating website information");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newService,
          websiteId: websiteData.id || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setServices([...services, data]);
        setNewService({ title: "", description: "", icon: "", active: true });
        setMessage("Service added successfully!");
      } else {
        setMessage("Error adding service");
      }
    } catch (error) {
      setMessage("Error adding service");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceUpdate = async (service: Service) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...service,
          websiteId: websiteData.id || null,
        }),
      });

      if (response.ok) {
        const updatedService = await response.json();
        setServices(services.map(s => s.id === service.id ? updatedService : s));
        setEditingService(null);
        setMessage("Service updated successfully!");
      } else {
        setMessage("Error updating service");
      }
    } catch (error) {
      setMessage("Error updating service");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setServices(services.filter(s => s.id !== serviceId));
        setMessage("Service deleted successfully!");
      } else {
        setMessage("Error deleting service");
      }
    } catch (error) {
      setMessage("Error deleting service");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        setMessage("Error uploading image");
        return null;
      }
    } catch (error) {
      setMessage("Error uploading image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fileInput = document.getElementById("gallery-image") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (!file) {
      setMessage("Please select an image");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const imageUrl = await handleImageUpload(file);
      if (!imageUrl) return;

      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newGalleryItem,
          imageUrl,
          order: gallery.length + 1,
          websiteId: websiteData.id || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGallery([...gallery, data]);
        setNewGalleryItem({ title: "", description: "", altText: "", active: true });
        fileInput.value = "";
        setMessage("Gallery item added successfully!");
      } else {
        setMessage("Error adding gallery item");
      }
    } catch (error) {
      setMessage("Error adding gallery item");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/gallery/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGallery(gallery.filter(item => item.id !== itemId));
        setMessage("Gallery item deleted successfully!");
      } else {
        setMessage("Error deleting gallery item");
      }
    } catch (error) {
      setMessage("Error deleting gallery item");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("website")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "website"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Website Information
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "services"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "gallery"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Gallery
          </button>
        </nav>
      </div>

      {/* Website Information Tab */}
      {activeTab === "website" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Information</h3>
          <form onSubmit={handleWebsiteSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                   value={websiteData.address || ""}
                   onChange={(e) => setWebsiteData({ ...websiteData, address: e.target.value })}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                   rows={3}
                   placeholder="Enter business address"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                   type="email"
                   value={websiteData.email || ""}
                   onChange={(e) => setWebsiteData({ ...websiteData, email: e.target.value })}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                   placeholder="contact@example.com"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone
                </label>
                <input
                   type="tel"
                   value={websiteData.telephone || ""}
                   onChange={(e) => setWebsiteData({ ...websiteData, telephone: e.target.value })}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                   placeholder="+1 (555) 123-4567"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                   value={websiteData.description || ""}
                   onChange={(e) => setWebsiteData({ ...websiteData, description: e.target.value })}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                   rows={3}
                   placeholder="Brief description of your services"
                 />
              </div>
            </div>
            <button
               type="submit"
               disabled={loading}
               className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
             >
              {loading ? "Saving..." : "Save Website Information"}
            </button>
          </form>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Management</h3>
          
          {/* Add New Service Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Add New Service</h4>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Service name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="🏠"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newService.active}
                      onChange={(e) => setNewService({ ...newService, active: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                  placeholder="Service description"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Service"}
              </button>
            </form>
          </div>

          {/* Existing Services */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Existing Services</h4>
            {services.length === 0 ? (
              <p className="text-gray-500">No services added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    {editingService?.id === service.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <input
                          type="text"
                          value={editingService.icon || ""}
                          onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Icon (emoji)"
                        />
                        <textarea
                          value={editingService.description || ""}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          rows={2}
                        />
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingService.active}
                            onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                        <div className="flex space-x-2">
                          <button
                   onClick={() => handleServiceUpdate(editingService)}
                   className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700"
                 >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingService(null)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {service.icon && <span className="text-xl">{service.icon}</span>}
                            <h5 className="font-medium text-gray-900">{service.title}</h5>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {service.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        {service.description && (
                          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        )}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingService(service)}
                            className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleServiceDelete(service.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Management</h3>
          
          {/* Add New Gallery Item Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Add New Gallery Item</h4>
            <form onSubmit={handleGallerySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newGalleryItem.title}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Image title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={newGalleryItem.altText}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, altText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Alt text for accessibility"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newGalleryItem.description}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={2}
                  placeholder="Image description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  id="gallery-image"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newGalleryItem.active}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, active: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || uploadingImage ? "Uploading..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>

          {/* Existing Gallery Items */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Gallery Items</h4>
            {gallery.length === 0 ? (
              <p className="text-gray-500">No gallery items added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{item.title}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      )}
                      <button
                        onClick={() => handleGalleryDelete(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}