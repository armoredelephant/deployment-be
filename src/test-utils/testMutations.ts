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
        ticketNumber
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

export const deleteTechMutation = `
    mutation DeleteTech($name: String! $id: Int!) {
        deleteTech (id: $id name: $name)
    }
`;

export const updateTechMutation = `
    mutation UpdateTech($id: Int! $name: String!) {
        updateTech (id: $id newName: $name)
    }
`;
