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

    	print oneT "beforeEach(function() {"
        	print twoT "angular.module('blt_config', []);"
        	print twoT "angular.module('blt_dataRoutes', []);"
        	print twoT "angular.module('blt_appProfile', []);"
        	print twoT "angular.module('blt_appViews', []);"
    	print oneT "});\n"
    

    	print oneT "beforeEach(module('blt_core', function($provide){"
    		print twoT "$provide.value('config', { defaultLogLevel: \"error\", debug: true });"
    	print oneT "}));\n" 

		print oneT "beforeEach(module('truncate'));"
   		print oneT "beforeEach(module('blt_" COMPO "'));"
    	print oneT "beforeEach(module('templates'));\n"


    	print oneT "var element;"
		print oneT "var outerScope;"
    	print oneT "var innerScope;\n"

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
		print fourT "'data-model=\"value\" ' +"	
		for (i in attr_arr_required) {
			print fourT "'data-" attr_arr_required[i] "=\"{{" attr_arr_required[i] "}}\" ' + "		
		} 
	} 

}


function before_each_outer_closing() {			 
		print threeT "'></blt-" COMPO "></form>');\n" 
		print threeT "outerScope = $rootScope;"
		print threeT "$compile(element)(outerScope); \n"

		print threeT "innerScope = element.isolateScope();"
		print threeT "outerScope.$digest();"
	print twoT "}));\n"

}


function before_each_basic_closing() {			 
		print threeT "'></blt-" COMPO "></form>');\n" 
		print threeT "outerScope = $rootScope;"
		print threeT "$compile(element)(outerScope); \n"

		print threeT "innerScope = element.isolateScope();"
	print oneT "}));\n"

}


function after_each() {
	if ( length(arr_api_warn) > 0 || length(arr_api_error) > 0 ) {
		print oneT "afterEach(function() {"
			if (length(arr_api_error) > 0 ) { print threeT "api.error.restore();"}
			if (length(arr_api_warn) > 0 ) { print threeT "api.warn.restore();"}
		print oneT "});\n"
	}
}


function print_attribute(attribute,    i,    j) {
	for (i in one_way_binding_arr) {
		if (attribute ~ one_way_binding_arr[i]) {
			print fourT "'data-" one_way_binding_arr[i] "=\" \" ' + "
			i=0
			return		
		}
	} 

	for (j in text_binding_arr) {
		if (attribute ~ text_binding_arr[j]) {
			print fourT "'data-" text_binding_arr[j] "=\"{{" text_binding_arr[j] "}}\" ' + "
			j=0		
			return
		}
	} 

}


function describe_bind_on_create(    i) {

	print oneT "describe('will bind on create', function() {\n"
	
	before_each_basic_opening();
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
}


function it_check_unadded_not_there(    i) {
	for (i in one_way_binding_arr) {	
		print twoT "it('should NOT have " one_way_binding_arr[i] " without setting a value', function() {"
    		print threeT "expect(element[0].children[0].hasAttribute('data-" one_way_binding_arr[i] "')).to.equal(false);"
   		print twoT "});\n"
	}

}


function print_type_spec_attr(str,    i) {
	for (i in str) {
		print fourT "'data-" str[i] " =\" \" ' +"
	}
}


function describe_test_each_type(    i,   j,   k,    str) {
	for (i in attr_arr_data_types) {

		TYPE=attr_arr_data_types[i]
		split(specific_to_type[TYPE], str, " ")
		print oneT "describe('test type " attr_arr_data_types[i] "', function() {\n"
		before_each_basic_opening()
		print fourT "'data-type=\"" TYPE "\"' + "
		print_type_spec_attr(str)

		
		before_each_basic_closing()

		it_accept_valid_type()
		it_not_accept_invalid_type()

		if (length(str) > 0) { 
			for (k in str) {
				attr=str[k]
				it_attr_should_be_attached_to_DOM(attr, TYPE)
			}  
		}

		print oneT "});\n"
	}
}


function print_outer_scope_apply(    attribute) {
			print threeT "const valueToTest = 'FILL ME OUT';\n"
	    	print threeT "outerScope.$apply(function() {"

           	print fourT "outerScope." attribute " = valueToTest;"
        print threeT "});\n"
}



function it_accept_valid_type(    attribute) {	
	attribute = "value"

	print twoT "it('should accept valid " TYPE "', function() {"
		print_outer_scope_apply(attribute)

        print threeT "expect(element[0].children[0].children[0].children[1].value).to.equal(valueToTest.toString());"
       	print threeT "expect(element[0].classList.value).include('ng-valid-" TYPE "');"
   	print twoT "});\n"

}


function it_not_accept_invalid_type(   attribute) {	
	attribute="value"
	print threeT "/*it('should not accept invalid " TYPE "', function() {"
		print_outer_scope_apply(attribute)

       	print threeT "expect(element[0].classList.value).include('ng-invalid-" TYPE "');"
   	print twoT "});*/\n"

}


function it_attr_should_be_attached_to_DOM(attr, TYPE) {
	print twoT "it('should have " attr " with its value showing up on the DOM', function() {"
       	print threeT "expect(element[0].children[0].getAttribute('data-" attr "').to.equal('');"
    print twoT "});\n"

}


function describe_test_non_type_spec_attr_text(    i,    j,    k) {
	print oneT "describe('test non-type specific text bound attributes', function() {\n"

	before_each_basic_opening()

	for (j in text_binding_arr) {
		print_attribute(text_binding_arr[j])
	}

	before_each_outer_closing()

		for (k in attr_arr_required) {
			it_should_have_non_type_spec_attr_text(attr_arr_required[k])
		}

		for (i in text_binding_arr) {
			it_should_have_non_type_spec_attr_text(text_binding_arr[i])
		}
	print oneT "});\n"

}


function it_should_have_non_type_spec_attr_text(attribute) {
	print twoT "it('should accept " attribute "', function() {"
	print_outer_scope_apply(attribute)
		print threeT "expect(element[0].children[0].getAttribute('data-" attribute "')).equal(valueToTest.toString());"
	print twoT "});\n"
}


function describe_test_non_type_spec_attr_one_way(    i,    j) {
	print oneT "describe('test non-type specific one way bound attributes', function() {\n"

	before_each_basic_opening()

	for (i in one_way_binding_arr) {
		print_attribute(one_way_binding_arr[i])
	}

	before_each_outer_closing()

		for (j in one_way_binding_arr) {
			it_should_have_non_type_spec_attr_one_way(one_way_binding_arr[j])
		}

	print oneT "});\n"

}

function it_should_have_non_type_spec_attr_one_way(attribute) {
	print twoT "it('should accept " attribute "', function() {"
		print threeT "expect(element[0].children[0].getAttribute('data-" attribute "')).equal('');"
	print twoT "});\n"
}


function describe_test_messages(msg, api_func, line_num) {
    print oneT "describe('test api " api_func " called on line " line_num " in " COMPO " module', function() {\n"
        print twoT "// set up whatever you need to make api " api_func " get called"
        print twoT "beforeEach(inject(function($rootScope, $compile) {"
            print threeT "element = angular.element('<form><blt-" COMPO " ' +\n"

            print threeT "'></blt-" COMPO "></form>');\n"

            print threeT "sinon.spy(api, '"api_func"');"
            print threeT "outerScope = $rootScope;"
            print threeT "$compile(element)(outerScope);"

            print threeT "innerScope = element.isolateScope();"

            print threeT "outerScope.$digest();"
        print twoT "}));\n"

        print twoT "it('api " api_func " should have been called', function() {"

            print threeT "expect(api." api_func ").to.be.calledWithExactly(" msg ");"
        print fourT "});\n"

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
		arr_all_attr_type_spec[num_arr_all_attr_type_spec++] = ATTR;
		sub(/`[^`]*`/, "", line)
	}
}


# find all the 'api.error' messages
/api.error\(/, /);/ {
	lerror=$0
	sub(/api.error\(/, "", lerror)
	gsub(/);/, "", lerror)
	gsub(/\n/, "", lerror)
	if (/\);/) {
		arr_api_error[number_arr_api_error] = arr_api_error[number_arr_api_error] lerror
		number_arr_api_error++ 
	} else {
		arr_api_error[number_arr_api_error] = arr_api_error[number_arr_api_error] lerror
	}
} 


# find all the 'api.warn' messages
/api.warn\(/, /);/ {
	lwarn=$0
	sub(/api.warn\(/, "", lwarn)
	gsub(/);/, "", lwarn)
	gsub(/\n/, "", lwarn)
	if (/\);/) {
		arr_api_warn[number_arr_api_warn] = arr_api_warn[number_arr_api_warn] lwarn
		number_arr_api_warn++ 
	} else {
		arr_api_warn[number_arr_api_warn] = arr_api_warn[number_arr_api_warn] lwarn
	}
} 


# find line numbers of 'api.error' and 'api.warn'
/api.error\(/ { arr_api_error_line_num[number_arr_api_error_line_num++]=NR }
/api.warn\(/ { arr_api_warn_line_num[number_arr_api_warn_line_num++]=NR }


END {

# find attr specific to a particular type
 for (y in arr_attr_all) {
	for (x in arr_all_attr_type_spec) {

		if (x ~ length(arr_all_attr_type_spec)-1 && arr_all_attr_type_spec[x] !~ arr_attr_all[y]) {
			arr_not_specific_to_type[num_arr_not_specific_to_type++] = arr_attr_all[y]		
			print arr_not_specific_to_type[num_arr_not_specific_to_type]
		}

		if (arr_all_attr_type_spec[x] ~ arr_attr_all[y]) {
			break
		}
	}
}

	describe_basic_opening();
	before_each_basic_opening();
	before_each_outer_closing();
	after_each();

	#describe_bind_on_create();

    #if (length(attr_arr_data_types) > 0) { describe_test_each_type(); };
    #describe_test_non_type_spec_attr_text();
    #describe_test_non_type_spec_attr_one_way();

    if (length(arr_api_error) > 0) {
    err = "error"
    	for (v in arr_api_error) {
    		describe_test_messages(arr_api_error[v], err, arr_api_error_line_num[u]) 
    		u++
    	}
    }

    if (length(arr_api_warn) > 0) {
   		wrn = "warn"
    	for (t in arr_api_warn) {
    		describe_test_messages(arr_api_warn[t], wrn, arr_api_warn_line_num[s]) 
    		s++
    	}
    }

   
    describe_basic_closing();
    ####################################################### GET RID TYPE SPEC IN non-type-spec describes


}