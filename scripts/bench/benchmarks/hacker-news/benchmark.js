(function () {
  'use strict';  const e = React.createElement;  function timeAge(time) {
const now = new Date().getTime() / 1000;
const minutes = (now - time) / 60;if (minutes < 60) {
return Math.round(minutes) + ' minutes ago';
}
return Math.round(minutes / 60) + ' hours ago';
  }  function getHostUrl(url) {
return (url + '')
.replace('https://', '')
.replace('http://', '')
.split('/')[0];
  }  function HeaderBar() {
return e(
'tr',
{
style: {
backgroundColor: '#222',
},
},
e(
'table',
{
style: {
padding: 4,
},
width: '100%',
cellSpacing: 0,
cellPadding: 0,
},
e(
'tbody',
null,
e('td',
{
 style: {
th: 18,
dingRight: 4,
 },
},
e(
 'a',
 {
f: '#',
 },
 e('img', {
: 'logo.png',
th: 16,
ght: 16,
le: {
border: '1px solid #00d8ff',

 })
)'td',
{
 style: {
eHeight: '12pt',
 },
 height: 10,
},
e(
 'span',
 {
ssName: 'pagetop',
 },
 e('b', {className: 'hnname'}, 'React HN Benchmark'),
 e('a', {href: '#'}, 'new'),
 ' | ',
 e('a', {href: '#'}, 'comments'),
 ' | ',
 e('a', {href: '#'}, 'show'),
 ' | ',
 e('a', {href: '#'}, 'ask'),
 ' | ',
 e('a', {href: '#'}, 'jobs'),
 ' | ',
 e('a', {href: '#'}, 'submit')
))
)
)
);
  }  function Story({story, rank}) {
return [
e(
'tr',
{
className: 'athing',
},
e(
'td',
{verticalAlign: 'top',
textAlign: 'right',title',
},
e(className: 'rank',)
),
e(
'td',
{
votelinks',verticalAlign: 'top',},
e('a',
{
 href: '#',
},
e('div', {
 className: 'votearrow',
 title: 'upvote',
}))
),
e(
'td',
{
title',
},
e(href: '#',
className: 'storylink',),
story.url 'span',
 {
ssName: 'sitebit comhead',
 },
 ' (',
 e(
,

href: '#',

HostUrl(story.url)
 ),
 ')'
))
),
e(
'tr',
null,
e('td', {
colSpan: 2,
}),
e(
'td',
{
subtext',
},
e(className: 'score',re} points`
),
' by ',
e(href: '#',
className: 'hnuser',),
' ',
e(className: 'age','a',
{
 href: '#',
},
timeAge(story.time)),
' | ',
e(href: '#',),
' | ',
e(href: '#',cendants || 0} comments`
)
)
),
e('tr', {
style: {
height: 5,
},
className: 'spacer',
}),
];
  }  function StoryList({stories}) {
return e(
'tr',
null,
e(
'td',
null,
e(
'table',
{
 0,
 0,
itemlist',
},
e((story, i) =>
e(Story, {story, rank: ++i, key: story.id}))
)
)
);
  }  function App({stories}) {
return e(
'center',
null,
e(
'table',
{
id: 'hnmain',
border: 0,
cellPadding: 0,
cellSpacing: 0,
width: '85%',
style: {
color': '#f6f6ef',
},
},
e(
'tbody',
null,
e(HeaderBar, null),
e('tr', {height: 10}),
e(StoryList, {})
)
)
);
  }  const app = document.getElementById('app');  window.render = function render() {
ReactDOM.render(
React.createElement(App, {
stories: window.stories,
}),
app
);
  };
})();
