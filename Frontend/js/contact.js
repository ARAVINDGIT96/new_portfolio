const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("http://localhost:5000/api/contact", {

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

        });


        const data = await response.json();


        if (data.success) {

            alert("Contact details submitted successfully!");

            form.reset();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server");

    }

});