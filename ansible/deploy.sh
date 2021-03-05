#!/bin/bash
basepath=$(cd `dirname $0`; pwd)
rootpath="${basepath%/*}"
exec_cmd_nobail() {
    echo "+ $1"
    bash -c "$1"
}
if [ "x$1" = "x" ]; then
    exec_cmd_nobail "tar -zcvf /tmp/dist.tar.gz -C ${rootpath}/dist ."
else
    exec_cmd_nobail "tar -zcvf /tmp/${1}.tar.gz -C ${rootpath}/${1} ."
fi

