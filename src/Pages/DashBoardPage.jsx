import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthProvider'
import HeaderUser from '../components/Header/HeaderUser'
import MenuCard from '../components/Cards/MenuCard'
import Footer from '../components/Footer/Footer'
import PlusButton from '../components/Buttons/PlusButton'
import TasksContainer from '../components/Cards/MultipleTasks'
import TaskInputCard from '../components/Cards/taskInputCard'
import Loading from '../components/Loading/Loading'

function DashBoardPage() {
    const { token } = useAuth()
    const [activeSection, setActiveSection] = useState('tasks')
    const [tasks, setTasks] = useState([])
    const [editingTask, setEditingTask] = useState(null)
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const API_URL = 'http://localhost:4000/api'

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setTasks(data)
            } else {
                setError('Failed to load tasks')
            }
        } catch {
            setError('Server error. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const handleAddTask = async (taskData) => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    status: taskData.status,
                    dueDate: taskData.dueDate
                })
            })

            if (response.ok) {
                const data = await response.json()
                setTasks(prevTasks => [data.task, ...prevTasks])
            } else {
                setError('Failed to create task')
            }
        } catch {
            setError('Server error. Please try again.')
        }
    }

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId)
        if (taskToEdit) {
            setEditingTask({
                ...taskToEdit,
                dueDate: taskToEdit.due_date || ''
            })
            setIsEditOverlayVisible(true)
        }
    }

    const handleUpdateTask = async (updatedTaskData) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${editingTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: updatedTaskData.title,
                    description: updatedTaskData.description,
                    status: updatedTaskData.status,
                    dueDate: updatedTaskData.dueDate
                })
            })

            if (response.ok) {
                const data = await response.json()
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === editingTask.id
                            ? { ...task, ...data.task, due_date: data.task.due_date }
                            : task
                    )
                )
                setIsEditOverlayVisible(false)
                setEditingTask(null)
            } else {
                setError('Failed to update task')
            }
        } catch {
            setError('Server error. Please try again.')
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
                } else {
                    setError('Failed to delete task')
                }
            } catch {
                setError('Server error. Please try again.')
            }
        }
    }

    const closeEditOverlay = () => {
        setIsEditOverlayVisible(false)
        setEditingTask(null)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="page-container">
            <HeaderUser />
            {error && (
                <div className="error-banner" style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '10px',
                    textAlign: 'center'
                }}>
                    {error}
                    <button onClick={() => setError('')} style={{ marginLeft: '10px' }}>×</button>
                </div>
            )}
            <div className="mainContent">
                <div className="mCard">
                    <MenuCard activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
                
                <div style={{ flex: 1, padding: '20px' }}>
                    <TasksContainer 
                        tasks={tasks.map(task => ({
                            ...task,
                            dueDate: task.due_date
                        }))}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                </div>

                <div className="addButton">
                    <PlusButton onAddTask={handleAddTask} />
                </div>

                {isEditOverlayVisible && editingTask && (
                    <div className="overlay active" onClick={closeEditOverlay}>
                        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="closeButton"
                                onClick={closeEditOverlay}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <TaskInputCard
                                initialData={editingTask}
                                onSave={handleUpdateTask}
                                onCancel={closeEditOverlay}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="footerContainer">
                <Footer />
            </div>
        </div>
    )
}

export default DashBoardPage