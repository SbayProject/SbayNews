function removeDiacritics(inputString:string) {
    return inputString
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '_')
      .toLowerCase();
  }


  export default removeDiacritics;