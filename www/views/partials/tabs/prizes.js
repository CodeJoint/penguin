!function(){var t=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["prizes"]=t({1:function(t,a,n,e,l,r,i){var s;return null!=(s=n.each.call(null!=a?a:{},null!=a?a.prizes:a,{name:"each",hash:{},fn:t.program(2,l,0,r,i),inverse:t.noop,data:l}))?s:""},2:function(t,a,n,e,l,r,i){var s,o,c=null!=a?a:{},u=n.helperMissing;return'\t\t\t\t\t<tr class="player_info">\n\t\t\t\t\t\t<td>'+t.escapeExpression((o=null!=(o=n.position||(null!=a?a.position:a))?o:u,"function"==typeof o?o.call(c,{name:"position",hash:{},data:l}):o))+" LUGAR</td>\n"+(null!=(s=(n.if_eq||a&&a.if_eq||u).call(c,null!=a?a.type:a,"fixed",{name:"if_eq",hash:{},fn:t.program(3,l,0,r,i),inverse:t.noop,data:l}))?s:"")+(null!=(s=(n.if_eq||a&&a.if_eq||u).call(c,null!=a?a.type:a,"percentage",{name:"if_eq",hash:{},fn:t.program(5,l,0,r,i),inverse:t.noop,data:l}))?s:"")+"\t\t\t\t\t</tr>\n"},3:function(t,a,n,e,l,r,i){var s=null!=a?a:{},o=n.helperMissing,c=t.escapeExpression;return"\t\t\t\t\t\t\t<td>"+c((n.calcPercentage||a&&a.calcPercentage||o).call(s,null!=a?a.amount:a,null!=i[1]?i[1].available:i[1],{name:"calcPercentage",hash:{},data:l}))+'%</td>\n\t\t\t\t\t\t\t<td class="ganar"><img src="images/billete.png">$'+c((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=a?a.amount:a,{name:"formatCurrency",hash:{},data:l}))+" MXN</td>\n"},5:function(t,a,n,e,l,r,i){var s,o=null!=a?a:{},c=n.helperMissing,u=t.escapeExpression;return"\t\t\t\t\t\t\t<td>"+u((n.formatCurrency||a&&a.formatCurrency||c).call(o,null!=a?a.percentage:a,{name:"formatCurrency",hash:{},data:l}))+'%</td>\n\t\t\t\t\t\t\t<td class="ganar"><img src="images/billete.png">$'+u((n.calcAmount||a&&a.calcAmount||c).call(o,null!=a?a.normalized:a,null!=(s=null!=(s=null!=i[2]?i[2].prize_distribution:i[2])?s.pool:s)?s.available:s,{name:"calcAmount",hash:{},data:l}))+" MXN</td>\n"},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l,r,i){var s;return'\t<div class="tab tab_premios clearfix">\n\t\t<table>\n\t\t\t<tr class="table_title">\n\t\t\t\t<th>LUGAR</th>\n\t\t\t\t<th>PORCENTAJE</th>\n\t\t\t\t<th>MONTO</th>\n\t\t\t</tr>\n'+(null!=(s=n.blockHelperMissing.call(a,t.lambda(null!=(s=null!=a?a.prize_distribution:a)?s.pool_prizes:s,a),{name:"prize_distribution.pool_prizes",hash:{},fn:t.program(1,l,0,r,i),inverse:t.noop,data:l}))?s:"")+"\t\t</table>\n\t</div><!-- premios -->"},useData:!0,useDepths:!0})}();