
import axios from 'axios'
import { toast } from 'react-toastify';


const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const updateAvailability = async (docId, adminToken) => {
    try {
        const res = await axios.post(`${backUrl}/api/admin/change-availability`, {docId}, {
            headers: {
            Authorization: `Bearer ${adminToken}`
          }
        })

        if (res.data) {
            toast.success(res.data.message)
        }
    } catch (err) {
        toast.error(err.message)
    }
} 

export { updateAvailability }