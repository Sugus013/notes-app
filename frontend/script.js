const form = document.getElementById('noteForm');
const notesList = document.getElementById('notes');

const fetchNotes = async () => {
  const res = await fetch("http://localhost:3000/notes");
  const notes = await res.json();
  notesList.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = `${note.title}: ${note.content}`;
    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = async () => {
      await fetch(`http://localhost:3000/notes/${note._id}`, { method: "DELETE" });
      fetchNotes();
    };
    li.appendChild(del);
    notesList.appendChild(li);
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();
  await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    })
  });
  form.reset();
  fetchNotes();
};

fetchNotes();
