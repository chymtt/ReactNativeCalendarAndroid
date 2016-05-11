'use strict';

var React = require('react');
var ReactNative = require('react-native');
var { requireNativeComponent, PropTypes, View } = ReactNative;

var NativeCalendar = requireNativeComponent('CalendarAndroid', Calendar);

var FIRST_DAY_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

var SHOWING_DATE = [
  'all',
  'current'
];

var SELECTION_MODES = [
  'none',
  'single',
  'multiple'
];

var colorType = function (props, propName, componentName) {
  var checker = function() {
    var color = props[propName];
    var regex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    if (!regex.test(color)) {
      return new Error('Only accept color formats: #RRGGBB and #AARRGGBB');
    }
  };

  return PropTypes.string(props, propName, componentName) || checker();
}

class Calendar extends React.Component {
  constructor() {
    super();
    this._onDateChange = this._onDateChange.bind(this);
  }

  _onDateChange(event) {
    this.props.onDateChange && this.props.onDateChange(event.nativeEvent);
  }

  render() {
    var { style, ...rest } = this.props,
        width = rest.width,
        height = rest.topbarVisible ? width / 7 * 8 : width;

    style = {
      ...style,
      width,
      height
    };

    return (
      <NativeCalendar
        {...rest}
        style={style}
        onDateChange={this._onDateChange} />
    );
  }
}

Calendar.propTypes = {
  ...View.propTypes,
  width: PropTypes.number.isRequired,
  topbarVisible: PropTypes.bool,
  arrowColor: colorType,
  firstDayOfWeek: PropTypes.oneOf(FIRST_DAY_OF_WEEK),
  showDate: PropTypes.oneOf(SHOWING_DATE),
  currentDate: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])),
  selectionMode: PropTypes.oneOf(SELECTION_MODES),
  selectionColor: colorType,
  selectedDates: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]))
};

Calendar.defaultProps = {
  topbarVisible: true
}

module.exports = Calendar;
