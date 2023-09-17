/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/import*asReactfrom'react';importstylesfrom'./ChartNode.css';typeProps={color:string,height:number,isDimmed?:boolean,label:string,onClick:(event:SyntheticMouseEvent<any>)=>mixed,onDoubleClick?:(event:SyntheticMouseEvent<any>)=>mixed,onMouseEnter:(event:SyntheticMouseEvent<any>)=>mixed,onMouseLeave:(event:SyntheticMouseEvent<any>)=>mixed,placeLabelAboveNode?:boolean,textStyle?:Object,width:number,x:number,y:number,};constminWidthToDisplay=35;exportdefaultfunctionChartNode({color,height,isDimmed=false,label,onClick,onMouseEnter,onMouseLeave,onDoubleClick,textStyle,width,x,y,}:Props):React.Node{return(<gclassName={styles.Group}transform={`translate(${x},${y})`}><rectwidth={width}height={height}fill={color}onClick={onClick}onMouseEnter={onMouseEnter}onMouseLeave={onMouseLeave}onDoubleClick={onDoubleClick}className={styles.Rect}style={{opacity:isDimmed?0.5:1,}}/>{width>=minWidthToDisplay&&(<foreignObjectwidth={width}height={height}className={styles.ForeignObject}style={{paddingLeft:x<0?-x:0,opacity:isDimmed?0.75:1,display:width<minWidthToDisplay?'none':'block',}}y={0}><divclassName={styles.Div}style={textStyle}>{label}</div></foreignObject>)}</g>);}