import React from 'react';
import * as antdIcon from '@ant-design/icons';
import classNames from 'classnames';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z =
  '.index_appIcon__27t5U {\n  display: inline-block;\n  height: 20px;\n  font-size: 14px;\n}\n.ant-btn[disabled] > img {\n  filter: grayscale(100%);\n}\n';
var styles = { appIcon: 'index_appIcon__27t5U' };
styleInject(css_248z);

function AppIcon(_ref) {
  var config = _ref.config,
    className = _ref.className;
  var type = config.type,
    content = config.content,
    style = config.style;

  if (type === 'ANTD') {
    // @ts-ignore
    var TargetIcon = antdIcon[content];

    if (TargetIcon) {
      return /*#__PURE__*/ React.createElement(TargetIcon, {
        style: style,
        className: classNames([className, styles.appIcon]),
      });
    }
  }

  if (type === 'ICON') {
    return /*#__PURE__*/ React.createElement('i', {
      className: classNames([content, className, styles.appIcon]),
      style: style,
    });
  }

  if (type === 'IMG') {
    return /*#__PURE__*/ React.createElement('img', {
      src: content,
      style: style,
      className: classNames([className, styles.appIcon]),
    });
  }

  if (type === 'HTML') {
    return /*#__PURE__*/ React.createElement('span', {
      dangerouslySetInnerHTML: {
        __html: content,
      },
      style: style,
      className: classNames([className, styles.appIcon]),
    });
  }

  return /*#__PURE__*/ React.createElement(React.Fragment, null);
}

export { AppIcon };
