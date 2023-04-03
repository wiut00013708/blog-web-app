const express = require('express')
const app = express()
const fs = require('fs')
const { title } = require('process')
const id = require('uniqid')
const port = 3000

app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  let published = req.query.published

  let posts = readData('posts')

  if(published){
    res.render('index', {published: true, posts: posts})  
  }
  else{
    res.render('index', {published: false, posts: posts} )
  }
})

app.get('/create', (req, res) => {
  res.render('create', {})
})

app.post('/create', (req, res) => {
  let data = req.body

  let post = {
    id: id(),
    title: data.title,
    content: data.content,
    tags: data.tags
  }
  // basic validation if content is empty
  if(post.title.trim() === ''){    
    res.render('create', {titleError: true})
  }
  else if(post.content.trim() === ''){
    res.render('create', {contentError: true})
  }
  else{
    let posts = readData('posts')

    posts.push(post)
  
    writeData('posts', posts)
  
    res.render('create', {success: true})
  }

})

app.get('/:id', (req, res) => {
  const id = req.params.id
  let posts = readData('posts')
  let post = posts.filter(post => post.id == id)[0]
  res.render('post', {post: post})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`)
})

function readData(file){
  return JSON.parse(fs.readFileSync(`./data/${file}.json`))
}

function writeData(file, data){
  return fs.writeFileSync(`./data/${file}.json`, JSON.stringify(data))
}





