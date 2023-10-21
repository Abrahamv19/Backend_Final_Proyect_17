import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

let cartID = '653140e33b3dd5a13ff101c7';
const cid = '653140e33b3dd5a13ff101c7';
const pid = '6531914e10f19b47c6fc54ba';

let cartID2 = '65313c0bfa69948dc86b71ae';
const cid2 = '65313c0bfa69948dc86b71ae';
const pid2 = '653191e010f19b47c6fc54cf';

before(async function loginUser() {
  const loginCredentials = {
    email: 'test@test.com',
    password: '123',
  };
  const res = await requester.post('/auth/profile/login').send(loginCredentials);
});

describe('Carts', () => {
  it('should update a cart', async () => {
    const updatedCartData = {
      products: [
        {
          product: '6531914e10f19b47c6fc54ba',
          quantity: 4,
        },
        {
          product: '65313cc4fa69948dc86b71c7',
          quantity: 1,
        },
      ],
    };
    const response = await requester.put(`/api/carts/${cartID}`).send(updatedCartData);
    if (response.error) {
      throw new Error(response.error.message);
    }
    const { status, _body } = response;
    expect(status).to.equal(200);
    expect(_body.message).to.have.eql('Cart updated successfully');
    expect(_body.cart).to.have.property('_id');
  });
  it('should empty a cart', async () => {
    const emptyCart = {
      products: [],
    };
    const response = await requester.put(`/api/carts/${cartID}`).send(emptyCart);
    if (response.error) {
      throw new Error(response.error.message);
    }
    const { status, _body } = response;
    expect(status).to.equal(200);
    expect(_body.message).to.have.eql('Cart updated successfully');
    expect(_body.cart).to.have.property('_id');
  });
  it('should delete a product from a cart successfully', async () => {
    const response = await requester.delete(`/api/carts/${cid2}/product/${pid2}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'success');
    expect(response.body).to.have.property('message', 'Product removed from cart');
    expect(response.body).to.have.property('cart');

    const updatedCart = response.body.cart;
    const productIndex = updatedCart.products.findIndex((p) => p.product.toString() === pid);
    expect(productIndex).to.equal(-1);
  });

  it('should return an error if the product does not exist in the database', async () => {
    const nonExistentProductId = '652f0456f041d742463d5zzz';
    const response = await requester.delete(`/api/carts/${cid}/product/${nonExistentProductId}`);
    expect(response.status).to.equal(404);
  });

  it('should return an error if the cart does not exist in the database', async () => {
    const nonExistentCartId = '65302be01ddc73f339becxxx';
    const response = await requester.delete(`/api/carts/${nonExistentCartId}/product/${pid}`);
    expect(response.status).to.equal(404);
  });
});


