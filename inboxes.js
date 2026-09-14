(() => {
  const loadInboxes = async () => {
    const acc1 = document.getElementById("gmail-list-1");
    const acc2 = document.getElementById("gmail-list-2");
    if (!acc1 || !acc2) return;

    try {
      const res = await fetch("https://eo68725k4wtmbr0.m.pipedream.net", {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!res.ok) return;

      const data = await res.json();
      if (!data || !Array.isArray(data.account1) || !Array.isArray(data.account2)) return;

      acc1.innerHTML = "";
      acc2.innerHTML = "";

      data.account1.forEach(email => {
        const div = document.createElement("div");
        div.className = "email-item";
        div.textContent = `${email.sender || "Unknown"}: ${email.subject || "No subject"}`;
        acc1.appendChild(div);
      });

      data.account2.forEach(email => {
        const div = document.createElement("div");
        div.className = "email-item";
        div.textContent = `${email.sender || "Unknown"}: ${email.subject || "No subject"}`;
        acc2.appendChild(div);
      });
    } catch (e) {
      console.warn("Inbox sync skipped");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadInboxes);
  } else {
    loadInboxes();
  }
  setInterval(loadInboxes, 180000);
})();