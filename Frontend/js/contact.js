const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;


    try {

        const response = await fetch(
            "https://aravindportfolio.onrender.com/api/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                })
            }
        );


        const data = await response.json();


        if (response.ok && data.success) {

            alert("Contact details submitted successfully!");

            form.reset();

        } else {

            alert(data.message || "Failed to save contact details");

        }


    } catch (error) {

        console.error("Connection Error:", error);

        alert("Unable to connect to server");

    }

});