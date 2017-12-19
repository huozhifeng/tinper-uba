/* uba v3
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2017-12-19 22:49:14
 */

const os = require("os");
const fs = require("fs");
const chalk = require("chalk");
const argv = require("minimist")(process.argv.slice(2));
const commands = argv._;
const resolve = require("resolve");
const path = require("path");
const util = require("./util");

//强制第一时间检查node版本，低版本不兼容
util.checkNodeVersion(6);



if (commands.length === 0) {
  //无参数传递 uba
  if (argv.version || argv.v) {
    util.getVersion();
  }
  util.getHelp();
} else {
  //当有参数传递 uba server
  var opts = {
    cmd: commands,
    argv: argv,
    name: require("../package.json").name
  };
  //得到插件的完整路径
  var pluginPath = util.findPluginPath(commands[0]);
  if (pluginPath) {
    if (require(`uba-${commands[0]}`).plugin) {
      require(`uba-${commands[0]}`).plugin(opts);
    } else {
      console.log(chalk.red("  Error : Plugin internal error."));
    }
  }
}
