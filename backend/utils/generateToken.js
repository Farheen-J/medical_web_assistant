import jwt from 'jsonwebtoken'

const generateToken = (id) =>{
    return jwt.sign({id},"\x77\x65\x62\x61\x73\x73\x69\x73\x74\x61\x6e\x63\x65",{
        expiresIn:'30d'
    })
}

export default generateToken