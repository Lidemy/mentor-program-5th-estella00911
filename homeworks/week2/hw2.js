function capitalize(str) {
    var strSplit = str.split("");  //split a string into each alphabet
    if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
        var AlphabetToUnicode = str.charCodeAt(0);   //turn 1st alphabet into unicode
        var unicodeToCapitalAlphabet = String.fromCodePoint(AlphabetToUnicode - 32); // turn 1st alphabet into Capital
        strSplit[0] = unicodeToCapitalAlphabet; //replace the 1st alphabet of str into CAPTICAL
        str = strSplit.join("");  //combine seperate alphabets into a string.
        return str;  //return func
    }//end if
    else {
        return str;
    }//end else
}// end function


console.log(capitalize('hello')); //test
console.log(capitalize('Nick')); //test
console.log(capitalize(',hello')); //test