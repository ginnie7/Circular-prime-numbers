function findPrimes(range) {
  let numbers = [];
  const primesArr = [2];
  let prime = 2;

  while (prime <= range) {
    // Fill in numbers array with mulitiples of prime
    for (let i = 1; i <= range && prime * i <= range; ++i) {
      numbers[prime * i - 1] = prime * i;
    }
    // Move on to the next prime
    while (numbers[prime - 1] !== undefined) {
      ++prime;
    }
    // Add current prime to the array
    primesArr.push(prime);
  }
  // Delete the last prime which is bigger than range
  primesArr.pop();
  return primesArr;
}

const LN10 = Math.log(10);
// Rotates the least-significant base-10 digit to the front
function rotate(number) {
  return (
    ((number / 10) >> 0) +
    (number % 10) * Math.pow(10, Math.floor(Math.log(number) / LN10))
  );
}

// Find circular primes within the primes range
function findCircularPrimes(range) {
  const primes = findPrimes(range);

  // Use a hash of primes for faster lookup
  const primeHash = primes.reduce(function(memo, prime) {
    memo[prime] = true;
    return memo;
  }, {});

  const circularPrimes = primes.filter(function(prime) {
    // Check for ciruclar primes
    let nextDigit = prime;
    while ((nextDigit = rotate(nextDigit)) !== prime) {
      if (!(nextDigit in primeHash)) {
        return false;
      }
    }
    return true;
  });

  return circularPrimes;
}

const listCircularPrimes = document.querySelector('.button');
listCircularPrimes.addEventListener('click', getCircularPrimes);

function getCircularPrimes(inputValue) {
  inputValue = document.getElementById('userInput').value;
  inputValue = parseInt(inputValue);
  if (typeof inputValue !== 'number' || isNaN(inputValue)) {
    return (document.getElementById('result').innerHTML =
      '<span style="color: red">Please, enter a valid number</span>');
  } else if (inputValue <= 0 || inputValue > 9999999) {
    return (document.getElementById('result').innerHTML =
      '<span style="color: red">Please, enter a number between 1 and 9.999.999</span>');
  }

  let circularPrimes = findCircularPrimes(inputValue).join(', ');

  // Special cases for numbers 1 and 2
  if (inputValue === 2) {
    return (document.getElementById('result').innerHTML =
      'Circular prime number between 1 and 2 is 2');
  } else if (inputValue === 1) {
    return (document.getElementById('result').innerHTML =
      'No circular prime numbers for 1');
  } else {
    return (document.getElementById(
      'result'
    ).innerHTML = `Circular prime numbers between 1 and ${inputValue} are: <br> ${circularPrimes}`);
  }
}
