export default function ( router, server ) {
  const options = {
    root: __dirname + '/../public'
   }

  router.get('/', function(req, res) {
    res.sendFile('index.html', options)
  })

  // These repetitive routes need abstracting
  router.get('/setup', function(req, res) {
    console.log('Server setup chosen')
    res.sendFile('index.html', options)
  })

  router.get('/marina*', function(req, res) {
    console.log('Server marina chosen')
    res.sendFile('index.html', options)
  })
}
