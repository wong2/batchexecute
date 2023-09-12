import { parseBatchExecuteResponse, preparedBatchExecute } from "./mod.ts";

const encoded = preparedBatchExecute({
  host: "chromewebstore.google.com",
  app: "ChromeWebStoreConsumerFeUi",
  rpcs: [{ id: "xY2Ddd", args: ["jjplpolfahlhoodebebfjdbpcbopcmlk"] }],
});

console.log(encoded);

const response = await fetch(encoded.url, {
  method: "POST",
  headers: encoded.headers,
  body: encoded.body,
});

const raw = await response.text();

const results = parseBatchExecuteResponse(raw);
console.log(results);
