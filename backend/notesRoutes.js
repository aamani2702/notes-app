const express = require("express");
const pool = require("./db");
const requireAuth = require("./authMiddleware");

const router = express.Router();

// All routes below require a valid token
router.use(requireAuth);

// Get all notes for the logged-in user
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC",
      [req.userId],
    );
    res.json({ notes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch notes" });
  }
});

// Get one note by id (only if it belongs to the logged-in user)
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [req.params.id, req.userId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ note: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch note" });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [req.userId, title, content || ""],
    );
    res.status(201).json({ note: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create note" });
  }
});

// Update an existing note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE notes
          SET title = $1, content = $2, updated_at = NOW()
          WHERE id = $3 AND user_id = $4
          RETURNING *`,
      [title, content || "", req.params.id, req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ note: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update note" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id",
      [req.params.id, req.userId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deleted: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete note" });
  }
});

module.exports = router;
