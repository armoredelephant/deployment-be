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
        ticketNumber
        }
    }
`;

export const findDeploymentsByFieldQuery = `
    query {
        findDeploymentsByField (techName: "Keith Alleman" endUser: "Salleena" product: "Test" modelType: "Test" serialNumber: "Test" timeStamp: "Test" techId: 1 ticketNumber: 111111) {
        id
        techName
        }
    }
`;

export const findTechQuery = `
    query FindTechQuery ($id: Int! $name: String!) {
        findTech (id: $id name: $name) {
            id
            name
        }
    }
`;

export const findAllTechsQuery = `
    query {
        findAllTechs {
            id
            name
        }
    }
`;
