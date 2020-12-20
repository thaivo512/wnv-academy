const {OAuth2Client} = require('google-auth-library');

const clientId = '233633475297-iraf1qjlm6lvotjd5kqc32alt9840qs5.apps.googleusercontent.com';
const client = new OAuth2Client(clientId);

async function verify(token) {
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId
        });
        
        const payload = ticket.getPayload();
    
        return {
            name: payload.name,
            email: payload.email
        }
    }
    catch(err){
        console.log(err)
        return null;
    }
  }


module.exports = {
    verify
};