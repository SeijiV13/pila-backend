const { exec } = require('child_process');


exports.start_db = (req, res) => {
    exec(`start powershell "cd ${req.body.rootFolder}; json-server --watch db.json"`, (err, stdout, stderr) => {
      if (err) {
        console.log(`${err}`);
        return;
      }
  
      res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
      })
    });
  }
  