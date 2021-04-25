function printStars(n) {
  if (n >= 1 && n <= 30) {
    for (let i = 1; i <= n; i++) {
      console.log('*');
    }
  }
}
printStars(3)