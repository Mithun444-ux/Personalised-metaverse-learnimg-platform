const API_BASE = 'http://localhost:4000';

document.getElementById('loadRec').addEventListener('click', async () => {
  const userId = document.getElementById('userId').value || 'u1';
  try {
    const res = await fetch(`${API_BASE}/api/recommend/${userId}`);
    if (!res.ok) {
      document.getElementById('recs').innerText = 'No user found. Create user via backend.';
      return;
    }
    const recs = await res.json();
    const container = document.getElementById('recs');
    container.innerHTML = '';
    recs.forEach(item => {
      const div = document.createElement('div');
      div.style.padding = '6px';
      div.style.borderBottom = '1px solid #ddd';
      div.innerHTML = `<strong>${item.title}</strong>
        <div>Topic: ${item.topic} • Level: ${item.level} • Duration: ${item.durationMin} min</div>
        <button data-id="${item.id}" class="startBtn">Start</button>`;
      container.appendChild(div);
    });

    document.querySelectorAll('.startBtn').forEach(b => {
      b.addEventListener('click', async (ev) => {
        const contentId = ev.target.dataset.id;
        const topic = recs.find(r => r.id === contentId).topic;
        const score = Math.floor(50 + Math.random() * 50);
        await fetch(`${API_BASE}/api/progress/u1`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, score })
        });
        alert(`Completed ${contentId} — score ${score}. Progress sent to server.`);
      });
    });
  } catch (err) {
    document.getElementById('recs').innerText = 'Error: Backend not reachable.';
  }
});
