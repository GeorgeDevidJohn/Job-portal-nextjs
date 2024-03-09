import { NextRequest } from "next/server";

export const getRoleFromToken = (request: NextRequest) => {
    var jwt = require('jsonwebtoken');

    try {
        // Retrieve the token from the cookies
        const token = request.cookies.get("token")?.value || '';

        // Verify and decode the token using the secret key
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return the user ID from the decoded token
        return decodedToken.role;

    } catch (error: any) {
        throw new Error(error.message)
        
    }
}