#!/usr/bin/envnode'usestrict';const{exec}=require('child-process-promise');
constchalk=require('chalk');
const{join}=require('path');
constsemver=require('semver');
constyargs=require('yargs');
constfs=require('fs');constINSTALL_PACKAGES=['react-dom','react','react-test-renderer'];
constREGRESSION_FOLDER='build-regression';constROOT_PATH=join(__dirname,'..','..');constbuildPath=join(ROOT_PATH,`build`,'oss-experimental');
constregressionBuildPath=join(ROOT_PATH,REGRESSION_FOLDER);constargv=yargs(process.argv.slice(2)).argv;constversion=process.argv[2];
constshouldReplaceBuild=!!argv.replaceBuild;asyncfunctiondownloadRegressionBuild(){
console.log(chalk.bold.white(`DownloadingReactv${version}\n`));//Makebuilddirectoryfortemporarymoduleswe'regoingtodownload
//fromNPM
console.log(
chalk.white(
`MakeBuilddirectoryat${chalk.underline.blue(regressionBuildPath)}\n`
)
);
awaitexec(`mkdir${regressionBuildPath}`);//InstallallnecessaryReactpackagesthathavethesameversion
constdownloadPackagesStr=INSTALL_PACKAGES.reduce(
(str,name)=>`${str}${name}@${version}`,
''
);
awaitexec(
`npminstall--prefix${REGRESSION_FOLDER}${downloadPackagesStr}`
);//Ifweshouldn'treplacethebuildfolder,wecanstopherenow
//beforewemodifyanything
if(!shouldReplaceBuild){
return;
}//Removeallthepackagesthatwedownloadedintheoriginalbuildfolder
//sowecanmovethemodulesfromtheregressionbuildover
constremovePackagesStr=INSTALL_PACKAGES.reduce(
(str,name)=>`${str}${join(buildPath,name)}`,
''
);
console.log(
chalk.white(
`Removing${removePackagesStr
.split('')
.map(str=>chalk.underline.blue(str)+'\n')
.join('')}\n`
)
);
awaitexec(`rm-r${removePackagesStr}`);//Moveallpackagesthatwedownloadedtotheoriginalbuildfolder
//Weneedtoseparatelymovetheschedulerpackagebecauseitmight
//becalledschedule
constmovePackageString=INSTALL_PACKAGES.reduce(
(str,name)=>`${str}${join(regressionBuildPath,'node_modules',name)}`,
''
);
console.log(
chalk.white(
`Moving${movePackageString
.split('')
.map(str=>chalk.underline.blue(str)+'\n')
.join('')}to${chalk.underline.blue(buildPath)}\n`
)
);
awaitexec(`mv${movePackageString}${buildPath}`);//ForReactversionsearlierthan18.0.0,weexplicitlyschedulerv0.20.1,which
//isthefirstversionthathasunstable_mock,whichDevToolstestsneed,butalso
//hasScheduler.unstable_trace,which,althoughwedon'tuseinDevToolstests
//isimportedbyolderReactversionsandwillbreakifit'snotthere
if(semver.lte(semver.coerce(version).version,'18.0.0')){
awaitexec(`npminstall--prefix${REGRESSION_FOLDER}scheduler@0.20.1`);
}//Inv16.5,scheduleriscalledschedule.Weneedtomakesurewealsomove
//thisover.Otherwisethecodewillbreak.
if(fs.existsSync(join(regressionBuildPath,'node_modules','schedule'))){
console.log(chalk.white(`Downloadingschedule\n`));
awaitexec(
`mv${join(regressionBuildPath,'node_modules','schedule')}${buildPath}`
);
}else{
console.log(chalk.white(`Downloadingscheduler\n`));
awaitexec(`rm-r${join(buildPath,'scheduler')}`);
awaitexec(
`mv${join(
regressionBuildPath,
'node_modules',
'scheduler'
)}${buildPath}`
);
}
}asyncfunctionmain(){
try{
if(!version){
console.log(chalk.red('MustspecifyReactversiontodownload'));
return;
}
awaitdownloadRegressionBuild();
}catch(e){
console.log(chalk.red(e));
}finally{
//Weshouldn'tremovetheregression-buildfolderunlesswe'reusing
//ittoreplacethebuildfolder
if(shouldReplaceBuild){
console.log(chalk.bold.white(`Removingregressionbuild`));
awaitexec(`rm-r${regressionBuildPath}`);
}
}
}main();
