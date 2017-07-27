#!/bin/bash
# USER GUIDE - 
#	Windows Users (Linux, Unix-derived skip straight to step (4))
#	(1) Download Cygwin
#   (2) Save 'start.bash' and 'testOutlineMaker.awk' into your bolt project
#	(2) cd into bolt project folder if not already there
#	(3) run commands:		sed -i 's/\r$//' testOutlineMaker.awk
#							sed -i 's/\r$//' start.bash
#	(4) run command:		bash start.bash
#   (5) follow prompts

#COMPO=textfield

function get_compo_name() {
	read -p "Enter the name of the component you wish to unit test: " COMPO
}


function find_and_copy_compo_module() {
	cp src/components/"$COMPO"/"$COMPO".module.js  src/test/components/temp."$COMPO".module.js
	# print at the top of temp file what it is and what to do if it still hangs around
}


function make_mocha_file() {
	touch src/test/components/"$COMPO".mocha.js
	#printf "test/components/"$COMPO".mocha.js test/components/temp."$COMPO".module.js" > test/components/"$COMPO".mocha.js
}

get_compo_name
find_and_copy_compo_module
make_mocha_file	

awk -v COMPO=$COMPO -f testOutlineMaker.awk src/test/components/temp."$COMPO".module.js > src/test/components/"$COMPO".mocha.js
#cat src/test/components/"$COMPO".mocha.js
rm src/test/components/temp."$COMPO".module.js
