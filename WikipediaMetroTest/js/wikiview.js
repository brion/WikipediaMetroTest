﻿var ZoomableWikiView = WinJS.Class.define(function (wikiview) {
    // constructor
    this._wikiview = wikiview;
}, {
    // public methods
    getPanAxis: function () {
        return "horizontal";
    },
    configureForZoom: function (isZoomedOut, isCurrentView, triggerZoom, prefetchedPages) {
        content.style.overflowX = 'overflow';
        content.style.overflowY = 'hidden';
    },
    setCurrentItem: function (x, y) {
    },
    getCurrentItem: function () {
        // @fixme handle snapped mode
        var content = this._wikiview._element,
            left = content.scrollLeft,
            children = content.children,
            selected,
            selectedIndex;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.offsetLeft >= left) {
                selected = child;
                selectedIndex = i;
                break;
            }
        }
        if (selectedIndex === undefined) {
            throw new Error('whoops');
        }
        return WinJS.Promise.wrap({
            item: selectedIndex,
            position: {
                left: selected.offsetLeft,
                top: selected.offsetTop,
                width: selected.offsetWidth,
                height: selected.offsetHeight
            }
        });
    },
    beginZoom: function () {
    },
    positionItem: function (/*@override*/item, position) {
        var content = this._wikiview._element;

        var section = content.children[item.index];
        console.log('section.offsetLeft: ' + section.offsetLeft);
        content.scrollLeft = section.offsetLeft - 10;
    },
    endZoom: function (isCurrentView) {
        var content = this._wikiview._element;
        content.style.overflowX = 'overflow';
        content.style.overflowY = 'hidden';
    },
    handlePointer: function (pointerId) {
        this._wikiview._element.msSetPointerCapture(pointerId);
    }
});

WinJS.Namespace.define("WikiControls", {
    WikiView: WinJS.Class.define(function (element, options) {
        this._element = element;
    }, {
        // public methods
        zoomableView: {
            get: function () {
                if (!this._zoomableView) {
                    this._zoomableView = new ZoomableWikiView(this);
                }
                return this._zoomableView;
            }
        },
    })
});