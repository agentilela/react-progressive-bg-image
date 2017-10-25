'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var omitProps = (0, _omit2.default)(['blur', 'transition', 'isCached', 'isLoaded', 'opacity', 'scale', 'placeholder']);

var BaseComponent = function BaseComponent(_ref) {
  var component = _ref.component,
      children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, ['component', 'children']);

  return _react2.default.createElement(component, omitProps(otherProps), children);
};
BaseComponent.displayName = 'BaseComponent';
BaseComponent.propTypes = {
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,
  children: _propTypes2.default.node // Remind: There is not a children for Input tag.
};
var StyledImg = /*#__PURE__*/(0, _reactEmotion2.default)(BaseComponent)('height:100%;background-repeat:no-repeat;transition:', function (props) {
  return props.isCached ? 'none' : props.transition;
}, ';opacity:', function (props) {
  return props.isLoaded ? 1 : props.opacity;
}, ';filter:', function (props) {
  return props.isLoaded ? 'none' : 'blur(' + props.blur + 'px)';
}, ';/* this is needed so Safari keeps sharp edges */\n  transform:', function (props) {
  return props.isLoaded ? 'none' : 'scale(' + props.scale + ')';
}, ';');

var Img = function Img(_ref2) {
  var component = _ref2.component,
      image = _ref2.image,
      style = _ref2.style,
      otherProps = _objectWithoutProperties(_ref2, ['component', 'image', 'style']);

  return _react2.default.createElement(StyledImg, Object.assign({}, otherProps, {
    component: component
  }, component === 'img' && { src: image }, {
    style: Object.assign({}, style, component !== 'img' && { backgroundImage: 'url("' + image + '")' })
  }));
};

Img.displayName = 'Img';
Img.propTypes = {
  // Internal
  image: _propTypes2.default.string.isRequired,
  isLoaded: _propTypes2.default.bool.isRequired,
  isCached: _propTypes2.default.bool.isRequired,

  // props
  opacity: _propTypes2.default.number.isRequired,
  blur: _propTypes2.default.number.isRequired,
  scale: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string,
  transition: _propTypes2.default.string,
  style: _propTypes2.default.object,
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};

exports.default = Img;