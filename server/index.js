const app = require("./server");

async function main() {
  await app.listen();

  console.log("Server Online");
}

main();