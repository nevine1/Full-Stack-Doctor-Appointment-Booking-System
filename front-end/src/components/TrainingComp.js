
"use client"
import { useEffect, useState } from 'react'

const TrainingComp = () => {
    const [docSlots, setDocSlot] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [docUnAvailable, setDocUnAvailable] = useState(false);
    const getAvailableSlots = async () => {
        const today = new Date();
        const allSlots= []
        for (let i = 0; i < 7; i++) {
            const slotDate = new Date(today);
            slotDate.getDate(today.getDate() + 1); 
            const currentDate = new Date(slotDate); //getting date of today date

            if (i === 0) {
                const now = new Date();
                const currentHours = now.getHours();

                if (currentHours < 10 || currentHours > 21) {
                    setDocUnAvailable(true)
                } else {
                    setDocUnAvailable(false);
                    allSlots.push(); 
                }
            }
        }
    }
    useEffect(() => {
        getAvailableSlots();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default TrainingComp
