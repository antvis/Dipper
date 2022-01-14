export const config = {
  title: '所有网格',
  childrens: [
    {
      type: 'assignform',
      title: '区划分配',
      operateType: 'panel',
      callbackType: 'custom',
      enableWhen: ['single_select', 'multi_select'],
    },
    {
      type: 'gridinfo',
      title: '数据查看',
    },
    {
      type: 'gridinfo',
      title: '区域任务',
    },
  ],
};
