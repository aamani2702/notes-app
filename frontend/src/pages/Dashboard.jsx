import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const response = await api.get("/notes");
      setNotes(response.data.notes);
    } catch (err) {
      setError("Could not load notes");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrUpdate(formData) {
    try {
      if (editingNote) {
        const response = await api.put(`/notes/${editingNote.id}`, formData);
        setNotes(
          notes.map((n) => (n.id === editingNote.id ? response.data.note : n)),
        );
        setEditingNote(null);
      } else {
        const response = await api.post("/notes", formData);
        setNotes([response.data.note, ...notes]);
      }
    } catch (err) {
      setError("Could not save note");
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError("Could not delete note");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <h1>My Notes</h1>
      <button onClick={handleLogout}>Log out</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <NoteForm
        onSubmit={handleCreateOrUpdate}
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />
      <NoteList notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
