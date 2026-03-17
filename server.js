const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// Функция для чтения JSON файлов
function readJSON(file) {
    const fullPath = path.join(__dirname, 'data', file)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    return JSON.parse(raw)
}

// Загружаем данные
const nfts = readJSON('nfts.json')
const creators = readJSON('creators.json')
const collections = readJSON('collections.json')

console.log('NFTs loaded:', nfts.length)
console.log('Creators loaded:', creators.length)
console.log('Collections loaded:', collections.length)

// API маршруты
app.get('/api/nfts', (req, res) => res.json(nfts))
app.get('/api/nfts/:id', (req, res) => {
    const nft = nfts.find(n => n.id === req.params.id)
    if (!nft) return res.status(404).json({ error: 'NFT not found' })
    res.json(nft)
})

app.get('/api/creators', (req, res) => res.json(creators))
app.get('/api/creators/:id', (req, res) => {
    const creator = creators.find(c => c.uniqueCode === req.params.id)
    if (!creator) return res.status(404).json({ error: 'Creator not found' })
    res.json(creator)
})

app.get('/api/collections', (req, res) => res.json(collections))
app.get('/api/collections/:id', (req, res) => {
    const collection = collections.find(c => c.id === req.params.id)
    if (!collection) return res.status(404).json({ error: 'Collection not found' })
    res.json(collection)
})

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Backend API running at http://localhost:${PORT}`)
})
