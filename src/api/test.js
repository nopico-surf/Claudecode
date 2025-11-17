// Teste muito simples para verificar se serverless functions funcionam
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.status(200).json({
    success: true,
    message: 'Serverless function funcionando!',
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  });
};
