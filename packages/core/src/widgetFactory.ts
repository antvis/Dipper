const WIDGETS: Record<string, (props: any) => JSX.Element> = {};
export function getWidget(type: string) {
  if (!WIDGETS[type]) {
    console.warn(`未注册组件：${type}`);
    return () => `未注册组件：${type}`;
  }
  return WIDGETS[type];
}
export const registerWidget = (type: string, components: any): void => {
  WIDGETS[type] = components;
};

export function getAllWidgets() {
  return WIDGETS;
}
