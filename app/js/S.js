var S = {    
    hasClass: function(element, selector) {
        var result = false;
        var classes = element.getAttribute("class");
        var selectedClass = " " + selector + " ";

        if ((" " + classes + " ").replace(/[\n\t]/g, " ").indexOf(selectedClass) > -1) {
            result = true;
        }

        return result;
    },

    addClass: function(element, classToAdd) {
        if(!S.hasClass(element, classToAdd)){
            var classes = classToAdd;

            if (element.getAttribute("class")){
                classes += " " + element.getAttribute("class");
            }

            element.setAttribute("class", classes);
        }
    },

    removeClass: function(element, classToRemove) {
        if(S.hasClass(element, classToRemove)) {
            var classes = element.getAttribute("class");
            var newClasses = classes.replace( new RegExp('(?:^|\\s)' + classToRemove + '(?!\\S)') ,'');
            element.setAttribute("class", newClasses);
        }
    },

    toggleClass: function(element, classToToggle) {
        if(S.hasClass(element, classToToggle)) {
            S.removeClass(element, classToToggle);
        }
        else {
            S.addClass(element, classToToggle);
        }
    }
}
