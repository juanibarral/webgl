const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/demo.html'))
})

app.get('/taller_01', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_01.html'))
})

app.get('/taller_02', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_02.html'))
})

app.get('/taller_03', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_03.html'))
})

app.get('/taller_04', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_04.html'))
})

app.get('/taller_05', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_05.html'))
})

app.get('/taller_06', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_06.html'))
})

app.get('/taller_07', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_07.html'))
})

app.get('/taller_08', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_08.html'))
})

app.get('/taller_09', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_09.html'))
})

app.get('/taller_10', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_10.html'))
})

app.get('/taller_11', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_11.html'))
})

app.get('/taller_12', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_12.html'))
})

app.get('/taller_13', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_13.html'))
})

app.get('/taller_14', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_14.html'))
})

app.get('/taller_15', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_15.html'))
})

app.get('/taller_16', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_16.html'))
})

app.get('/taller_17', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_17.html'))
})

app.get('/taller_18', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_18.html'))
})

app.get('/taller_19', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller_19.html'))
})

app.get('/tester', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tester.html'))
})

app.get('/taller', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/taller.html'))
})

app.get('/tallerthreejs', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tallerthreejs.html'))
})

app.get('/tallerobj', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tallerobj.html'))
})

app.get('/tallerplane', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/tallerplane.html'))
})

app.listen(port, () => {
  console.log(`Example application listening at http://localhost:${port}`)
})