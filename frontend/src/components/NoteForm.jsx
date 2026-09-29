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
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="note-form-field">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="note-form-field">
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>
      <div className="note-form-actions">
        <button type="submit">
          {editingNote ? "Save changes" : "Add note"}
        </button>
        {editingNote && (
          <button type="button" className="note-form-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
