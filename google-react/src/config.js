const prod = {
 googleClientId : '739996951745-mj3std2rjp40epr1rquut0a55a94j3eg.apps.googleusercontent.com'
}

const dev = {
    googleClientId : '739996951745-mj3std2rjp40epr1rquut0a55a94j3eg.apps.googleusercontent.com',
    apiURL : 'http://localhost:3005/api/v1/'
   }

   export  const config = process.env.NODE_ENV === 'development' ? dev : prod; 