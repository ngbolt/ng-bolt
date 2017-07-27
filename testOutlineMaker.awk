#!/bin/awk -f
# USER GUIDE - 
#	Windows Users (Linux, Unix-derived skip straight to step (4))
#	(1) Download Cygwin
#	(2) cd into bolt project folder 
#	(3) run commands:		sed -i 's/\r$//' testOutlineMaker.awk
#							sed -i 's/\r$//' start.bash
#	(4) run command:		bash start.bash
#

function describe_basic_opening() {
	print "'use strict'; "
	print "describe('" COMPO "', function() { \n"

   		print oneT "beforeEach(module('blt_" COMPO "'));"
    	print oneT "beforeEach(module('templates'));\n"

    	print oneT "var element;"
		print oneT "var outerScope;"
    	print oneT "var innerScope;"

}


function describe_basic_closing() {
	print "\n});\n"	

}


function before_each_basic_opening() {
	print twoT "beforeEach(inject(function($rootScope, $compile) {"
		print threeT "element = angular.element('<form><blt-" COMPO " ' +"
		print_required_attributes() 

}


function print_required_attributes() {
	if (length(attr_arr_required) != 0) {
		print threeT "'data-model=\"value\" ' +"	
		for (i in attr_arr_required) {
			print threeT "'data-" attr_arr_required[i] "=\"{{" attr_arr_required[i] "}}\" ' + "		
		} 
	} 

}


function before_each_outer_closing() {			 
		print twoT "'></blt-" COMPO "></form>');\n" 
		print twoT "outerScope = $rootScope;"
		print twoT "$compile(element)(outerScope); \n"

		print twoT "innerScope = element.isolateScope();"
		print twoT "outerScope.$digest();"
	print twoT "}));\n"

}


function before_each_basic_closing() {			 
		print threeT "'></blt-" COMPO "></form>');\n" 
		print threeT "outerScope = $rootScope;"
		print threeT "$compile(element)(outerScope); \n"

		print threeT "innerScope = element.isolateScope();"
	print oneT "}));\n"

}


function print_text_attributes(   i) {
	if (length(text_binding_arr) != 0) {	
		for (i in text_binding_arr) {
			print threeT "'data-" text_binding_arr[i] "=\"{{" text_binding_arr[i] "}}\" ' + "		
		} 
	} 
}


function print_attribute(attribute,    i,    j) {
	for (i in one_way_binding_arr) {
		if (attribute ~ one_way_binding_arr[i]) {
			print threeT "'data-" one_way_binding_arr[i] "=\"FILL ME OUT\" ' + "
			return		
		}
	} 

	for (j in text_binding_arr) {
		if (attribute ~ text_binding_arr[i]) {
			print threeT "'data-" text_binding_arr[j] "=\"{{" text_binding_arr[j] "}}\" ' + "		
			return
		}
	} 

}


function describe_bind_on_create(    i) {

	print oneT "describe('will bind on create', function() {"
	
	before_each_basic_opening();
	print_text_attributes();
	before_each_outer_closing();

	it_attr_present_wo_setting()
	it_check_unadded_not_there()	

	print oneT "});\n"

}


function it_attr_present_wo_setting(    i,    j) {
	for (j in attr_arr_required) {	
		print twoT "it('should have " attr_arr_required[j] " even without setting a value', function() {"
    		print threeT "expect(element[0].children[0].hasAttribute('data-" attr_arr_required[j] "')).to.equal(true);"
   		print twoT "});\n"
	}
	for (i in text_binding_arr) {	
		print twoT "it('should have " text_binding_arr[i] " even without setting a value', function() {"
    		print threeT "expect(element[0].children[0].hasAttribute('data-" text_binding_arr[i] "')).to.equal(true);"
   		print twoT "});\n"
	}
}


function it_check_unadded_not_there(    i) {
	for (i in one_way_binding_arr) {	
		print twoT "it('should NOT have " one_way_binding_arr[i] " without setting a value', function() {"
    		print threeT "expect(element[0].children[0].hasAttribute('data-" one_way_binding_arr[i] "')).to.equal(false);"
   		print twoT "});\n"
	}

}


function describe_test_each_type(    i,   j,   k,    str) {
	for (i in attr_arr_data_types) {

		TYPE=attr_arr_data_types[i]
		split(specific_to_type[TYPE], str, " ")
		print oneT "describe('test type " attr_arr_data_types[i] "', function() {"
		before_each_basic_opening()
		print threeT "'data-type=\"" TYPE "\"' + "
			if (length(str) > 0) { 
				for (j in str) {
					print_attribute(str[j])
				}	 
			}
		
		before_each_basic_closing()

		it_accept_valid_type()
		it_not_accept_invalid_type()

		if (length(str) > 0) { 
			for (k in str) {
				attr=str[k]
				it_should_have_set_attr(attr, TYPE)	
				it_attr_should_be_attached_to_DOM(attr, TYPE)
			}  
		}

		print oneT "});\n"
	}
}


function it_accept_valid_type() {	
	print twoT "it('should accept valid " TYPE "', function() {"
    	print threeT "outerScope.$apply(function() {"

           	print fourT "outerScope.value = FILL ME OUT;"
        print threeT "});"

       	print threeT "expect(element[0].classList.value).include('ng-valid-" TYPE "');"
   	print twoT "});\n"

}


function it_not_accept_invalid_type() {	
	print twoT "/*it('should not accept invalid " TYPE "', function() {"
    	print threeT "outerScope.$apply(function() {"

           	print fourT "outerScope.value = FILL ME OUT;"
        print threeT "});"

       	print threeT "expect(element[0].classList.value).include('ng-invalid-" TYPE "');"
   	print twoT "});*/\n"

}


function it_should_have_set_attr(attr, TYPE) {
		print twoT "it('should have " attr "(" TYPE "-type specific)', function() {"
           	print threeT "expect(element[0].children[0].hasAttribute('data-"attr"')).to.equal(true);"
        print twoT "});\n"
}


function it_attr_should_be_attached_to_DOM(attr, TYPE) {
	print twoT "it('should have " attr "\\'s value showing up on the DOM', function() {"
       	print threeT "expect(element[0].children[0].getAttribute('data-"attr"')).to.equal('FILL ME OUT WITH SAME VALUE AS SET IN BEFORE EACH');"
    print twoT "});\n"
}


function describe_test_non_type_spec_attr() {
	print oneT "describe('test non-type specific atributes', function() {"

	print oneT "});\n"
}


BEGIN {
	oneT="\t";
	twoT="\t\t";	
	threeT="\t\t\t";
	fourT="\t\t\t\t";
}



/\@param/ && in_param == 0 { in_param=1 }
in_param && /\*\// { in_param=0 }


# make attribute arrays 
#		attr_arr_required - array of attributes required by the component
#		unrequired_attr_arr - array of attributes not required for the component
#		param_type_/@[bool expres number string]/_arr - arrays for different param types
#		attr_arr_all - array of all attributes
$2 ~ /\@param/ {
	gsub(/[\{\}]/, "")
	sub(/data-/, " ")


	if ( $4 ~ /^[^\[]/ ) {
		attr_arr_required[num_required_attr_arr++] = $4	
	} else {
		gsub(/[\[\]]/, "")	
		unrequired_attr_arr[num_unrequired_attr_arr++] = $4
	}

	arr_attr_all[num_attr_arr_all++] = $4
	
	#switch($3) {
	#		case "boolean":
	#			@attr_string[param] = boolean
	#			break	
	#		case "expression":
	#			@attr_string[param] = expression
	#			break
	#		case "number":
	#			@attr_string[param] = number
	#			break
	#		case "string":	
	#			@attr_string[param] = string
	#			break
	#		default:
	#			break
	#	}
}


/\@param/ { ATTR=$4 }


# find all attributes and sort into arrays based on bindings and also one super array of 
# all attr
/bindings: \{/, /\}/ { 
		gsub(/:/, "")
		gsub(/\047/, "")	# get rid of single quotes
		gsub(/\054/, "")	# get rid of commas
		
		switch($2) {
			case /\=/:
				for (a in unrequired_attr_arr) {
					if ($1 == unrequired_attr_arr[a]) {
						two_way_binding_arr[num_two_way_binding_arr++] = $1
						break
					}
				}
				break	
			case /\@/:
				for (b in unrequired_attr_arr) {
					if ($1 == unrequired_attr_arr[b]) {
						text_binding_arr[num_text_binding_arr++] = $1
						break
					}
				}			
				break
			case /</:
				for (c in unrequired_attr_arr) {
					if ($1 == unrequired_attr_arr[c]) {
						one_way_binding_arr[num_one_way_binding_arr++] = $1
						break
					}
				}
				break
			case /\&/:
				for (d in unrequired_attr_arr) {
					if ($1 == unrequired_attr_arr[d]) {
						method_binding_arr[num_method_binding_arr++] = $1
						break
					}
				}
				break
			default:
				break
		}
		
		attr_arr[num_attr_binding_arr++] = $1	
} 


# find different types of data collected by compo	
$4 ~ /type/ && /\`/ && in_param {
	line = $0;

	while (match(line, /`([^`]*)`/, ticked)) {
		attr_arr_data_types[num_attr_arr_data_types++] = ticked[1];
		sub(/`[^`]*`/, "", line)
	}
}


# find attr specific to a particular type
in_param && /`data-type/ {
	line=$0

	while (match(line, /"([^`]*)"/, dquoted)) {
		# get rid of [ ] data -
		gsub(/-/, "", dquoted[0])
		specific_to_type[dquoted[1]] = specific_to_type[dquoted[1]] " " ATTR;
		num_specific_to_type++
		
		
		sub(/`[^`]*`/, "", line)
	}
}



END {

# find attr specific to a particular type
#for (z in arr_attr_all) {
#	for (x in specific_to_type) {
#		#if (specific_to_type[x] == arr_attr_all[y]) {
#		#	break
#		#}
#
#		#if (specific_to_type[x] != arr_attr_all[y] && x == num_specific_to_type) {
#		#	arr_not_specific_to_type[num_arr_not_specific_to_type] = arr_attr_all[z]
#		#}
#		print specific_to_type[x]
#	}
#}

	describe_basic_opening();
	before_each_basic_opening();
	before_each_outer_closing();

	describe_bind_on_create();

    if (length(attr_arr_data_types) > 0) { describe_test_each_type(); };
    #describe_test_non_type_spec_attr();
    describe_basic_closing();

}