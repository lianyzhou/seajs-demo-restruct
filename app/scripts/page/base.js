define(function(require,exports,module) {
	require("vendors/sea/plugin-style");
	require("vendors/sea/plugin-text");
	require("vendors/ejs");
	require("vendors/underscore");
	require("vendors/asyncbox/asyncbox");
	require("vendors/jquery-ui/jquery-ui");
	require("util/builder");
	require("util/pubsub");
	require("util/actiondata");
	require("util/delegate");
	var globalConfig = require("common/baseconfig");
	$.showErrorTip = function(msg) {
		asyncbox.tips(msg , "error" , globalConfig.tipTimer);
	};
});