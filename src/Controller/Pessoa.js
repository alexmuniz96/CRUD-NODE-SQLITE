import { openDb } from '../configDB.js'


export async function createTable() {
  const db = await openDb()

  await db.exec(`
    CREATE TABLE IF NOT EXISTS 
    pessoa (id INTEGER PRIMARY KEY,
    nome TEXT,
    sobrenome TEXT,
    cpf INTEGER,
    idade INTEGER)
  `)

  await db.close()
}

export async function insertPessoa(req, res) {
  let pessoa = req.body
  const db = await openDb()

  await db.run(`
    INSERT INTO pessoa(nome,sobrenome,cpf,idade) 
    VALUES(?,?,?,?)`,
    [pessoa.nome, pessoa.sobrenome, pessoa.cpf, pessoa.idade]
  );
  res.json({
    "statusCode": 200
  })

  await db.close()
}

export async function updatePessoa(req, res) {
  let pessoa = req.body

  const db = await openDb()

  await db.run(`
    UPDATE pessoa SET nome=?,sobrenome=?,cpf=?,idade=? WHERE id=?`,
    [pessoa.nome, pessoa.sobrenome, pessoa.cpf, pessoa.idade, pessoa.id]
  );
  res.json({
    "statusCode": 200
  })


  await db.close()
}

export async function selectPessoas(req, res) {
  const db = await openDb()

  await db.all(`SELECT * FROM pessoa`)
    .then(pessoas => res.json(pessoas))
}

export async function selectPessoa(req, res) {
  let id = req.body.id
  const db = await openDb()

  await db.get(`SELECT * FROM pessoa WHERE id=?`, [id])
    .then(pessoa => res.json(pessoa))

}

export async function deletePessoa(req, res) {
  let id = req.body.id
  const db = await openDb()

  await db.get(`DELETE FROM pessoa WHERE id=?`, [id])
    .then(res => res);
  res.json({
    "statusCode": 200
  })


}






