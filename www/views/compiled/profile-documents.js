!function(){var t=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["profile-documents"]=t({1:function(t,l,a,n,i){var e,s,o,r=null!=l?l:{},c=a.helperMissing,d="function",p=t.escapeExpression,u=a.blockHelperMissing,f='\t\t\t\t\t\t<li class="clearfix">\n\t\t\t\t\t\t\t<span style="width: 20%; text-align: left; display: inline-block;">'+p((s=null!=(s=a.type||(null!=l?l.type:l))?s:c,typeof s===d?s.call(r,{name:"type",hash:{},data:i}):s))+'</span> \n\t\t\t\t\t\t\t<span class="highlight" style="width: 50%; text-align: left; display: inline-block;">#####'+p((a.lastFour||l&&l.lastFour||c).call(r,null!=l?l.number:l,{name:"lastFour",hash:{},data:i}))+'</span> \n\t\t\t\t\t\t\t<span style="width: 28%; text-align: left; display: inline-block;">';return s=null!=(s=a.valid||(null!=l?l.valid:l))?s:c,o={name:"valid",hash:{},fn:t.program(2,i,0),inverse:t.noop,data:i},e=typeof s===d?s.call(r,o):s,a.valid||(e=u.call(l,e,o)),null!=e&&(f+=e),s=null!=(s=a.valid||(null!=l?l.valid:l))?s:c,o={name:"valid",hash:{},fn:t.noop,inverse:t.program(4,i,0),data:i},e=typeof s===d?s.call(r,o):s,a.valid||(e=u.call(l,e,o)),null!=e&&(f+=e),f+"</span>\t\t\t\t\t\n\t\t\t\t\t\t</li>\n"},2:function(t,l,a,n,i){return"Aprobado"},4:function(t,l,a,n,i){return"Sin aprobar"},6:function(t,l,a,n,i){return'\t\t\t\t\t\t<li class="clearfix">\n\t\t\t\t\t\t\t<p class="empty">No tienes documentos guardados.</p>\t\t\t\t\n\t\t\t\t\t\t</li>\n'},compiler:[7,">= 4.0.0"],main:function(t,l,a,n,i){var e,s=t.lambda,o=a.blockHelperMissing;return'\n\t<div id="profileTabs" class="container clearfix">\n\n\t\t<div class="content profile">\n\t\t\t\n\t\t\t<div class="tabs_quiniela clearfix">\n\t\t\t\t<ul>\n\t\t\t\t\t<li><a class="hook" data-resource="profile-methods" href="profile.html">Tarjetas</a></li>\n\t\t\t\t\t<li class="selected"><a>Documentos</a></li>\n\t\t\t\t\t<li><a class="hook" data-resource="profile-withraw" href="profile.html?method=withraw">Retirar fondos</a></li>\n\t\t\t\t\t<li><a class="hook" data-resource="profile-history" href="profile.html?method=history">Historial</a></li>\n\t\t\t\t\t<li><a class="hook" data-resource="profile-notifications" href="profile.html?method=notifications">Notificaciones</a></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class="tab_profile documents list">\n\t\t\t\t<ul>\n'+(null!=(e=o.call(l,s(null!=(e=null!=l?l.data:l)?e.documents:e,l),{name:"data.documents",hash:{},fn:t.program(1,i,0),inverse:t.noop,data:i}))?e:"")+(null!=(e=o.call(l,s(null!=(e=null!=l?l.data:l)?e.documents:e,l),{name:"data.documents",hash:{},fn:t.noop,inverse:t.program(6,i,0),data:i}))?e:"")+"\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"legales clearfix\">\n\t\t\t\t<a class=\"link_legal\" onclick=\"window.open('https://www.pickwin.net/terminos-y-condiciones', '_blank', 'location=yes')\" >Términos y condiciones | </a>\n\t\t\t\t<a class=\"link_legal\" onclick=\"window.open('https://www.pickwin.net/aviso-de-privacidad', '_blank', 'location=yes')\" >Política de privacidad</a>\n\t\t\t</div>\n\t\t</div><!-- content -->\n\n\t</div><!-- container -->"},useData:!0})}();