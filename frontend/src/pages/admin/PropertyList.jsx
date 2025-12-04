import React, { useEffect, useState } from "react";
import { Trash2, Edit3, Plus, X, Eye, CheckCircle, XCircle } from "lucide-react";
import AddPropertyForm from "./AddPropertyForm.jsx";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    size_sqft: "",
    description: "",
    in_stock: true,
  });

  // Fetch all properties
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/account/login";
          return;
        }
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete property");

      const data = await res.json();
      alert(data.message);
      setProperties(properties.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  // Edit popup
  const handleEditClick = (p) => {
    setEditingProperty(p.id);
    setFormData({
      title: p.title,
      type: p.type,
      price: p.price,
      size_sqft: p.size_sqft,
      description: p.description,
      in_stock: p.in_stock,
    });
  };

  // Update property
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const body = new FormData();

    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/properties/${editingProperty}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body,
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      alert(data.message || "Property updated successfully");

      setProperties(
        properties.map((p) =>
          p.id === editingProperty ? { ...p, ...formData } : p
        )
      );

      setEditingProperty(null);
      fetchProperties(); // Refresh data
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property");
    }
  };

  // Pagination
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Properties</h2>
          <p className="text-gray-600 text-sm mt-1">
            {properties.length} properties found
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          <span className="font-medium">Add Property</span>
        </button>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {currentProperties.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{p.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteProperty(p.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{p.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">₹{parseInt(p.price).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Stock:</span>
                    {p.in_stock ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircle size={14} />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600">
                        <XCircle size={14} />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Property</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentProperties.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{p.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">ID: {p.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {p.type}
                  </span>
                </td>

                <td className="p-4 font-medium">
                  ₹{parseInt(p.price).toLocaleString()}
                </td>

                <td className="p-4">
                  {p.in_stock ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      <CheckCircle size={14} />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      <XCircle size={14} />
                      Out of Stock
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => deleteProperty(p.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {properties.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Property</h3>
                <button
                  onClick={() => setEditingProperty(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.size_sqft}
                    onChange={(e) =>
                      setFormData({ ...formData, size_sqft: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1200,1400,1600"
                  />
                </div>

                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setEditingProperty(null)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Form */}
      {showAddForm && (
        <AddPropertyForm
          onClose={() => setShowAddForm(false)}
          onAdded={(p) => {
            setProperties([...properties, p]);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default PropertiesList;