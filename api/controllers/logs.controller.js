
exports.get_logs = (req, res) => {
    var retVal = logsHelper.readLogs();
    
    res.status(200).send({
      success: 'true',
      message: 'Success',
      data: retVal
    })
  };

exports.write_logs = (req, res) => {
    var setId = 0;
    if (req.query.setId) {
      setId = req.query.setId;
    }
  console.log(req.query);
    logsHelper.writeLogs(req.query.msgCode, setId);
    
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
    })
  }


