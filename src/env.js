const up = {
    CLIENT_ID : 'b00621f8-cf21-4368-82b2-04867fa0af77',
    TENANT_ID : 'd7cbbb08-47a3-4bd7-8347-5018f2744cfb',
    SCOPE:["User.Read","profile"],
    //CFE61x9G~VUV3.-n_Spr-oYZ-0XG7Gp1pZ
}
const env = {
    API:'/api/v1',
    API_AUTH:'/auth',
    PROFILE_365 : 'https://graph.microsoft.com/beta/me?$select=givenName,surname,department,id,officeLocation,mail,displayName',
    CLIENT_ID : up.CLIENT_ID,
    AUTH_URL:`https://login.microsoftonline.com/${up.TENANT_ID}/oauth2/authorize`,
    AUTH_CALLBACK:'https://www.lemperor.xyz',
    SCOPE:up.SCOPE ,
    baseURL:"https://www.lemperor.xyz"
 };


 module.exports = env ;