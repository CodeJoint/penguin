!function(){var t=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["each-quiniela"]=t({1:function(t,a,l,n,e){return"quiniela_open"},3:function(t,a,l,n,e){return"quiniela_live"},5:function(t,a,l,n,e){return"quiniela_closed"},compiler:[7,">= 4.0.0"],main:function(t,a,l,n,e){var i,s,c,o=null!=a?a:{},u=l.helperMissing,r="function",p=l.blockHelperMissing,d=t.escapeExpression,_='\t<a class="link_wrapper" href="">\n\t\t<div class="quiniela \n\t\t\t\t\t\t';return s=null!=(s=l.upcoming||(null!=a?a.upcoming:a))?s:u,c={name:"upcoming",hash:{},fn:t.program(1,e,0),inverse:t.noop,data:e},i=typeof s===r?s.call(o,c):s,l.upcoming||(i=p.call(a,i,c)),null!=i&&(_+=i),_+=" \n\t\t\t\t\t\t",s=null!=(s=l.live||(null!=a?a.live:a))?s:u,c={name:"live",hash:{},fn:t.program(3,e,0),inverse:t.noop,data:e},i=typeof s===r?s.call(o,c):s,l.live||(i=p.call(a,i,c)),null!=i&&(_+=i),_+=" \n\t\t\t\t\t\t",s=null!=(s=l.closed||(null!=a?a.closed:a))?s:u,c={name:"closed",hash:{},fn:t.program(5,e,0),inverse:t.noop,data:e},i=typeof s===r?s.call(o,c):s,l.closed||(i=p.call(a,i,c)),null!=i&&(_+=i),_+' \n\t\t\t\t\t\tsoccer natural garantizado clearfix">\n\t\t\t<div class="quiniela_header clearfix">\n\t\t\t\t<div class="quiniela_iconos clearfix">\n\t\t\t\t\t<img src="'+d((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===r?s.call(o,{name:"cordova_full_path",hash:{},data:e}):s))+'images/natural.png">\n\t\t\t\t\t<img src="'+d((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===r?s.call(o,{name:"cordova_full_path",hash:{},data:e}):s))+'images/soccer.png">\n\t\t\t\t</div><!-- iconos -->\n\t\t\t\t<h2>'+d((s=null!=(s=l.name_replaced||(null!=a?a.name_replaced:a))?s:u,typeof s===r?s.call(o,{name:"name_replaced",hash:{},data:e}):s))+'</h2>\n\t\t\t</div><!-- quiniela_header -->\n\t\t\t<div class="quiniela_content clearfix">\n\t\t\t\t<div class="quiniela_info clearfix">\n\t\t\t\t\t<span class="registros">REG: '+d((s=null!=(s=l.entry_count||(null!=a?a.entry_count:a))?s:u,typeof s===r?s.call(o,{name:"entry_count",hash:{},data:e}):s))+'</span>\n\t\t\t\t\t<span class="cierre">CIERRE: '+d((s=null!=(s=l.date_format||(null!=a?a.date_format:a))?s:u,typeof s===r?s.call(o,{name:"date_format",hash:{},data:e}):s))+'</span>\n\t\t\t\t</div><!-- quiniela_info -->\n\t\t\t\t<div class="quiniela_picks_ok clearfix">\n\t\t\t\t\t<span class="titulo">PICKS</span>\n\t\t\t\t\t<img src="'+d((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===r?s.call(o,{name:"cordova_full_path",hash:{},data:e}):s))+'images/acierto.png">\n\t\t\t\t</div>\n\t\t\t\t<div class="quiniela_aganar clearfix">\n\t\t\t\t\t<span class="titulo">A GANAR</span>\n\t\t\t\t\t<span class="number">$'+d((s=null!=(s=l.available||(null!=a?a.available:a))?s:u,typeof s===r?s.call(o,{name:"available",hash:{},data:e}):s))+'</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="quiniela_entrada clearfix">\n\t\t\t\t\t<span class="titulo">ENTRADA</span>\n\t\t\t\t\t<img src="'+d((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===r?s.call(o,{name:"cordova_full_path",hash:{},data:e}):s))+'images/billecoin.png">\n\t\t\t\t\t<span class="number">$'+d((s=null!=(s=l.entry_fee||(null!=a?a.entry_fee:a))?s:u,typeof s===r?s.call(o,{name:"entry_fee",hash:{},data:e}):s))+'</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="quiniela_bolsa clearfix">\n\t\t\t\t\t<span class="titulo">BOLSA</span>\n\t\t\t\t\t<img src="'+d((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===r?s.call(o,{name:"cordova_full_path",hash:{},data:e}):s))+'images/garantizado.png">\n\t\t\t\t\t<span class="number guarantee">$'+d((s=null!=(s=l.acum||(null!=a?a.acum:a))?s:u,typeof s===r?s.call(o,{name:"acum",hash:{},data:e}):s))+"</span>\n\t\t\t\t</div>\n\t\t\t</div><!-- quiniela_content -->\n\t\t</div><!-- quiniela -->\n\t</a><!-- link_wrapper -->"},useData:!0})}();