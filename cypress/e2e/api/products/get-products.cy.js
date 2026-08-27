describe('GET /products', () => {
    const validateContract = (responseData, contract) => {
        Object.entries(contract).forEach(([key, expectedType]) => {
            const value = responseData[key];

            if (typeof expectedType === 'string') {
                expect(value, key).to.be.a(expectedType);
                return;
            }

            if (Array.isArray(expectedType)) {
                expect(value, key).to.be.an('array');
                value.forEach((item) => {
                    if (typeof expectedType[0] === 'string') {
                        expect(item, key).to.be.a(expectedType[0]);
                        return;
                    }

                    validateContract(item, expectedType[0]);
                });
                return;
            }

            expect(value, key).to.be.an('object');
            validateContract(value, expectedType);
        });
    };

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