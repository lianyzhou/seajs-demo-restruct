define(function(require,exports,module) {
	$.delegatedEvent = function(node) {
		var that = {} , map = {} , $node = $(node);
		that.add = function(actType , evtName , func) {
			$node.on(evtName , '[action-type="' + actType + '"]' , func);
			if(!map[actType]) {
				map[actType] = {};
			}
			if(!map[actType][evtName]) {
				map[actType][evtName] = [];
			}
			map[actType][evtName].push(func);
		};
		that.remove = function(actType , evtName , func) {
			$node.off(evtName , '[action-type="' + actType + '"]' , func);
			if(map[actType]) {
				if(map[actType][evtName]) {
					var list = map[actType][evtName] , idx = -1;
					for(var i = 0 , len = list.length ; i <  len ; i++) {
						if(list[i] === func) {
							idx = i;
							break;
						}
					}
					if(idx != -1) {
						list.splict(idx , 1);
					}
				}
			}
		};
		that.destroy = function() {
			for(var evtName in map) {
				var evtList = map[evtName];
				for(var actName in evtList) {
					var funcList = evtList[actName];
					for(var i = 0 , len  = funcList.length ; i < len ; i++) {
						$node.off(evtName , '[action-type]' , funcList[i]);
					}
				}
			}
			map = {};
		};
		return that;
	};		
});
