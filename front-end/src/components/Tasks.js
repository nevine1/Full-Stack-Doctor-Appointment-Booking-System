import { useState } from "react";

export default function TodoApp() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleAdd = () => {
        // هنا المفروض نضيف task للـ tasks
    };

    return (
        <div>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={handleAdd}>Add</button>

            <ul>
                {/* اعملي render للـ tasks هنا */}
            </ul>
        </div>
    );
}