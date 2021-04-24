function join(arr, concatStr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result += concatStr + arr[i];
    }
    return result;
}

function repeat(str, times) {
    let result = [];
    for (let j = 1; j <= times; j++) {
        result += str;
    }
    return result;
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
