const serverPort    = 3001;

module.exports.serverPort = serverPort;
// module.exports.tenantId = process.env.AZURE_TENANT_ID;

// module.exports.credentials = {
//   identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_NAME}.onmicrosoft.com/.well-known/openid-configuration`, 
//   clientID: process.env.AZURE_CLIENT_ID,
//   validateIssuer: false,
//   issuer: false,
//   passReqToCallback: true,
//   isB2C: false,
//   policyName: false,
//   allowMultiAudiencesInToken: false,
//   audience: process.env.AZURE_CLIENT_ID, 
//   loggingLevel: 'info'
// };