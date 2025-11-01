import { useState } from 'react'
import TaskInputCard from '../Cards/taskInputCard'

function PlusButton({ onAddTask }) {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    const openOverlay = () => {
        setIsOverlayVisible(true)
        document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    const closeOverlay = () => {
        setIsOverlayVisible(false)
        document.body.style.overflow = 'unset' // Restore scroll
    }

    const handleSaveTask = (taskData) => {
        onAddTask(taskData)
        closeOverlay()
    }

    return (
        <>
            <button
                type="button"
                className="plusButton"
                onClick={openOverlay}
                aria-label="Add new task"
            >
                +
            </button>
            {isOverlayVisible && (
                <div className="overlay active" onClick={closeOverlay}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        
                        <TaskInputCard
                            onSave={handleSaveTask}
                            onCancel={closeOverlay}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default PlusButton