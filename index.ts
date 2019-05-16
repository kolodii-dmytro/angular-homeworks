const menuList = [
  'menu',
  {
    title: 'JavaScript', items: ['Angular', 'React',
      { title: 'Dart', items: ['Angular', 'Polymer'] },
      { title: 'Dart', items: [] }]
  },
  { title: 'Dart', items: ['Angular', 'Polymer'] },
];

const domMenuSelector: string = 'nav';

type MenuItem = { title: string, items: Array<string | MenuItem> }

function switchInnerListvisibility(e: MouseEvent, parent: HTMLElement, child: HTMLElement): void {
  e.stopPropagation();
  if (parent.children.length) {
    parent.removeChild(child);
  } else {
    parent.appendChild(child);
  }
}

function createInnerList(list: Array<string | MenuItem>): HTMLElement {
  const wrapper = document.createElement('ul');
  const items = list.map(item => createElementFromItem(item));
  wrapper.append(...items)
  return wrapper
}

function createElementFromItem(item: MenuItem | string): HTMLElement {
  const element = document.createElement('li');
  element.onclick = (e) => e.stopPropagation()
  if (typeof (item) === 'string') {
    element.append(item)
  } else {
    if (item.items.length) {
      element.append(`+ ${item.title}`)
      const wrapper = createInnerList(item.items);
      element.onclick = (e) => {
        switchInnerListvisibility(e, element, wrapper)
      }
    } else {
      element.append(item.title)
    }
  }
  return element
}

const domMenu: HTMLElement | null = document.querySelector(domMenuSelector);
if (domMenu) {
  const menu = createInnerList(menuList)
  domMenu.appendChild(menu)
}

