function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p>You have no notes yet.</p>;
  }

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
