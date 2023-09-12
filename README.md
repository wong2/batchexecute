## batchexecute

TypeScript package to ease interactions with Google's batchexecute batch RPC system. It assists in preparing requests for it and decoding responses returned from it. Ported from [pybatchexecute](https://github.com/pndurette/pybatchexecute).

### Usage

```typescript
import { preparedBatchExecute, parseBatchExecuteResponse } from 'batchexecute'

// prepare a request
const encoded = preparedBatchExecute({
	host: 'example.com',
	app: 'example',
	rpcs: [
		{ id: 'rpc1id', args: ['some', 'args'] },
		{ id: 'rpc2id', args: ['some', 'args'] },
	]
})

// make the request
const resp = await fetch(encoded.url, {
	method: 'POST',
	headers: encoded.headers,
	body: encoded.body,
})

const raw = await resp.text()

// parse the response
const results = parseBatchExecuteResponse(raw)
```

