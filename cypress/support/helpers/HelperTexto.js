class HelperTexto {

  static shuffle(s) {
    var arr = s.split('');// Convert String to array
        
    arr.sort(() => {
      return 0.5 - Math.random();
    });  
    s = arr.join(''); // Convert Array to string

    return s;// Return shuffled string
  }
}

export default HelperTexto;