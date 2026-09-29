import { useState, useEffect } from "react";

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content });
    if (!editingNote) {
      setTitle("");
      setContent("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>
      <button type="submit">{editingNote ? "Save changes" : "Add note"}</button>
      {editingNote && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;
