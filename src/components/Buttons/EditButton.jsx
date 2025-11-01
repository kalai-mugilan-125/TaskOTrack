function EditButton({ onClick }) {
    return (
        <button
            type="button"
            className="editButton"
            onClick={onClick}
        >
            Edit Task
        </button>
    )
}

export default EditButton