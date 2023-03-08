'version:2023-02-25 (6.11)';RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{RGraph.SVG.Line=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RGraph.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;if(name==='colors'){this.originalColors=RGraph.SVG.arrayClone(value);this.colorsParsed=false;}}
return this;};this.get=function(name)
{return this.properties[name];};this.id=conf.id;this.uid=RGraph.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RGraph.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.firstDraw=true;conf.data=RGraph.SVG.stringsToNumbers(conf.data);if(RGraph.SVG.isArray(conf.data)&&RGraph.SVG.isArray(conf.data[0])){this.data=RGraph.SVG.arrayClone(conf.data);}else if(RGraph.SVG.isArray(conf.data)){this.data=[RGraph.SVG.arrayClone(conf.data)];}else{this.data=[[]];}
this.type='line';this.coords=[];this.coords2=[];this.coordsSpline=[];this.hasMultipleDatasets=typeof this.data[0]==='object'&&typeof this.data[1]==='object'?true:false;this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.originalData=RGraph.SVG.arrayClone(this.data);this.filledGroups=[];RGraph.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,marginInner:0,backgroundColor:null,backgroundImage:null,backgroundImageStretch:true,backgroundImageAspect:'none',backgroundImageOpacity:null,backgroundImageX:null,backgroundImageY:null,backgroundImageW:null,backgroundImageH:null,backgroundGrid:true,backgroundGridColor:'#ddd',backgroundGridLinewidth:1,backgroundGridHlines:true,backgroundGridHlinesCount:null,backgroundGridVlines:true,backgroundGridVlinesCount:null,backgroundGridBorder:true,backgroundGridDashed:false,backgroundGridDotted:false,backgroundGridDashArray:null,colors:['red','#0f0','blue','#ff0','#0ff','green'],filled:false,filledDualColor:false,filledColors:[],filledClick:null,filledOpacity:1,filledAccumulative:false,yaxis:true,yaxisTickmarks:true,yaxisTickmarksLength:3,yaxisColor:'black',yaxisScale:true,yaxisLabels:null,yaxisLabelsOffsetx:0,yaxisLabelsOffsety:0,yaxisLabelsCount:5,yaxisScaleUnitsPre:'',yaxisScaleUnitsPost:'',yaxisScaleStrict:false,yaxisScaleDecimals:0,yaxisScalePoint:'.',yaxisScaleThousand:',',yaxisScaleRound:false,yaxisScaleMax:null,yaxisScaleMin:0,yaxisScaleFormatter:null,yaxisLabelsFont:null,yaxisLabelsSize:null,yaxisLabelsColor:null,yaxisLabelsBold:null,yaxisLabelsItalic:null,yaxisTitle:'',yaxisTitleBold:null,yaxisTitleSize:null,yaxisTitleFont:null,yaxisTitleColor:null,yaxisTitleItalic:null,yaxisTitleOffsetx:0,yaxisTitleOffsety:0,yaxisTitleX:null,yaxisTitleY:null,yaxisTitleHalign:null,yaxisTitleValign:null,xaxis:true,xaxisTickmarks:true,xaxisTickmarksLength:5,xaxisLabels:null,xaxisLabelsOffsetx:0,xaxisLabelsOffsety:0,xaxisLabelsPosition:'edge',xaxisLabelsPositionEdgeTickmarksCount:null,xaxisColor:'black',xaxisLabelsFont:null,xaxisLabelsSize:null,xaxisLabelsColor:null,xaxisLabelsBold:null,xaxisLabelsItalic:null,xaxisLabelsFormattedDecimals:0,xaxisLabelsFormattedPoint:'.',xaxisLabelsFormattedThousand:',',xaxisLabelsFormattedUnitsPre:'',xaxisLabelsFormattedUnitsPost:'',xaxisTitle:'',xaxisTitleBold:null,xaxisTitleSize:null,xaxisTitleFont:null,xaxisTitleColor:null,xaxisTitleItalic:null,xaxisTitleOffsetx:0,xaxisTitleOffsety:0,xaxisTitleX:null,xaxisTitleY:null,xaxisTitleHalign:null,xaxisTitleValign:null,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,text:null,linewidth:1,linejoin:'round',linecap:'round',tooltips:null,tooltipsOverride:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsEvent:'mousemove',tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,tickmarksStyle:'none',tickmarksSize:5,tickmarksFill:'white',tickmarksLinewidth:1,labelsAbove:false,labelsAboveFont:null,labelsAboveSize:null,labelsAboveBold:null,labelsAboveItalic:null,labelsAboveColor:null,labelsAboveBackground:'rgba(255,255,255,0.7)',labelsAboveBackgroundPadding:2,labelsAboveUnitsPre:null,labelsAboveUnitsPost:null,labelsAbovePoint:null,labelsAboveThousand:null,labelsAboveFormatter:null,labelsAboveDecimals:null,labelsAboveOffsetx:0,labelsAboveOffsety:-10,labelsAboveHalign:'center',labelsAboveValign:'bottom',labelsAboveSpecific:null,shadow:false,shadowOffsetx:2,shadowOffsety:2,shadowBlur:2,shadowColor:'rgba(0,0,0,0.25)',spline:false,stepped:false,title:'',titleX:null,titleY:null,titleHalign:'center',titleValign:null,titleSize:null,titleColor:null,titleFont:null,titleBold:null,titleItalic:null,titleSubtitle:null,titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,errorbars:null,errorbarsColor:'black',errorbarsLinewidth:1,errorbarsCapwidth:10,key:null,keyColors:null,keyOffsetx:0,keyOffsety:0,keyLabelsOffsetx:0,keyLabelsOffsety:-1,keyLabelsSize:null,keyLabelsBold:null,keyLabelsItalic:null,keyLabelsFont:null,keyLabelsColor:null,dasharray:[1,0],dashed:false,dotted:false,highlightFill:null,trendline:false,trendlineColors:['#666'],trendlineLinewidth:1,trendlineMargin:25,trendlineDashed:false,trendlineDotted:false,trendlineDashArray:null,trendlineClip:true,nullBridge:false,nullBridgeLinewidth:null,nullBridgeColors:null,nullBridgeDashArray:[5,5]};RGraph.SVG.getGlobals(this);if(RGraph.SVG.FX&&typeof RGraph.SVG.FX.decorate==='function'){RGraph.SVG.FX.decorate(this);}
this.responsive=RGraph.SVG.responsive;var properties=this.properties;this.draw=function()
{RGraph.SVG.fireCustomEvent(this,'onbeforedraw');this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));RGraph.SVG.createDefs(this);this.graphWidth=this.width-properties.marginLeft-properties.marginRight;this.graphHeight=this.height-properties.marginTop-properties.marginBottom;RGraph.SVG.resetColorsToOriginalValues({object:this});this.parseColors();this.coords=[];this.coords2=[];this.coordsSpline=[];this.data=RGraph.SVG.arrayClone(this.originalData);this.tooltipsSequentialIndex=0;if(properties.dashed){properties.dasharray=[5,5];}
if(properties.dotted){properties.dasharray=[1,4];}
this.data_seq=RGraph.SVG.arrayLinearize(this.data);if(properties.errorbars){for(var i=0;i<this.data_seq.length;++i){if(typeof properties.errorbars[i]==='undefined'||RGraph.SVG.isNull(properties.errorbars[i])){properties.errorbars[i]={max:null,min:null};}else if(typeof properties.errorbars[i]==='number'){properties.errorbars[i]={min:properties.errorbars[i],max:properties.errorbars[i]};}else if(typeof properties.errorbars[i]==='object'&&typeof properties.errorbars[i].max==='undefined'){properties.errorbars[i].max=null;}else if(typeof properties.errorbars[i]==='object'&&typeof properties.errorbars[i].min==='undefined'){properties.errorbars[i].min=null;}}}
for(var i=0,tmp=[];i<this.data.length;++i){for(var j=0;j<this.data[i].length;++j){if(typeof tmp[j]==='undefined'){tmp[j]=0;}
if(properties.filled&&properties.filledAccumulative){tmp[j]+=this.data[i][j];if(i===(this.data.length-1)){tmp[j]+=(properties.errorbars?properties.errorbars[RGraph.SVG.groupedIndexToSequential({object:this,dataset:i,index:j})].max:0)}}else{tmp[j]=Math.max(tmp[j],this.data[i][j]+(properties.errorbars?properties.errorbars[RGraph.SVG.groupedIndexToSequential({object:this,dataset:i,index:j})].max:0));}}}
var values=[];for(var i=0,max=0;i<this.data.length;++i){if(RGraph.SVG.isArray(this.data[i])&&!properties.filledAccumulative){values.push(RGraph.SVG.arrayMax(tmp));}else if(RGraph.SVG.isArray(this.data[i])&&properties.filled&&properties.filledAccumulative){for(var j=0;j<this.data[i].length;++j){values[j]=values[j]||0;values[j]=values[j]+this.data[i][j];this.data[i][j]=values[j];}}}
if(properties.filled&&properties.filledAccumulative){var max=RGraph.SVG.arrayMax(tmp)}else{var max=RGraph.SVG.arrayMax(values);}
if(typeof properties.yaxisScaleMax==='number'){max=properties.yaxisScaleMax;}
if(properties.yaxisScaleMin==='mirror'){this.mirrorScale=true;properties.yaxisScaleMin=0;}
this.scale=RGraph.SVG.getScale({object:this,numlabels:properties.yaxisLabelsCount,unitsPre:properties.yaxisScaleUnitsPre,unitsPost:properties.yaxisScaleUnitsPost,max:max,min:properties.yaxisScaleMin,point:properties.yaxisScalePoint,round:properties.yaxisScaleRound,thousand:properties.yaxisScaleThousand,decimals:properties.yaxisScaleDecimals,strict:typeof properties.yaxisScaleMax==='number',formatter:properties.yaxisScaleFormatter});if(this.mirrorScale){this.scale=RGraph.SVG.getScale({object:this,numlabels:properties.yaxisLabelsCount,unitsPre:properties.yaxisScaleUnitsPre,unitsPost:properties.yaxisScaleUnitsPost,max:this.scale.max,min:this.scale.max* -1,point:properties.yaxisScalePoint,round:false,thousand:properties.yaxisScaleThousand,decimals:properties.yaxisScaleDecimals,strict:typeof properties.yaxisScaleMax==='number',formatter:properties.yaxisScaleFormatter});}
this.max=this.scale.max;this.min=this.scale.min;RGraph.SVG.drawBackground(this);if(properties.xaxisLabels&&properties.xaxisLabels.length){if(typeof properties.xaxisLabels==='string'){properties.xaxisLabels=RGraph.SVG.arrayPad([],this.originalData[0].length,properties.xaxisLabels);}
for(var i=0;i<properties.xaxisLabels.length;++i){properties.xaxisLabels[i]=RGraph.SVG.labelSubstitution({object:this,text:properties.xaxisLabels[i],index:i,value:this.originalData[0][i],decimals:properties.xaxisLabelsFormattedDecimals||0,unitsPre:properties.xaxisLabelsFormattedUnitsPre||'',unitsPost:properties.xaxisLabelsFormattedUnitsPost||'',thousand:properties.xaxisLabelsFormattedThousand||',',point:properties.xaxisLabelsFormattedPoint||'.'});}}
RGraph.SVG.drawXAxis(this);RGraph.SVG.drawYAxis(this);for(var i=0;i<this.data.length;++i){this.drawLine(this.data[i],i);}
this.redrawLines();for(let i=0;i<this.data.length;++i){if((RGraph.SVG.isArray(properties.trendline)&&properties.trendline[i])||(!RGraph.SVG.isArray(properties.trendline)&&properties.trendline)){this.drawTrendline({dataset:i});}}
if(properties.nullBridge){for(var i=0;i<this.data.length;++i){this.nullBridge(i,this.data[i]);}}
if(typeof properties.key!==null&&RGraph.SVG.drawKey){RGraph.SVG.drawKey(this);}else if(!RGraph.SVG.isNull(properties.key)){alert('The drawKey() function does not exist - have you forgotten to include the key library?');}
this.drawLabelsAbove();var obj=this;document.body.addEventListener('mousedown',function(e)
{RGraph.SVG.removeHighlight(obj);},false);RGraph.SVG.addCustomText(this);RGraph.SVG.drawHorizontalLines(this);if(this.firstDraw){this.firstDraw=false;RGraph.SVG.fireCustomEvent(this,'onfirstdraw');}
RGraph.SVG.fireCustomEvent(this,'ondraw');return this;};this.create=function(definition)
{return RGraph.SVG.create.call(this,definition,arguments[1],arguments[2]);};this.drawLine=function(data,index)
{var coords=[],path=[];for(var i=0,len=data.length;i<len;++i){var val=data[i],x=(((this.graphWidth-properties.marginInner-properties.marginInner)/(len-1))*i)+properties.marginLeft+properties.marginInner,y=this.getYCoord(val);coords.push([x,y]);}
for(var i=0;i<coords.length;++i){if(i===0||RGraph.SVG.isNull(data[i])||RGraph.SVG.isNull(data[i-1])){var action='M';}else{if(properties.stepped){path.push('L {1} {2}'.format(coords[i][0],coords[i-1][1]));}
var action='L';}
path.push(action+'{1} {2}'.format(coords[i][0],RGraph.SVG.isNull(data[i])?0:coords[i][1]));}
for(var k=0;k<coords.length;++k){this.coords.push(RGraph.SVG.arrayClone(coords[k]));this.coords[this.coords.length-1].x=coords[k][0];this.coords[this.coords.length-1].y=coords[k][1];this.coords[this.coords.length-1].object=this;this.coords[this.coords.length-1].value=data[k];this.coords[this.coords.length-1].index=k;this.coords[this.coords.length-1].path=path;}
this.coords2[index]=RGraph.SVG.arrayClone(coords);for(var k=0;k<coords.length;++k){var seq=RGraph.SVG.groupedIndexToSequential({object:this,dataset:index,index:k});this.coords2[index][k].x=coords[k][0];this.coords2[index][k].y=coords[k][1];this.coords2[index][k].object=this;this.coords2[index][k].value=data[k];this.coords2[index][k].index=k;this.coords2[index][k].path=path;this.coords2[index][k].sequential=seq;if(properties.errorbars){this.drawErrorbar({object:this,dataset:index,index:k,sequential:seq,x:x,y:y});}}
if(properties.spline){this.coordsSpline[index]=this.drawSpline(coords);}
if(properties.filled===true||(typeof properties.filled==='object'&&properties.filled[index])){if(properties.spline){var fillPath=['M{1} {2}'.format(this.coordsSpline[index][0][0],this.coordsSpline[index][0][1])];for(var i=1;i<this.coordsSpline[index].length;++i){fillPath.push('L{1} {2}'.format(this.coordsSpline[index][i][0]+((i===(this.coordsSpline[index].length)-1)?1:0),this.coordsSpline[index][i][1]));}}else{var fillPath=RGraph.SVG.arrayClone(path);}
fillPath.push('L{1} {2}'.format(this.coords2[index][this.coords2[index].length-1][0]+1,index>0&&properties.filledAccumulative?(properties.spline?this.coordsSpline[index-1][this.coordsSpline[index-1].length-1][1]:this.coords2[index-1][this.coords2[index-1].length-1][1]):this.getYCoord(properties.yaxisScaleMin>0?properties.yaxisScaleMin:0)+(properties.xaxis?0:1)));if(index>0&&properties.filledAccumulative){var path2=RGraph.SVG.arrayClone(path);if(index>0&&properties.filledAccumulative){if(properties.spline){for(var i=this.coordsSpline[index-1].length-1;i>=0;--i){fillPath.push('L{1} {2}'.format(this.coordsSpline[index-1][i][0],this.coordsSpline[index-1][i][1]));}}else{for(var i=this.coords2[index-1].length-1;i>=0;--i){fillPath.push('L{1} {2}'.format(this.coords2[index-1][i][0],this.coords2[index-1][i][1]));if(properties.stepped&&i>0){fillPath.push('L{1} {2}'.format(this.coords2[index-1][i][0],this.coords2[index-1][i-1][1]));}}}}}else{fillPath.push('L{1} {2}'.format(this.coords2[index][0][0]+(properties.yaxis?0:0),this.getYCoord(properties.yaxisScaleMin>0?properties.yaxisScaleMin:0)+(properties.xaxis?0:1)));}
fillPath.push('L{1} {2}'.format(this.coords2[index][0][0]+(properties.yaxis?1:0),this.coords2[index][0][1]));for(var i=0;i<this.data[index].length;++i){if(!RGraph.SVG.isNull(this.data[index][i])){fillPath.push('L{1} {2}'.format(this.coords2[index][i][0],this.getYCoord(0)));break;}}
this.filledGroups[index]=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{'class':'rgraph_filled_line_'+index}});var fillPathObject=RGraph.SVG.create({svg:this.svg,parent:this.filledGroups[index],type:'path',attr:{d:fillPath.join(' '),stroke:'rgba(0,0,0,0)','fill':properties.filledColors&&properties.filledColors[index]?properties.filledColors[index]:properties.colors[index],'fill-opacity':properties.filledOpacity,'stroke-width':1,'clip-path':this.isTrace?'url(#trace-effect-clip)':''}});if(properties.filledClick){var obj=this;fillPathObject.addEventListener('click',function(e)
{properties.filledClick(e,obj,index);},false);fillPathObject.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}
if(properties.shadow){RGraph.SVG.setShadow({object:this,offsetx:properties.shadowOffsetx,offsety:properties.shadowOffsety,blur:properties.shadowBlur,color:properties.shadowColor,id:'dropShadow'});}
if(properties.spline){var str=['M{1} {2}'.format(this.coordsSpline[index][0][0],this.coordsSpline[index][0][1])];for(var i=1;i<this.coordsSpline[index].length;++i){str.push('L{1} {2}'.format(this.coordsSpline[index][i][0],this.coordsSpline[index][i][1]));}
str=str.join(' ');var line=RGraph.SVG.create({svg:this.svg,parent:properties.filled?this.filledGroups[index]:this.svg.all,type:'path',attr:{d:str,stroke:properties['colors'][index],'fill':'none','stroke-width':this.hasMultipleDatasets&&properties.filled&&properties.filledAccumulative?0.1:(RGraph.SVG.isArray(properties.linewidth)?properties.linewidth[index]:properties.linewidth+0.01),'stroke-dasharray':properties.dasharray,'stroke-linecap':this.getLinecap({index:index}),'stroke-linejoin':this.getLinejoin({index:index}),filter:properties.shadow?'url(#dropShadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}else{var path2=RGraph.SVG.arrayClone(path);if(properties.filled&&properties.filledAccumulative&&index>0){for(var i=this.coords2[index-1].length-1;i>=0;--i){path2.push('L{1} {2}'.format(this.coords2[index-1][i][0],this.coords2[index-1][i][1]));}}
path2=path2.join(' ');var line=RGraph.SVG.create({svg:this.svg,parent:properties.filled?this.filledGroups[index]:this.svg.all,type:'path',attr:{d:path2,stroke:properties.colors[index],'fill':'none','stroke-dasharray':properties.dasharray,'stroke-width':this.hasMultipleDatasets&&properties.filled&&properties.filledAccumulative?0.1:(RGraph.SVG.isArray(properties.linewidth)?properties.linewidth[index]:properties.linewidth+0.01),'stroke-linecap':this.getLinecap({index:index}),'stroke-linejoin':this.getLinejoin({index:index}),filter:properties.shadow?'url(#dropShadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}
if(properties.tooltips&&properties.tooltips.length){if(!this.svg.all.line_tooltip_hotspots){var group=RGraph.SVG.create({svg:this.svg,type:'g',attr:{'fill':'transparent',className:"rgraph_hotspots"},style:{cursor:'pointer'}});this.svg.all.line_tooltip_hotspots=group;}else{group=this.svg.all.line_tooltip_hotspots;}
for(var i=0;i<this.coords2[index].length&&(typeof properties.tooltips==='string'?true:this.tooltipsSequentialIndex<properties.tooltips.length);++i,++this.tooltipsSequentialIndex){if(!RGraph.SVG.isNull(this.originalData[index][i])&&(properties.tooltips[this.tooltipsSequentialIndex]||typeof properties.tooltips==='string')&&this.coords2[index][i][0]&&this.coords2[index][i][1]){var hotspot=RGraph.SVG.create({svg:this.svg,parent:group,type:'circle',attr:{cx:this.coords2[index][i][0],cy:this.coords2[index][i][1],r:10,fill:'transparent','data-dataset':index,'data-index':i},style:{cursor:'pointer'}});var obj=this;(function(sequentialIndex)
{hotspot.addEventListener(properties.tooltipsEvent,function(e)
{var indexes=RGraph.SVG.sequentialIndexToGrouped(sequentialIndex,obj.data),index=indexes[1],dataset=indexes[0];if(RGraph.SVG.REG.get('tooltip')&&RGraph.SVG.REG.get('tooltip').__index__===index&&RGraph.SVG.REG.get('tooltip').__dataset__===dataset&&RGraph.SVG.REG.get('tooltip').__object__.uid===obj.uid){return;}
obj.removeHighlight();RGraph.SVG.hideTooltip();RGraph.SVG.tooltip({object:obj,index:index,dataset:dataset,sequentialIndex:sequentialIndex,text:typeof properties.tooltips==='string'?properties.tooltips:properties.tooltips[sequentialIndex],event:e});var outer_highlight1=RGraph.SVG.create({svg:obj.svg,parent:obj.svg.all,type:'circle',attr:{cx:obj.coords2[dataset][index][0],cy:obj.coords2[dataset][index][1],r:5,fill:obj.properties.colors[dataset],'fill-opacity':0.5},style:{cursor:'pointer'}});var outer_highlight2=RGraph.SVG.create({svg:obj.svg,parent:obj.svg.all,type:'circle',attr:{cx:obj.coords2[dataset][index][0],cy:obj.coords2[dataset][index][1],r:14,fill:'white','fill-opacity':0.75},style:{cursor:'pointer'}});var inner_highlight1=RGraph.SVG.create({svg:obj.svg,parent:obj.svg.all,type:'circle',attr:{cx:obj.coords2[dataset][index][0],cy:obj.coords2[dataset][index][1],r:6,fill:'white'},style:{cursor:'pointer'}});var inner_highlight2=RGraph.SVG.create({svg:obj.svg,parent:obj.svg.all,type:'circle',attr:{cx:obj.coords2[dataset][index][0],cy:obj.coords2[dataset][index][1],r:5,fill:typeof obj.properties.highlightFill==='string'?obj.properties.highlightFill:obj.properties.colors[dataset]},style:{cursor:'pointer'}});RGraph.SVG.REG.set('highlight',[outer_highlight1,outer_highlight2,inner_highlight1,inner_highlight2]);},false);})(this.tooltipsSequentialIndex);}}}};this.drawTickmarks=function(index,data,coords)
{var style=typeof properties.tickmarksStyle==='object'?properties.tickmarksStyle[index]:properties.tickmarksStyle,size=typeof properties.tickmarksSize==='object'?properties.tickmarksSize[index]:properties.tickmarksSize,fill=typeof properties.tickmarksFill==='object'?properties.tickmarksFill[index]:properties.tickmarksFill,linewidth=typeof properties.tickmarksLinewidth==='object'?properties.tickmarksLinewidth[index]:properties.tickmarksLinewidth;for(var i=0;i<data.length;++i){if(typeof data[i]==='number'){switch(style){case'filledcircle':case'filledendcircle':if(style==='filledcircle'||(i===0||i===data.length-1)){var circle=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'circle',attr:{cx:coords[index][i][0],cy:coords[index][i][1],r:size,'fill':properties.colors[index],filter:properties.shadow?'url(#dropShadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}
break;case'circle':case'endcircle':if(style==='circle'||(style==='endcircle'&&(i===0||i===data.length-1))){var outerCircle=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'circle',attr:{cx:coords[index][i][0],cy:coords[index][i][1],r:size+this.get('linewidth'),'fill':properties.colors[index],filter:properties.shadow?'url(#dropShadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});var innerCircle=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'circle',attr:{cx:coords[index][i][0],cy:coords[index][i][1],r:size,'fill':fill,'clip-path':this.isTrace?'url(#trace-effect-clip)':''}});break;}
break;case'endrect':case'rect':if(style==='rect'||(style==='endrect'&&(i===0||i===data.length-1))){var fill=typeof fill==='object'&&typeof fill[index]==='string'?fill[index]:fill;var rect=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'rect',attr:{x:coords[index][i][0]-size,y:coords[index][i][1]-size,width:size+size+linewidth,height:size+size+linewidth,'stroke-width':this.get('linewidth'),'stroke':properties.colors[index],'fill':fill,'clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}
break;case'filledendrect':case'filledrect':if(style==='filledrect'||(style==='filledendrect'&&(i===0||i===data.length-1))){var fill=properties.colors[index];var rect=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'rect',attr:{x:coords[index][i][0]-size,y:coords[index][i][1]-size,width:size+size+linewidth,height:size+size+linewidth,'fill':fill,'clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}}}}};this.redrawLines=function()
{if(properties.spline){for(var i=0;i<this.coordsSpline.length;++i){var linewidth=RGraph.SVG.isArray(properties.linewidth)?properties.linewidth[i]:properties.linewidth,color=properties['colors'][i],path='';for(var j=0;j<this.coordsSpline[i].length;++j){if(j===0){path+='M{1} {2} '.format(this.coordsSpline[i][j][0],this.coordsSpline[i][j][1]);}else{path+='L{1} {2} '.format(this.coordsSpline[i][j][0],this.coordsSpline[i][j][1]);}}
RGraph.SVG.create({svg:this.svg,parent:properties.filled?this.filledGroups[i]:this.svg.all,type:'path',attr:{d:path,stroke:color,'fill':'none','stroke-dasharray':properties.dasharray,'stroke-width':linewidth+0.01,'stroke-linecap':this.getLinecap({index:i}),'stroke-linejoin':this.getLinejoin({index:i}),filter:properties.shadow?'url(#dropShadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}
for(var dataset=0;dataset<this.coords2.length;++dataset){this.drawTickmarks(dataset,this.data[dataset],this.coords2);}}else{for(var i=0;i<this.coords2.length;++i){var linewidth=RGraph.SVG.isArray(properties.linewidth)?properties.linewidth[i]:properties.linewidth,color=properties['colors'][i],path='';for(var j=0;j<this.coords2[i].length;++j){if(j===0||RGraph.SVG.isNull(this.data[i][j])||RGraph.SVG.isNull(this.data[i][j-1])){path+='M{1} {2} '.format(this.coords2[i][j][0],RGraph.SVG.isNull(this.data[i][j])?0:this.coords2[i][j][1]);}else{if(properties.stepped){path+='L{1} {2} '.format(this.coords2[i][j][0],this.coords2[i][j-1][1]);}
path+='L{1} {2} '.format(this.coords2[i][j][0],this.coords2[i][j][1]);}}
RGraph.SVG.create({svg:this.svg,parent:properties.filled?this.filledGroups[i]:this.svg.all,type:'path',attr:{d:path,stroke:color,'fill':'none','stroke-dasharray':properties.dasharray,'stroke-width':linewidth+0.01,'stroke-linecap':this.getLinecap({index:i}),'stroke-linejoin':this.getLinejoin({index:i}),filter:properties.shadow?'url(#dropshadow)':'','clip-path':this.isTrace?'url(#trace-effect-clip)':''}});}
for(var dataset=0;dataset<this.coords2.length;++dataset){this.drawTickmarks(dataset,this.data[dataset],this.coords2);}}};this.getYCoord=function(value)
{if(arguments[1]===true){var allowOutOfBounds=true;}
var y;if(!allowOutOfBounds&&RGraph.SVG.isNull(value)){return null;}
if(!allowOutOfBounds&&value>this.scale.max){return null;}
if(!allowOutOfBounds&&value<this.scale.min){return null;}
y=((value-this.scale.min)/(this.scale.max-this.scale.min));y*=(this.height-properties.marginTop-properties.marginBottom);y=this.height-properties.marginBottom-y;return y;};this.highlight=function(rect)
{var x=rect.getAttribute('x'),y=rect.getAttribute('y');};this.removeHighlight=function()
{RGraph.SVG.removeHighlight();};this.drawSpline=function(coords)
{var xCoords=[];marginLeft=properties.marginLeft,marginRight=properties.marginRight,hmargin=properties.marginInner,interval=(this.graphWidth-(2*hmargin))/(coords.length-1),coordsSpline=[];for(var i=0,len=coords.length;i<len;i+=1){if(typeof coords[i]=='object'&&coords[i]&&coords[i].length==2){coords[i]=Number(coords[i][1]);}}
var P=[coords[0]];for(var i=0;i<coords.length;++i){P.push(coords[i]);}
P.push(coords[coords.length-1]+(coords[coords.length-1]-coords[coords.length-2]));for(var j=1;j<P.length-2;++j){for(var t=0;t<10;++t){var yCoord=spline(t/10,P[j-1],P[j],P[j+1],P[j+2]);xCoords.push(((j-1)*interval)+(t*(interval/10))+marginLeft+hmargin);coordsSpline.push([xCoords[xCoords.length-1],yCoord]);if(typeof index==='number'){coordsSpline[index].push([xCoords[xCoords.length-1],yCoord]);}}}
coordsSpline.push([((j-1)*interval)+marginLeft+hmargin,P[j]]);if(typeof index==='number'){coordsSpline.push([((j-1)*interval)+marginLeft+hmargin,P[j]]);}
function spline(t,P0,P1,P2,P3)
{return 0.5*((2*P1)+
((0-P0)+P2)*t+
((2*P0-(5*P1)+(4*P2)-P3)*(t*t)+
((0-P0)+(3*P1)-(3*P2)+P3)*(t*t*t)));}
for(var i=0;i<coordsSpline.length;++i){coordsSpline[i].object=this;coordsSpline[i].x=this;coordsSpline[i].y=this;}
return coordsSpline;};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RGraph.SVG.arrayClone(properties.colors),filledColors:RGraph.SVG.arrayClone(properties.filledColors),backgroundGridColor:RGraph.SVG.arrayClone(properties.backgroundGridColor),backgroundColor:RGraph.SVG.arrayClone(properties.backgroundColor)}}
var colors=properties.colors;if(colors){for(var i=0;i<colors.length;++i){colors[i]=RGraph.SVG.parseColorLinear({object:this,color:colors[i]});}}
var filledColors=properties.filledColors;if(filledColors){for(var i=0;i<filledColors.length;++i){filledColors[i]=RGraph.SVG.parseColorLinear({object:this,color:filledColors[i]});}}
properties.backgroundGridColor=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundGridColor});properties.backgroundColor=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundColor});};this.drawLabelsAbove=function()
{if(properties.labelsAbove){var data_seq=RGraph.SVG.arrayLinearize(this.data),seq=0;for(var dataset=0;dataset<this.coords2.length;++dataset,seq++){for(var i=0;i<this.coords2[dataset].length;++i,seq++){var str=RGraph.SVG.numberFormat({object:this,num:this.data[dataset][i].toFixed(properties.labelsAboveDecimals),prepend:typeof properties.labelsAboveUnitsPre==='string'?properties.labelsAboveUnitsPre:null,append:typeof properties.labelsAboveUnitsPost==='string'?properties.labelsAboveUnitsPost:null,point:typeof properties.labelsAbovePoint==='string'?properties.labelsAbovePoint:null,thousand:typeof properties.labelsAboveThousand==='string'?properties.labelsAboveThousand:null,formatter:typeof properties.labelsAboveFormatter==='function'?properties.labelsAboveFormatter:null});if(properties.labelsAboveSpecific&&properties.labelsAboveSpecific.length&&(typeof properties.labelsAboveSpecific[seq]==='string'||typeof properties.labelsAboveSpecific[seq]==='number')){str=properties.labelsAboveSpecific[seq];}else if(properties.labelsAboveSpecific&&properties.labelsAboveSpecific.length&&typeof properties.labelsAboveSpecific[seq]!=='string'&&typeof properties.labelsAboveSpecific[seq]!=='number'){continue;}
var textConf=RGraph.SVG.getTextConf({object:this,prefix:'labelsAbove'});RGraph.SVG.text({object:this,parent:this.svg.all,tag:'labels.above',text:str,x:parseFloat(this.coords2[dataset][i][0])+properties.labelsAboveOffsetx,y:parseFloat(this.coords2[dataset][i][1])+properties.labelsAboveOffsety,halign:properties.labelsAboveHalign,valign:properties.labelsAboveValign,font:textConf.font,size:textConf.size,bold:textConf.bold,italic:textConf.italic,color:textConf.color,background:properties.labelsAboveBackground||null,padding:properties.labelsAboveBackgroundPadding||0});}
seq--;}}};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RGraph.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};this.drawErrorbar=function(opt)
{var linewidth=RGraph.SVG.getErrorbarsLinewidth({object:this,index:opt.index}),color=RGraph.SVG.getErrorbarsColor({object:this,index:opt.sequential}),capwidth=RGraph.SVG.getErrorbarsCapWidth({object:this,index:opt.index}),index=opt.index,dataset=opt.dataset,x=opt.x,y=opt.y,value=this.data[dataset][index];var y=this.getYCoord(y);var max=RGraph.SVG.getErrorbarsMaxValue({object:this,index:opt.sequential});var min=RGraph.SVG.getErrorbarsMinValue({object:this,index:opt.sequential});if(!max&&!min){return;}
var x=this.coords2[dataset][index].x,y=this.coords2[dataset][index].y,halfCapWidth=capwidth/2,y1=this.getYCoord(value+max),y3=this.getYCoord(value-min)===null?y:this.getYCoord(value-min);if(max>0){var errorbarLine=RGraph.SVG.create({svg:this.svg,type:'line',parent:this.svg.all,attr:{x1:x,y1:y,x2:x,y2:y1,stroke:color,'stroke-width':linewidth}});var errorbarCap=RGraph.SVG.create({svg:this.svg,type:'line',parent:this.svg.all,attr:{x1:x-halfCapWidth,y1:y1,x2:x+halfCapWidth,y2:y1,stroke:color,'stroke-width':linewidth}});}
if(typeof min==='number'){var errorbarLine=RGraph.SVG.create({svg:this.svg,type:'line',parent:this.svg.all,attr:{x1:x,y1:y,x2:x,y2:y3,stroke:color,'stroke-width':linewidth}});var errorbarCap=RGraph.SVG.create({svg:this.svg,type:'line',parent:this.svg.all,attr:{x1:x-halfCapWidth,y1:y3,x2:x+halfCapWidth,y2:y3,stroke:color,'stroke-width':linewidth}});}};this.trace=function()
{var opt=arguments[0]||{},frame=1,frames=opt.frames||60,obj=this;this.isTrace=true;this.draw();var clippath=RGraph.SVG.create({svg:this.svg,parent:this.svg.defs,type:'clipPath',attr:{id:'trace-effect-clip'}});var clippathrect=RGraph.SVG.create({svg:this.svg,parent:clippath,type:'rect',attr:{x:0,y:0,width:0,height:this.height}});var iterator=function()
{var width=(frame++)/frames*obj.width;clippathrect.setAttribute("width",width);if(frame<=frames){RGraph.SVG.FX.update(iterator);}else{clippath.parentNode.removeChild(clippath);if(opt.callback){(opt.callback)(obj);}}};iterator();return this;};this.tooltipSubstitutions=function(opt)
{var indexes=RGraph.SVG.sequentialIndexToGrouped(opt.index,this.data);for(var i=0,values=[];i<this.originalData.length;++i){values.push(this.originalData[i][indexes[1]]);}
return{index:indexes[1],dataset:indexes[0],sequentialIndex:opt.index,value:typeof this.data[indexes[0]]==='number'?this.data[indexes[0]]:this.data[indexes[0]][indexes[1]],values:values};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,svgXY=RGraph.SVG.getSVGXY(obj.svg),coords=this.coords[args.index];args.tooltip.style.left=(svgXY[0]
+coords[0]
-(tooltip.offsetWidth/2))+'px';args.tooltip.style.top=(svgXY[1]
+coords[1]
-tooltip.offsetHeight
-15)+'px';};this.drawTrendline=function(opt)
{var obj=this,color=properties.trendlineColor,linewidth=properties.trendlineLinewidth,margin=properties.trendlineMargin,clip=properties.trendlineClip;if(clip){var clippath=RGraph.SVG.create({svg:this.svg,parent:this.svg.defs,type:'clipPath',attr:{id:'trendline-clip'}});var clippathrect=RGraph.SVG.create({svg:this.svg,parent:clippath,type:'rect',attr:{x:properties.marginLeft,y:properties.marginTop,width:this.width-properties.marginLeft-properties.marginRight,height:this.height-properties.marginTop-properties.marginBottom}});}
var data=[];for(var i=0;i<this.data.length;++i){data[i]=[];for(var j=0;j<this.data[i].length;++j){data[i].push([j,this.data[i][j]]);}}
if(RGraph.SVG.isArray(properties.trendlineColors)){color=properties.trendlineColors;}
if(typeof color==='object'&&color[opt.dataset]){color=color[opt.dataset];}else if(typeof color==='object'){color='gray';}
if(typeof linewidth==='object'&&typeof linewidth[opt.dataset]==='number'){linewidth=linewidth[opt.dataset];}else if(typeof linewidth==='object'){linewidth=1;}
if(typeof margin==='object'&&typeof margin[opt.dataset]==='number'){margin=margin[opt.dataset];}else if(typeof margin==='object'){margin=25;}
for(var i=0,totalX=0,totalY=0;i<this.data[opt.dataset].length;++i){totalX+=data[opt.dataset][i][0];totalY+=data[opt.dataset][i][1];}
var averageX=totalX/data[opt.dataset].length;var averageY=totalY/data[opt.dataset].length;for(var i=0,xCoordMinusAverageX=[],yCoordMinusAverageY=[],valuesMultiplied=[],xCoordMinusAverageSquared=[];i<this.data[opt.dataset].length;++i){xCoordMinusAverageX[i]=data[opt.dataset][i][0]-averageX;yCoordMinusAverageY[i]=data[opt.dataset][i][1]-averageY;valuesMultiplied[i]=xCoordMinusAverageX[i]*yCoordMinusAverageY[i];xCoordMinusAverageSquared[i]=xCoordMinusAverageX[i]*xCoordMinusAverageX[i];}
var sumOfValuesMultiplied=RGraph.SVG.arraySum(valuesMultiplied);var sumOfXCoordMinusAverageSquared=RGraph.SVG.arraySum(xCoordMinusAverageSquared);var m=sumOfValuesMultiplied/sumOfXCoordMinusAverageSquared;var b=averageY-(m*averageX);var coords=[[0,m*0+b],[data[0].length-1,m*(data[0].length-1)+b]];coords[0][0]=properties.marginLeft;coords[0][1]=this.getYCoord(coords[0][1],true);coords[1][0]=this.width-properties.marginRight;coords[1][1]=this.getYCoord(coords[1][1],true);if(properties.trendlineDashed===true||(RGraph.SVG.isArray(properties.trendlineDashed)&&properties.trendlineDashed[opt.dataset])){var dasharray=[4,4];}
if(properties.trendlineDotted===true||(RGraph.SVG.isArray(properties.trendlineDotted)&&properties.trendlineDotted[opt.dataset])){var dasharray=[1,4];}
if(RGraph.SVG.isArray(properties.trendlineDashArray)){if(properties.trendlineDashArray.length===2&&typeof properties.trendlineDashArray[0]==='number'&&typeof properties.trendlineDashArray[1]==='number'){var dasharray=properties.trendlineDashArray;}else if(RGraph.SVG.isArray(properties.trendlineDashArray)&&RGraph.SVG.isArray(properties.trendlineDashArray[opt.dataset])){var dasharray=properties.trendlineDashArray[opt.dataset];}}
var line=RGraph.SVG.create({svg:obj.svg,parent:obj.svg.all,type:'line',attr:{x1:Math.max(coords[0][0],this.coords2[opt.dataset][0][0]-margin),y1:coords[0][1],x2:Math.min(coords[1][0],this.coords2[opt.dataset][this.coords2[opt.dataset].length-1][0]+margin),y2:coords[1][1],fill:'rgba(0,0,0,0)',stroke:color,'stroke-width':linewidth,'stroke-dasharray':dasharray,'class':'rgraph_line_{1}_trendline_{2}'.format(this.id,opt.dataset),'clip-path':clip?'url(#trendline-clip)':''}});var els=this.svg.getElementsByClassName('rgraph_background_grid'),grid=els[0];obj.svg.all.removeChild(line);grid.insertAdjacentElement('afterend',line);};this.nullBridge=function(datasetIdx,data)
{var readData=false;for(var i=0;i<data.length;i++){var isNull=false,start=null,end=null;if(readData===false&&RGraph.SVG.isNumber(data[i])){readData=true;}
if(RGraph.SVG.isNull(data[i])&&readData){start=i-1;for(var j=(i+1);j<data.length;++j){if(RGraph.SVG.isNull(data[j])){continue;}else{end=j;}
if(this.coords2[datasetIdx][start][1]){var path='M{1} {2} L{3} {4}'.format(this.coords2[datasetIdx][start][0],this.coords2[datasetIdx][start][1],this.coords2[datasetIdx][end][0],this.coords2[datasetIdx][end][1],);}
var node=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'path',attr:{d:path,stroke:typeof properties.nullBridgeColors==='string'?properties.nullBridgeColors:((typeof properties.nullBridgeColors==='object'&&!RGraph.SVG.isNull(properties.nullBridgeColors)&&properties.nullBridgeColors[datasetIdx])?properties.nullBridgeColors[datasetIdx]:properties.colors[datasetIdx]),'fill':'transparent','stroke-dasharray':properties.nullBridgeDashArray,'stroke-width':typeof properties.nullBridgeLinewidth==='number'?properties.nullBridgeLinewidth:properties.linewidth,'stroke-linecap':this.getLinecap({index:i}),'stroke-linejoin':this.getLinejoin({index:i}),'clip-path':this.isTrace?'url(#trace-effect-clip)':''}});start=null;end=null;break;}}}};this.getLinecap=function(opt)
{if(typeof properties.linecap==='object'&&typeof properties.linecap[opt.index]==='string'){return properties.linecap[opt.index];}else if(typeof properties.linecap==='string'){return properties.linecap;}else{return'round';}};this.getLinejoin=function(opt)
{if(typeof properties.linejoin==='object'&&typeof properties.linejoin[opt.index]==='string'){return properties.linejoin[opt.index];}else if(typeof properties.linejoin==='string'){return properties.linejoin;}else{return'round';}};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}}
return this;})(window,document);