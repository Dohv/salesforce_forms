const tenantName    = 'CheckaltOnBoarding';
const tenantId      = 'b69ab1d1-8da9-405e-b116-2d56b7071e70';
const clientID      = 'fabcfae4-05ba-47e5-8a81-1b6b4c9447ca';
const serverPort    = 3001;

module.exports.serverPort = serverPort;
module.exports.tenantId = tenantId;

module.exports.credentials = {
  identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
  clientID: clientID,
  validateIssuer: false,
  issuer: false,
  passReqToCallback: true,
  isB2C: false,
  policyName: false,
  allowMultiAudiencesInToken: false,
  audience: clientID, 
  loggingLevel: 'info'
};