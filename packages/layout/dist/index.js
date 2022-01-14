'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var antdIcon = require('@ant-design/icons');
var classNames = require('classnames');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var antdIcon__namespace = /*#__PURE__*/ _interopNamespace(antdIcon);
var classNames__default = /*#__PURE__*/ _interopDefaultLegacy(classNames);

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
    var TargetIcon = antdIcon__namespace[content];

    if (TargetIcon) {
      return /*#__PURE__*/ React__default['default'].createElement(TargetIcon, {
        style: style,
        className: classNames__default['default']([className, styles.appIcon]),
      });
    }
  }

  if (type === 'ICON') {
    return /*#__PURE__*/ React__default['default'].createElement('i', {
      className: classNames__default['default']([
        content,
        className,
        styles.appIcon,
      ]),
      style: style,
    });
  }

  if (type === 'IMG') {
    return /*#__PURE__*/ React__default['default'].createElement('img', {
      src: content,
      style: style,
      className: classNames__default['default']([className, styles.appIcon]),
    });
  }

  if (type === 'HTML') {
    return /*#__PURE__*/ React__default['default'].createElement('span', {
      dangerouslySetInnerHTML: {
        __html: content,
      },
      style: style,
      className: classNames__default['default']([className, styles.appIcon]),
    });
  }

  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
  );
}

exports.AppIcon = AppIcon;
