const ExcelJS = require("exceljs");
const fs = require("fs");

const filePath = "./cbhpm_2020.xlsx";

const outputFile = "./output.sql";

const tableName = "PS5215";

const referenciaTabela = "CBHPM 2020";

fs.writeFileSync(outputFile, "");

// para utilizar esse script, no arquivo da CBHPM manter somente as colunas CODIGO_PROCEDIMENTO, SUBPORTE, PORTE, CUSTO_OPERACIONAL, NUMERO_AUXILIARES, PORTE_ANESTESICO E VALOR_FILME

async function generateSqlScript() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);

  worksheet.eachRow({ includeEmpty: false, firstRow: 2 }, (row, rowNumber) => {
    const values = row.values;
    const codigo_procedimento = values[1] ?? "NULL";
    const subporte = values[2]?.toString().replace(",", ".") ?? "NULL";
    const porte = values[3] ?? "NULL";
    const custo_operacional = values[4]?.toString().replace(",", ".") ?? "NULL";
    const numero_auxiliares = values[5] ?? "NULL";
    const porte_anestesico = values[6] ?? "NULL";
    const valor_filme = values[7]?.toString().replace(",", ".") ?? "NULL";

    const sql = `INSERT INTO ${tableName} (CODIGO_PROCEDIMENTO, REFERENCIA_TABELA, QUANTIDADE_INCIDENCIA, CODIGO_PORTE_PROCEDIMENTO, CUSTO_OPERACIONAL, NUMERO_AUXILIARES, CODIGO_PORTE_ANESTESICO, QUANTIDADE_FILMES) VALUES ('${codigo_procedimento}', '${referenciaTabela}', ${subporte}, '${porte}', ${custo_operacional}, ${numero_auxiliares}, ${porte_anestesico}, ${valor_filme});\n`;

    fs.appendFileSync(outputFile, sql);
  });

  console.log("Script SQL gerado com sucesso!");
}

generateSqlScript().catch(console.error);
