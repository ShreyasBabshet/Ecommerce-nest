import * as bcrypt from 'bcryptjs';

export const generateHashPassword = async (password: string): Promise<string> => {
    console.log(password);
    const salt = 10;
    return await bcrypt.hash(password,salt)
}

export const comparePassword = async(
    password :string , hashPassowrd : string 
)=>{
    return await bcrypt.compare(password, hashPassowrd);
}