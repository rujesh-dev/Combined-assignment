const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';
const z = require('zod');

/**
 * Generates a JWT that includes a user's role (admin or guest).
 * * @param {string} username - The user's email.
 * @param {string} role - The user's role, must be either 'admin' or 'guest'.
 * @returns {string|null} A JWT if role is valid; otherwise null.
 */
function signJwtWithRole(username, role) {
    // Your code here
    const userZodSchema = z.object({
        // username: z.string().email(),
        role : z.enum(['admin', 'guest'])
    })

    const result = userZodSchema.safeParse({username, role});

    if(!result.success){
        return null
    }else{
        return jwt.sign({username, role}, jwtPassword)
        
    }
}

/**
 * Checks if a given token belongs to an admin.
 * * @param {string} token - The JWT string.
 * @returns {boolean} True if the role in the payload is 'admin', false otherwise.
 */
function isAdmin(token) {
    // Your code here
   try{
     const decode = jwt.verify(token, jwtPassword);
    return decode.role === "admin";
    }catch(e){
        return false
    }

    const decode = jwt.verify(token, jwtPassword);
    if(decode.role === "admin"){
        return true
    }else{
        return false
    }

   
}

module.exports = {
    signJwtWithRole,
    isAdmin,
    jwtPassword
};