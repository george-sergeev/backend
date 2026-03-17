// backend/server.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

// --- Разрешаем все запросы с любого источника ---
app.use(cors())
app.use(express.json())

// --- Чтение JSON файлов из папки data ---
function readJSON(file) {
  const fullPath = path.join(__dirname, 'data', file)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  return JSON.parse(raw)
}

const nfts = readJSON('nfts.json')
const creators = readJSON('creators.json')
const collections = readJSON('collections.json')

console.log('NFTs loaded:', nfts.length)
console.log('Creators loaded:', creators.length)
console.log('Collections loaded:', collections.length)

// --- API маршруты ---
app.get('/api/nfts', (req, res) => res.json(nfts))
app.get('/api/nfts/:id', (req, res) => {
  const nft = nfts.find(n => n.id === req.params.id)
  if (!nft) return res.status(404).json({ error: 'NFT not found' })
  res.json(nft)
})

app.get('/api/creators', (req, res) => res.json(creators))
app.get('/api/collections', (req, res) => res.json(collections))

// --- Запуск сервера на всех интерфейсах VPS ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running at http://0.0.0.0:${PORT}`)
})
