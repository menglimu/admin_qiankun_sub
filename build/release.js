/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

const readFileSync = require("fs").readFileSync;
const execSync = require("child_process").execSync; // 同步子进程
const join = require("path").join;

const log = execSync("git log -1")
  .toString()
  .trim()
  .split("\n")
  .filter(el => el)
  .map(item => {
    return item.trim();
  });

const branch = execSync("git branch -vv")
  .toString()
  .trim()
  .split("\n")
  .filter(el => el)
  .map(item => {
    return item.trim();
  });

const outJsonDefault = {
  commit: log[0].replace("commit", "").trim(),
  commitTime: new Date(log[2].replace("Date:", "").trim()).toLocaleString(),
  lastComment: execSync("git show -s --format=%s")
    .toString()
    .trim(),
  branch: branch[0],
  lastAuthor: log[1].replace("Author: ", ""),
  buildDateTime: new Date().toLocaleString(),
  gitAddress: execSync("git remote -v")
    .toString()
    .trim()
    .split("\n")
    .join(" , ")
};
console.log("写入版本信息");
// 写入版本信息
fs.writeFileSync(join(__dirname, "../dist/version.json"), JSON.stringify(outJsonDefault, null, 2));
