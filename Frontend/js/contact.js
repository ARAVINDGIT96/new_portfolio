const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
        // const response = await fetch("http://localhost:5000/api/contact", {
        const response = await fetch("https://portfolio-back-e6r5.onrender.com/api/contact",{
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message
                })
            }
        );

        const data = await response.json();

        if (response.ok && data.success) {

            alert("Contact details submitted successfully!");

            form.reset();

        } else {

            alert(
                data.message || "Failed to save contact details"
            );

        }

    } catch (error) {

        console.error("Connection Error:", error);

        alert("Unable to connect to server");

    }

});