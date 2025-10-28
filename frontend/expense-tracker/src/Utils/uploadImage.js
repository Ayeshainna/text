import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  if (!imageFile) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("image", imageFile); // must match backend key!

  const response = await axiosInstance.post(
    API_PATHS.IMAGE.UPLOAD_IMAGE,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

export default uploadImage;
