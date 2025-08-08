import axios from "axios";
import { toast } from "react-toastify";

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateAvailability = async (docId, adminToken) => {
  if (!adminToken) {
    toast.error("Admin token missing");
    return false;
  }

  try {
      const res = await axios.post(`${backUrl}/api/admin/change-availability`,
          { docId }, 
        {
            headers: {
            Authorization: `Bearer ${adminToken}`,
            },
        }
        );

    toast.success(res.data.message);
      return true; 
      
  } catch (err) {
      toast.error(err.response?.data?.message || err.message); 
      return false;
      
  }
};
