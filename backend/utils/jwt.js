import jwt from 'jsonwebtoken';


const getToken =  (name,email,id,isAdmin) => {
    const accessToken = jwt.sign({
        id,
        email,
        name,
        isAdmin
    },
        process.env.ACCESS_SECRET,
        {
         expiresIn:'30mins'
        })
    
    return accessToken;
}


const decodeToken = (token) => {
    // console.log({
    //     token
    // })
    const secret = process.env.ACCESS_SECRET;
    // console.log({
    //     secret,
    //     token
    // })
    const decodedValue = jwt.verify(
        token,
        secret,    
    )
     
    // console.log(decodedValue)
    return decodedValue;
}

export {
    getToken,
    decodeToken
}