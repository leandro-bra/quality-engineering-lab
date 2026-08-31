import { validateContract } from '../../../support/products/validate-contract';

describe('GET /products', () => {
    context('Caminho feliz', () => {
        it('Deve retornar todos os produtos e validar o contrato de response', () => {
            cy.fixture('products-contract.json').then((productContract) => {
                cy.request('GET', '/products').then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.products).to.be.an('array');
                    validateContract(response.body.products[0], productContract);
                    expect(response.body.total).to.be.greaterThan(10);
                    expect(response.body.limit).to.eq(30);
                });
            });
        });

        it('Deve retornar produto por id e validar o contrato de response', () => {
            const idProduto = 78;
            cy.fixture('products-contract.json').then((productContract) => {
                cy.request('GET', `/products/${idProduto}`).then((response) => {
                    expect(response.status).to.eq(200);
                    validateContract(response.body, productContract);
                });
            });
        })

    })


});