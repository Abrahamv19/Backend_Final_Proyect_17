import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Products', () => {
  it('should return a list of products', async () => {
    const response = await requester.get('/api/products');
    expect(response.status).to.equal(200);
  });

  it('should create a product with a valid authentication token', async () => {
    const loginResponse = await requester.post('/api/sessions/login', {
      email: 'juan@g.com',
      password: '123',
    });
    if (loginResponse.status !== 200) {
      return;
    }
    const token = jwt.sign(
      {
        id: loginResponse.data.user._id,
        email: loginResponse.data.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const response = await requester.post('/api/products').set('Authorization', `Bearer ${token}`).send(productData);
    expect(response.status).to.equal(201);
    done();
  });
  it('should return a product when a valid ID is provided', async () => {
    const productId = '653191af10f19b47c6fc54c8';
    const response = await requester.get(`/api/products/${productId}`);
    expect(response.status).to.equal(200);
  });
  it('should update a product when a valid ID and product data is provided', async () => {
    const loginResponse = await requester.post('/api/sessions/login', {
      email: 'test@test.com',
      password: '123',
    });
    if (loginResponse.status !== 200) {
      return;
    }
    const token = jwt.sign(
      {
        id: loginResponse.data.user._id,
        email: loginResponse.data.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const productId = '652f0456f041d742463d5yyy';
    const updatedProduct = {
      title: 'New name',
      description: 'New Description',
      price: 101,
    };
    const response = await requester.put(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`).send(updatedProduct);
    expect(response.status).to.equal(200);
    expect(response.body.payload).to.deep.equal({
      ...updatedProduct,
      _id: productId,
    });
  });
  it('should delete a product when a valid ID is provided', async () => {
    const loginResponse = await requester.post('/api/sessions/login', {
      email: 'test@test.com',
      password: '123',
    });
    if (loginResponse.status !== 200) {
      return;
    }
    const token = jwt.sign(
      {
        id: loginResponse.data.user._id,
        email: loginResponse.data.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const productId = '652f0456f041d742463d5yyy';
    const response = await requester.delete(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.payload).to.deep.equal({
      status: 'success',
      msg: 'Product deleted',
    });
  });
});
