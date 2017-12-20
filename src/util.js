/* util
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-12-19 22:49:14
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2017-12-20 13:13:58
 */

const chalk = require("chalk");
const api = require('api-npm');

/**
 * 获得uba的帮助信息
 */
exports.getHelp = () => {
  console.log();
  console.log(chalk.green("  Usage: uba <plugin-name>"));
  console.log();
  console.log(chalk.green("  Options:"));
  console.log();
  console.log(chalk.green("    -h, --help     output usage information"));
  console.log(chalk.green("    -v, --version  output the version number"));
  console.log();
}

/**
 * 检测node.js的指定运行版本
 * @param {*} number 版本号A
 */
exports.checkNodeVersion = (number = 6) => {
  var currentNodeVersion = process.versions.node;
  if (currentNodeVersion.split(".")[0] < number) {
    console.error(chalk.red(`You are running Node ${currentNodeVersion}\nCreate Uba App requires Node 6 or higher. \nPlease update your version of Node.`));
    process.exit(1);
  }
}

/**
 * 根据插件名称来获得插件真实路径
 * @param {*} command 插件名
 */
exports.findPluginPath = (command) => {
  if (command && /^\w+$/.test(command)) {
    try {
      return resolve.sync('uba-' + command, {
        paths: [path.join(__dirname, '..', 'node_modules')]
      });
    } catch (e) {
      console.log('');
      console.log('  ' + chalk.green(command) + ' command is not installed.');
      console.log('  You can try to install it by ' + chalk.blue.bold('npm install uba-' + command) + '.');
      console.log('');
    }
  }
}


/**
 * 获得uba版本
 */
exports.getVersion = () => {
  console.log(chalk.green(require("../package.json").version));
  process.exit(0);
}

/**
 * 检测最新的uba版本
 */
exports.checkUbaNewVersion = () => {
  return new Promise((resolve, reject) => {
    api.getdetails("uba", data => {
      if (data) {
        resolve({
          "version": data["dist-tags"].latest,
          "success": true
        });
      } else {
        reject({
          "success": false
        });
      }
    });
  });
}
