const fs = require('fs');
const jsonServer = require('json-server');
const auth = require('json-server-auth');

const dataFile = 'data.json';
const defaultFile = 'db.json';

// نسخ db.json إلى data.json إذا ما كانت موجودة
if (!fs.existsSync(dataFile)) {
  fs.copyFileSync(defaultFile, dataFile);
  console.log(`📁 Copied ${defaultFile} to ${dataFile}`);
}

const server = jsonServer.create();
const router = jsonServer.router(dataFile);
const middlewares = jsonServer.defaults();

server.db = router.db;

const rules = auth.rewriter({
  users: 600,
  products: 644,
  categories: 644,
  orders: 660
});
server.use(rules);

server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
