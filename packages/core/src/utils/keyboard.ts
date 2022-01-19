const keyPressObj: Record<string, boolean> = {};

window.addEventListener('keydown', (e) => {
  keyPressObj[e.keyCode] = true;
});

window.addEventListener('keyup', (e) => {
  keyPressObj[e.keyCode] = false;
});

export const isPressing = (keyCode: number) => {
  return !!keyPressObj[keyCode];
};
