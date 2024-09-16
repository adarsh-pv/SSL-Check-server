const sslChecker = require('ssl-checker');
const https = require('https');
const pem = require('pem');

const checkSSLService = async (domain) => {
  try {
    const sslInfo = await sslChecker(domain);
    console.log('SSL Info for Domain:', sslInfo);
     if(sslInfo?.daysRemaining){
         const additionalInfo = await fetchAdditionalCertificateInfo(domain);
         console.log('Additional SSL Info for Domain:', domain, additionalInfo);
     
         const fullSslInfo = {
           valid: sslInfo?.valid,
           validFrom: sslInfo?.validFrom,
           validTo: sslInfo?.validTo,
           daysRemaining: sslInfo?.daysRemaining,
           issuer: additionalInfo?.issuer,
           subject: additionalInfo?.subject,
           validForDomain: additionalInfo?.validForDomain,
           isSelfSigned: additionalInfo?.isSelfSigned,
           caValid: additionalInfo?.caValid,
           crlStatus: additionalInfo?.crlStatus
         };
     
        //  process.exit(1)
         return fullSslInfo;
     }else{
        console.log("else")
     }
  } catch (error) {
    
    console.error('Error in checkSSLService:', error.message);
    // process.exit(1)
    throw new Error('Error fetching SSL certificate details');

  }
};

const fetchAdditionalCertificateInfo = async (domain) => {
  const options = {
    hostname: domain,
    port: 443,
    method: 'GET',
  };

  try {
    const certificate = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        const cert = res.socket.getPeerCertificate(true);
        if (!cert || !cert.raw) {
          reject(new Error('Could not retrieve certificate'));
        } else {
          resolve(cert);
        }
      });

      req.on('error', (e) => reject(e));
      req.end();
    });

    const pemCert = `-----BEGIN CERTIFICATE-----\n${certificate.raw.toString('base64').match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----`;

    return new Promise((resolve, reject) => {
      pem.readCertificateInfo(pemCert, (err, info) => {
        if (err) {
          reject(new Error('Error parsing certificate: ' + err.message));
        } else {
          console.log('Parsed Certificate Info:', info);

          const subjectCN = info?.subject?.CN || 'Unknown';
          const isValidForDomain = info?.san?.dns.includes(domain) || (subjectCN === domain);
          
          const crlStatus = info?.crl || 'Unknown'; 

          resolve({
            issuer: info.issuer || 'Unknown Issuer',
            subject: certificate.subject.CN || 'Unknown Subject',
            validForDomain: isValidForDomain,
            isSelfSigned: info.isSelfSigned || false,
            caValid: info.ca || false,
            crlStatus: crlStatus,
          });
        }
      });
    });
  } catch (error) {
    console.error('Error in fetchAdditionalCertificateInfo:', error.message);
    throw new Error('Error fetching SSL certificate details: ' + error.message);
  }
};

module.exports = { checkSSLService };
