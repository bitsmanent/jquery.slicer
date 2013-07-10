(function($) {

$.fn.slicer = function(uopts) {
"use strict";

var
	$e,		// current element
	info = {},	// current info

	dopts = {},
	opts = $.extend(dopts, uopts),

	getinfo = function(e, ev) {
		return {
			ew: $(e).width(),
			wx: $(e).data('ewrap').offset().left,
			ww: $(e).data('ewrap').width(),
			chlds_num: $(e).children().length,
			chlds_width: $(e).children().first().width()
		};
	},

	refresh = function(e) {
		$(e).width($(e).first().children().outerWidth() * $(e).children().length);
	},

	update = function(ev) {
		refresh();

		info = getinfo(this, ev);
		info.mousex = ev.pageX - info.wx;
		info.pct = info.mousex / info.ww * 100;
		info.px = (info.ew - $(this).parent().width()) * info.pct / 100;

		if(info.chlds_width * info.chlds_num < info.ww)
			return;

		$(this).css({'marginLeft': -info.px+'px'});
	};

	return this.each(function() {
		$(this)
		 .addClass('slicer-handle')
		 .wrap('<div class="slicer-wrapper" />')
		 .children().addClass('slicer-item');

		$(this).on('mousemove', update).data('ewrap', $(this).parent('.slicer-wrapper'));

		refresh(this);
	});
};

})(jQuery);
