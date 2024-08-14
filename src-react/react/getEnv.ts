import dotenv from 'dotenv'

dotenv.config()

export default function getEnv() {
  return {port: process.env['PORT'], host: process.env['HOST']}
}