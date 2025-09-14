document.getElementById("registrationForm").addEventListener("submit", function(e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!name || !email || !role) {
    alert("All fields are required!");
    e.preventDefault();
  }
});
