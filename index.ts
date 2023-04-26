import express, { Application, Request, Response } from 'express'
const app: Application = express()
const port: number = 3000
const env: any = process.env

const pgp = require('pg-promise')()
const cn = {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD
}
const db = pgp(cn)

app.get('/cruds', (req: Request, res: Response) => {
  db.any('SELECT * FROM cruds')
    .then((data: any) => {
      res.send(data)
    })
})

app.listen(port)
