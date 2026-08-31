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

module.exports = { validateContract };