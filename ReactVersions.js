'usestrict';//Thismoduleisthesinglesourceoftruthforversioningpackagesthatwe//publishtonpm.////Packageswillnotbepublishedunlesstheyareaddedhere.////The@latestchannelusestheversionas-is,e.g.:////18.3.0////The@canarychannelappendsadditionalinformation,withthescheme//<version>-<label>-<commit_sha>,e.g.:////18.3.0-canary-a1c2d3e4////The@experimentalchanneldoesn'tincludeaversion,onlyadateandasha,e.g.:////0.0.0-experimental-241c4467e-20200129constReactVersion='18.3.0';//Thelabelusedbythe@canarychannel.Representstheupcomingrelease's//stability.Mostofthetime,thiswillbe"canary",butwemaytemporarily//choosetochangeitto"alpha","beta","rc",etc.////Itonlyaffectsthelabelusedintheversionstring.Tocustomizethe//npmdisttagsusedduringpublish,referto.circleci/config.yml.constcanaryChannelLabel='canary';conststablePackages={'eslint-plugin-react-hooks':'5.0.0','jest-react':'0.15.0',react:ReactVersion,'react-art':ReactVersion,'react-dom':ReactVersion,'react-server-dom-webpack':ReactVersion,'react-is':ReactVersion,'react-reconciler':'0.30.0','react-refresh':'0.15.0','react-test-renderer':ReactVersion,'use-subscription':'1.9.0','use-sync-external-store':'1.3.0',scheduler:'0.24.0',};//Thesepackagesdonotexistinthe@canaryor@latestchannel,only//@experimental.Wedon'tusesemver,justthecommitsha,sothisisjusta//listofpackagenamesinsteadofamap.constexperimentalPackages=[];module.exports={ReactVersion,canaryChannelLabel,stablePackages,experimentalPackages,};