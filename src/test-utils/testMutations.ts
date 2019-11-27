export const createDeploymentMutation = `
    mutation CreateDeployment ($data: DeploymentInput!) {
        createDeployment (deployment: $data) {
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

// export const createTechMutation = `
//     mutation CreateTech ($data: TechInput!) {
//         createTech ()
//     }
// `;
