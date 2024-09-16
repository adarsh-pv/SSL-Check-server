const {checkSSLService} = require('../services/sslService');

const checkSSL = async (req, res) => {
  const { domain } = req.body;
  console.log(domain,"domain")

  if (!domain) {
    return res.status(400).json({error: 'Domain name is required.'});
  }
  try {
    const sslInfo = await checkSSLService(domain);
    return res.status(200).json(sslInfo);
  } catch (error) {
    return res.status(500).json({ error: 'Could not fetch SSL certificate info.' });
  }
};
module.exports ={checkSSL}
