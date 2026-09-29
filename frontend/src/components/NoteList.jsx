function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p className="note-list-empty">You have no notes yet.</p>;
  }

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-card-actions">
            <button className="note-edit-btn" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button
              className="note-delete-btn"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
