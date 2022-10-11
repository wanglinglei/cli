#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ejs = require("ejs");

const cssEnum = {
  less: {
    lang: "lang='less'",
    package: `,"less-loader":"^7.0"`,
    loaderOptions:
      "less: {lessOptions: {modifyVars: {'primary-color': '#ec6800'},javascriptEnabled: true,},}",
  },
  sass: {
    lang: "lang='less'",
  },
  none: {
    lang: "",
    package: "",
    loaderOptions: "",
  },
};

inquirer
  .prompt([
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称",
    },
    {
      type: "list",
      name: "css",
      message: "css预处理语言",
      default: 0,
      choices: [
        { value: "less", name: "less" },
        { value: "sass", name: "sass" },
        { value: "none", name: "none" },
      ],
    },
  ])
  .then((answers) => {
    console.log(answers);
    answers = {
      ...answers,
      cssOption: cssEnum[answers.css],
    };
    const temp = path.join(__dirname, "templates");
    const destDir = process.cwd();
    function getFiles(OriginFilePath, CopyFilePath) {
      //读取newFile文件夹下的文件
      fs.readdir(OriginFilePath, { withFileTypes: true }, (err, files) => {
        for (let file of files) {
          //判断是否是文件夹，不是则直接复制文件到newFile中
          if (!file.isDirectory()) {
            //获取旧文件夹中要复制的文件
            const OriginFile = path.resolve(OriginFilePath, file.name);
            //获取新文件夹中复制的地方
            const CopyFile = path.resolve(CopyFilePath, file.name);
            //将文件从旧文件夹复制到新文件夹中
            fs.copyFileSync(OriginFile, CopyFile);
            ejs.renderFile(OriginFile, answers, (err, result) => {
              if (err) throw err;
              fs.writeFileSync(CopyFile, result);
            });
          } else {
            //如果是文件夹就递归变量把最新的文件夹路径传过去
            const CopyDirPath = path.resolve(CopyFilePath, file.name);
            const OriginDirPath = path.resolve(OriginFilePath, file.name);
            fs.mkdir(CopyDirPath, (err) => {});
            // OriginFilePath = OriginPath
            // CopyFilePath = DirPath
            getFiles(OriginDirPath, CopyDirPath);
          }
        }
      });
    }
    getFiles(temp, destDir);
    // fse.copy(temp, destDir, (err) => {
    //   if (err) throw err;
    //   console.log("success");
    // });
  });
