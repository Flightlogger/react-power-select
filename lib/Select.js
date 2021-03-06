'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  TAB: 9
};

var actions = (_actions = {}, _defineProperty(_actions, KEY_CODES.UP_ARROW, 'handleUpArrow'), _defineProperty(_actions, KEY_CODES.DOWN_ARROW, 'handleDownArrow'), _defineProperty(_actions, KEY_CODES.ENTER, 'handleEnterPress'), _defineProperty(_actions, KEY_CODES.TAB, 'handleTabPress'), _actions);

var noop = function noop() {};

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Select, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.flattenOptions(this.props.options);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var options = _ref2.options;

      this.flattenOptions(options);
      if (this.props.options !== options) {
        this.setState({
          filteredOptions: options
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.documentEventListeners.handleEscapePress);
      document.addEventListener('click', this.documentEventListeners.handleDocumentClick, true);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.documentEventListeners.handleEscapePress);
      document.removeEventListener('click', this.documentEventListeners.handleDocumentClick, true);
      clearTimeout(this.focusFieldTimeout);
    }
  }, {
    key: 'flattenOptions',
    value: function flattenOptions(options) {
      var _flattenOptions2 = (0, _utils.flattenOptions)(options),
          isOptGroupOptions = _flattenOptions2.isOptGroupOptions,
          flattenedOptions = _flattenOptions2.flattenedOptions,
          optGroupMap = _flattenOptions2.optGroupMap;

      this.isOptGroupOptions = isOptGroupOptions;
      this._optGroupMap = optGroupMap;
      this.setState({
        _flattenedOptions: flattenedOptions
      });
    }
  }, {
    key: 'getVisibleOptions',
    value: function getVisibleOptions() {
      return this.state.filteredOptions || this.props.options;
    }
  }, {
    key: 'getFlattenedOptions',
    value: function getFlattenedOptions() {
      return this.state._flattenedOptions;
    }
  }, {
    key: 'setHighlightedOption',
    value: function setHighlightedOption(highlightedOption) {
      this.setState({
        highlightedOption: highlightedOption
      });
    }
  }, {
    key: 'setFocusedState',
    value: function setFocusedState(focused) {
      this.setState({ focused: focused });
    }
  }, {
    key: 'validateAndHighlightOption',
    value: function validateAndHighlightOption(highlightedOption, counter) {
      var options = this.getFlattenedOptions();
      var isValidOptionAvailable = (0, _utils.isValidOptionPresent)(options);
      if (isValidOptionAvailable) {
        var nextValidOption = (0, _utils.getNextValidOption)({
          options: options,
          counter: counter,
          currentOption: highlightedOption,
          optGroupMap: this._optGroupMap
        });
        this.setHighlightedOption(nextValidOption);
      }
    }
  }, {
    key: 'handleDownArrow',
    value: function handleDownArrow(event, highlightedOption) {
      event.preventDefault();
      this.validateAndHighlightOption(highlightedOption, 1);
    }
  }, {
    key: 'handleUpArrow',
    value: function handleUpArrow(event, highlightedOption) {
      event.preventDefault();
      this.validateAndHighlightOption(highlightedOption, -1);
    }
  }, {
    key: 'handleEnterPress',
    value: function handleEnterPress(event, highlightedOption) {
      if (this.state.isOpen) {
        this.selectOption(highlightedOption);
        this.focusField();
        this.resetSearchAndClose();
      }
    }
  }, {
    key: 'handleTabPress',
    value: function handleTabPress(event, highlightedOption) {
      this.setFocusedState(false);
      if (this.state.isOpen) {
        this.selectOption(highlightedOption);
        this.resetSearchAndClose();
      }
    }
  }, {
    key: 'handleEscapePress',
    value: function handleEscapePress(event) {
      if (event.which === 27) {
        var $target = event.target;
        if (this.powerselect.contains($target) || this.dropdown && this.dropdown.contains($target)) {
          this.resetSearchAndClose();
          this.focusField();
        }
      }
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      var $target = event.target;
      if (!(this.powerselect.contains($target) || this.dropdown && this.dropdown.contains(event.target))) {
        var _state = this.state,
            focused = _state.focused,
            isOpen = _state.isOpen;

        if (focused) {
          this.setFocusedState(false);
        }
        if (isOpen) {
          this.resetSearchAndClose();
        }
      }
    }
  }, {
    key: 'getPublicApi',
    value: function getPublicApi() {
      var _state2 = this.state,
          isOpen = _state2.isOpen,
          searchTerm = _state2.searchTerm;

      return {
        isOpen: isOpen,
        searchTerm: searchTerm,
        actions: {
          open: this.open,
          close: this.close,
          search: this.search,
          focus: this.focusField
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          tabIndex = _props.tabIndex,
          selected = _props.selected,
          showClear = _props.showClear,
          optionLabelPath = _props.optionLabelPath,
          optionComponent = _props.optionComponent,
          placeholder = _props.placeholder,
          disabled = _props.disabled,
          selectedOptionComponent = _props.selectedOptionComponent,
          selectedOptionLabelPath = _props.selectedOptionLabelPath,
          triggerLHSComponent = _props.triggerLHSComponent,
          triggerRHSComponent = _props.triggerRHSComponent,
          beforeOptionsComponent = _props.beforeOptionsComponent,
          afterOptionsComponent = _props.afterOptionsComponent;
      var _state3 = this.state,
          isOpen = _state3.isOpen,
          searchTerm = _state3.searchTerm,
          highlightedOption = _state3.highlightedOption,
          focused = _state3.focused;

      var Trigger = this.props.triggerComponent;
      var options = this.getVisibleOptions();
      var selectApi = this.getPublicApi();

      return _react2.default.createElement(
        _Dropdown2.default,
        { className: className },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(powerselect) {
              _this2.powerselect = powerselect;
            },
            className: (0, _classnames2.default)('PowerSelect', className, {
              'PowerSelect--disabled': disabled,
              'PowerSelect--open': isOpen,
              'PowerSelect--focused': focused,
              PowerSelect__WithSearch: searchTerm
            }),
            tabIndex: tabIndex,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onKeyDown: function onKeyDown(event) {
              _this2.handleKeyDown(event, highlightedOption);
            }
          },
          _react2.default.createElement(Trigger, {
            selectedOption: selected,
            highlightedOption: highlightedOption,
            optionLabelPath: optionLabelPath,
            selectedOptionLabelPath: selectedOptionLabelPath,
            selectedOptionComponent: selectedOptionComponent,
            triggerLHSComponent: triggerLHSComponent,
            triggerRHSComponent: triggerRHSComponent,
            placeholder: placeholder,
            disabled: disabled,
            searchTerm: searchTerm,
            showClear: showClear,
            handleOnChange: this.handleSearchInputChange,
            onClearClick: this.handleClearClick,
            handleOnBlur: this.handleBlur,
            select: selectApi
          })
        ),
        isOpen && _react2.default.createElement(_DropdownMenu2.default, {
          ref: function ref(dropdownRef) {
            return _this2.dropdownRef = dropdownRef;
          },
          onRef: function onRef(dropdown) {
            return _this2.dropdown = dropdown;
          },
          className: className,
          minWidth: this.powerselect.offsetWidth,
          options: options,
          selected: selected,
          optionLabelPath: optionLabelPath,
          optionComponent: optionComponent,
          onOptionClick: this.handleOptionClick,
          handleKeyDown: this.handleKeyDown,
          highlightedOption: highlightedOption,
          select: selectApi,
          beforeOptionsComponent: beforeOptionsComponent,
          afterOptionsComponent: afterOptionsComponent
        })
      );
    }
  }]);

  return Select;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    highlightedOption: null,
    isOpen: false,
    focused: false,
    filteredOptions: null,
    searchTerm: null
  };
  this.documentEventListeners = {
    handleEscapePress: this.handleEscapePress.bind(this),
    handleDocumentClick: this.handleDocumentClick.bind(this)
  };

  this.selectOption = function (option) {
    _this3.setHighlightedOption(option);
    _this3.props.onChange({
      select: _this3.getPublicApi(),
      option: option
    });
    _this3.setState({
      searchTerm: null
    });
  };

  this.open = function () {
    if (_this3.props.disabled) {
      return;
    }
    var flattenedOptions = _this3.getFlattenedOptions();
    if (_this3.state.highlightedOption === null) {
      var selected = _this3.props.selected;

      var highlightedOption = flattenedOptions.find(function (option) {
        return option === selected;
      });
      _this3.setHighlightedOption(highlightedOption);
    }
    _this3.setState({
      isOpen: true
    });
    _this3.props.onOpen({ select: _this3.getPublicApi() });
  };

  this.close = function () {
    _this3.setState({
      isOpen: false
    });
    _this3.props.onClose({ select: _this3.getPublicApi() });
  };

  this.resetSearchAndClose = function () {
    _this3.search(null);
    _this3.close();
    _this3.setState({
      filteredOptions: null
    });
  };

  this.toggle = function (event) {
    if (event && _this3.powerselect.contains(event.target)) {
      event.stopPropagation();
    }
    if (_this3.state.isOpen) {
      _this3.resetSearchAndClose();
    } else {
      _this3.open();
    }
  };

  this.resetSearch = function () {
    _this3.setHighlightedOption(null);
    _this3.setState({
      searchTerm: null,
      filteredOptions: null
    });
  };

  this.focusField = function () {
    _this3.focusFieldTimeout = setTimeout(function () {
      _this3.powerselect.focus();
    });
  };

  this.search = function (searchTerm, callback) {
    var _props2 = _this3.props,
        options = _props2.options,
        optionLabelPath = _props2.optionLabelPath,
        matcher = _props2.matcher,
        _props2$searchIndices = _props2.searchIndices,
        searchIndices = _props2$searchIndices === undefined ? optionLabelPath : _props2$searchIndices;

    var filteredOptions = (0, _utils.filterOptions)({
      options: options,
      searchTerm: searchTerm || '',
      searchIndices: searchIndices,
      matcher: matcher
    });

    var _flattenOptions3 = (0, _utils.flattenOptions)(filteredOptions || []),
        flattenedOptions = _flattenOptions3.flattenedOptions;

    if (searchTerm && flattenedOptions.length) {
      _this3.setHighlightedOption(flattenedOptions[0]);
    } else {
      _this3.setHighlightedOption(null);
    }

    _this3.setState({
      filteredOptions: filteredOptions,
      searchTerm: searchTerm,
      _flattenedOptions: flattenedOptions
    }, callback);
  };

  this.handleSearchInputChange = function (event) {
    var value = event.target.value;
    _this3.open();
    _this3.search(value);

    if (_this3.props.onSearchInputChange) {
      // show deprecate warning
      _this3.props.onSearchInputChange(event, { select: _this3.getPublicApi() });
    } else {
      _this3.props.onSearch(event, { select: _this3.getPublicApi() });
    }
  };

  this.handleKeyDown = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var event = args[0];

    var keyCode = event.which;
    var action = _this3[actions[keyCode]];
    if (action) {
      if ((keyCode === KEY_CODES.UP_ARROW || keyCode === KEY_CODES.DOWN_ARROW) && !_this3.state.isOpen) {
        _this3.open();
        return;
      }
      action.apply(_this3, args);
    }
    _this3.props.onKeyDown(event, { select: _this3.getPublicApi() });
  };

  this.handleFocus = function (event) {
    var triggerInput = _this3.powerselect.querySelector('input');
    if (triggerInput) {
      triggerInput.focus();
    }
    _this3.setFocusedState(true);
    if (!_this3.state.focused) {
      _this3.props.onFocus(event, { select: _this3.getPublicApi() });
    }
  };

  this.handleBlur = function (event) {
    _this3.setFocusedState(false);
    _this3.props.onBlur(event, { select: _this3.getPublicApi() });
  };

  this.handleClick = function (event) {
    _this3.toggle(event);
    _this3.props.onClick(event, { select: _this3.getPublicApi() });
  };

  this.handleClearClick = function (event) {
    _this3.selectOption(undefined);
    _this3.resetSearchAndClose();
    _this3.focusField();
    event.stopPropagation();
  };

  this.handleOptionClick = function (highlightedOption) {
    _this3.selectOption(highlightedOption);
    _this3.focusField();
    if (_this3.props.closeOnSelect) {
      _this3.resetSearchAndClose();
    }
  };
};

exports.default = Select;


Select.propTypes = {
  options: _propTypes2.default.array.isRequired,
  selected: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.array]),
  onChange: _propTypes2.default.func.isRequired
};

Select.defaultProps = {
  options: [],
  disabled: false,
  tabIndex: 0,
  showClear: true,
  closeOnSelect: true,
  optionLabelPath: null,
  optionComponent: null,
  triggerComponent: _SelectTrigger2.default,
  triggerLHSComponent: null,
  triggerRHSComponent: null,
  selectedOptionComponent: null,
  beforeOptionsComponent: null,
  afterOptionsComponent: null,
  preventFocusOnOpen: false,
  matcher: _utils.matcher,
  onFocus: noop,
  onBlur: noop,
  onClick: noop,
  onKeyDown: noop,
  onOpen: noop,
  onClose: noop,
  onSearch: noop
};