export const findDeploymentQuery = `
    query {
        findDeployments {
        id
        techName
        endUser
        product
        modelType
        serialNumber
        timeStamp
        techId
        }
    }
`;

export const findDeploymentsByFieldQuery = `
    query {
        findDeploymentsByField (techName: "Keith Alleman" endUser: "Salleena" product: "Test" modelType: "Test" serialNumber: "Test" timeStamp: "Test" techId: 1) {
        id
        techName
        }
    }
`;
