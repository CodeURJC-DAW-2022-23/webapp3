'version:2023-02-25 (6.11)';RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{RGraph.SVG.Gauge=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RGraph.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;}
return this;};this.get=function(name)
{return this.properties[name];};this.type='gauge';this.innerMin=RGraph.SVG.stringsToNumbers(conf.innerMin);this.innerMax=RGraph.SVG.stringsToNumbers(conf.innerMax);this.outerMin=RGraph.SVG.stringsToNumbers(conf.outerMin);this.outerMax=RGraph.SVG.stringsToNumbers(conf.outerMax);this.value=RGraph.SVG.stringsToNumbers(conf.value);this.angleStart=0-RGraph.SVG.TRIG.HALFPI-(RGraph.SVG.TRIG.HALFPI/2);this.angleEnd=0+RGraph.SVG.TRIG.HALFPI+(RGraph.SVG.TRIG.HALFPI/2);this.angleSpan=this.angleEnd-this.angleStart;this.id=conf.id;this.uid=RGraph.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RGraph.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.nodes={};this.shadowNodes=[];this.firstDraw=true;if(this.value>this.innerMax)this.value=this.innerMax;if(this.value<this.innerMin)this.value=this.innerMin;RGraph.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={centerx:null,centery:null,radius:null,marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,rmargin:null,backgroundFill:'Gradient(white:#FEFEFE:#E6E6E6:#dedede)',backgroundStroke:'#ddd',linewidth:1,colors:['black','black'],innerGap:5,tickmarksOuterSize:3,tickmarksInnerSize:3,tickmarksCount:10,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,text:null,labelsIngraph:true,labelsIngraphFont:null,labelsIngraphSize:null,labelsIngraphBold:null,labelsIngraphItalic:null,labelsIngraphColor:null,labelsIngraphUnitsPre:'',labelsIngraphUnitsPost:'',labelsIngraphThousand:',',labelsIngraphPoint:'.',labelsIngraphFormatter:null,labelsIngraphDecimals:0,labelsIngraphPadding:3,labelsIngraphBackground:'Gradient(#ddd:#eee)',labelsIngraphRounded:2,scaleInnerFont:null,scaleInnerSize:null,scaleInnerBold:null,scaleInnerItalic:null,scaleInnerColor:null,scaleInnerUnitsPre:'',scaleInnerUnitsPost:'',scaleInnerPoint:'.',scaleInnerThousand:',',scaleInnerDecimals:0,scaleInnerFormatter:null,scaleInnerLabelsCount:10,scaleInnerRound:false,scaleOuter:true,scaleOuterFont:null,scaleOuterSize:null,scaleOuterBold:null,scaleOuterItalic:null,scaleOuterColor:null,scaleOuterUnitsPre:'',scaleOuterUnitsPost:'',scaleOuterPoint:'.',scaleOuterThousand:',',scaleOuterDecimals:0,scaleOuterFormatter:null,scaleOuterLabelsCount:10,scaleOuterRound:false,shadow:false,shadowOffsetx:2,shadowOffsety:2,shadowColor:'rgba(0,0,0,0.25)',shadowBlur:2,title:'',titleX:null,titleY:null,titleHalign:'center',titleValign:'bottom',titleSize:null,titleColor:null,titleFont:null,titleBold:null,titleItalic:null,titleSubtitle:null,titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,needleColor:'#666',centerpinRadius:15,adjustable:false};RGraph.SVG.getGlobals(this);if(RGraph.SVG.FX&&typeof RGraph.SVG.FX.decorate==='function'){RGraph.SVG.FX.decorate(this);}
this.responsive=RGraph.SVG.responsive;var properties=this.properties;this.draw=function()
{RGraph.SVG.fireCustomEvent(this,'onbeforedraw');this.nodes={};this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));RGraph.SVG.createDefs(this);this.graphWidth=this.width-properties.marginLeft-properties.marginRight;this.graphHeight=this.height-properties.marginTop-properties.marginBottom;this.centerx=(this.graphWidth/2)+properties.marginLeft;this.centery=(this.graphHeight/2)+properties.marginTop;this.radius=Math.min(this.graphWidth/2,this.graphHeight/2);this.centerx=typeof properties.centerx==='number'?properties.centerx:this.centerx;this.centery=typeof properties.centery==='number'?properties.centery:this.centery;this.radius=typeof properties.radius==='number'?properties.radius:this.radius;if(typeof properties.radius==='string'&&properties.radius.match(/^\+|-\d+$/))this.radius+=parseFloat(properties.radius);if(typeof properties.centerx==='string'&&properties.centerx.match(/^\+|-\d+$/))this.centery+=parseFloat(properties.centerx);if(typeof properties.centery==='string'&&properties.centery.match(/^\+|-\d+$/))this.centerx+=parseFloat(properties.centery);RGraph.SVG.resetColorsToOriginalValues({object:this});this.parseColors();if(properties.rmargin===null){if(properties.scaleOuter){properties.rmargin=40;}else{properties.rmargin=25;}}
this.drawMeter();this.drawNeedle();if(properties.labelsIngraph){this.drawIngraph();}
RGraph.SVG.drawTitle(this);if(properties.adjustable){this.adjusting_mousedown=false;var obj=this;var func=function(e)
{var div=e.currentTarget,mouseX=e.offsetX,mouseY=e.offsetY;if(RGraph.SVG.ISFF){mouseX=e.pageX-e.currentTarget.offsetLeft;mouseY=e.pageY-e.currentTarget.offsetTop;}
var radius=RGraph.SVG.TRIG.getHypLength({x1:mouseX,y1:mouseY,x2:obj.centerx,y2:obj.centery,object:obj});if(radius>obj.radius){return;}
var value=obj.getValue(e);obj.value=value;obj.drawNeedle();};this.container.addEventListener('mousedown',function(e)
{obj.adjusting_mousedown=true;func(e);RGraph.SVG.fireCustomEvent(obj,'onadjustbegin');},false);this.container.addEventListener('mousemove',function(e)
{if(obj.adjusting_mousedown){func(e);RGraph.SVG.fireCustomEvent(obj,'onadjust');}},false);window.addEventListener('mouseup',function(e)
{obj.adjusting_mousedown=false;RGraph.SVG.fireCustomEvent(obj,'onadjustend');},false);}
RGraph.SVG.addCustomText(this);if(this.firstDraw){this.firstDraw=false;RGraph.SVG.fireCustomEvent(this,'onfirstdraw');}
RGraph.SVG.fireCustomEvent(this,'ondraw');return this;};this.create=function(definition)
{return RGraph.SVG.create.call(this,definition,arguments[1],arguments[2]);};this.drawMeter=function()
{this.scaleInner=RGraph.SVG.getScale({object:this,numlabels:properties.scaleInnerLabelsCount,unitsPre:properties.scaleInnerUnitsPre,unitsPost:properties.scaleInnerUnitsPost,max:this.innerMax,min:this.innerMin,point:properties.scaleInnerPoint,round:properties.scaleInnerRound,thousand:properties.scaleInnerThousand,decimals:properties.scaleInnerDecimals,strict:true,formatter:properties.scaleInnerFormatter});this.scaleOuter=RGraph.SVG.getScale({object:this,numlabels:properties.scaleOuterLabelsCount,unitsPre:properties.scaleOuterUnitsPre,unitsPost:properties.scaleOuterUnitsPost,max:this.outerMax,min:this.outerMin,point:properties.scaleOuterPoint,round:properties.scaleOuterRound,thousand:properties.scaleOuterThousand,decimals:properties.scaleOuterDecimals,strict:true,formatter:properties.scaleOuterFormatter});if(properties.shadow){RGraph.SVG.setShadow({object:this,offsetx:properties.shadowOffsetx,offsety:properties.shadowOffsety,blur:properties.shadowBlur,color:properties.shadowColor,id:'dropShadow'});}
this.nodes.background=RGraph.SVG.create({svg:this.svg,type:'circle',parent:this.svg.all,attr:{cx:this.centerx,cy:this.centery,r:this.radius,stroke:properties.backgroundStroke,fill:properties.backgroundFill,filter:properties.shadow?'url(#dropShadow)':''}});this.nodes.innerAxisGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'innerAxisGroup',}});this.nodes.outerAxisGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'outerAxisGroup',}});var innerPath=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.innerGap-properties.rmargin,start:this.angleStart,end:this.angleEnd,anticlockwise:false,lineto:false});var inner=RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:innerPath,stroke:properties.colors[1],fill:'transparent','stroke-width':properties.linewidth}});var outerPath=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.rmargin,start:this.angleStart,end:this.angleEnd,anticlockwise:false,lineto:false});var outer=RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.outerAxisGroup,attr:{d:outerPath,stroke:properties.colors[0],fill:'transparent','stroke-width':properties.linewidth}});this.nodes.outerAxis=outerPath;this.nodes.innerAxis=innerPath;var numticks=properties.tickmarksCount,gap=this.angleSpan/numticks,numlabels=properties.tickmarksCount;var textConfOuter=RGraph.SVG.getTextConf({object:this,prefix:'scaleOuter'});var textConfInner=RGraph.SVG.getTextConf({object:this,prefix:'scaleInner'});for(var i=0;i<=properties.scaleOuterLabelsCount;++i){if(properties.scaleOuter){var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius+properties.tickmarksOuterSize-properties.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.outerAxisGroup,attr:{d:path_a+' '+path_b,stroke:properties.colors[0],fill:'transparent','stroke-width':properties.linewidth,'stroke-linecap':'square'}});var outerLabelGap=(this.angleEnd-this.angleStart)/properties.scaleOuterLabelsCount;var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius+properties.tickmarksOuterSize+10-properties.rmargin,angle:this.angleStart-RGraph.SVG.TRIG.HALFPI+(i*outerLabelGap)});var halign=(coords.x>this.centerx?'left':'right');if(i/numlabels===0.5){halign='center';}
var zerolabel=RGraph.SVG.numberFormat({object:this,prepend:properties.scaleOuterUnitsPre,append:properties.scaleOuterUnitsPost,num:this.outerMin.toFixed(properties.scaleOuterDecimals),point:properties.scaleOuterPoint,thousand:properties.scaleOuterThousand});if(typeof properties.scaleOuterFormatter==='function'){zerolabel=(properties.scaleOuterFormatter)(zerolabel);}
var textnode=RGraph.SVG.text({object:this,svg:this.svg,parent:this.nodes.outerAxisGroup,tag:'scale.outer',text:(i===0?zerolabel:this.scaleOuter.labels[i-1]),x:coords.x,y:coords.y,halign:halign,valign:'center',padding:2,size:textConfOuter.size,color:textConfOuter.color,bold:textConfOuter.bold,italic:textConfOuter.italic,font:textConfOuter.font});textnode.style.pointerEvents='none';}else{var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.rmargin,start:this.angleStart,end:this.angleStart,anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.innerGap-properties.rmargin,start:this.angleStart,end:this.angleStart,anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+path_b,stroke:properties.colors[1],fill:'transparent','stroke-width':properties.linewidth,'stroke-linecap':'square'}});var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.rmargin,start:this.angleEnd,end:this.angleEnd,anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.innerGap-properties.rmargin,start:this.angleEnd,end:this.angleEnd,anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+path_b,stroke:properties.colors[1],fill:'transparent','stroke-width':properties.linewidth,'stroke-linecap':'square'}});}}
for(var i=0;i<=properties.scaleInnerLabelsCount;++i){var path_a=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.rmargin-properties.innerGap,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:false});var path_b=RGraph.SVG.TRIG.getArcPath3({cx:this.centerx,cy:this.centery,r:this.radius-properties.innerGap-properties.tickmarksOuterSize-properties.rmargin,start:this.angleStart+(i*gap),end:this.angleStart+(i*gap),anticlockwise:false,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.innerAxisGroup,attr:{d:path_a+' '+path_b,stroke:properties.colors[1],fill:'transparent','stroke-width':properties.linewidth,'stroke-linecap':'square'}});var innerLabelGap=(this.angleEnd-this.angleStart)/properties.scaleInnerLabelsCount;var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius-properties.innerGap-properties.tickmarksInnerSize-10-properties.rmargin,angle:this.angleStart-RGraph.SVG.TRIG.HALFPI+(i*innerLabelGap)});var halign=(coords.x>this.centerx?'right':'left');var zerolabel=RGraph.SVG.numberFormat({object:this,prepend:properties.scaleInnerUnitsPre,append:properties.scaleInnerUnitsPost,num:this.innerMin.toFixed(properties.scaleInnerDecimals),point:properties.scaleInnerPoint,thousand:properties.scaleInnerThousand});if(typeof properties.scaleInnerFormatter==='function'){zerolabel=(properties.scaleInnerFormatter)(zerolabel);}
if(coords.x>(this.centerx-2)&&coords.x<(this.centerx+2)){halign='center';}
RGraph.SVG.text({object:this,svg:this.svg,parent:this.nodes.innerAxisGroup,tag:'scale.inner',text:(i===0?zerolabel:this.scaleInner.labels[i-1]),x:coords.x,y:coords.y,halign:halign,valign:'center',padding:2,size:textConfInner.size,color:textConfInner.color,bold:textConfInner.bold,italic:textConfInner.italic,font:textConfInner.font});}};this.drawIngraph=function()
{if(this.nodes.labelsIngraphGroup){this.nodes.labelsIngraphGroup.parentNode.removeChild(this.nodes.labelsIngraphGroup);}
this.nodes.labelsIngraphGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'labelsIngraphGroup',}});var textConf=RGraph.SVG.getTextConf({object:this,prefix:'labelsIngraph'});this.nodes.labelsIngraph=RGraph.SVG.text({object:this,parent:this.nodes.labelsIngraphGroup,text:RGraph.SVG.numberFormat({prepend:properties.labelsIngraphUnitsPre,append:properties.labelsIngraphUnitsPost,point:properties.labelsIngraphPoint,thousand:properties.labelsIngraphThousand,formatter:properties.labelsIngraphFormatter,num:this.value.toFixed(properties.labelsIngraphDecimals)}),x:this.centerx,y:this.centery+this.radius-properties.rmargin-30,background:properties.labelsIngraphBackground,backgroundRounded:properties.labelsIngraphRounded,padding:properties.labelsIngraphPadding,halign:'center',valign:'center',size:textConf.size,bold:textConf.bold,italic:textConf.italic,font:textConf.font,color:textConf.color});var rect=this.nodes.labelsIngraph.previousSibling;rect.setAttribute('stroke','#aaa');var func=function(e){e.stopPropagation();};rect.addEventListener('mousedown',func,false);this.nodes.labelsIngraph.addEventListener('mousedown',func,false);};this.drawNeedle=function()
{if(this.nodes.needleGroup){this.nodes.needleGroup.parentNode.removeChild(this.nodes.needleGroup);}
this.nodes.needleGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'needle-group',fill:properties.needleColor,stroke:properties.needleColor}});var angle=(this.value-this.innerMin)/(this.innerMax-this.innerMin)*this.angleSpan;angle+=RGraph.SVG.TRIG.HALFPI+(RGraph.SVG.TRIG.HALFPI/2);var coords=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius-60,angle:angle});var coords2=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:properties.centerpinRadius,angle:angle-RGraph.SVG.TRIG.HALFPI});var coords3=RGraph.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:properties.centerpinRadius,angle:angle+RGraph.SVG.TRIG.HALFPI});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.nodes.needleGroup,attr:{'stroke-width':1,'stroke-linecap':"round",d:'M{1} {2} L{3} {4} L{5} {6} z'.format(coords.x,coords.y,coords2.x,coords2.y,coords3.x,coords3.y)}});RGraph.SVG.create({svg:this.svg,type:'circle',parent:this.nodes.needleGroup,attr:{cx:this.centerx,cy:this.centery,r:properties.centerpinRadius}});if(properties.labelsIngraph){this.drawIngraph();}};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RGraph.SVG.arrayClone(properties.colors),backgroundFill:RGraph.SVG.arrayClone(properties.backgroundFill),backgroundStroke:RGraph.SVG.arrayClone(properties.backgroundStroke),labelsIngraphBackground:RGraph.SVG.arrayClone(properties.labelsIngraphBackground)}}
properties.backgroundFill=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundFill,start:properties.marginTop,end:this.height-properties.marginBottom,direction:'vertical'});properties.backgroundStroke=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundStroke,start:properties.marginTop,end:this.height-properties.marginBottom,direction:'vertical'});properties.labelsIngraphBackground=RGraph.SVG.parseColorLinear({object:this,color:properties.labelsIngraphBackground,direction:'vertical',gradientUnits:'objectBoundingBox'});};this.getValue=function(e)
{var mouseX=e.offsetX,mouseY=e.offsetY;if(RGraph.SVG.ISFF){mouseX=e.pageX-e.currentTarget.offsetLeft;mouseY=e.pageY-e.currentTarget.offsetTop;}
var angle=RGraph.SVG.TRIG.getAngleByXY({cx:this.centerx,cy:this.centery,x:mouseX,y:mouseY});if(mouseX<this.centerx){angle=angle-RGraph.SVG.TRIG.TWOPI;}
var value=((angle-this.angleStart)/(this.angleEnd-this.angleStart));value=value*(this.innerMax-this.innerMin);value=value+this.innerMin;if(value<this.innerMin)value=this.innerMin;if(value>this.innerMax)value=this.innerMax;return value;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RGraph.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}};return this;})(window,document);