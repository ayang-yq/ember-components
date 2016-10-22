import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
    tagName: "button",
    classNames: ["btn", "btn-primary"],
    classNameBindings: ["btnClass"],

    didInsertElement () {
        var content = this.$(".popover-cls");
        this.$().popover({
            html: true,
            container: "body",
            content: content,
            placement: this.get("position") || "bottom",
            trigger: "click"
        }).on("show.bs.popover", function () {
            content.removeClass("hide");
        });

        $(window.document).on("click.__popover__", function (e) {
            $('[data-toggle="popover"],[data-original-title]').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 &&
                    $(".popover").has(e.target).length === 0) {
                    (($(this).popover("hide").data("bs.popover") || {}).inState || {}).click = false;  // fix for BS 3.3.6
                }
            });
        });
    },

    willDestroyElement () {
        this.$().popover("destroy");
    }
});