import fs from "fs";

// Caminho para o arquivo de texto
const filePath = "./comunicado_example.txt";

// Caminho para o arquivo de saída SQL
const outputFilePath = "output.sql";

// Cria um novo arquivo de saída SQL
fs.writeFileSync(outputFilePath, "");

const nome_comunicado = "outubro/2020-setembro/2021";

// Cria um stream de leitura do arquivo de texto
const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

// Evento 'data' é emitido quando há dados disponíveis para leitura
readStream.on("data", (chunk) => {
  const lines = chunk.split("\n");
  lines.forEach((line) => {
    const [codigo, valor] = line.trim().split(" ");

    // Monta a instrução SQL para inserir os dados na tabela
    const sql = `INSERT INTO PS5228 (IDENTIFICACAO_PERIODO_CBHPM, CODIGO_PORTE_PROCEDIMENTO, VALOR_PORTE, DATA_VIGENCIA_INICIAL, DATA_VIGENCIA_FINAL) VALUES ('${nome_comunicado}', '${codigo}', '${valor
      .toString()
      .replace(".", "")
      .replace(",", ".")}', '1900.01.01', '2099.12.31');\n`;

    // Adiciona a instrução SQL ao arquivo de saída
    fs.appendFileSync(outputFilePath, sql);
  });
});

// Evento 'end' é emitido quando a leitura do arquivo é concluída
readStream.on("end", () => {
  console.log("Script SQL gerado com sucesso!");
});

// Evento 'error' é emitido se houver um erro na leitura do arquivo
readStream.on("error", (err) => {
  console.error("Erro ao ler o arquivo:", err);
});
