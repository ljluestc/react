#!/bin/bashset-emkdir-pbuild/devtoolscdpackages/react-devtools
npmpack
mv./react-devtools*.tgz../../build/devtools/cd../react-devtools-core
npmpack
mv./react-devtools-core*.tgz../../build/devtools/cd../react-devtools-inline
npmpack
mv./react-devtools-inline*.tgz../../build/devtools/cd../react-devtools-extensions
yarnbuild
mv./chrome/build/ReactDevTools.zip../../build/devtools/chrome-extension.zip
mv./firefox/build/ReactDevTools.zip../../build/devtools/firefox-extension.zip#CompressallDevToolsartifactsintoasingletarballforeasydownload
cd../../build/devtools
tar-zcvf../devtools.tgz.