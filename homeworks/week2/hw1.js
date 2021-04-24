function printStars(n) {
  var output = '*';     //initial string
  var iterate = '\n*';  //add string
  //[if] check n=1 or n!=1
  if (n > 1) {
    for (let i = 0; i < n - 1; i++) {  //for loop to add '\n*'
      output += iterate;
    }  //endfor
    console.log(output);
  }//endif
  else if (n == 1) {   //
    console.log(output);
  }//end elseif
}//end function


printStars(3)