import React, { useEffect, useState } from 'react';
import { DipperMobileContainer } from '@antv/dipper';

export default function RumbMap() {
  return (
    <div
      style={{
        height: '667px',
        width: '375px',
        border: 'solid 2px rgb(245, 247, 250)',
      }}
    >
      <DipperMobileContainer
        cfg={{
          headerbar: {
            display: true,
            options: {
              title: {
                value: 'XX 管理地图地图',
                display: true,
              },
            },
            components: [],
          },
        }}
      />
    </div>
  );
}
