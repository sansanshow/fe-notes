const cmd = require('node-cmd')
var exec = require('child_process').exec;

module.exports = (name, env) => {
  // let cmd = 'cd D:\\workspace\\fingure-bank\\mcollect-fe'
  // exec(cmd, (err, stdout, stderr) => {
  //   if(err) {
  //       console.log(err);
  //       return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  //   exec('ls', (err2, stdout2, stderr2) => {
  //     if(err2) {
  //         console.log(err2);
  //         return;
  //     }
  //     console.log(`stdout2: ${stdout2}`);
  //     console.log(`stderr2: ${stderr2}`);
  //   })
  // })

  // exec(cmd, function(error, stdout, stderr) {
  //   // 获取命令执行的输出
  //   console.log(error, stdout, stderr)
  // });

  cmd.get(
    `cd D:\\workspace\\fingure-bank
    ls`,
    function(err, data, stderr){
      if (!err) {
        console.log('cd :\n',data)
        // cmd.get('ls',
        //   (err1, data1, stderr1) => {
        //     console.log('ls: \n', data1)
        //   })
      } else {
        console.log('error', err)
      }

    }
  );

  // cmd.get(
  //   'ls',
  //   function(err, data, stderr){
  //     console.log('the current dir contains these files :\n\n',data)
  //   }
  // );
}