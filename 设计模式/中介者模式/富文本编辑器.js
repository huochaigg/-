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
    global.EditBox = factory().default;
    global.EffectManager = factory().EffectManager;
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
  
  // 按钮命令类
  class BoldCommand {
    execute(textArea) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const node = document.createElement('strong');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    }
  }
  
  class ItalicCommand {
    execute(textArea) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const node = document.createElement('em');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    }
  }
  
  class StrikeCommand {
    execute(textArea) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const node = document.createElement('del');
      node.textContent = selectedText;
      range.deleteContents();
      range.insertNode(node);
    }
  }
  
  class ClearFormatCommand {
    execute(textArea) {
      const text = textArea.innerText; // 获取纯文本内容
      textArea.innerHTML = text; // 替换为纯文本
    }
  }
  
  class InsertImageCommand {
    execute(textArea) {
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
            textArea.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }
  
  // btns的映射关系
  const btnsMap = {
    'bold': {
      name: '加粗',
      command: BoldCommand,
    },
    'italic': {
      name: '斜体',
      command: ItalicCommand,
    },
    'strike': {
      name: '删除线',
      command: StrikeCommand,
    },
    'insertImage': {
      name: '插入图片',
      command: InsertImageCommand,
    },
    'clearFormat': {
      name: '清除格式',
      command: ClearFormatCommand,
    },
  }
  
  // 中介者类
  class EditorMediator {
    constructor() {
      this.textArea = null; // 编辑框
      this.commands = {}; // 命令集合
    }
  
    setTextArea(textArea) {
      this.textArea = textArea;
    }
  
    registerCommand(name, command) {
      this.commands[name] = command;
    }
  
    notify(name) {
      if (this.commands[name]) {
        this.commands[name].execute(this.textArea);
      }
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
  }
  
  // 编辑器类
  class EditBox {
    constructor(options) {
      this.options = options;
      this.containerId = options.containerId;
      this.buttons = options.buttons || []; // 按钮配置
      this.mediator = new EditorMediator(); // 初始化中介者
      this.init();
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
      this.textArea = document.createElement('div');
      this.textArea.contentEditable = true;
      this.textArea.classList.add('edit-box');
      this.textArea.style = `
        overflow-y: auto; 
        border: none; 
        outline: none; 
        min-height: 200px; 
        max-height: 400px; 
        box-sizing: border-box;
        border: 1px solid #ccc;
      `;
      this.textArea.style.cursor = 'text';
      container.appendChild(this.textArea);
  
      this.mediator.setTextArea(this.textArea); // 将文本框传递给中介者
    }
  
    createButtonsBox(container) {
      this.buttonsContainer = document.createElement('div');
      this.buttonsContainer.classList.add('buttons-container');
  
      this.buttons.forEach((btn) => {
        if (btnsMap[btn]) {
          const buttonElement = document.createElement('button');
          buttonElement.id = getButtonId(btn);
          buttonElement.innerHTML = btnsMap[btn].name;
          this.buttonsContainer.appendChild(buttonElement);
  
          // 创建按钮实例并绑定中介者
          new EditorButton(buttonElement, btn, this.mediator);
        }
      });
  
      container.appendChild(this.buttonsContainer);
      this.buttonsContainer.style.display = 'flex';
    }
  
    registerCommands() {
      // 注册命令到中介者
      this.buttons.forEach((btn) => {
        if (btnsMap[btn]) {
          this.mediator.registerCommand(btn, new btnsMap[btn].command());
        }
      })
    }
  }

  return {
    default: EditBox,
    EffectManager,
  }; // 返回插件类
});