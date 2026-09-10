import { validateContract } from '../../../support/products/validate-contract';

describe('GET /products/search', () => {
    context('Caminho feliz', () => {
        it('Deve buscar produto por nome validar o contrato de response', () => {
            const nomeProduto = 'Apple MacBook';
            cy.fixture('products-contract.json').then((productContract) => {
                cy.request('GET', `/products/search?q=${nomeProduto}`).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.products).to.be.an('array');
                    expect(response.body.products[0].title).to.include(nomeProduto);
                    validateContract(response.body.products[0], productContract);
                });
            });
        })

        it('Deve retornar lista de produtos buscados com palavra chave e validar o contrato de response', () => {
            const palavraChave = 'premium';
            cy.fixture('products-contract.json').then((productContract) => {
                cy.request('GET', `/products/search?q=${palavraChave}`).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.products).to.be.an('array').and.have.length.greaterThan(1);
                    expect(response.body.products[0].description).to.include(palavraChave);

                    validateContract(response.body.products[0], productContract);
                });
            });
        })

    })
    context('Limitador de resultados', () => {
        it('Deve retornar lista de produtos conforme tamanho do limitador de resultados', () => {
            const palavraChave = 'premium';
            const limitador = 3;
            cy.fixture('products-contract.json').then((productContract) => {
                cy.request('GET', `/products/search?q=${palavraChave}&limit=${limitador}`).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.products).to.be.an('array').have.length(limitador)
                    expect(response.body.products[0].description).to.include(palavraChave);

                    validateContract(response.body.products[0], productContract);
                });
            });
        })

        it('Deve retornar lista com tamanho máximo padrão de 30 produtos caso não seja informado um limitador', () => {
            cy.request('GET', `/products/search`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.products).to.be.an('array').and.length(30);
            });
        })
    })

    context('Limitador de campos e skip de resultados', () => {
        it('Deve retornar lista de produtos conforme lista de campos informada na busca', () => {
            const campos = 'id,title,category,price';
            const expectResponseKeys = campos.split(',');
            JSON.stringify(expectResponseKeys);
            cy.request('GET', `/products/search?select=${campos}`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.products).to.be.an('array');
                expect(response.body.products[0]).to.have.all.keys(expectResponseKeys);
            });
        })
    })









})