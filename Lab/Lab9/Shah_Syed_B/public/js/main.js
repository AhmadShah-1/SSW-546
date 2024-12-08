/*
UUsing JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element (this will be the Fibonacci index) 
Calculate the Fibonacci value for the given index
Determine whether or not the number is a prime number
Add a list item to the #fibonacciResults list of numbers you have checked. This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
If the user does not have a value for the input when they submit, you should not continue checking and instead should inform them of an error somehow.


*/

(function () {
    const form = document.getElementById("fibonacciForm");
    const input = document.getElementById("fibonacci_index_input");
    const resultsList = document.getElementById("fibonacciResults");

    if (!form || !input || !resultsList) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    const calculateFibonacci = (index) => {
        if (index < 1) return 0;
        if (index === 1) return 1;
        let a = 0, b = 1, temp;
        for (let i = 2; i <= index; i++) {
            temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    };

    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const index = parseInt(input.value);

        if (isNaN(index) || index < 0) {
            alert("Enter a valid positive number.");
            return;
        }

        const fibValue = calculateFibonacci(index);
        const primeStatus = isPrime(fibValue);

        const listItem = document.createElement("li");
        listItem.textContent = `The Fibonacci of ${index} is ${fibValue}.`;
        listItem.classList.add(primeStatus ? "is-prime" : "not-prime");
        resultsList.appendChild(listItem);

        input.value = "";
    });
})();
