export const createDeploymentMutation = `
    mutation CreateDeployment ($data: DeploymentInput!) {
        createDeployment (deployment: $data) {
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

export const createTechMutation = `
    mutation CreateTech ($data: String!) {
        createTech (name: $data) {
            id
            name
        }
    }
`;
