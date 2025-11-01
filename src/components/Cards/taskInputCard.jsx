import { useState } from 'react'
import SaveButton from '../Buttons/SaveButton'

function TaskInputCard({ onSave, onCancel, initialData = null }) {
    const [taskData, setTaskData] = useState(initialData || {
        title: '',
        description: '',
        status: 'notStarted',
        dueDate: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taskData.title.trim()) {
            onSave(taskData)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setTaskData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="taskCard">
            <div className="taskName">
                <i className="fas fa-tasks"></i>
                <h1>{initialData ? 'Edit Task' : 'New Task'}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h4>Task Title</h4>
                <div className="taskDescription">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        className="taskInput"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <h4>Task Description</h4>
                <div className="taskDescription">
                    <textarea
                        name="description"
                        placeholder="Enter task description"
                        className="descriptionInput"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                </div>

                <h4>Due Date</h4>
                <div className="dueDate">
                    <input
                        type="date"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="Status">
                    <label className="StatusName">Status:</label>
                    <div className="statusSelect">
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="notStarted"
                                checked={taskData.status === 'notStarted'}
                                onChange={handleChange}
                            />
                            Not Started
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="inProgress"
                                checked={taskData.status === 'inProgress'}
                                onChange={handleChange}
                            />
                            In Progress
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="completed"
                                checked={taskData.status === 'completed'}
                                onChange={handleChange}
                            />
                            Completed
                        </label>
                    </div>
                </div>

                <div className="taskButton">
                    <SaveButton />
                    <button
                        type="button"
                        className="cancelButton"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskInputCard