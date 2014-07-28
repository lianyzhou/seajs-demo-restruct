define(function(require,exports,module) {
	$.getActionData = function(node) {
		var $dom = $(node);
		var ret = {};
		var actionData = $dom.attr("action-data") || '';
		if(actionData) {
			var arr = actionData.split("&");
			$(arr).each(function(i , param) {
				var obj = param.split("=");
				ret[obj[0]] = obj[1];
			});
		}
		return ret;
	};		
});
