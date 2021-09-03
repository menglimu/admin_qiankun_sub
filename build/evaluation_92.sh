#!/bin/bash

buildPath="build"
time=`date "+%Y-%m-%d_%H:%M:%S"`
name="dist"
cdir=$PWD
port=50788
server="-p$port root@10.10.77.92"

pk="~/develop_enviroment/server_key/liudk.private"

s_app_space="/data/test/wwwroot"

touch result


function deploy(){
  
	if [ ! -d "$1" ] ;then
		echo "the $1 is not found"
		exit		
	fi

	
        fileNewName=$name"-"$time".tar.gz"
	# cp $1 $cdir/$fileNewName
  tar -zcf $fileNewName $1
        #echo "zip ~/$fileNewName $buildPath -r"
        #zip ~/$fileNewName $buildPath -r

	execs "ls -al $s_app_space"
	
	read -p "please input the deploy file path:" filePath

	if [ ! -n "$filePath" ] ;then
		echo "you have not input flie path!"
	else 
		echo "the file path you input is $filePath"
		execs "[ -d $s_app_space/$filePath ] && echo \"found\" || echo \"not found\""
		r=$(cat result)
		echo $r
		if [ "$r" = "found" ] ;then
			send $cdir/$fileNewName $s_app_space/$filePath
			execs "tar -zxf  $s_app_space/$filePath/$fileNewName -C $s_app_space/$filePath/"
			
			execs "cp $s_app_space/$filePath/$fileNewName $s_app_space/$filePath/$name.latest.tar.gz"
			echo "finish"
			rm -f  $cdir/$fileNewName
		else 
			echo "not found , deploy failed"
		fi
	fi


}


function rollback(){
      
 
	execs "ls -l $s_app_space"

	read -p "please input the deploy file path:" filePath  

	execs "ls -l $s_app_space/$filePath"

        read -p "please input the rollback file name:" fileName



        if  [ ! -n "$fileName" ] ;then
            echo "you have not input flie name!"
        else
            echo "the file name you input is $fileName"
            if [ ! ${fileName##*.}="zip" ]; then
                echo "the file type is wrong,please input zip file"
                fileName=""
            fi
        fi

        if  [ ! -n "$fileName" ] ;then
            echo "rollback is fail"
        else
            ssh $server "unzip -o /data/wwwroot/bigwei_pc/$fileName -d /data/wwwroot/bigwei_pc/"
            if [[ $? -ne 0 ]]; then
                echo "rollback is fail"
            else
                echo "rollback is ok"
            fi
        fi
        

        
        
}

function send(){
	echo "send file $1 to $2"
	scp -P $port -i $pk $1 $server:$2
}
function execs(){
	echo "exec $1"
	ssh -i $pk $server $1 >result   1>&1
	cat result
}


function main(){
        case $1 in
                d )
                        
                        deploy $2
                        ;;
        esac
        case $1 in
                r )
                        rollback
                        ;;
        esac
}
main $1 $2
rm -f result
exit;
