function reverse(str) {
    var strSplit = str.split("");  //split a string into alphabets
    var strReverse = [];  //set a new variable for reverse string.
    for (let i = 0; i < strSplit.length; i++) {   // reverse the order of alphabets
        var indexOF = strSplit.length - 1 - i;
        strReverse[i] = strSplit[indexOF];  // save the opposite order of alphabets
    }// end for
    str = strReverse.join("");  //combine each alphabet 
    return console.log(str); //return 
}//end function

reverse('hello');
