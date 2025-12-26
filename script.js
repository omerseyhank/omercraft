document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const edition = document.getElementById("edition").value;
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;

  const message =
    `Hi Omer 👋\n\n` +
    `I want a custom Minecraft world.\n\n` +
    `Edition: ${edition}\n` +
    `World Type: ${type}\n` +
    `World Name: ${name}\n` +
    `Description:\n${desc}`;

  const encodedMessage = encodeURIComponent(message);

  // 🔴 IMPORTANT: WhatsApp Business number WITH country code (Qatar)
  const phoneNumber = "97477195239";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const emailURL = `mailto:omerkuzeyseyhan5@gmail.com?subject=Custom Minecraft World&body=${encodedMessage}`;

  // Try WhatsApp first
  const win = window.open(whatsappURL, "_blank");

  // Fallback to email if blocked
  setTimeout(() => {
    if (!win || win.closed) {
      window.location.href = emailURL;
    }
  }, 800);
});

