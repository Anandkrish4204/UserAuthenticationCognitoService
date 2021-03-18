global.fetch = require('node-fetch');
global.navigator = () => null;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: process.env.USER_POOL_ID,
   ClientId: process.env.CLIENT_ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = (body, callback) => {
   var userName = body.userName;
   var email = body.email;
   var password = body.password;
   var attributeList = [];
   
   attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
   userPool.signUp(userName, password, attributeList, null, (err, result)=> {
     if (err)
         callback(err);
     var cognitoUser = result.user;
     callback(null, cognitoUser);
   });

   
};

exports.ConfirmRegisteration = (body,callback)=>{
    var userName = body.userName;
    var verificationCode = body.verificationCode;
    var userData = {
        Username: userName,
        Pool: userPool
    }
    new AmazonCognitoIdentity.CognitoUser(userData).confirmRegistration(verificationCode,true,callback);
}


exports.Login = (body, callback) => {
    var userName = body.userName;
    var password = body.password;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: userName,
         Password: password
     });
     var userData = {
         Username: userName,
         Pool: userPool
     }
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: (result) =>{
            var accesstoken = result.getAccessToken().getJwtToken();
            var idToken = result.getIdToken().getJwtToken();
            var refreshToken = result.getRefreshToken().getToken();
            callback(null, {
                accesstoken: accesstoken,
                idToken: idToken,
                refreshToken: refreshToken
            });
         },
         onFailure: ((err)=> {
            callback(err);
        })
    })
 };
