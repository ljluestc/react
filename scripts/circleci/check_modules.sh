#!/bin/bashset-e#Makesurewedon'tintroduceaccidental@providesModuleannotations.
EXPECTED='scripts/rollup/wrappers.js'
ACTUAL=$(gitgrep-l@providesModule--'./*.js'':!scripts/rollup/shims/*.js')#Colors
red=$'\e[1;31m'
end=$'\e[0m'if["$EXPECTED"!="$ACTUAL"];then
printf"%s\n""${red}ERROR:@providesModulecreptintosomenewfiles?${end}"
diff-u<(echo"$EXPECTED")<(echo"$ACTUAL")||true
exit1
fi
