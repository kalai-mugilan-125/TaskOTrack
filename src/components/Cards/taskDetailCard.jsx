import EditButton from '../Buttons/EditButton'

function TaskDetailCard({ task, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    const getStatusLabel = (status) => {
        const statusMap = {
            'notStarted': 'Not Started',
            'inProgress': 'In Progress',
            'completed': 'Completed'
        }
        return statusMap[status] || status
    }

    const getStatusColor = (status) => {
        const colorMap = {
            'notStarted': '#ff9800',
            'inProgress': '#2196f3',
            'completed': '#4caf50'
        }
        return colorMap[status] || '#666'
    }

    return (
        <div className="taskDetailCard">
            <h2 className="task-title">{task.title}</h2>
            <hr className="hrline"/>
            <div className="taskInfo">
                <p>
                    <strong>Description:</strong>{' '}
                    <span className="task-description">
                        {task.description || 'No description provided'}
                    </span>
                </p>
                <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
                <p>
                    <strong>Status:</strong>{' '}
                    <span style={{ 
                        color: getStatusColor(task.status),
                        fontWeight: 'bold'
                    }}>
                        {getStatusLabel(task.status)}
                    </span>
                </p>
            </div>
            <div className="editButtonContainer">
                <EditButton onClick={onEdit} />
                {onDelete && (
                    <button
                        type="button"
                        className="deleteButton"
                        onClick={onDelete}
                        style={{
                            backgroundColor: '#f44336',
                            marginLeft: '10px'
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}

export default TaskDetailCard