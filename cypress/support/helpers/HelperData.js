class HelperData {

  static retornarDataAtual(){
    var data = new Date();
    return data.getFullYear() + "-" + data.getMonth() +  "-" + data.getDate();
  }

  static retornarDataFutura(dias = 1, meses = 1, anos = 0){
    var data = new Date();
    return (data.getFullYear() + anos) + "-" + (data.getMonth() + meses) +  "-" + (data.getDate() + dias);
  }

  static retornaDateTimeFormatado(formato = "en-US", operador=undefined, dias=undefined, meses=undefined, anos=undefined){
    var data = new Date();

    switch (operador) {
    case "+":
      if(dias)
        data.setDate(data.getDate() + dias);
      if(meses)
        data.setMonth(data.getMonth() + meses);
      if(anos)
        data.setFullYear(data.getFullYear() + anos);
      break;

    case "-":
      if(dias)
        data.setDate(data.getDate() - dias);
      if(meses)
        data.setMonth(data.getMonth() - meses);
      if(anos)
        data.setFullYear(data.getFullYear() - anos);
      break;

    default:
      break;
    }

    return data.toISOString(formato);
  }

  static converterDataParaDDMMYYYY(isoDate){
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    const year = date.getFullYear();
        
    return `${day}/${month}/${year}`;
  }

  static extrairMesAno(isoDate){
    const date = new Date(isoDate);

    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  }

  static extrairDia(isoDate){
    const date = new Date(isoDate);
    return date.getDate();;
  }
}

export default HelperData;
