import React, { useState, useRef, useEffect, useMemo } from 'react';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function listener(element, eventName, handler) {
  var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  element.addEventListener(eventName, handler, option);
  return function () {
    element.removeEventListener(eventName, handler, option);
  };
}

function Cut () {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var containerRef = useRef(null);
  var isDraw = useRef(false);
  var _useState3 = useState({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    rectPos = _useState4[0],
    setRectPos = _useState4[1];
  useEffect(function () {
    var off = listener(document.body, 'keyup', function (e) {
      if (e.keyCode === 112) {
        console.log('说明是F1');
        setVisible(true);
      }
    });
    return function () {
      off();
    };
  }, []);
  useEffect(function () {
    var closeMouseDown;
    var closeMouseUp;
    var closeMouseMove;
    if (visible && containerRef.current) {
      closeMouseDown = listener(containerRef.current, 'mousedown', function (downEvent) {
        var clientX = downEvent.clientX,
          clientY = downEvent.clientY;
        setRectPos(function (pos) {
          return Object.assign(Object.assign({}, pos), {
            startX: clientX,
            startY: clientY
          });
        });
        if (containerRef.current) {
          closeMouseMove = listener(containerRef.current, 'mousemove', function (moveEvent) {
            var clientX = moveEvent.clientX,
              clientY = moveEvent.clientY;
            isDraw.current = true;
            setRectPos(function (pos) {
              return Object.assign(Object.assign({}, pos), {
                endX: clientX,
                endY: clientY
              });
            });
          });
        }
      });
      closeMouseUp = listener(containerRef.current, 'mouseup', function (upEvent) {
        var clientX = upEvent.clientX,
          clientY = upEvent.clientY;
        setRectPos(function (pos) {
          return Object.assign(Object.assign({}, pos), {
            endX: clientX,
            endY: clientY
          });
        });
        // isDraw.current = false
        closeMouseMove === null || closeMouseMove === void 0 ? void 0 : closeMouseMove();
      });
    }
    return function () {
      closeMouseDown === null || closeMouseDown === void 0 ? void 0 : closeMouseDown();
      closeMouseUp === null || closeMouseUp === void 0 ? void 0 : closeMouseUp();
    };
  }, [visible]);
  var clipPath = useMemo(function () {
    var startX = rectPos.startX,
      startY = rectPos.startY,
      endX = rectPos.endX,
      endY = rectPos.endY;
    if (!isDraw.current) {
      return '';
    }
    var x0 = startX > endX ? endX : startX;
    var y0 = startY > endY ? endY : startY;
    var x1 = startX > endX ? startX : endX;
    var y1 = startY > endY ? startY : endY;
    var paths = ['0% 0%', '0% 100%', "".concat(x0, "px 100%"), "".concat(x0, "px ").concat(y0, "px"), "".concat(x1, "px ").concat(y0, "px"), "".concat(x1, "px ").concat(y1, "px"), "".concat(x0, "px ").concat(y1, "px"), "".concat(x0, "px 100%"), "100% 100%", "100% 0"];
    return "polygon(".concat(paths.join(','), ")");
  }, [rectPos]);
  var rectStyle = useMemo(function () {
    var startX = rectPos.startX,
      startY = rectPos.startY,
      endX = rectPos.endX,
      endY = rectPos.endY;
    var x0 = startX > endX ? endX : startX;
    var y0 = startY > endY ? endY : startY;
    var x1 = startX > endX ? startX : endX;
    var y1 = startY > endY ? startY : endY;
    return {
      left: "".concat(x0, "px"),
      top: "".concat(y0, "px"),
      width: "".concat(x1 - x0, "px"),
      height: "".concat(y1 - y0, "px")
    };
  }, [rectPos]);
  return visible && /*#__PURE__*/React.createElement("div", {
    className: "cut-wrapper",
    ref: containerRef,
    style: {
      clipPath: clipPath
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cut-container",
    style: rectStyle
  }));
}

var StoryCut = Cut;

export { StoryCut };
