/* uba v3
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2017-12-20 17:53:25
 */

const os = require("os");
const fs = require("fs");
const chalk = require("chalk");
const argv = require("minimist")(process.argv.slice(2));
const commands = argv._;
const util = require("./util");

//强制第一时间检查node版本，低版本不兼容
util.checkNodeVersion(6);

//检测输入命令集合参数
if (commands.length === 0) {
  //无参数传递 eg. uba
  if (argv.version || argv.v) {
    util.getVersion();
  }
  //显示帮助
  util.getHelp();
  //并且检测npm上最新的uba版本提示
  util.checkUbaNewVersion().then(v => {
    console.log(chalk.yellow(`The latest version of NPM : v${v.version}`));
  }).catch(err => {
    console.log(chalk.red("check uba version fail timeout!"));
  });
} else {
  //当有参数传递 eg. uba server
  //获得uba运行时的一些参数用于传递给插件使用
  let opts = {
    cmd: commands,
    argv: argv,
    name: require("../package.json").name
  };

  //检测调用的插件是否存在？不存在给出警告
  let pluginPath = util.findPluginPath(commands[0]);
  if (pluginPath) {
    if (require(`uba-${commands[0]}`).plugin) {
      require(`uba-${commands[0]}`).plugin(opts);
    } else {
      console.log(chalk.red("  Error : Plugin internal error."));
    }
  }
}
