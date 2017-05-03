const vapidKeys = {
  publicKey:'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM',
  privateKey: 'efx_7WzMG84FsdrU-38LzoB9WhE-U2zcWtNQiXzeGPs'
};

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

  router.get('/subscription', function(req, res) {
    console.log('Server subscription chosen')
    res.sendFile('index.html', options)
  })

  router.get('/marina*', function(req, res) {
    console.log('Server marina chosen')
    res.sendFile('index.html', options)
  })
}
