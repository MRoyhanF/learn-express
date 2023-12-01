const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require ("./response")

app.use(bodyParser.json())

app.get("/", (req, res) => {
    response(200,"API v1 ready to go", "SUCCESS", res)
})

// start ambil semuda data 
app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "ini message", res)
    })
})
// end ambil semuda data

// start cari data dari nim
app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, `spesifik mahasiswa by id ${nim}`, res)
    })
})
// end cari data dari nim

// start tambah data
app.post('/mahasiswa', (req, res) => {
    const {nim, namaLengkap, kelas, alamat} = req.body

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`
    
    db.query(sql,(err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(200, data, "Data Added Succesfully", res)
        }
        console.log(fields)
    })
})
// end tambah data

// start edit data
app.put('/mahasiswa', (req, res) => {
    const {nim, namaLengkap, kelas, alamat} = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = '${nim}'`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }  
            response(200, data, "Update data successfully", res)
        }else{
            response(404, "User not found", "Data Error", res)
        }
    })
})
// end edit data

// start delete data
app.delete('/mahasiswa', (req, res) => {
    const {nim} = req.body
    const sql = ` DELETE FROM mahasiswa WHERE nim = '${nim}'`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)

        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }  
            response(200, data, "Deleted data Successfully ", res)
        }else{
            response(404, "User not found", "Data Error", res)
        }
    })
})
// end delete data




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})