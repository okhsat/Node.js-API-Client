const fastify = require('fastify')({
  logger: true
});
const { PrismaClient } = require('@prisma/client');
const { REPL_MODE_SLOPPY } = require('repl');
const prisma = new PrismaClient();

// Get all products
exports.getAll = async (req, rep) => {
    try {
        let products = await prisma.product.findMany();

        return products;

    } catch (err) {
        fastify.log.error(err);
    }
}

// Get single product by ID
exports.getSingle = async (req, rep) => {
    try {
        const id = Number(req.params.id);
        let product = await prisma.product.findFirstOrThrow({
            where: {
                id: id
            }
        });

        return product;

    } catch (err) {
        fastify.log.error(err);

        rep.code(404).send({
            status: false,
            error: err
        });
    }
}

// Add new product
exports.add = async (req, rep) => {
    try {
        let product = await prisma.product.create({
            data: req.body
        });

        return {
            status: true,
            message: 'Product Created.',
            product: product
        }

    } catch (err) {
        fastify.log.error(err);
        
        rep.code(500).send({
            status: false,
            error: err
        });
    }
}
    
// Update product
exports.update = async (req, rep) => {
    try {
        const id = Number(req.params.id);
        let product = prisma.product.update({
            where: { 
                id: id 
            },
            data: req.body
        });

        return {
            status: true,
            message: 'Product Updated.',
            product: product
        }

    } catch (err) {
        fastify.log.error(err);

        rep.code(500).send({
            status: false,
            error: err
        });
    }
}

// Delete product
exports.delete = async (req, rep) => {
    try {
        const id = Number(req.params.id);
        let product = await prisma.product.delete({
            where: {
                id: id
            }
        });

        return {
            status: true,
            message: 'Product Deleted.',
            product: product
        }

    } catch (err) {
        fastify.log.error(err);

        rep.code(500).send({
            status: false,
            error: err
        });
    }
}