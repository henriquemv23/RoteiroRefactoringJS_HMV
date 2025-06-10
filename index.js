const { readFileSync } = require('fs');

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}


class ServicoCalculoFatura {

   getPeca(pecas, apresentacao) { 
     return pecas[apresentacao.id];
   }

   calcularCredito(pecas, apre) {
     let creditos = 0;
     creditos += Math.max(apre.audiencia - 30, 0);
     if (this.getPeca(pecas, apre).tipo === "comedia")
       creditos += Math.floor(apre.audiencia / 5);
     return creditos;
   }

   calcularTotalApresentacao(pecas, apre) {
     let total = 0;
     const peca = this.getPeca(pecas, apre);
     switch (peca.tipo) {
       case "tragedia":
         total = 40000;
         if (apre.audiencia > 30) {
           total += 1000 * (apre.audiencia - 30);
         }
         break;
       case "comedia":
         total = 30000;
         if (apre.audiencia > 20) {
             total += 10000 + 500 * (apre.audiencia - 20);
         }
         total += 300 * apre.audiencia;
         break;
       default:
         throw new Error(`Peça desconhecia: ${peca.tipo}`);
     }
     return total;
   }

   calcularTotalFatura(pecas, apresentacoes) {
       let totalFatura = 0;
       for (let apre of apresentacoes) {
           totalFatura += this.calcularTotalApresentacao(pecas, apre);
       }
       return totalFatura;
   }

   calcularTotalCreditos(pecas, apresentacoes) {
       let creditos = 0;
       for (let apre of apresentacoes) {
           creditos += this.calcularCredito(pecas, apre);
       }
       return creditos;
   }
}


function gerarFaturaStr (fatura, pecas, calc) { 
    let faturaStr = `Fatura ${fatura.cliente}\n`;

    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${calc.getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
    return faturaStr;
}

function gerarFaturaHTML(fatura, pecas, calc) { 
  // Corpo da função comentado, conforme instrução do roteiro
  /*
  let htmlStr = `<html>\n`;
  htmlStr += `<p> Fatura ${fatura.cliente} </p>\n`;
  htmlStr += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    const nomePeca = calc.getPeca(pecas, apre).nome;
    const totalApresentacao = calc.calcularTotalApresentacao(pecas, apre);
    const audiencia = apre.audiencia;
    htmlStr += `  <li> ${nomePeca}: ${formatarMoeda(totalApresentacao)} (${audiencia} assentos) </li>\n`;
  }

  htmlStr += `</ul>\n`;
  htmlStr += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))} </p>\n`;
  htmlStr += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} </p>\n`;
  htmlStr += `</html>`;

  return htmlStr;
  */
 return "// Funcao gerarFaturaHTML comentada para o Commit 7";
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const calc = new ServicoCalculoFatura();
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
console.log(faturaStr);

const faturaHTML = gerarFaturaHTML(faturas, pecas, calc);
//console.log("\n--- Fatura em HTML ---\n", faturaHTML);