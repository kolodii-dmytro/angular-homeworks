"use strict";
var menuList = [
    'menu',
    {
        title: 'JavaScript', items: ['Angular', 'React',
            { title: 'Dart', items: ['Angular', 'Polymer'] },
            { title: 'Dart', items: [] }]
    },
    { title: 'Dart', items: ['Angular', 'Polymer'] },
];
var domMenuSelector = 'nav';
function switchInnerListvisibility(e, parent, child) {
    e.stopPropagation();
    if (parent.children.length) {
        parent.removeChild(child);
    }
    else {
        parent.appendChild(child);
    }
}
function createInnerList(list) {
    var wrapper = document.createElement('ul');
    var items = list.map(function (item) { return createElementFromItem(item); });
    wrapper.append.apply(wrapper, items);
    return wrapper;
}
function createElementFromItem(item) {
    var element = document.createElement('li');
    element.onclick = function (e) { return e.stopPropagation(); };
    if (typeof (item) === 'string') {
        element.append(item);
    }
    else {
        if (item.items.length) {
            element.append("+ " + item.title);
            var wrapper_1 = createInnerList(item.items);
            element.onclick = function (e) {
                switchInnerListvisibility(e, element, wrapper_1);
            };
        }
        else {
            element.append(item.title);
        }
    }
    return element;
}
var domMenu = document.querySelector(domMenuSelector);
if (domMenu) {
    var menu = createInnerList(menuList);
    domMenu.appendChild(menu);
}
//# sourceMappingURL=index.js.map