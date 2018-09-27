## What is done & what has been used:

### Tools:

- TypeScript
- Koa
- Winston
- Joi

### What's done:

- All listed API endpoints
- Query param validation
- Decryption & Encryption (methods are commented for testing purposes)
- Global error handling
- Cluster API
- Logging by cluster.pid by error / info

## What can be improved:

- The main thing I would improved is shared data between clusters and how it's handled.
  For example, now, if a apiKey, secret is passed, the ccxt.exchange will be initialized once again
  with the keys. I would like this data to be shared between clusters, thus if one exchange has been initialized
  with API keys, all cluster those exchanges would be also initialized.

- API hashked key storing in mongoose
