!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["lobby"]=a({1:function(a,n,t,l,e){var i;return null!=(i=a.invokePartial(l["each-quiniela"],n,{name:"each-quiniela",hash:{full_path:null!=n?n.cordova_full_path:n},data:e,indent:"\t\t\t\t",helpers:t,partials:l,decorators:a.decorators}))?i:""},compiler:[7,">= 4.0.0"],main:function(a,n,t,l,e){var i;return'\n\t<div class="container clearfix lobby">\n\t\t<div class="content quinielas">\n\n'+(null!=(i=t.blockHelperMissing.call(n,a.lambda(null!=(i=null!=n?n.data:n)?i.pools:i,n),{name:"data.pools",hash:{},fn:a.program(1,e,0),inverse:a.noop,data:e}))?i:"")+"\n\t\t</div><!-- content -->\n\t</div><!-- container -->\n\t\n"+(null!=(i=a.invokePartial(l.filters,n,{name:"filters",data:e,indent:"\t",helpers:t,partials:l,decorators:a.decorators}))?i:"")+'\t\n\t<div id="misQuinielas" class="misquinielas overlay">\n\t\t\n\t</div><!-- misquinielas overlay -->'},usePartial:!0,useData:!0})}();