// const form = document.getElementById("contactForm");

// form.addEventListener("submit", async (event) => {

//     event.preventDefault();


//     const name =
//         document.getElementById("name").value;

//     const email =
//         document.getElementById("email").value;

//     const phone =
//         document.getElementById("phone").value;

//     const message =
//         document.getElementById("message").value;


//     try {

//         const response = await fetch(
//             "https://portfolio-back-e6r5.onrender.com/api/contact",
//             {

//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json"
//                 },

//                 body: JSON.stringify({

//                     name: name,

//                     email: email,

//                     phone: phone,

//                     message: message

//                 })

//             }
//         );


//         const data = await response.json();


//         if (response.ok && data.success) {

//             alert(
//                 "Contact details submitted successfully!"
//             );

//             form.reset();

//         } else {

//             alert(
//                 data.message ||
//                 "Failed to save contact details"
//             );

//         }

//     } catch (error) {

//         console.error(
//             "Connection Error:",
//             error
//         );

//         alert(
//             "Unable to connect to server"
//         );

//     }

// });

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("https://portfolio-back-e6r5.onrender.com/api/contact",
            {
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

        console.log("Response:", data);

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