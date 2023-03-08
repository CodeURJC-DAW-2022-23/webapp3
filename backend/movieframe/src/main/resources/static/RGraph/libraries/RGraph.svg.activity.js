'version:2023-02-25 (6.11)';RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{RGraph.SVG.Activity=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RGraph.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;}
return this;};this.get=function(name)
{return this.properties[name];};this.min=RGraph.SVG.stringsToNumbers(conf.min);this.max=RGraph.SVG.stringsToNumbers(conf.max);this.value=RGraph.SVG.stringsToNumbers(conf.value);this.currentValue=null;this.id=conf.id;this.uid=RGraph.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RGraph.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.type='activity';this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.adjusting_index=null;this.nodes={};this.firstDraw=true;RGraph.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={radius:null,centerx:null,centery:null,width:null,ends:'round',marginLeft:15,marginRight:15,marginTop:15,marginBottom:15,marginInner:1,backgroundColor:'black',backgroundGrid:false,backgroundGridColor:'#ddd',backgroundGridRadials:true,backgroundGridRadialsCount:8,backgroundRings:true,backgroundRingsColors:null,backgroundRingsAlpha:0.5,colors:['#F45B5B','#90EE7E','#2B908F','red','green','blue','yellow','pink'],icons:null,iconsWidth:null,iconsHeight:null,iconsOffsetx:0,iconsOffsety:0,textFont:'Arial, Verdana, sans-serif',textSize:12,textColor:'#aaa',textBold:false,textItalic:false,text:null,labelsCenter:false,labelsCenterIndex:0,labelsCenterFont:null,labelsCenterSize:40,labelsCenterColor:null,labelsCenterBold:null,labelsCenterItalic:null,labelsCenterUnitsPre:'',labelsCenterUnitsPost:'',labelsCenterDecimals:0,labelsCenterPoint:'.',labelsCenterThousand:',',labelsCenterSpecific:null,labelsCenterHalign:'center',labelsCenterValign:'center',labelsCenterOffsetx:0,labelsCenterOffsety:0,labels:[],labelsColor:null,labelsFont:null,labelsSize:null,labelsBold:null,labelsItalic:null,labelsBackgroundFill:'transparent',labelsBackgroundStroke:'transparent',labelsHalign:'right',labelsValign:'center',labelsOffsetx:0,labelsOffsety:0,labelsFormattedDecimals:0,labelsFormattedPoint:'.',labelsFormattedThousand:',',labelsFormattedUnitsPre:'',labelsFormattedUnitsPost:'',adjustable:false,tooltips:null,tooltipsOverride:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsEvent:'click',tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',highlightLinewidth:1};RGraph.SVG.getGlobals(this);if(RGraph.SVG.FX&&typeof RGraph.SVG.FX.decorate==='function'){RGraph.SVG.FX.decorate(this);}
this.responsive=RGraph.SVG.responsive;var properties=this.properties;this.draw=function()
{RGraph.SVG.fireCustomEvent(this,'onbeforedraw');if(typeof this.value==='number'){this.value=[this.value];}
for(var i=0;i<this.value.length;++i){if(this.value[i]>this.max)this.value[i]=this.max;if(this.value[i]<this.min)this.value[i]=this.min;}
this.nodes={};this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));RGraph.SVG.createDefs(this);this.graphWidth=this.width-properties.marginLeft-properties.marginRight;this.graphHeight=this.height-properties.marginTop-properties.marginBottom;this.centerx=(this.graphWidth/2)+properties.marginLeft;this.centery=(this.graphHeight/2)+properties.marginTop;this.radius=Math.min(this.graphWidth/2,this.graphHeight/2);this.centerx=typeof properties.centerx==='number'?properties.centerx:this.centerx;this.centery=typeof properties.centery==='number'?properties.centery:this.centery;this.radius=typeof properties.radius==='number'?properties.radius:this.radius;if(typeof properties.radius==='string'&&properties.radius.match(/^\+|-\d+$/))this.radius+=parseFloat(properties.radius);if(typeof properties.centerx==='string'&&properties.centerx.match(/^\+|-\d+$/))this.centerx+=parseFloat(properties.centerx);if(typeof properties.centery==='string'&&properties.centery.match(/^\+|-\d+$/))this.centery+=parseFloat(properties.centery);RGraph.SVG.resetColorsToOriginalValues({object:this});this.parseColors();if(!properties.width){properties.width=(this.radius*0.75)/this.value.length;properties.width-=(2*properties.marginInner);}
this.drawBackground();this.drawMeter();this.drawLabels();this.drawIcons();if(properties.adjustable&&!this.adjusting_event_listeners_installed){this.adjusting_mousedown=false;var obj=this;var func=function(e)
{var div=e.currentTarget,mouseX=e.offsetX,mouseY=e.offsetY;if(RGraph.SVG.ISFF){mouseX=e.pageX-e.currentTarget.offsetLeft;mouseY=e.pageY-e.currentTarget.offsetTop;}
var radius=obj.getRadius(e);if(radius>obj.radius){return;}
if(typeof obj.adjusting_index!=='number'){var index=obj.getIndexByRadius({radius:radius});obj.adjusting_index=index;}else{var index=obj.adjusting_index;}
var value=obj.getValue(e);obj.value[index]=value;obj.currentValue=RGraph.SVG.arrayClone(value);RGraph.SVG.clear(obj.svg);obj.draw();};this.container.addEventListener('mousedown',function(e)
{obj.adjusting_mousedown=true;func(e);RGraph.SVG.fireCustomEvent(obj,'onadjustbegin');},false);this.container.addEventListener('mousemove',function(e)
{if(obj.adjusting_mousedown){func(e);RGraph.SVG.fireCustomEvent(obj,'onadjust');}},false);window.addEventListener('mouseup',function(e)
{obj.adjusting_mousedown=false;obj.adjusting_index=null;RGraph.SVG.fireCustomEvent(obj,'onadjustend');},false);this.adjusting_event_listeners_installed=true;}
var obj=this;document.body.addEventListener('mouseup',function(e)
{obj.removeHighlight();},false);RGraph.SVG.addCustomText(this);if(this.firstDraw){this.firstDraw=false;RGraph.SVG.fireCustomEvent(this,'onfirstdraw');}
RGraph.SVG.fireCustomEvent(this,'ondraw');return this;};this.create=function(definition)
{return RGraph.SVG.create.call(this,definition,arguments[1],arguments[2]);};this.getIndexByRadius=function(opt)
{var radius=opt.radius;for(var i=0;i<this.nodes.bars.length;++i){var radiusInner=parseFloat(this.nodes.bars[i].getAttribute('data-radius-inner'));var radiusOuter=parseFloat(this.nodes.bars[i].getAttribute('data-radius-outer'));if(radius>=radiusInner&&radius<=radiusOuter){return i;}}
return null;};this.drawBackground=function()
{if(properties.backgroundColor){RGraph.SVG.create({svg:this.svg,type:'rect',parent:this.svg.all,attr:{fill:properties.backgroundColor,x:0,y:0,width:this.width,height:this.height}});}
if(properties.backgroundGrid){var count=this.value.length+1;for(var i=0;i<count;i++){var radius=this.radius-(i*(properties.width+(2*properties.marginInner)));RGraph.SVG.create({svg:this.svg,type:'circle',parent:this.svg.all,attr:{fill:'transparent',stroke:properties.backgroundGridColor,cx:this.centerx,cy:this.centery,r:radius}});}
var minRadius=radius
if(properties.backgroundGridRadials){var angle=(RGraph.SVG.TRIG.TWOPI/properties.backgroundGridRadialsCount);for(var i=0;i<=properties.backgroundGridRadialsCount;++i){var path1=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx,cy:this.centery,radius:this.radius,start:i*angle,end:i*angle,lineto:false});var path2=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx,cy:this.centery,radius:minRadius,start:i*angle,end:i*angle,lineto:true});RGraph.SVG.create({svg:this.svg,type:'path',parent:this.svg.all,attr:{fill:'transparent',stroke:properties.backgroundGridColor,d:path1+' '+path2}});}}}};this.drawMeter=function()
{this.nodes.bars=[];for(var i=0;i<this.value.length;++i){var inner=this.radius-properties.marginInner-(i*properties.marginInner*2)-(i*properties.width)-properties.width,outer=this.radius-properties.marginInner-(i*properties.marginInner*2)-(i*properties.width);if(RGraph.SVG.isArray(properties.backgroundRingsColors)&&typeof properties.backgroundRingsColors[i]==='string'){var color=properties.backgroundRingsColors[i];}else{var color=properties.colors[i];}
if(properties.backgroundRings){var path=RGraph.SVG.donut({svg:this.svg.all,cx:this.centerx,cy:this.centery,innerRadius:inner,outerRadius:outer,fill:color,opacity:properties.backgroundRingsAlpha});path.setAttribute('data-radiusInner',inner);path.setAttribute('data-radiusOuter',outer);path.setAttribute('data-centerx',this.centerx);path.setAttribute('data-centery',this.centery);}
var group=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{'data-index':i}});var angle=((this.value[i]-this.min)/(this.max-this.min))*RGraph.SVG.TRIG.TWOPI;var arcPath=this.pathBar({radiusInner:inner,radiusOuter:outer,angle:angle});var path=RGraph.SVG.create({svg:this.svg,type:'path',parent:group,attr:{fill:properties.colors[i],d:arcPath,'data-index':i,'data-centerx':this.centerx,'data-centery':this.centery,'data-angles-info':'These angles are designed to be used with the RGraph.SVG.TRIG.getArcPath3() function','data-start-angle':0,'data-end-angle':angle,'data-radius-inner':inner,'data-radius-outer':outer}});group.setAttribute('data-centerx',this.centerx);group.setAttribute('data-centery',this.centery);group.setAttribute('data-start-angle',0);group.setAttribute('data-end-angle',angle);group.setAttribute('data-radius-inner',inner);group.setAttribute('data-radius-outer',outer);this.nodes.bars[i]=group;if(properties.ends==='round'&&0){var endcircle1=RGraph.SVG.create({svg:this.svg,type:'circle',parent:group,attr:{fill:color,cx:this.centerx,cy:this.centery-outer+(properties.width/2),r:properties.width/2}});var endpoint=RGraph.SVG.TRIG.getRadiusEndPoint({cx:this.centerx,cy:this.centery,radius:outer-(properties.width/2),angle:angle-RGraph.SVG.TRIG.HALFPI});var endcircle2=RGraph.SVG.create({svg:this.svg,type:'circle',parent:group,attr:{fill:color,cx:this.centerx+endpoint[0],cy:this.centery+endpoint[1],r:properties.width/2}});}
if(!RGraph.SVG.isNull(properties.tooltips)&&(!RGraph.SVG.isNull(properties.tooltips[i])||typeof properties.tooltips==='string')){var obj=this;(function(index)
{group.addEventListener(properties.tooltipsEvent.replace(/^on/,''),function(e)
{obj.removeHighlight();RGraph.SVG.tooltip({object:obj,index:index,group:null,sequentialIndex:index,text:typeof properties.tooltips==='string'?properties.tooltips:properties.tooltips[index],event:e});obj.highlight(e.target);},false);group.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);})(i);}}
this.currentValue=RGraph.SVG.arrayClone(this.value);};this.pathBar=function(opt)
{var inner=opt.radiusInner,outer=opt.radiusOuter,angle=opt.angle;var arcPath1=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx,cy:this.centery,radius:outer,start:0,end:angle,lineto:false});if(properties.ends==='round'){var endpoint1=RGraph.SVG.TRIG.getRadiusEndPoint({cx:this.centerx,cy:this.centery,radius:((outer-inner)/2)+inner,angle:opt.angle-RGraph.SVG.TRIG.HALFPI});var endPath1=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx+endpoint1[0],cy:this.centery+endpoint1[1],radius:(outer-inner)/2,start:angle,end:angle+RGraph.SVG.TRIG.PI,lineto:false,moveto:false});}else{endPath1='';}
var arcPath2=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx,cy:this.centery,radius:inner,start:angle,end:0,anticlockwise:true});if(properties.ends==='round'){var endPath2=RGraph.SVG.TRIG.getArcPath3({svg:this.svg,cx:this.centerx,cy:this.centery-inner-((outer-inner)/2),radius:(outer-inner)/2,start:RGraph.SVG.TRIG.PI,end:RGraph.SVG.TRIG.TWOPI,lineto:true});}else{endPath2='';}
return arcPath1
+' '+endPath1
+' '+arcPath2
+' '+endPath2
+' z';};this.highlight=function(el)
{var group=el.parentNode,index=group.getAttribute('data-index'),radiusInner=parseFloat(group.getAttribute('data-radius-inner')),radiusOuter=parseFloat(group.getAttribute('data-radius-outer')),angle=parseFloat(group.getAttribute('data-end-angle'));var highlightGroup=RGraph.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{fill:properties.highlightFill,stroke:properties.highlightStroke,},style:{pointerEvents:'none'}});var arcPath=this.pathBar({radiusInner:radiusInner,radiusOuter:radiusOuter,angle:angle});var path=RGraph.SVG.create({svg:this.svg,type:'path',parent:highlightGroup,attr:{d:arcPath,'stroke-width':properties.highlightLinewidth,'data-highlight':'true','data-index':index,'data-centerx':this.centerx,'data-centery':this.centery,'data-angles-info':'These angles are designed to be used with the RGraph.SVG.TRIG.getArcPath3() function','data-start-angle':0,'data-end-angle':angle,'data-radius-inner':radiusInner,'data-radius-outer':radiusOuter}});this.nodes.highlight=highlightGroup;RGraph.SVG.REG.set('highlight',highlightGroup);};this.removeHighlight=function()
{RGraph.SVG.removeHighlight();};this.drawLabels=function()
{if(properties.labelsCenter){var label=RGraph.SVG.numberFormat({object:this,num:this.value[properties.labelsCenterIndex].toFixed(properties.labelsCenterDecimals),prepend:properties.labelsCenterUnitsPre,append:properties.labelsCenterUnitsPost,point:properties.labelsCenterPoint,thousand:properties.labelsCenterThousand,formatter:properties.labelsCenterFormatter});var textConf=RGraph.SVG.getTextConf({object:this,prefix:'labelsCenter'});var text=RGraph.SVG.text({object:this,parent:this.svg.all,tag:'labels.center',text:typeof properties.labelsCenterSpecific==='string'?properties.labelsCenterSpecific:label,x:this.centerx+properties.labelsCenterOffsetx,y:this.centery+properties.labelsCenterOffsety,valign:properties.labelsCenterValign,halign:properties.labelsCenterHalign,font:textConf.font,size:textConf.size,bold:textConf.bold,italic:textConf.italic,color:textConf.color});this.nodes.labelsCenter=text;}
if(properties.labels.length){var textConf=RGraph.SVG.getTextConf({object:this,prefix:'labels'});if(typeof properties.labels==='string'){properties.labels=RGraph.SVG.arrayPad({array:[],length:this.value.length,value:properties.labels});}
for(var i=0;i<properties.labels.length;++i){if(typeof properties.labels==='object'&&properties.labels.length&&typeof properties.labels[i]==='string'){var text=RGraph.SVG.labelSubstitution({object:this,text:properties.labels[i],index:i,value:this.value[i],decimals:properties.labelsFormattedDecimals,point:properties.labelsFormattedPoint,thousand:properties.labelsFormattedThousand,unitsPre:properties.labelsFormattedUnitsPre,unitsPost:properties.labelsFormattedUnitsPost,});}
RGraph.SVG.text({object:this,parent:this.svg.all,color:textConf.color,font:textConf.font,size:textConf.size,bold:textConf.bold,italic:textConf.italic,text:text,x:this.centerx-5+properties.labelsOffsetx-(properties.ends?(properties.width/2):0),y:this.centery-this.radius+properties.marginInner+(i*properties.width)+(properties.width/2)+(i*2*properties.marginInner)+properties.labelsOffsety,valign:properties.labelsValign,halign:properties.labelsHalign,background:properties.labelsBackground,padding:2});}}};this.drawIcons=function()
{if(RGraph.SVG.isArray(properties.icons)){for(var i=0,images=[];i<this.value.length;++i){if(typeof properties.icons[i]==='string'&&properties.icons[i].length){var svg_images=[];var obj=this;images[i]=new Image();images[i].src=properties.icons[i];images[i].index=i;svg_images[i]=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'image',attr:{href:properties.icons[i],x:this.centerx+properties.iconsOffsetx-(properties.ends?(properties.width/2):0)+5,y:this.centery-this.radius+properties.marginInner+(i*properties.width)+(properties.width/2)+(i*2*properties.marginInner)+properties.iconsOffsety,index:i}});if(typeof properties.iconsWidth==='number')svg_images[i].setAttribute('width',properties.iconsWidth);if(typeof properties.iconsHeight==='number')svg_images[i].setAttribute('height',properties.iconsHeight);svg_images[i].onload=function()
{var index=this.getAttribute('index'),width=properties.iconsWidth||images[index].width,height=properties.iconsHeight||images[index].height;this.setAttribute('y',parseInt(this.getAttribute('y'))-(height/2));}}}}};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RGraph.SVG.arrayClone(properties.colors),backgroundColor:RGraph.SVG.arrayClone(properties.backgroundColor)}}
var colors=properties.colors;if(colors){for(var i=0;i<colors.length;++i){colors[i]=RGraph.SVG.parseColorLinear({object:this,color:colors[i],start:this.centerx-this.radius,end:this.centerx+this.radius,direction:'horizontal'});}}
properties.backgroundColor=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundColor,start:properties.marginLeft,end:this.width-properties.marginRight,direction:'horizontal'});};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RGraph.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};this.getAngle=function(e)
{if(typeof e==='number'){var angle=((e-this.min)/(this.max-this.min))*RGraph.SVG.TRIG.TWOPI;angle-=RGraph.SVG.TRIG.HALFPI;}else{var mouseX=e.offsetX,mouseY=e.offsetY;var angle=RGraph.SVG.TRIG.getAngleByXY({cx:this.centerx,cy:this.centery,x:mouseX,y:mouseY});angle-=RGraph.SVG.TRIG.HALFPI;}
return angle;};this.getValue=function(e)
{if(typeof e==='number'){var angle=e;}else{var angle=this.getAngle(e);}
var value=(((angle+RGraph.SVG.TRIG.HALFPI)/RGraph.SVG.TRIG.TWOPI)*(this.max-this.min))+this.min;value=Math.max(value,this.min);value=Math.min(value,this.max);return value;};this.getRadius=function(e)
{var x=e.offsetX,y=e.offsetY;var radius=RGraph.SVG.TRIG.getHypLength({x1:x,y1:y,x2:this.centerx,y2:this.centery});return radius;};this.grow=function()
{var obj=this;if(typeof this.value==='number'){this.value=[this.value];}
if(RGraph.SVG.isNull(this.currentValue)){this.currentValue=[];for(var i=0;i<this.value.length;++i){this.currentValue[i]=this.min;}}
var opt=arguments[0]||{},frames=opt.frames||30,frame=0,diff=[],step=[],callback=arguments[1]||function(){},initial=[];for(var i=0;i<this.value.length;++i){diff[i]=this.value[i]-this.currentValue[i];step[i]=diff[i]/frames;initial[i]=this.currentValue[i];}
function iterator()
{for(var i=0;i<obj.value.length;++i){obj.value[i]=initial[i]+(frame*step[i]);}
frame++;RGraph.SVG.clear(obj.svg);RGraph.SVG.redraw();if(frame<=frames){RGraph.SVG.FX.update(iterator);}else{callback(obj);}}
iterator();return this;};this.tooltipSubstitutions=function(opt)
{var indexes=[0,opt.index];return{index:indexes[1],dataset:indexes[0],sequentialIndex:indexes[1],value:this.value[indexes[1]],values:[this.value[indexes[1]]]};};this.tooltipsFormattedCustom=function(specific,index)
{return{label:(RGraph.SVG.isArray(properties.tooltipsFormattedKeyLabels)&&typeof properties.tooltipsFormattedKeyLabels[specific.index]==='string')?properties.tooltipsFormattedKeyLabels[specific.index]:properties.labels[specific.index],color:(RGraph.SVG.isArray(properties.tooltipsFormattedKeyColors)&&properties.tooltipsFormattedKeyColors[specific.index])?properties.tooltipsFormattedKeyColors[specific.index]:properties.colors[specific.index],value:this.value[specific.index]};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,svgXY=RGraph.SVG.getSVGXY(obj.svg),radiusOuter=parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-radius-outer')),radiusInner=parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-radius-inner')),start=parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-start-angle'))-RGraph.SVG.TRIG.HALFPI;end=parseFloat(this.nodes.bars[index].firstChild.getAttribute('data-end-angle'))-RGraph.SVG.TRIG.HALFPI;var endpoint=RGraph.SVG.TRIG.getRadiusEndPoint({cx:this.centerx,cy:this.centery,radius:radiusInner+((radiusOuter-radiusInner)/2),angle:((end-start)/2)+start});args.tooltip.style.left=(svgXY[0]
+(this.centerx+endpoint[0])
-(tooltip.offsetWidth/2))+'px';args.tooltip.style.top=(svgXY[1]
+(this.centery+endpoint[1])
-tooltip.offsetHeight
-10)+'px';};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}
return this;};})(window,document);