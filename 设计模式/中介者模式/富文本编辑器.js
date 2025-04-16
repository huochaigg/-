// 富文本编辑器插件
+(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS 环境
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD 环境
    define(factory);
  } else {
    // 浏览器环境，挂载到全局对象 
    const lib = factory();
    global.EditBox = lib.default;
    global.EffectManager = lib.EffectManager;
  }
})(typeof window !== 'undefined' ? window : this, function () {
  const getButtonId = (btnName) => {
    return `button_${btnName}`;
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

  class BaseCommand {
    execute(editorArea, tagName) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const node = document.createElement(tagName);
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    }
  }
  
  // 按钮命令类
  class BoldCommand extends BaseCommand {
    execute(editorArea) {
      super.execute(editorArea, 'strong');
    }
  }
  
  class ItalicCommand extends BaseCommand {
    execute(editorArea) {
      super.execute(editorArea, 'em');
    }
  }
  
  class StrikeCommand extends BaseCommand {
    execute(editorArea) {
      super.execute(editorArea, 'del');
    }
  }
  
  class ClearFormatCommand {
    execute(editorArea) {
      const text = editorArea.innerText; // 获取纯文本内容
      editorArea.innerHTML = text; // 替换为纯文本
    }
  }
  
  class InsertImageCommand {
    execute(editorArea) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onclick = (e) => {
        e.target.value = null;
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
            editorArea.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }
  
  // btns的映射关系
  const btnsMap = new Map([
    ['bold', {
      name: '加粗',
      command: BoldCommand,
    }],
    ['italic', {
      name: '斜体',
      command: ItalicCommand,
    }],
    ['strike', {
      name: '删除线',
      command: StrikeCommand,
    }],
    ['insertImage', {
      name: '插入图片',
      command: InsertImageCommand,
    }],
    ['clearFormat', {
      name: '清除格式',
      command: ClearFormatCommand,
    }],
  ]);
  
  // 中介者类
  class EditorMediator {

    #editorArea = null; // 编辑框
    #commands = {}; // 命令集合
    #state = {}; // 状态管理
  
    setTextArea(editorArea) {
      this.#editorArea = editorArea;
    }
  
    registerCommand(name, command) {
      this.#commands[name] = command;
    }
  
    notify(name) {
      if (this.#commands[name]) {
        this.#commands[name].execute(this.#editorArea);
      }
    }

    setState(key, value) {
      this.#state[key] = value;
    }
  
    getState(key) {
      return this.#state[key];
    }
  }
  
  // 编辑器按钮类
  class EditorButton {
    constructor(dom, name, mediator) {
      this.dom = dom;
      this.name = name;
      this.mediator = mediator;
  
      effectManager.addEventListener(this.dom, 'click', () => {
        this.execute();
      });
    }
  
    execute() { 
      if (this.mediator) {
        this.mediator.notify(this.name);
      }
    }

    setDisabled(isDisabled) {
      this.dom.disabled = isDisabled;
    }
  }
  
  // 编辑器类
  class EditBox {
    constructor(options) {
      this.options = options;
      this.containerId = options.containerId;
      this.buttons = Object.assign(EditBox.defaultButtons, (options.buttons || [])); // 按钮配置
      this.mediator = new EditorMediator(); // 初始化中介者
      this.init();
    }

    static get defaultButtons() {
      return ['bold', 'italic', 'strike', 'insertImage', 'clearFormat'];
    }
  
    init() {
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error(`Container with ID ${this.containerId} not found.`);
        return;
      }
  
      // 创建文本框
      this.createEditBox(container);
  
      // 创建按钮
      this.createButtonsBox(container);
  
      // 注册命令
      this.registerCommands();
    }
  
    createEditBox(container) {
      this.editorArea = document.createElement('div');
      this.editorArea.contentEditable = true;
      this.editorArea.classList.add('edit-box');
      Object.assign(this.editorArea.style, {
        overflowY: 'auto',
        border: '1px solid #ccc',
        outline: 'none',
        minHeight: '200px',
        maxHeight: '400px',
        boxSizing: 'border-box',
        cursor: 'text'
      });
      this.editorArea.style.cursor = 'text';
      container.appendChild(this.editorArea);
  
      this.mediator.setTextArea(this.editorArea); // 将文本框传递给中介者
    }
  
    createButtonsBox(container) {
      this.buttonsContainer = document.createElement('div');
      this.buttonsContainer.classList.add('buttons-container');
  
      this.buttons.forEach((btn) => {
        if (btnsMap.get(btn)) {
          const buttonElement = document.createElement('button');
          buttonElement.id = getButtonId(btn);
          buttonElement.innerHTML = btnsMap.get(btn).name;
          this.buttonsContainer.appendChild(buttonElement);
  
          // 创建按钮实例
          // 绑定按钮事件
          // 绑定中介者
          new EditorButton(buttonElement, btn, this.mediator);
        }
      });
  
      container.appendChild(this.buttonsContainer);
      this.buttonsContainer.style.display = 'flex';
    }
  
    registerCommands() {
      // 注册命令到中介者
      this.buttons.forEach((btn) => {
        if (btnsMap.get(btn)) {
          this.mediator.registerCommand(btn, new (btnsMap.get(btn).command)()); // new (btnsMap.get(btn).command()) 这样写报错注意
        }
      })
    }

    destory() {
      // 清理事件监听器
      effectManager.cleanup();
    }

    removeBox() {
      // 清除按钮
      this.buttonsContainer.innerHTML = '';
      this.buttonsContainer.remove();
      // 清除文本框
      this.editorArea.innerHTML = '';
      this.editorArea.remove();
    }
  }

  return {
    default: EditBox,
    EffectManager,
  }; // 返回插件类
});