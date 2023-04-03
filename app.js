const express = require('express')
const app = express()
const fs = require('fs')
const { title } = require('process')
const id = require('uniqid')
const port = 3000

app.set('view engine', 'pug')
app.use(express.json())
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

// Routes
const functions = require("./routes/functions")


app.get('/', (req, res) => {

  let posts = functions.readData('posts')

  res.render('index', {posts: posts})  
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
    let posts = functions.readData('posts')
    posts.push(post)
    functions.writeData('posts', posts)
    res.render('create', {success: true})
  }

})

app.get('/:id', (req, res) => {
  const id = req.params.id
  let posts = functions.readData('posts')
  let post = posts.filter(post => post.id == id)[0]
  res.render('post', {post: post})
})

app.get('/:id/delete', (req, res) => {
  const id = req.params.id
  const posts = functions.readData('posts')
  const filteredPosts = posts.filter(post => post.id != id)
  functions.writeData('posts', filteredPosts)
  res.redirect('/')      
  })

  app.get('/:id/edit', (req, res) => {
    let data = req.body
    const id = req.params.id
    const posts = functions.readData('posts')
    const post = posts.filter(post => post.id == id) 
    res.render('edit', {post: post})

  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`)
})





