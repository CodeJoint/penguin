!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e["other-entries"]=n({1:function(n,e,a,l,t){var r,s,u=null!=e?e:{},i=a.helperMissing,o="function",d=n.escapeExpression;return'\t<option value="'+d((s=null!=(s=a.id||(null!=e?e.id:e))?s:i,typeof s===o?s.call(u,{name:"id",hash:{},data:t}):s))+'">'+d((s=null!=(s=a.number||(null!=e?e.number:e))?s:i,typeof s===o?s.call(u,{name:"number",hash:{},data:t}):s))+"/"+d(n.lambda(null!=(r=null!=(r=null!=e?e.data:e)?r.other_entries:r)?r.length:r,e))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,l,t){var r;return null!=(r=a.blockHelperMissing.call(e,n.lambda(null!=(r=null!=e?e.data:e)?r.other_entries:r,e),{name:"data.other_entries",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?r:""},useData:!0})}();