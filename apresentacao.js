var formatarMoeda = require('./util.js'); 

function gerarFaturaStr (fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;

    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
    return faturaStr;
}

function gerarFaturaHTML(fatura, pecas, calc) {
  /*
  let htmlStr = `<html>\n`;
  htmlStr += `<p> Fatura ${fatura.cliente} </p>\n`;
  htmlStr += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    const nomePeca = calc.repo.getPeca(apre).nome;
    const totalApresentacao = calc.calcularTotalApresentacao(apre);
    const audiencia = apre.audiencia;
    htmlStr += `  <li> ${nomePeca}: ${formatarMoeda(totalApresentacao)} (${audiencia} assentos) </li>\n`;
  }

  htmlStr += `</ul>\n`;
  htmlStr += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))} </p>\n`;
  htmlStr += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} </p>\n`;
  htmlStr += `</html>`;

  return htmlStr;
  */
 return "// Funcao gerarFaturaHTML comentada para o Commit 7 (permanece comentada)";
}

module.exports = gerarFaturaStr; 