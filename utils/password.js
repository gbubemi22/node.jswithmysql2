import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
     const hashedPassword = await bcrypt.hash(password, 10);
     return hashedPassword;
};

export const comparePassword = async (password, hash) => {
     const isPasswordValid = await bcrypt.compare(password, hash);
     return isPasswordValid;
};