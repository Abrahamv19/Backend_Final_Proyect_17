import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PS5 STORE',
      version: '1.0.0',
      description: 'PS5 STORE SPANISH DOCUMENTATION',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: [
    './src/docs/productsdocs/productsdocs.yaml',
    './src/docs/cartsdocs/cartsdocs.yaml',
    
    
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
