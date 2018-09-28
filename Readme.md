## What is done & what has been used:

### Tools:

- TypeScript
- Koa
- Winston
- Joi
- Jest

### What's done:

- All listed API endpoints
- Query param validation
- Decryption & Encryption (methods are commented for testing purposes)
- Global error handling
- Cluster API
- Logging by cluster.pid by error / info

## To run

> Install modules:
> `yarn`

### Instance

```shell
yarn prod:start
```

### Tests

```shell
yarn test
```

# Documentation

## Ordebook

```
  url: http://localhost:3000/orderbook
  params:
    id: string (required)
    symbol: string (required)

  response: {
    bids": [
      [
        0.08184,
        6
      ],
      ...
    ]
  }
```

### Example

```
  url: http://localhost:3000/orderbook
  params:
    id: kraken
    symbol: BCH/BTC
```

> URL: http://localhost:3000/orderbook?id=hitbtc&symbol=BCH%2FBTC

---

## Symbols

```
  url: http://localhost:3000/symbols
  params:
    id: string (required)

  response: [
    "ADA/BTC",
    "ADA/CAD",
    "ADA/ETH",
    "ADA/EUR",
    ...
  ]
```

### Example

```
  url: http://localhost:3000/symbols
  params:
    id: bxinth
```

> URL: http://localhost:3000/symbols?id=kraken

---

## Ticker

```
  url: http://localhost:3000/ticker
  params:
    id: string (required)
    symbol: string (required)

  response: {
    "symbol": "BCH/BTC",
    "timestamp": 1538148033751,
    ...
  }
```

### Example

```
  url: http://localhost:3000/ticker
  params:
    id: kraken
    symbol: BCH/BTC
```

> URL: http://localhost:3000/ticker?id=kraken&symbol=BCH/BTC

---

## Balance

```
  url: http://localhost:3000/balance
  params:
    id: string (required)
    apiKey: string (required)
    secret: string (required)

  response: {
    "symbol": "BCH/BTC",
    "timestamp": 1538148033751,
    ...
  }
```

### Example

```
  url: http://localhost:3000/balance
  params:
    id: bxinth
    apiKey: 484a63e83ccd
    secret: 80c6c46d100a
```

> URL: http://localhost:3000/balance?id=bxinth&apiKey=484a63e83ccd&secret=80c6c46d100a

---

## Place Order

```
  url: http://localhost:3000/placeOrder
  params:
    id: string (required)
    symbol: string (required)
    orderType: string (required)
    side: string (required - buy | sell)
    amount: number (required)
    price: number (required)
    apiKey: string (required)
    secret: string (required)

  response: {
    ...error, need verification
  }
```

### Example

```
  url: http://localhost:3000/placeOrder
  params:
    id: bxinth
    symbol: BTC/THB
    orderType: limit
    side: sell
    amount: 0.321
    price: 100
    apiKey: 484a63e83ccd
    secret: 80c6c46d100a
```

> URL: http://localhost:3000/placeOrder?id=bxinth&symbol=BTC/THB&orderType=limit&side=sell&amount=0.321&price=0123&apiKey=484a63e83ccd&secret=80c6c46d100a
