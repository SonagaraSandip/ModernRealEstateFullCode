import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const AddPropertyForm = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    size_sqft: "",
    description: "",
    in_stock: true,
  });

  const [preview, setPreview] = useState({
    main_image: null,
    image_1200: null,
    image_1400: null,
    image_1600: null,
  });

  const [files, setFiles] = useState({
    main_image: null,
    image_1200: null,
    image_1400: null,
    image_1600: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // FILE HANDLER
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setFiles({ ...files, [name]: file });

    if (file) {
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
      setErrors({ ...errors, [name]: null });
    }
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";
    if (!formData.size_sqft.trim()) newErrors.size_sqft = "Sizes are required";
    if (!files.main_image) newErrors.main_image = "Main image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const body = new FormData();

    // append all form fields
    Object.keys(formData).forEach((key) => body.append(key, formData[key]));

    // append files
    Object.keys(files).forEach((key) => {
      if (files[key]) body.append(key, files[key]);
    });

    try {
      const res = await fetch(
        "http://localhost:5000/api/properties/addProperty",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add property");
      }

      alert("Property added successfully!");
      onAdded(data.property);
      onClose();
    } catch (err) {
      console.error("Error adding property:", err);
      alert(err.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Property
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Fill in the property details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-80px)]"
        >
          <div className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter property title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setErrors({ ...errors, title: null });
                    }}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      setFormData({ ...formData, type: e.target.value });
                      setErrors({ ...errors, type: null });
                    }}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Type</option>
                    <option value="villa">Villa</option>
                    <option value="bunglow">Bungalow</option>
                    <option value="royalhouse">Royal House</option>
                    <option value="apartment">Apartment</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      setErrors({ ...errors, price: null });
                    }}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes (sq ft) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1200,1400,1600"
                    value={formData.size_sqft}
                    onChange={(e) => {
                      setFormData({ ...formData, size_sqft: e.target.value });
                      setErrors({ ...errors, size_sqft: null });
                    }}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.size_sqft ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.size_sqft && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.size_sqft}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter property description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Status
                </label>
                <select
                  value={formData.in_stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      in_stock: e.target.value === "true",
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Image Uploads */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Property Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center ${
                      errors.main_image
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "main_image")}
                      className="hidden"
                      id="main_image"
                    />
                    <label htmlFor="main_image" className="cursor-pointer">
                      {preview.main_image ? (
                        <div className="relative">
                          <img
                            src={preview.main_image}
                            alt="Main preview"
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full">
                            <Upload size={16} />
                          </div>
                        </div>
                      ) : (
                        <>
                          <ImageIcon
                            className="mx-auto text-gray-400 mb-3"
                            size={48}
                          />
                          <p className="text-gray-600">
                            Click to upload main image
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            Required • Max 5MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.main_image && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.main_image}
                    </p>
                  )}
                </div>

                {/* Additional Images */}
                {["image_1200", "image_1400", "image_1600"].map(
                  (field, index) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {index === 0
                          ? "First Image"
                          : index === 1
                          ? "Second Image"
                          : "Third Image"}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, field)}
                          className="hidden"
                          id={field}
                        />
                        <label htmlFor={field} className="cursor-pointer">
                          {preview[field] ? (
                            <div className="relative">
                              <img
                                src={preview[field]}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg mb-2"
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full">
                                <Upload size={16} />
                              </div>
                            </div>
                          ) : (
                            <>
                              <ImageIcon
                                className="mx-auto text-gray-400 mb-2"
                                size={32}
                              />
                              <p className="text-gray-600 text-sm">
                                Click to upload
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                Optional • Max 5MB
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Add Property
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
