import hasOwnProperty from 'shared/hasOwnProperty';import isArray from 'shared/isArray';function formatLanes(laneArray) {  const lanes = laneArray.reduce((current, reduced) => current + reduced, 0);  return '0b' + lanes.toString(2).padStart(31, '0');}// test() is part of Jest's serializer APIexport function test(maybeTimelineData) {  if (maybeTimelineData != null &&typeof maybeTimelineData === 'object' &&hasOwnProperty.call(maybeTimelineData, 'lanes') &&isArray(maybeTimelineData.lanes)  ) {return true;  }  return false;}// print() is part of Jest's serializer APIexport function print(timelineData, serialize, indent) {  return serialize({...timelineData,lanes: formatLanes(timelineData.lanes),  });}