require('dotenv').config();

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});
const PORT = process.env.PORT || 3000;
const productRoutes = require("./routes/products");

console.log('- Port: ' + process.env.PORT);

// Declare a route
fastify.get('/', async (request, reply) => {
  return { Hello: 'Node JS' }
});

productRoutes.forEach((route, index) => {
  fastify.route(route)
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({port: PORT});

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();