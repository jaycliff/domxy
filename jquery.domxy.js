/*
    Copyright 2014 Jaycliff Arcilla of Eversun Software Philippines Corporation (Davao Branch)
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
/*jslint browser: true, devel: true */
/*global jQuery*/
(function ($) {
    "use strict";
    /*
        Refer to: http://stackoverflow.com/questions/1002934/jquery-x-y-document-coordinates-of-dom-object#answer-2130390
    */
    var extend_options;
    function manualGetX(original) {
        var o = original,
            el = original,
            left = 0,
            considerScroll = true,
            offsetParent = o.offsetParent;
        while (el.parentNode) {
            el = el.parentNode;
            if (el.offsetParent) {
                considerScroll = true;
                if (window.opera) {
                    if (el === original.parentNode || el.nodeName === 'TR') {
                        considerScroll = false;
                    }
                }
                if (considerScroll) {
                    if (el.scrollLeft && el.scrollLeft > 0) {
                        left -= el.scrollLeft;
                    }
                }
            }
            if (el === offsetParent) {
                left += o.offsetLeft;
                if (el.clientLeft && el.nodeName !== 'TABLE') {
                    left += el.clientLeft;
                }
                o = el;
                if (o.offsetParent) {
                    if (o.offsetLeft) {
                        left += o.offsetLeft;
                    }
                }
                offsetParent = o.offsetParent;
            }
        }
        //console.log('manual: ' + left);
        return left;
    }
    function manualGetY(original) {
        var o = original,
            el = original,
            top = 0,
            considerScroll = true,
            offsetParent = o.offsetParent;
        while (el.parentNode) {
            el = el.parentNode;
            if (el.offsetParent) {
                considerScroll = true;
                if (window.opera) {
                    if (el === original.parentNode || el.nodeName === 'TR') {
                        considerScroll = false;
                    }
                }
                if (considerScroll) {
                    if (el.scrollTop && el.scrollTop > 0) {
                        top -= el.scrollTop;
                    }
                }
            }
            if (el === offsetParent) {
                top += o.offsetTop;
                if (el.clientTop && el.nodeName !== 'TABLE') {
                    top += el.clientTop;
                }
                o = el;
                if (o.offsetParent) {
                    if (o.offsetTop) {
                        top += o.offsetTop;
                    }
                }
                offsetParent = o.offsetParent;
            }
        }
        //console.log('manual: ' + top);
        return top;
    }
    /* Gets a window from an element */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    extend_options = {
        getX: function getX(gc_friendly) {
            var win,
                elem = this[0],
                left = 0,
                doc = elem && elem.ownerDocument,
                doc_elem = doc.documentElement;
            if (!doc) {
                return null;
            }
            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(doc_elem, elem)) {
                return 0;
            }
            // Support: BlackBerry 5, iOS 3 (original iPhone)
            // If we don't have gBCR, just use 0, 0 rather than error
            if (elem.getBoundingClientRect && !gc_friendly) {
                // ALERT: Garbage object is created everytime this line is executed
                left = elem.getBoundingClientRect().left;
            } else {
                left = manualGetX(elem);
            }
            win = getWindow(doc);
            return (left + win.pageXOffset - doc_elem.clientLeft);
        },
        getY: function getY(gc_friendly) {
            var win,
                elem = this[0],
                top = 0,
                doc = elem && elem.ownerDocument,
                doc_elem = doc.documentElement;
            if (!doc) {
                return null;
            }
            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(doc_elem, elem)) {
                return 0;
            }
            // Support: BlackBerry 5, iOS 3 (original iPhone)
            // If we don't have gBCR, just use 0, 0 rather than error
            if (elem.getBoundingClientRect && !gc_friendly) {
                // ALERT: Garbage object is created everytime this line is executed
                top = elem.getBoundingClientRect().top;
            } else {
                top = manualGetY(elem);
            }
            win = getWindow(doc);
            return (top + win.pageYOffset - doc_elem.clientTop);
        }
    };
    // $.fn === $.prototype
    $.fn.extend(extend_options);
}(jQuery));
