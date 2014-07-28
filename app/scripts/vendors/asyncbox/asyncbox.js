define(function(require,exports,module) {
	asyncbox = {
		// 动画效果
		Flash: false,
		// 遮挡 select (ie6)
		inFrame: true,
		// 初始索引值
		zIndex: 1987,
		// 自适应最小宽度
		minWidth: 330,
		// 自适应最大宽度
		maxWidth: 700,
		// 遮罩层
		Cover: {
			// 透明度
			opacity: 0.1,
			// 背景颜色
			background: '#000'
		},
		// 加载器
		Wait: {
			// 启用
			Enable: true,
			// 提示文本
			text: '加载中...'
		},
		// 按钮文本
		Language: {
			// action 值 ok
			OK: '确定',
			// action 值 no
			NO: '　否　',
			// action 值 yes
			YES: '　是　',
			// action 值 cancel
			CANCEL: '取消',
			// action 值 close
			CLOSE: '关闭'
		}
	};
	(function(a) {
		function W(b, c, d, f) {
			var e = q("asynctips_" + c);
			e
					? q("asynctips_" + c + "_content").innerHTML = b
					: (a(f ? f : "body").append([
							'<div id="asynctips_',
							c,
							'" class="asynctips asynctips_',
							c,
							'">',
							'<table border="0" cellspacing="0" cellpadding="0">',
							"<tr>",
							'<td class="asynctips_left"></td>',
							'<td><span></span></td>',
							'<td class="asynctips_middle" id="asynctips_' + c
									+ '_content">', b, "</td>",
							'<td class="asynctips_right"></td>', "</tr>",
							"</table>", "</div>"].join("")), e = q("asynctips_" + c)), V(
					e, f), setTimeout(function() {
						a(e).animate({
									// top: r().top,
									opacity: 0
								}, function() {
									a(this).remove()
								})
					}, d || 1500)
		}
		function V(a, e) {
			var b = r(e), c = b.height * .382 - a.offsetHeight / 2, d = b.left
					+ (b.width - a.offsetWidth) / 2;
			a.style.top = b.top + c + "px", a.style.left = d + "px"
		}
		function U(b, c, d, e, i) {
			var g = f + e, h = {
				id: g,
				logo: !1,
				icon: g,
				title: c,
				reset: !0,
				modal: !0,
				content: b,
				layout: f + "auto",
				callback: d
			};
			if(e == "alert" || "success" || "error")
				h.btnsbar = a.btn.OK;
			switch(e) {
				case "confirm":
					h.btnsbar = a.btn.OKCANCEL;
					break;
				case "warning":
					h.btnsbar = a.btn.YESNOCANCEL
			}
			v(h, i)
		}
		function T(b, c, d) {
			return a.grep(b, function(a) {
						return d ? a[d] != c : a != c
					})
		}
		function S(a) {
			n.fixed(a, r())
		}
		function O(b) {
			var c = new Object;
			c.id = b.id, c.top = b.top, c.right = b.right, c.bottom = b.bottom, c.left = b.left, c.flash = b.flash, l
					.push(c), l.length > 0 && !g
					&& (a(d).bind("resize", R), g = !0)
		}
		function N(a, b) {
			M(a, null, !1, b), a.reset && O(a), p && a.fixed && S(q(a.id))
		}
		function M(a, b, c, m) {
			var d = b || m ? r(m):r();
			if(d.x > d.width || d.y > d.height)
				d = m ? r(m):r();
			var e = a.id, f = q(e), g = f.style, h = f.offsetHeight > d.height / 2
					? (d.height - f.offsetHeight) / 2
					: d.height * .382 - f.offsetHeight / 2, i = pt = !p && a.fixed
					? h
					: d.top + h, j = d.width - f.offsetWidth, k = pl = !p
					&& a.fixed ? j / 2 : d.left + j / 2;
			!p && a.fixed
					? (a.top >= 0 && (i = a.top), a.right >= 0 && (k = j - a.right), a.bottom >= 0
							&& (i = d.height - f.offsetHeight - a.bottom), a.left >= 0
							&& (k = a.left))
					: (a.top >= 0 && (i = d.top + a.top), a.right >= 0
							&& (k = d.left + j - a.right), a.bottom >= 0
							&& (i = d.top + d.height - f.offsetHeight - a.bottom), a.left >= 0
							&& (k = d.left + a.left)), i = i <= d.top ? d.top : i, k = k <= d.left
					? d.left
					: k, c ? E(f, {
						top: i,
						left: k
					}) : (g.top = i + "px", g.left = k + "px")
		}
		function L(b) {
			var d = b.id, e = q(d), g = e.style, h = r();
			if(b.pageMode || b.htmlMode) {
				b.width != "auto" && (g.width = b.width + "px"), b.height != "auto"
						&& (g.height = b.height + "px");
				var i = a("#" + d + "_content");
				b.width > 0
						&& b.htmlMode
						&& i.width(b.width - a("#" + d + "_left").outerWidth()
								- a("#" + d + "_right").outerWidth()), b.height > 0
						&& i.height(b.height - a("#" + d + "_header").outerHeight()
								- a("#" + d + "_tipsbar").outerHeight()
								- a("#" + d + "_btnsbar").outerHeight()
								- a("#" + d + "_bottom").outerHeight()), K(b)
			} else
				e.offsetWidth < c.minWidth && !b.inputMode
						? (e.className = f + "normal", g.width = c.minWidth + "px")
						: e.offsetWidth > c.maxWidth
								&& (e.className = f + "normal", g.width = c.maxWidth
										+ "px"), e.offsetHeight > h.height
						&& a.resizeTo(b.id, e.offsetWidth, h.height);
			g.width = e.offsetWidth + "px", g.height = e.offsetHeight + "px"
		}
		function K(b) {
			c.Wait.Enable && b.pageMode
					&& a("#" + b.id + "_content").bind("load", function() {
								try {
									a("#" + b.id + "_wait").remove();
									var d = this.contentWindow;
									d.asyncbox = c, d.$ = a
								} catch(e) {
								}
							})
		}
		function J(a, b) {
			L(a), N(a, b), a.fixed && S(q(a.id))
		}
		function I(b) {
			var c = q(b), d = a.framer(b);
			if(c) {
				c.src = "about:blank";
				try {
					d.doc.write(""), d.doc.clear(), d.doc.close()
				} catch(e) {
				}
			}
		}
		function H(b) {
			var d, e = a.btn.CLOSE.concat(b.btnsbar);
			a.each(e, function(e, f) {
						a("#" + b.id + "_" + f.action).click(function(e) {
							var g = a(this);
							g.attr("disabled", "disabled"), b.inputMode
									? d = b.callback(f.action,
											q(b.id + "_Text").value)
									: b.pageMode
											? d = b.callback(f.action, a
															.opener(b.id),
													a.returnValue)
											: b.htmlMode ? d = b.callback(f.action,
													a.returnValue) : d = b
													.callback(f.action);
							if(typeof d == "undefined" || d)
								b.pageMode && I(b.id + "_content"), c.close(b.id);
							g.removeAttr("disabled"), e.preventDefault();
							return !1
						})
					})
		}
		function G(b) {
			b.inputMode ? a("#" + b.id + "_Text").focus().select() : a("#" + b.id
					+ "_Focus").focus().remove()
		}
		function F(b) {
			if(b.btnsbar) {
				var c = [];
				a.each(b.btnsbar, function(a, d) {
							c.push('<a id="', b.id, "_", d.action, '"class="', f,
									'btn"', p ? 'href="javascript:void(0)"' : "",
									"><span>&nbsp;", d.text, "&nbsp;</span></a>")
						});
				return c.join("")
			}
		}
		function E(b, c) {
			a(b).animate(c, 300, function() {
						p && c.fixed && S(b)
					})
		}
		function D(b) {
			b.memory && (a(b.memory.key).html(b.memory.value), b.memory = !1)
		}
		function C(b) {
			var c = b.html;
			if(typeof c == "object" && c) {
				if(a.trim(c.innerHTML)) {
					b.memory = {
						key: c,
						value: c.innerHTML
					}, c.innerHTML = "";
					return b.memory.value
				}
				return ""
			}
			return c
		}
		function B(a) {
			var b = a.pageMode || a.htmlMode ? "b_m_m" : "a_m_m", d = a.pageMode
					|| a.htmlMode ? "b_btnsbar_m" : "a_btnsbar_m";
			return [
					c.inFrame && o
							? '<iframe class="' + f + 'select"></iframe>'
							: "",
					a.inputMode
							? ""
							: '<input id="'
									+ a.id
									+ '_Focus" type="button" style="position:absolute;z-index:-5">',
					'<table class="' + f
							+ 'table" border="0" cellspacing="0" cellpadding="0">',
					"<tbody>",
					"<tr>",
					'<td class="b_t_l" id="' + a.id + '_left"></td>',
					'<td class="b_t_m" id="' + a.id + '_header">',
					'<div class="' + f + 'title">',
					"<ul>",
					a.logo ? '<li class="' + f + 'title_icon"></li>' : "",
					'<li class="' + f + 'title_tips"><strong>',
					a.title,
					"&nbsp;</strong></li>",
					'<li style="padding-left:30px">',
					'<a id="' + a.id + '_close" class="' + f
							+ 'close" href="javascript:void(0)" title="'
							+ c.Language.CLOSE + '">' + c.Language.CLOSE + "</a>",
					"</li>",
					"</ul>",
					"</div>",
					"</td>",
					'<td class="b_t_r" id="' + a.id + '_right"></td>',
					"</tr>",
					a.tipsbar
							? '<tr><td class="b_tipsbar_l"></td><td class="b_tipsbar_m" id="'
									+ a.id
									+ '_tipsbar" valign="top">'
									+ '<div class="b_tipsbar_layout"><ul><li class="b_tipsbar_title">'
									+ a.tipsbar.title
									+ "</li>"
									+ '<li class="b_tipsbar_content">'
									+ a.tipsbar.content
									+ '</li></ul></div></td><td class="b_tipsbar_r"></td></tr>'
							: "",
					"<tr>",
					'<td class="b_m_l"></td>',
					'<td class="' + b + '">',
					a.pageMode
							? ""
							: a.inputMode
									? '<div class="'
											+ f
											+ 'prompt">'
											+ "<ul>"
											+ "<li>"
											+ a.inputMode.tips
											+ "</li>"
											+ "<li>"
											+ (a.textType == "text"
													? '<input type="text" id="'
															+ a.id
															+ '_Text" value="'
															+ a.inputMode.content
															+ '" size="60" />'
													: "")
											+ (a.textType == "textarea"
													? '<textarea cols="60" rows="10" id="'
															+ a.id
															+ '_Text">'
															+ a.inputMode.content
															+ "</textarea>"
													: "")
											+ (a.textType == "password"
													? '<input type="password" id="'
															+ a.id
															+ '_Text" value="'
															+ a.inputMode.content
															+ '" size="40" />'
													: "") + "</li>" + "</ul>"
											+ "</div>"
									: a.htmlMode
											? '<div id="'
													+ a.id
													+ '_content" style="overflow:'
													+ (a.scroll == "yes"
															|| a.scroll == "auto"
															? "auto"
															: "hidden") + '">'
													+ C(a) + "</div>"
											: '<div id="'
													+ a.id
													+ '_content" style="overflow:hidden;overflow-y:auto"><div class="'
													+ a.icon + '"><span></span>'
													+ a.content + "</div</div>",
					a.pageMode ? '<iframe frameborder="0" id="' + a.id
							+ '_content" name="' + a.id
							+ '_content" width="100%" src="' + t(a)
							+ '" scrolling="' + a.scroll + '"></iframe>' : "",
					"</td>",
					'<td class="b_m_r"></td>',
					"</tr>",
					a.btnsbar ? '<tr><td class="b_btnsbar_l"></td><td class="' + d
							+ '" id="' + a.id + '_btnsbar">' + '<div class="' + f
							+ 'btn_layout">' + F(a)
							+ '</div></td><td class="b_btnsbar_r"></td></tr>' : "",
					"<tr>",
					'<td class="b_b_l"></td>',
					'<td id="' + a.id + '_bottom" class="b_b_m"></td>',
					'<td class="b_b_r"></td>',
					"</tr>",
					"</tbody>",
					"</table>",
					c.Wait.Enable && a.pageMode ? '<div class="' + f + 'wait" id="'
							+ a.id + '_wait"><span></span>' + c.Wait.text
							+ "</div>" : ""].join("")
		}
		function A(b) {
			b.modal && (i.push(c.zIndex), j.push(b.id), a.cover(!0, c.zIndex))
		}
		function z(a, b) {
			var c = q(f + "focus"), d = c.style;
			a ? b && (d.display = "block") : d.display = "none"
		}
		function y(b) {
			function B() {
				z(!1), b.drag.clone
						&& (c.Flash
								? E(g, {
											top: el.offsetTop,
											left: el.offsetLeft,
											fixed: b.fixed
										})
								: (h.top = el.offsetTop + "px", h.left = el.offsetLeft
										+ "px"), y.display = "none"), p && b.fixed
						&& S(g), o && el.releaseCapture
						? (el.releaseCapture(), el.onmousemove = null, el.onmouseup = null)
						: a(e).unbind("mousemove", A).unbind("mouseup", B)
			}
			function A(a) {
				v = a.clientX - t, w = a.clientY - u, v < l ? v = l : v > s
						&& (v = s), w < k ? w = k : w > n && (w = n), els.top = w
						+ "px", els.left = v + "px";
				return !1
			}
			var d = b.id, g = el = q(d), h = els = el.style, i, j, k, l, n, s, t, u, v, w, k, l, n, s, x = q(f
					+ "clone"), y = x.style;
			a("#" + d + "_header").css({
						cursor: "move"
					}), a("#" + d + "_header").mousedown(function(c) {
				c.which == 1
						&& c.target.tagName != "A"
						&& (i = r(), z(b, !0), el = g, els = g.style, j = {
							top: el.offsetTop,
							left: el.offsetLeft,
							width: el.offsetWidth,
							height: el.offsetHeight
						}, b.drag.clone
								&& (!p && b.fixed && (y.position = "fixed"), y.top = j.top
										+ "px", y.left = j.left + "px", y.width = j.width
										- 2 + "px", y.height = j.height - 2 + "px", y.display = "block", el = x, els = x.style), t = c.clientX
								- j.left, u = c.clientY - j.top, k = -u, n = m.clientHeight
								- u, l = -t, s = m.clientWidth - t, o
								&& el.setCapture
								? (el.setCapture(), el.onmousemove = function(a) {
									A(a || event)
								}, el.onmouseup = B)
								: a(e).bind("mousemove", A).bind("mouseup", B)), c
						.preventDefault()
			})
		}
		function x(b, f) {
			if(w()) {
				var d = b.id, e = q(d);
				A(b), e
						? (e.style.zIndex = c.zIndex++, e.style.visibility = "visible")
						: (k.push(b), a(f ? f : "body").append("<div id=" + d
								+ " class=" + b.layout
								+ ' style="top:-5000px;left:-5000px;z-index:'
								+ c.zIndex++ + '">' + B(b) + "</div>"), J(b, f), G(b), H(b), a("#"
								+ d).mousedown(function(a) {
									a.which == 1
											&& (this.style.zIndex = c.zIndex++)
								}), b.drag && y(b))
			}
		}
		function w() {
			var a = document.getElementsByTagName("script"), b = !1;
			for(s in a) {
				var c, d = a[s].src;
				if(d) {
					c = d.toLowerCase().substring(d.lastIndexOf("/") + 1);
					if(b = c.indexOf("asyncbox") >= 0 ? !0 : !1)
						break
				}
			}
			return b
		}
		function v(b, c) {
			x(		a.extend({
								title: "AsyncBox",
								content: "",
								logo: !0,
								top: -1,
								right: -1,
								bottom: -1,
								left: -1,
								width: "auto",
								height: "auto",
								layout: f + "auto",
								memory: !1,
								tipsbar: !1,
								btnsbar: !1,
								pageMode: !1,
								htmlMode: !1,
								inputMode: !1,
								drag: !0,
								cache: !1,
								fixed: !1,
								reset: !1,
								flash: !1,
								modal: !1,
								scroll: "auto",
								callback: a.noop
							}, b), c);
		}
		function u() {
			a("body")
					.append([
							'<div id="' + f
									+ 'cover" unselectable="on" style="opacity:',
							c.Cover.opacity,
							";filter:alpha(opacity=",
							c.Cover.opacity * 100,
							");background:",
							c.Cover.background,
							'">',
							c.inFrame && o
									? "<div><iframe></iframe></div><div></div>"
									: "",
							"</div>",
							'<div id="' + f + 'clone"></div>',
							'<div id="' + f + 'focus"></div>',
							'<div id="' + f
									+ 'load"><div><span></span></div></div>']
							.join(""))
		}
		function t(b) {
			if(b.data) {
				var c = e.createElement("a"), d = "", f = "";
				c.href = b.url, f = c.href, d = typeof b.data == "string"
						? b.data
						: a.param(b.data), f.indexOf("#") >= 0
						&& (f = f.substr(0, f.indexOf("#"))), f.indexOf("?") >= 0
						&& (f = f.substr(0, f.indexOf("?")));
				return f + c.search + (c.search ? "&" + d : "?" + d) + c.hash
			}
			return b.url
		}
		function r(d) {
			var a = e.body, b = e.documentElement;
			return {
				x: Math.max(a.scrollWidth, d ? $(d).width() : b.clientWidth),
				y: Math.max(a.scrollHeight, d ? $(d).height() : b.clientHeight),
				top: Math.max(b.scrollTop, a.scrollTop),
				left: Math.max(b.scrollLeft, a.scrollLeft),
				width: d ? $(d).width() : b.clientWidth,
				height: d ? $(d).height() : b.clientHeight
			}
		}
		function q(a) {
			return e.getElementById(a)
		}
		var c = asyncbox, d = window, e = document, f = "asyncbox_", g = !1, h = !1, i = [], j = [], k = [], l = [], m = e.documentElement, n, o = !!d.ActiveXObject, p = o
				&& !d.XMLHttpRequest;
		a(function() {
					u(), n = n
				}), n = {
			fixed: p ? function(a, b) {
				var c = a.style, d = "document.documentElement", e = a.offsetTop
						- b.top, f = a.offsetLeft - b.left;
				this.absolute(a), c.setExpression("top", "eval(" + d
								+ ".scrollTop + " + e + ') + "px"'), c
						.setExpression("left", "eval(" + d + ".scrollLeft + " + f
										+ ') + "px"')
			} : function(a) {
				a.style.position = "fixed"
			},
			absolute: p ? function(a) {
				var b = a.style;
				b.position = "absolute", b.removeExpression("left"), b
						.removeExpression("top")
			} : function(a) {
				a.style.position = "absolute"
			}
		};
		var P, Q, R = function() {
			P && clearTimeout(P), g && (Q = r(), P = setTimeout(function() {
				a.each(l, function(a) {
					var b = {}, d = l[a];
					b.id = d.id, b.top = d.top, b.left = d.left, b.right = d.right, b.bottom = d.bottom, c.Flash
							&& d.flash ? M(b, Q, !0) : M(b, Q, !1)
				}), clearTimeout(P)
			}, 100))
		};
		a.btn = {
			OK: [{
						text: c.Language.OK,
						action: "ok"
					}],
			NO: [{
						text: c.Language.NO,
						action: "no"
					}],
			YES: [{
						text: c.Language.YES,
						action: "yes"
					}],
			CLOSE: [{
						title: c.Language.CLOSE,
						action: "close"
					}],
			CANCEL: [{
						text: c.Language.CANCEL,
						action: "cancel"
					}]
		}, a.btn.OKCANCEL = a.btn.OK.concat(a.btn.CANCEL), a.btn.YESNO = a.btn.YES
				.concat(a.btn.NO), a.btn.YESNOCANCEL = a.btn.YES.concat(a.btn.NO)
				.concat(a.btn.CANCEL), a.cover = c.cover = function(b, d) {
			var e = a("#" + f + "cover"), g = q(f + "cover").style;
			b ? (h = b, g.zIndex = d || c.zIndex, c.Flash ? e.fadeTo(500,
					c.Cover.opacity) : e.show()) : (h = b, c.Flash
					? e.fadeOut(300)
					: e.hide(), i = [])
		}, a.close = c.close = function(e) {
			var f = q(e);
			if(f) {
				l.length > 0 && (l = T(l, e, "id")), a.each(k, function(b, c) {
							c.id == e
									&& (c.memory && D(c), c.cache
											? a(f).hide()
											: (k.length > 0 && (k = T(k, e, "id")), a(f)
													.remove()))
						}), g && l.length == 0
						&& (a(d).unbind("resize", R), g = !1, l = []);
				if(h)
					for(b in j)
						j[b] == e
								&& (j = T(j, e), i.length > 1 && j.length != 0 ? (i
										.pop(), c.cover(!0, i[i.length - 1])) : c
										.cover(!1))
			}
		}, a.resizeTo = c.resizeTo = function(b, c, d) {
			var e = q(b);
			if(e && e.offsetWidth != c || e.offsetHeight != d) {
				var f = {
					id: e.id,
					width: c,
					height: d,
					pageMode: !0,
					htmlMode: !0
				};
				L(f), N(f), M(f, null, !1), a.each(k, function(a, c) {
							c.id == b && c.fixed && S(e)
						})
			}
		}, a.framer = c.framer = function(a) {
			return q(a).contentWindow
		}, a.opener = c.opener = function(b) {
			return a.framer(b + "_content")
		}, a.reload = c.reload = function(b, c) {
			var d = q(b + "_content");
			try {
				d.src = c || a.opener(b).location.href
			} catch(e) {
				d.src = d.src
			}
		}, a.exist = c.exist = function(a) {
			var b = q(a);
			return b && b.style.display != "none" ? !0 : !1
		}, c.alert = function(a, b, c) {
			U(a, b, c, "alert")
		}, c.confirm = function(a, b, c, d) {
			U(a, b, c, "confirm", d)
		}, c.prompt = function(b, c, d, e, g) {
			var h = {
				id: f + "prompt",
				title: b,
				logo: !1,
				reset: !0,
				modal: !0,
				inputMode: {
					tips: c || "",
					content: d || ""
				},
				textType: e,
				btnsbar: a.btn.OKCANCEL,
				callback: g
			};
			v(h)
		}, c.open = function(a) {
			a.id = a.id || f + c.zIndex, a.url ? a.pageMode = !0 : a.html
					&& (a.htmlMode = !0), a.width && (a.layout = f + "normal"), v(a)
		}, c.success = function(a, b, c) {
			U(a, b, c, "success")
		}, c.warning = function(a, b, c) {
			U(a, b, c, "warning")
		}, c.error = function(a, b, c) {
			U(a, b, c, "error")
		}, c.tips = function(a, b, c, d) {
			W(a, b || "alert", c, d)
		}
	})(jQuery)	
});