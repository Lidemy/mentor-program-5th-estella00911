//find factor first, and save into an array: [1,2,5,10]
//and then output a correct format
function printFactor(n) {
    var element = []; //set an array for factor of n
    var iterate = 0;  // set an position to put factors sequently inside an array.
    //find factors of n, and save these as an array.
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            iterate += 1;
            element[iterate - 1] = i;
        }
    }
    //change the correct format of the result.
    var stringForConsoleLog = element[0]
    for (let i = 1; i < element.length; i++) {
        var stringForConsoleLog = stringForConsoleLog + '\n' + element[i];
    }
    console.log(stringForConsoleLog);
}

printFactor(10);
