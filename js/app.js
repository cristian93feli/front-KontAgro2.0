function login() {
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    fetch("https://kontagro20-production.up.railway.app/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena })
    })
    .then(res => {
        if (res.ok) {
            window.location.href = "menu.html"; 
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(err => alert("Error de conexión con el servidor")); 
}
