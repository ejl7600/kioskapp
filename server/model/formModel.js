const db = require('../database.js');

async function addSubmission(requestData) {
    return new Promise((resolve, reject) => {
      //Prepare the SQL query for insertion (avoids possible injection vuln)
      const stmt = db.prepare(
        `INSERT INTO submissions (sessionKey, date, destination, phoneNumber, partySize, duration) 
         VALUES (?, ?, ?, ?, ?, ?)`
      );
  
      const { sessionKey, date, destination, phoneNumber, partySize, tripDuration } = requestData;
  
      //Run the prepared statement with the provided data
      stmt.run([sessionKey, date, destination, phoneNumber, partySize, tripDuration], function (err) {
        if (err) {
          reject({success: false});  //Reject the promise if there's an error
        } else {
          resolve({success: true, rowID: this.lastID });  //Resolve with the newly inserted row's ID
        }
      });
  
      //Finalize the statement after use
      stmt.finalize((err) => {
        if (err) {
          console.error('Error finalizing statement:', err.message);
        }
      });
    });
  }

  module.exports = {
    addSubmission
  }