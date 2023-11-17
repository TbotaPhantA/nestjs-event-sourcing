1. add knex and create repositories for events.
2. entity which have autoincrmented id should have `-1` placeholder.
3. aggregate table with version should be created.
4. how to check name uniqueness without transaction anomalies. (maybe synchronously store aggregate names)
5. add updateProductInfo command
6. asynchronous get products by filter (async) + websocket
