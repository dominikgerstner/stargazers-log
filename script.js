const list = document.querySelector("#starred");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch events.json: ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    if (!list) return;

    if (!Array.isArray(events) || events.length === 0) {
      list.innerHTML = "<li>No starred repositories yet.</li>";
      return;
    }

    events.forEach((event) => {
      const item = document.createElement("li");

      const name = document.createTextNode(`${event.name} — starred `);
      const time = document.createElement("time");
      time.dateTime = event.starred;
      time.textContent = event.starred;

      item.append(name, time);
      list.appendChild(item);
    });
  })
  .catch((error) => {
    if (list) {
      list.innerHTML = `<li>Could not load starred repositories: ${error.message}</li>`;
    }
  });
