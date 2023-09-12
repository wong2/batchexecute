interface RpcRequest {
  id: string;
  args: string[];
}

interface Params {
  host: string;
  app: string;
  rpcs: RpcRequest[];
}

interface Result {
  url: URL;
  headers: Headers;
  body: URLSearchParams;
}

function generateReqId() {
  return Math.floor(Math.random() * 900000) + 100000;
}

function buildFreqList(rpcs: RpcRequest[]) {
  function envelope(rpc: RpcRequest, index: number) {
    return [rpc.id, JSON.stringify(rpc.args), null, index > 0 ? index.toString() : "generic"];
  }
  if (rpcs.length === 1) {
    return [envelope(rpcs[0], 0)];
  }
  const freq = [];
  for (let i = 0; i < rpcs.length; i++) {
    freq.push(envelope(rpcs[i], i + 1));
  }
  return freq;
}

export function preparedBatchExecute(params: Params): Result {
  const url = new URL(`https://${params.host}/_/${params.app}/data/batchexecute`);
  url.searchParams.append("rpcids", params.rpcs.map((rpc) => rpc.id).join(","));
  url.searchParams.append("_reqid", generateReqId().toString());

  const headers = new Headers({
    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  });

  const body = new URLSearchParams({
    "f.req": JSON.stringify([buildFreqList(params.rpcs)]),
  });

  return { url, headers, body };
}
