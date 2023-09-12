interface Result {
  index: number;
  rpcId: number;
  data: any;
}

export function parseBatchExecuteResponse(raw: string): Result[] {
  // Trim the first 2 lines
  // ")]}'" and an empty line
  const envelopesRaw = raw.split("\n").slice(2).join("");

  // Load all envelopes JSON (list of envelopes)
  const envelopes: any[] = JSON.parse(envelopesRaw);

  const results: Result[] = [];

  for (const envelope of envelopes) {
    // Ignore envelopes that don't have 'wrb.fr' at [0]
    // (they're not RPC responses but analytics etc.)
    if (envelope[0] !== "wrb.fr") {
      continue;
    }

    // Index (at [6], string)
    // Index is 1-based
    // Index is "generic" if the response contains a single envelope
    let index: number;
    if (envelope[6] === "generic") {
      index = 1;
    } else {
      index = parseInt(envelope[6], 10);
    }

    // Rpcid (at [1])
    // Rpcid's response (at [2], a JSON string)
    const rpcid = envelope[1];
    const data = JSON.parse(envelope[2]);

    results.push({ index, rpcId: rpcid, data });
  }

  return results;
}
