'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
    co(function *() {
        // 分步接收用户输入的参数
        let tplName = yield prompt('Template name: ')
        let projectName = yield prompt('Project name: ')
        let gitUrl
        let branch

        if (!config.tpl[tplName]) {
            console.log(chalk.red('\n x Template does not exit!'))
            process.exit()
        }
        gitUrl = config.tpl[tplName].url
        branch = config.tpl[tplName].branch

        // git命令，远程拉取项目并自定义项目名
        let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
        console.log(chalk.white('\n Start generating...'))
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                process.exit()
            }
            console.log(chalk.green('\n √ Generation completed!'))
            console.log(`\n cd ${projectName} && npm install \n`)
            process.exit()
        })
    })
}
