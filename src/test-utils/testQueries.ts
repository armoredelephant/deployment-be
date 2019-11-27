export const findDeploymentQuery = `
    query {
        findDeployments {
        id
        tech
        endUser
        product
        modelType
        serialNumber
        timeStamp
        }
    }
`;

export const findDeploymentsByFieldQuery = `
    query {
        findDeploymentsByField (tech: "Keith" endUser: "Salleena" product: "Test" modelType: "Test" serialNumber: "Test" timeStamp: "Test") {
        id
        tech
        }
    }
`;
