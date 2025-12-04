export const fetchProperties = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/properties");
    const data = await res.json();
    return data.properties || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};
