class InvalidInputError extends Error {
    constructor(message) {
      super(message);
      this.name = "InvalidInputError";
    }
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Asynchronously processes each number in the array with a 1-second delay
   * @param {number[]} numbers 
   * @returns {Promise<void>}
   */
  async function processWithDelay(numbers) {
    
    if (!Array.isArray(numbers)) {
      throw new InvalidInputError("Input must be an array.");
    }
  
    if (!numbers.every(num => typeof num === "number")) {
      throw new InvalidInputError("Array must contain only numbers.");
    }
  
    if (numbers.length === 0) {
      console.log("Array is empty. Nothing to process.");
      return Promise.resolve();
    }
  
    // Process numbers with delay
    for (let i = 0; i < numbers.length; i++) {
      await delay(1000);
      console.log(numbers[i]);
    }
  
    console.log("All numbers processed.");
  }
  
  // Example usage
  processWithDelay([1, 2, 3, 4, 5])
    .then(() => console.log("Done"))
    .catch(error => console.error("Error:", error.message));

  