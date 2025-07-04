// const API_URL = "http://localhost:8080";
const API_URL = "https://building-planner-lv9c.onrender.com";

export const saveShape = async (shape) => {
  await fetch(`${API_URL}/api/shapes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shape),
  });
};

export const getAllShapes = async () => {
  try {
    const res = await fetch(`${API_URL}/api/shapes`);
    if (!res.ok) throw new Error("Failed to fetch shapes");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching shapes:", err.message);
  }
};

export const updateShapeAPI = async (id, updatedData) => {
  await fetch(`${API_URL}/api/shapes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};
export const deleteShape = async (id) => {
  await fetch(`${API_URL}/api/shapes/${id}`, {
    method: "DELETE",
  });
};

export const deleteAllShapes = async () => {
  try {
    await fetch(`${API_URL}/api/shapes`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete all shapes:", error);
    return null;
  }
};
