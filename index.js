const { readFileSync } = require('fs');

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json')); // Lê o arquivo aqui, uma vez
  }

  getPeca(apre) { 
    return this.pecas[apre.id];
  }
}

class ServicoCalculoFatura {

  constructor(repo) {
     this.repo = repo; 
   }

   calcularCredito(apre) { 
     let creditos = 0;
     creditos += Math.max(apre.audiencia - 30, 0);
     if (this.repo.getPeca(apre).tipo === "comedia")
       creditos += Math.floor(apre.audiencia / 5);
     return creditos;
   }

   calcularTotalApresentacao(apre) { 
     let total = 0;
     const peca = this.repo.getPeca(apre);
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

   calcularTotalFatura(apresentacoes) { 
       let totalFatura = 0;
       for (let apre of apresentacoes) {
           totalFatura += this.calcularTotalApresentacao(apre); 
       }
       return totalFatura;
   }

   calcularTotalCreditos(apresentacoes) { 
       let creditos = 0;
       for (let apre of apresentacoes) {
           creditos += this.calcularCredito(apre); 
       }
       return creditos;
   }
}


function gerarFaturaStr (fatura, calc) { 
    let faturaStr = `Fatura ${fatura.cliente}\n`;

    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`; // <--- MODIFICADO
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`; 
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`; 
    return faturaStr;
}

function gerarFaturaHTML(fatura, calc) { 
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
 return "// Funcao gerarFaturaHTML comentada para o Commit 7";
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio()); 
const faturaStr = gerarFaturaStr(faturas, calc); 
console.log(faturaStr);

//const faturaHTML = gerarFaturaHTML(faturas, pecas, calc);
//console.log("\n--- Fatura em HTML ---\n", faturaHTML);