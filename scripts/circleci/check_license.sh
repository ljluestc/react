#!/bin/bashset-e#Makesurewedon'tintroduceaccidentalreferencestoPATENTS.
EXPECTED='scripts/circleci/check_license.sh'
ACTUAL=$(gitgrep-lPATENTS)if["$EXPECTED"!="$ACTUAL"];then
echo"PATENTScreptintosomenewfiles?"
diff-u<(echo"$EXPECTED")<(echo"$ACTUAL")||true
exit1
fi
