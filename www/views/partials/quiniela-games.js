!function(){var t=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["quiniela-games"]=t({1:function(t,a,l,n,i){var e,s,o,d=null!=a?a:{},p=l.helperMissing,c="function",r=t.escapeExpression,u=l.blockHelperMissing,h=t.lambda,f='\t\t<div data-id="'+r((s=null!=(s=l.id||(null!=a?a.id:a))?s:p,typeof s===c?s.call(d,{name:"id",hash:{},data:i}):s))+'" class="partido clearfix">\n\t\t\t<div class="opcion_partido local clearfix">\n';return s=null!=(s=l.finished||(null!=a?a.finished:a))?s:p,o={name:"finished",hash:{},fn:t.noop,inverse:t.program(2,i,0),data:i},e=typeof s===c?s.call(d,o):s,l.finished||(e=u.call(a,e,o)),null!=e&&(f+=e),f+='\t\t\t\t<div class="check"></div>\t\n\t\t\t\t<label for="local_'+r((s=null!=(s=l.id||(null!=a?a.id:a))?s:p,typeof s===c?s.call(d,{name:"id",hash:{},data:i}):s))+'" >\n\t\t\t\t\t<img src="'+r((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:p,typeof s===c?s.call(d,{name:"cordova_full_path",hash:{},data:i}):s))+'images/camisaverde.png">\n\t\t\t\t\t<div class="equipo">\n\t\t\t\t\t\t<span class="iniciales">'+r(h(null!=(e=null!=a?a.home_team:a)?e.abbreviation:e,a))+'</span>\n\t\t\t\t\t</div><!-- equipo -->\n\t\t\t\t</label>\t\t\t\t\t\t\n\t\t\t\t<div class="linea">\n',s=null!=(s=l.finished||(null!=a?a.finished:a))?s:p,o={name:"finished",hash:{},fn:t.program(4,i,0),inverse:t.noop,data:i},e=typeof s===c?s.call(d,o):s,l.finished||(e=u.call(a,e,o)),null!=e&&(f+=e),f+='\t\t\t\t</div><!-- linea -->\n\t\t\t</div><!-- opcion_partido -->\n\t\t\t<div class="opcion_partido '+(null!=(e=l.if.call(d,null!=a?a.allow_ties:a,{name:"if",hash:{},fn:t.program(6,i,0),inverse:t.noop,data:i}))?e:"")+' cierre clearfix">\n\t\t\t\t'+(null!=(e=l.if.call(d,null!=a?a.allow_ties:a,{name:"if",hash:{},fn:t.program(8,i,0),inverse:t.noop,data:i}))?e:"")+'\n\t\t\t\t<input type="radio" name="'+r((s=null!=(s=l.id||(null!=a?a.id:a))?s:p,typeof s===c?s.call(d,{name:"id",hash:{},data:i}):s))+'" value="pick-tie-'+r((s=null!=(s=l.id||(null!=a?a.id:a))?s:p,typeof s===c?s.call(d,{name:"id",hash:{},data:i}):s))+'" id="empate">\n\t\t\t\t<span>'+r((l.formatDate||a&&a.formatDate||p).call(d,null!=a?a.deadline:a,"lll",{name:"formatDate",hash:{},data:i}))+'</span>\n\t\t\t</div><!-- opcion_partido -->\n\t\t\t<div class="opcion_partido visitante clearfix">\n',s=null!=(s=l.finished||(null!=a?a.finished:a))?s:p,o={name:"finished",hash:{},fn:t.noop,inverse:t.program(10,i,0),data:i},e=typeof s===c?s.call(d,o):s,l.finished||(e=u.call(a,e,o)),null!=e&&(f+=e),f+='\t\t\t\t<div class="check"></div>\t\n\t\t\t\t<label for="away_'+r((s=null!=(s=l.id||(null!=a?a.id:a))?s:p,typeof s===c?s.call(d,{name:"id",hash:{},data:i}):s))+'" >\n\t\t\t\t\t<img src="'+r((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:p,typeof s===c?s.call(d,{name:"cordova_full_path",hash:{},data:i}):s))+'images/camisaazul.png">\n\t\t\t\t\t<div class="equipo">\n\t\t\t\t\t\t<span class="iniciales">'+r(h(null!=(e=null!=a?a.away_team:a)?e.abbreviation:e,a))+'</span>\n\t\t\t\t\t</div><!-- equipo -->\n\t\t\t\t</label>\t\t\t\t\t\t\n\t\t\t\t<div class="linea">\n',s=null!=(s=l.finished||(null!=a?a.finished:a))?s:p,o={name:"finished",hash:{},fn:t.program(12,i,0),inverse:t.noop,data:i},e=typeof s===c?s.call(d,o):s,l.finished||(e=u.call(a,e,o)),null!=e&&(f+=e),f+"\t\t\t\t</div><!-- linea -->\n\t\t\t</div><!-- opcion_partido -->\n\t\t</div><!-- partido -->\n"},2:function(t,a,l,n,i){var e,s=null!=a?a:{},o=l.helperMissing,d="function",p=t.escapeExpression;return'\t\t\t\t\t<input type="radio" id="local_'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'" name="'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'" value="pick-local-'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'">\n'},4:function(t,a,l,n,i){var e;return"\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t"+t.escapeExpression((e=null!=(e=l.score_away||(null!=a?a.score_away:a))?e:l.helperMissing,"function"==typeof e?e.call(null!=a?a:{},{name:"score_away",hash:{},data:i}):e))+"\n\t\t\t\t\t\t</span>\n"},6:function(t,a,l,n,i){return" empate "},8:function(t,a,l,n,i){return""},10:function(t,a,l,n,i){var e,s=null!=a?a:{},o=l.helperMissing,d="function",p=t.escapeExpression;return'\t\t\t\t\t<input type="radio" id="away_'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'" name="'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'" value="pick-away-'+p((e=null!=(e=l.id||(null!=a?a.id:a))?e:o,typeof e===d?e.call(s,{name:"id",hash:{},data:i}):e))+'">\n'},12:function(t,a,l,n,i){var e;return"\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t"+t.escapeExpression((e=null!=(e=l.score_home||(null!=a?a.score_home:a))?e:l.helperMissing,"function"==typeof e?e.call(null!=a?a:{},{name:"score_home",hash:{},data:i}):e))+"\n\t\t\t\t\t\t</span>\n"},compiler:[7,">= 4.0.0"],main:function(t,a,l,n,i){var e;return'\t<h3>PARTIDOS</h3>\n\t<div class="opciones_partido clearfix">\n\t\t<span>LOCAL</span> <span>EMPATE</span> <span>VISITA</span>\n\t</div><!-- opciones_partido -->\n'+(null!=(e=l.blockHelperMissing.call(a,t.lambda(null!=(e=null!=a?a.data:a)?e.fixtures:e,a),{name:"data.fixtures",hash:{},fn:t.program(1,i,0),inverse:t.noop,data:i}))?e:"")},useData:!0})}();