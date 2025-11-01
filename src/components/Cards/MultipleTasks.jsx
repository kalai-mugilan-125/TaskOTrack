import TaskDetailCard from './taskDetailCard'

function TasksContainer({ tasks, onEditTask, onDeleteTask }) {
    return (
        <div className="multiTasks">
            {tasks.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    width: '100%', 
                    padding: '50px',
                    color: '#666' 
                }}>
                    <h2>No tasks yet</h2>
                    <p>Click the + button to create your first task</p>
                </div>
            ) : (
                tasks.map(task => (
                    <TaskDetailCard
                        key={task.id}
                        task={task}
                        onEdit={() => onEditTask(task.id)}
                        onDelete={() => onDeleteTask(task.id)}
                    />
                ))
            )}
        </div>
    )
}

export default TasksContainer