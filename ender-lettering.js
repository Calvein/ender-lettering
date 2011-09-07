/*
* ender-ettering 0.6.1
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Ported to ender by François Robichet http://francois.robichet.com
* Released under the WTFPL license 
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
!(function($){
    function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(item, i) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});
			t.empty().html(inject);
		}
	}

	var methods = {
		init : function() {
			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				$(this).find('br').after(r).remove();
				injector($(this), r, 'line', '');
			});

		}
	};

	$.ender({
		lettering: function( method ) {
			if (method && methods[method]) {
				return methods[ method ].apply(this, [].slice.call(arguments, 1));
			} else if (method === 'letters' || ! method) {
				return methods.init.apply(this, [].slice.call(arguments, 0));
			}
			return this;
		}
	}, true);

})(ender);