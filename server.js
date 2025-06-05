const fs = require('fs');

if (!fs.existsSync('data.json')) {
  fs.copyFileSync('db.json', 'data.json');
  console.log('📁 Copied db.json to data.json');
}

const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
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
