import express, { Application, Request, Response } from 'express'
const app: Application = express()
const port: number = 3000
const env: any = process.env

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const pgp = require('pg-promise')()
const cn = {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD
}
const db = pgp(cn)

app.route('/cruds')
  .post((req: Request, res: Response) => {
    db.query(
      'INSERT INTO cruds (value, created_at, updated_at) VALUES ($1, now(), now())',
      [req.body.value]
    ).then(() => {
      res.end()
    })
  })
  .get((req: Request, res: Response) => {
    db.any('SELECT * FROM cruds ORDER BY id')
      .then((data: any) => {
        res.send(data)
      })
  })
app.route('/cruds/:id')
  .patch((req: Request, res: Response) => {
    db.query(
      'UPDATE cruds SET value = $1, updated_at = now() WHERE id = $2',
      [req.body.value, req.params.id]
    ).then(() => {
      res.end()
    })
  })
  .delete((req: Request, res: Response) => {
    db.query(
      'DELETE FROM cruds WHERE id = $1',
      [req.params.id]
    ).then(() => {
      res.end()
    })
  })

app.listen(port)
