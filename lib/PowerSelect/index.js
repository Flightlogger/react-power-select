'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

var _SearchInput = require('./SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PowerSelect = function (_Component) {
  _inherits(PowerSelect, _Component);

  function PowerSelect() {
    _classCallCheck(this, PowerSelect);

    return _possibleConstructorReturn(this, (PowerSelect.__proto__ || Object.getPrototypeOf(PowerSelect)).apply(this, arguments));
  }

  _createClass(PowerSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          searchEnabled = _props.searchEnabled,
          beforeOptionsComponent = _props.beforeOptionsComponent,
          rest = _objectWithoutProperties(_props, ['searchEnabled', 'beforeOptionsComponent']);

      if (!searchEnabled && beforeOptionsComponent === _SearchInput2.default) {
        beforeOptionsComponent = null;
      }
      return _react2.default.createElement(_Select2.default, _extends({ beforeOptionsComponent: beforeOptionsComponent }, rest));
    }
  }]);

  return PowerSelect;
}(_react.Component);

exports.default = PowerSelect;


PowerSelect.displayName = 'PowerSelect';
PowerSelect.defaultProps = {
  searchEnabled: true,
  beforeOptionsComponent: _SearchInput2.default
};