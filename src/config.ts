/* eslint-disable prettier/prettier */
export const config = () => ({
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || 'TopSecret51@',
  mongoUri: process.env.MONGO_URi || 'mongodb://localhost:27017/ecommerce-api',
});
