// worker线程中引入 qrcode-generator.js
importScripts('./qrcode-generator.js');

onmessage = async function (e) {
  const { id, x, y, width, height, text, color } = e.data;


  console.log('[Worker] 收到消息:', e.data);
  const qr = qrcode(0, 'L');
  qr.addData(text);
  qr.make();

  const modules = qr.getModuleCount();
  const cellSize = width / modules;

  const offscreen = new OffscreenCanvas(width, height);
  const ctx = offscreen.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillStyle = color;
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  const bitmap = await offscreen.transferToImageBitmap();
  postMessage({ id, bitmap, width, height, x, y });
};
