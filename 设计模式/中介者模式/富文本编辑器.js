const getButtonId = (btnName) => {
  return `button_${btnName}`;
}

// btns的映射关系
const btnsMap = {
  'bold': {
    name: '加粗'
  },
  'italic': {
    name: '斜体'
  },
  'strike': {
    name: '删除线'
  },
  'insertImage': {
    name: '插入图片'
  },
  'clearFormat': {
    name: '清除格式'
  },
}

class EffectManager {
  constructor() {
    this.cleanups = [];
  }

  addEventListener(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this.cleanups.push(() => target.removeEventListener(type, handler, options));
  }

  addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.cleanups.push(() => clearInterval(id));
  }

  addTimeout(fn, time) {
    const id = setTimeout(fn, time);
    this.cleanups.push(() => clearTimeout(id));
  }

  addCustom(cleanFn) {
    this.cleanups.push(cleanFn);
  }

  cleanup() {
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];
  }
}

// 绑定在全局的事件
const effectManager = new EffectManager();

class EditBox {
  constructor(options) {
    this.options = options;

    this.containerId = options.containerId; // 容器ID
    
    // 默认值
    // 文本内容
    const { text } = options || {};
    this.text = text?.value || ''; // 默认文本内容
    this.fontSize = text?.fontSize || 16; // 默认字体大小
    this.fontFamily = text?.fontFamily || 'Arial'; // 默认字体
    this.fontColor = text?.fontColor || '#000000'; // 默认字体颜色
    this.fontStyle = text?.fontStyle || 'normal'; // 默认字体样式
    this.fontWeight = text?.fontWeight || 'normal'; // 默认字体粗细
    this.fontDecoration = text?.fontDecoration || 'none'; // 默认字体修饰
    this.textBaseline = text?.textBaseline || 'top'; // 默认文本基线对齐方式
    this.lineHeight = text?.lineHeight || 1.2; // 默认行高
    // 文本框样式
    this.backgroundColor = text?.backgroundColor || '#FFFFFF'; // 默认背景颜色
    this.cursorPosition = 0;
    this.isEditing = false;
    this.textArea = null; // 文本框元素
    this.buttonsContainer = null; // 按钮容器元素
    // 按钮相关
    this.buttons = options.buttons || []; // 按钮配置

    this.init();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with ID ${this.containerId} not found.`);
      return;
    }

    // 创建文本框
    this.createEditBox(container)

    // 初始化中介者
    this.mediator = new EditorMediator();
    this.mediator.setTextArea(this.textArea); // 把文本框传给中介者

    this.createBottonsBox(container)

    // 注册按钮
    this.buttons.forEach((btn) => {
      const button = new EditorButton(document.getElementById(getButtonId(btn)), btn);
      this.mediator.registerButton(btn, button);
    });
  }

  // 创建文本框
  createEditBox(container) {
    this.textArea = document.createElement('div');
    this.textArea.contentEditable = true;
    this.textArea.classList.add('edit-box');
    // 如何设置内容不超过文本框高度时，隐藏滚动条

    this.textArea.style = `
      overflow-y: auto; 
      border: none; 
      outline: none; 
      min-height: 200px; 
      max-height: 400px; 
      box-sizing: border-box;
      border: 1px solid #ccc;
    `;
    // 光标样式
    this.textArea.style.cursor = 'text';
    container.appendChild(this.textArea);
  }

  // 创建按钮
  createBottonsBox(container) {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('buttons-container');

    this.buttons.forEach((btn) => {
      if (btnsMap[btn]) {
        const buttonElement = document.createElement('button');
        buttonElement.id = getButtonId(btn);
        buttonElement.innerHTML = btnsMap[btn].name;
        this.buttonsContainer.appendChild(buttonElement);

        buttonElement.addEventListener('click', () => {
          console.log('btn', btn)
          this.mediator.notify(btn);
        });
      }
    })

    container.appendChild(this.buttonsContainer);
    this.buttonsContainer.style.display = 'flex';
  }

  // 父组件卸载时清除所有绑定事件
  destroy() {
    effectManager.cleanup();
    console.log('编辑器已销毁 ✅');
  }
}

class EditorMediator {
  constructor() {
    this.textArea = null; // 编辑框
    this.buttons = {}; // 按钮集合
  }

  setTextArea(textArea) {
    this.textArea = textArea;
  }

  registerButton(name, button) {
    this.buttons[name] = button;
    button.setMediator(this); // 设置中介者
  }

  notify(name) {
    switch (name) {
      case 'bold':
        this.formatText('bold')
        break;
      case 'italic':
        this.formatText('italic')
        break;
      case 'strike':
        this.formatText('strike')
        break;
      case 'insertImage':
        this.insertImage();
        break;
      case 'clearFormat':
        this.clearFormatting();
        break;
    }
  }

  formatText(style) {
    const selection = window.getSelection();  // 获取选中的文本
    console.log('selection', selection)
    const range = selection.getRangeAt(0); // 获取选中的范围
    const selectedText = range.toString();  // 获取选中的文本内容
    let node;

    if (style === 'bold') {
      node = document.createElement('strong');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    } else if (style === 'italic') { // italic 斜体
      node = document.createElement('em');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    } else if (style === 'strike') { // strike 删除线
      node = document.createElement('s');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    } 
  }

  insertImage() {
    // 这里可以使用一个输入框来获取图片的URL
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onclick = (e) => {
      e.target.value = null; // 清空文件选择框的值
    };
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.style.width = '100%';
          img.style.display = 'block';
          img.style.margin = '0 auto';
          console.log('this', this)
          this.textArea.appendChild(img);
        }
        reader.readAsDataURL(file); // 读取文件内容
      }
    };
    input.click(); // 自动点击输入框，弹出文件选择对话框
  }

  clearFormatting() {
    // this.textarea.style.fontWeight = 'normal';
    // this.textarea.style.fontStyle = 'normal';
    // this.textarea.style.textDecoration = 'none';
    // this.textarea.style.fontSize = '16px';
    // this.textarea.style.fontFamily = 'Arial';
    // this.textarea.style.color = '#000000';
    // this.textarea.style.backgroundColor = '#FFFFFF';
  }
}

class EditorButton {
  constructor(dom, name) {
    this.dom = dom; // 按钮DOM元素
    this.name = name; // 按钮名称
    this.mediator = null; // 中介者
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
}
