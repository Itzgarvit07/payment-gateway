let options = {
    key: "rzp_test_uYAJfosrKVDgK9",
    amount: 50000, // Amount in paise (100 paise = 1 INR)
    name: "NIKE",
    description: "Tshirt",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/b/f/0/l-ausk0622-ausk-original-imagvfpfszrgzzar.jpeg?q=70&crop=true",
    handler: function (response) {
      alert(
        "Payment successful! Payment ID: " + response.razorpay_payment_id
      );
      // You can send the payment ID to your server for further processing
      sendPaymentToServer(response.razorpay_payment_id);
    },
    prefill: {
      name: "Garvit",
      email: "Garvit@example.com",
      contact: "9257673700",
    },
    theme: {
      color: "#000",
    },
  };

  let razorpay = new Razorpay(options);

  document.getElementById("payButton").onclick = function () {
    razorpay.open();
  };

  // Function to send payment details to your server
  function sendPaymentToServer(paymentId) {
    let xhr = new XMLHttpRequest();
    let url = "your-server-endpoint"; // Replace with your server endpoint

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("Payment details sent to server:", xhr.responseText);
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error(
          "Error sending payment details:",
          xhr.status,
          xhr.statusText
        );
      }
    };

    let data = JSON.stringify({
      payment_id: paymentId,
    });

    xhr.send(data);
  }