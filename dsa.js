// Strategy :Greedy approach. At each airport, hire a plane to reach the farthest airport possible with the current fuel.

const minPlanes = function(fuel) {
    let numOfPlanes = 0, currFuel = 0, maxReach = 0;
    const numAirports = fuel.length;

    // Iterate over each airport
    for (let airport = 0; airport < numAirports - 1; airport++) {
        // Update the farthest airport we can reach with the current fuel
        maxReach = Math.max(maxReach, airport + fuel[airport]);

        // If we reach the airport where we need to refuel
        if (airport === currFuel) {
            // Hire a plane to reach the farthest airport we can reach so far
            numOfPlanes++;
            // Update the current fuel to the farthest airport we can reach
            currFuel = maxReach;
        }
    }
    return numOfPlanes;
};

// Test cases
console.log(minPlanes([2, 1, 2, 3, 1]));  // Output: 2
console.log(minPlanes([1, 6, 3, 4, 5, 0, 0, 0, 6]));  // Output: 3
