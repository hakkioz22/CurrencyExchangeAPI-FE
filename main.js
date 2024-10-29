const backendAddress = "http://localhost:5291/api/currency/usd";

// every morning 10 am
function setDailyTimer() {
    const now = new Date();
    const next10am = new Date();
    next10am.setHours(10, 0, 0, 0);  // 10:00:00

    if (now > next10am) {
        next10am.setDate(next10am.getDate() + 1);
    }

    const timeUntilNext10am = next10am - now;

    setTimeout(() => {
        fetchExchangeRate();
        setInterval(fetchExchangeRate, 24 * 60 * 60 * 1000);
    }, timeUntilNext10am);
}

async function fetchExchangeRate() {
    try {
        const response = await fetch(backendAddress);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        document.getElementById("date").innerText = new Date().toLocaleDateString();
        document.getElementById("usd-rate").innerText = data.usdExchangeRate;
    } catch (error) {
        console.error("Error fetching the exchange rate:", error);
        document.getElementById("usd-rate").innerText = "Error fetching data";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchExchangeRate();
    setDailyTimer();
});
