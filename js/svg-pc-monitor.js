    
      if (typeof $ == 'undefined') {
        if (typeof jQuery == 'undefined') {
          console.error('Have no jQuery');
        } else {
          const $ = jQuery;
        }
      }

      var globals = {
        channelName: 'elgigantenSE'
      };

    
    

      // check if an param resides inside the window
      (function () {

        /* will set data:
            #paneltype_value > tspan // LED
            #high-dynamic-range_value > tspan // JA
            #high-dynamic-range_value > tspan // JA
        */
        var $body = $('body'),
          transitionEvent = (function () {
            var bodyStyles = $body[0].style,
              // check browserspecific name for events
              transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
              };

            for (var t in transitions) {
              if (t in bodyStyles) {
                return transitions[t];
              }
            }
          })(),
          tvDeviceParams = ['paneltype', 'high-dynamic-range', ['full-hd', 'resolution'], 'smart-tv'],
          d = {
            diagonal: 0,
            height: 0,
            width: 0,
            thickness: 0,
            weight: 0
            // ---- TV-specific params, see props abov, assigning values below ----
            /* 'paneltype': value_unknown, // Typ av bildskärm
            'high-dynamic-range': value_unknown, // high dynamic range
            'full-hd': value_unknown,
            'smart-tv': value_unknown */
          },
          topParams = {
            params: ['height', 'width', 'thickness'],
            selectors: ['#phone-3d-height .phone-label', '#phone-3d-width .phone-label', '#phone-thickness .thickness-label'],
            values: [],
            icons: {
              params: [tvDeviceParams[0], tvDeviceParams[1], tvDeviceParams[2][0], tvDeviceParams[3]],
              selectors: ['#Paneltype > tspan', '#High-Dynamic-Range > tspan', '#Full-HD > tspan', '#SmartTV > tspan'],
              values: []
            }
          };
        //
        $(tvDeviceParams).each(function (index, element) {
          var tvValProp;
          tvValProp = (typeof element == 'object') ? element[0] : element;
          d[tvValProp] = 'Unknown';
        }); console.log('d=>', d);
        /**
          * Warning! The order of arguments should always be the same and conform such of d<keys>
          * @return object containing the same fields like d
          */
        function setProdParams() {
          var params = {},
            args = arguments;
          $(Object.keys(d)).each(function (index, param) {
            params[param] = args[index]; // { height : 'Højde' ... }
            var indexOfParam = topParams.params.indexOf(param);
            if (indexOfParam !== -1) {
              topParams.values[indexOfParam] = params[param];
              // console.log('set top param text => ', $(topParams.selectors[indexOfParam]));
              /*  $('#phone-3d-width .phone-label')[0]
                  $('#phone-width .phone-label')[0]
                  $('#phone-thickness .thickness-label')[0] */
            }
            var indexOfParamIcon = topParams.icons.params.indexOf(param);
            if (indexOfParamIcon !== -1) {
              topParams.icons.values[indexOfParamIcon] = params[param];
            }
          }); console.log('%ctopParams.values =>', 'background-color: lightgreen', topParams.values);
          return params;
        }

        var dataKeys = (function () {
          switch (globals.channelName) {
            case "elgigantenDK":
              return setProdParams(
                'Skærmstørrelse',
                'Højde',
                'Bredde',
                'Dybde',
                'Vægt',
                'Paneltype',             // paneltype
                'Højest understøttede PC-opløsning',  // high-dynamic-range
                'Opløsning',             // full-hd
                'Smart TV platform');
              break;
            case "elgigantenSE":
              return setProdParams(
                'Skärmstorlek', // diagonal
                'Höjd',
                'Bredd',
                'Djup',
                'Vikt',
                'Typ av bildskärm', // paneltype
                'Högsta upplösning för dator',
                'Upplösning',
                'Smart-TV - plattform');
              break;
            case "gigantti":
              return setProdParams(
                'Koko',   // diagonal
                'Korkeus',
                'Leveys',
                'Syvyys',
                'Paino',
                'Näytön tyyppi', // paneltype
                'Korkein tuettu PC resoluutio',
                'Resoluutio',
                'Smart-TV-käyttöliittymä');
              break;
            default: // norvegian
              return setProdParams(
                'Størrelse',  // diagonal
                'Høyde',      // height
                'Bredde',     // width
                'Dybde',      // thickness
                'Vekt',       // weight
                'Paneltype', // paneltype
                'Høyeste støttede PC-oppløsning',
                'Oppløsning',
                'Smart-TV-plattform');
          }
        }()); // console.log('dataKeys=>', dataKeys);

        $(document).ready(function () {
          // the table with a device params
          var $display = $('.display'),
            $displayDiagonalSpan = $('.display-diagonal span'),
            $displayLine = $('.display-line'),
            $phoneImageWrap = $('#phone-image-wrap'),
            $phoneInfographic = $('#phone-infographic'),
            $phoneInfographicWrap = $('#phone-infographic-wrap'),
            $svgInside = $phoneInfographicWrap.find('svg'),
            $phone3dHeight = $('#phone-3d-height'),
            $phoneHeightData = $('.phone-height-data'),
            selectorPhoneThickness = '#phone-thickness',
            $phoneThickness = $(selectorPhoneThickness),
            selectorPhoneStand = '#phone-stand',
            $phoneStand = $(selectorPhoneStand),
            selectorPhoneWidth = '#phone-width',
            $phoneWidth = $(selectorPhoneWidth),
            $phoneWidthData = $('.phone-width-data'),
            $tabSpecs = $('#tab-specs'),
            $tabs = $('#product-tabs-group .tabs .tab a'),
            $thicknessData = $('.thickness-data'),
            $thicknessLine = $('#thickness-width'),
            // svg shapes, new mojs.Shape will be assigned
            svgShapes = {
              outline: null,
              inner: null,
              sideview: null
            },
            isAnimated;
          // check if animation intersects the visible area
          function inViewport(test) {

            var animationTopOffset = $phoneInfographicWrap.offset().top,
              windowScrollTop = $(window).scrollTop(),
              animationHeight = $phoneInfographicWrap.height(),
              animationUp = animationTopOffset < windowScrollTop,
              animationDown = animationTopOffset > windowScrollTop,
              windowBottomPos = windowScrollTop + window.innerHeight,
              animationBottomPos = animationTopOffset + animationHeight;

            if (test) {
              var condition1 = animationDown && animationTopOffset < windowBottomPos,
                condition2 = animationUp && animationBottomPos > windowScrollTop;
              if (condition1) {
                console.log('condition1');
              } else if (condition2) {
                console.log('condition2');
              } else {
                console.warn('No conditions');
                if (animationDown) {
                  console.log('animationDown', {
                    '0 condition': animationTopOffset < windowBottomPos,
                    '1 animationTopOffset': animationTopOffset,
                    '2 windowBottomPos': windowBottomPos/* ,
                    '3 $phoneInfographicWrap' : $phoneInfographicWrap,
                    '4 windowScrollTop' : windowScrollTop,
                    '5 window.innerHeight' : window.innerHeight */
                  });
                } else if (animationUp) {
                  console.log('animationUp', {
                    '0 condition': animationBottomPos > windowScrollTop,
                    '1 animationBottomPos': animationBottomPos,
                    '2 windowScrollTop': windowScrollTop/* ,
                    '3 $phoneInfographicWrap' : $phoneInfographicWrap,
                    '4 windowScrollTop' : windowScrollTop,
                    '5 animationHeight' : animationHeight */
                  });
                } else {
                  console.warn('No animations');
                }
              }
            }
            return (animationDown && animationTopOffset < windowBottomPos) ||
              (animationUp && animationBottomPos > windowScrollTop);
          }
          // store a browser-specific event name

          $body.addClass('hasPhoneSize');
          $('.phone-svg-wrap').append($display)

          if (!$('.spec-table').length) {
            console.warn('No .spec-table');
            return;
          }
          // console.groupCollapsed('Parse table');
          // 
          var paramsToSkip = [],
            keys = Object.keys(d),
            dLen = keys.length,
            /**
            * Set values to d object
            */
            parseProductTableAndSetValues = function (param, text, val) {
              // console.log('parseProductTableAndSetValues', { param: param, 'dataKeys[param]': dataKeys[param], paramsToSkip: paramsToSkip });
              // 
              if (paramsToSkip.indexOf(param) === -1) { // console.log('%cparam to parse value: ', 'color: green', {param:param, text:text, 'dataKeys[param]':dataKeys[param]});
                // Produkttyp.indexOf('Skärmstorlek')
                if (text.indexOf(dataKeys[param]) >= 0) { // console.log('%ccontains param', 'color: blue', {text:text, 'dataKeys[param]':dataKeys[param]});
                  // assign value to the d member
                  var nameToCheck, found;
                  for (var i=0, len = tvDeviceParams.length; i<len; i++){
                    nameToCheck = tvDeviceParams[i];
                    if (typeof nameToCheck == 'object'){
                      nameToCheck = nameToCheck[0];
                    } // console.log('compare=>', {param:param, nameToCheck:nameToCheck});
                    if (param == nameToCheck){
                      d[param] = val;
                      paramsToSkip.push(param);
                      found = true;
                      console.log('set value=>', {param:param, 'd[param]':d[param]});
                      break;
                    }
                  } 
                  if (!found) {
                    d[param] = parseFloat(val.replace(',', '.'));
                  }
                }
              }
            };
          // 
          $('.spec-table tr').each(function (k, el) {
            var $els = $(el).find('td'),
              // extract the text from the first cell in the row
              text = $els.first().text(), // param
              // extract the text from the last cell in the row
              val = $els.last().text(); // value

            for (var i = 0; i < dLen; i++) {
              parseProductTableAndSetValues(keys[i], text, val);
            }
          }); //console.log('%cd=>', 'color: goldenrod', d);
          //console.groupEnd();
          if (!d.diagonal || !d.height || !d.width || !d.thickness) {
            console.warn('No diagonal or height or width or thickness =>', d);
            return;
          }

          if (d.width < d.thickness) {
            var __tmp = d.thickness;
            d.thickness = d.width;
            d.width = __tmp;
          }
          // DOMContentLoaded resize scroll ! event (click)
          function start(event) {

            if (event && event.type == 'resize') {
              isAnimated = false;
            }

            if (!
              ( // we can see animation in viewport on load
                (inViewport() && event && (event.type == 'DOMContentLoaded' || event.type == 'resize'))
                ||
                // was not run and scroll 
                (inViewport() && event && event.type == 'scroll' && !isAnimated)
              )
            ) {
              console.groupCollapsed('start is canceled');
              console.log('%cCheck params', 'color: red', { 'inViewport': inViewport(true), 'nevent.type': event ? event.type : 'none' });
              console.groupEnd();
              return false;
            } else {
              console.log('%cstarted', 'color: blue', {
                'inViewport: ': inViewport(true),
                isAnimated: isAnimated,
                'event.type': event ? event.type : 'none'
              });
            }

            $display.hide();
            $('[data-name="mojs-shape"]').remove();
            var animatedClassName = 'animated'
            wideCLass = 'wide';
            $phoneStand.removeClass(wideCLass).removeClass(animatedClassName);

            var tmt1, tmt = setTimeout(function () {
              $phoneStand.addClass(wideCLass);
              tmt1 = setTimeout(function () {
                $phoneStand.addClass(animatedClassName);
              }, 1000);
            }, 1000);

            var widthBox = parseInt($phoneInfographicWrap.css('width')), // 627
              widthDevice = widthBox / 100 * 69.4,
              displayW = widthDevice - 20,
              heightDevice = d.height / d.width * widthDevice,
              displayH = heightDevice - 20,
              thickness = widthBox / 100 * 0.66,
              phoneWrapH = heightDevice / 100 * (100 + 2.669),
              standHeight = widthBox / 100 * 2.669,
              standWidth = widthBox / 100 * 25.92,
              phRW = widthDevice / 2,
              phRH = heightDevice / 2,
              strokeColor = '#333434';
            /**
              * Set ratios accordingly to the image source (look at sources/ratios.xlsx):
                width   %%
                0.58	11.8367 // 
                0.08	 1.8367
                3.38	69.3878
                0.17	 3.469
                0.66	13.469
                height
                0.13   2.669
            */
            $thicknessData.text(d.thickness + ' cm');
            $phoneHeightData.text(d.height + ' cm');
            $phoneWidthData.text(d.width + ' cm');
            $displayDiagonalSpan.text(d.diagonal + "″");
            $phoneThickness.css({ width: thickness, height: heightDevice });
            $thicknessLine.css({ width: thickness + 10 });

            //console.log('d=>', d);
            $(tvDeviceParams).each(function (index, param) {
              //console.log('Parse it =>', param);
              if (typeof param === 'object') {
                //console.log('this=>', { param: param, d0: d[param[0]] });
                var rVal = String(d[param[0]]).split('('),
                  rValRes = '(' + rVal.pop(),
                  rValUp = rVal.join(" ");
                if (rValRes.indexOf(')') === -1) {
                  rValRes += ')';
                } //console.log('rVals =>', 'rValUp: ' + rValUp, 'rValRes: ' + rValRes);
                $('#' + param[0] + '_value >tspan').text(rValUp);
                $('#' + param[1] + '_value >tspan').text(rValRes);
              } else {
                $('#' + param + '_value >tspan').text(d[param]);
              }
            });

            for (var i = 0,
              objs = [$phoneImageWrap, $phoneInfographic, $phoneWidth, $phone3dHeight.eq(0)];
              i < objs.length;
              i++
            ) {
              objs[i].css('height', heightDevice);
            }

            $phoneStand.css({
              bottom: -standHeight,
              height: standHeight
            });

            $displayLine.css({
              transform: 'translate(-50%, -50%)  rotate(' + (Math.atan(displayW / displayH) * 180 / Math.PI) + 'deg)'
            });

            // device outline       #phone-width
            svgShapes.outline = new mojs.Shape({
              parent: selectorPhoneWidth,
              shape: 'rect',
              width: widthBox, // 627
              height: phoneWrapH, // 270.75
              fill: 'none',
              radiusY: phRH,
              radiusX: phRW,
              stroke: strokeColor,
              rx: 4,
              ry: 4,
              strokeWidth: 2,
              strokeDasharray: '100%',
              strokeDashoffset: { '100%': '0%' },
              duration: 2000
            });
            // device inner figure  #phone-width
            svgShapes.inner = new mojs.Shape({
              parent: selectorPhoneWidth,
              className: 'phone-svg-wrap',
              shape: 'rect',
              width: widthBox,  // 627
              height: phoneWrapH, // 270.75
              fill: 'none',
              radiusY: phRH - 8, // stroke offset vertical
              radiusX: phRW - 8, // stroke offset horizontal
              stroke: strokeColor,
              strokeWidth: 2,
              strokeDasharray: '100%',
              strokeDashoffset: { '100%': '0%' },
              duration: 2000,
              onStart: function () { }
            })
              .then({
                strokeWidth: { '2': '0' },
                stroke: { strokeColor: '#e9e9e9' },
                onStart: function () {
                  // console.log('Started!');
                  var displayRect = document.querySelector('.phone-svg-wrap rect');
                  $phoneInfographicWrap.addClass('animate');
                  $display.css({
                    width: displayRect.getAttribute('width'),
                    height: displayRect.getAttribute('height')
                  }).show();
                },
                duration: 400,
              });
            // device sideview      #phone-thickness
            svgShapes.sideview = new mojs.Shape({
              parent: selectorPhoneThickness,
              shape: 'rect',
              width: thickness + 10,
              height: phoneWrapH,
              fill: 'none',
              radiusY: phRH,
              radiusX: thickness / 2,
              stroke: strokeColor,
              strokeWidth: 2,
              strokeDasharray: '100%',
              strokeDashoffset: { '100%': '0%' },
              duration: 2400,
            });

            $(Object.keys(svgShapes)).each(function () {
              if (svgShapes[this] && typeof svgShapes[this].play == 'function') {
                svgShapes[this].play(); // console.log('%cplay: ' + this, 'color: green');
              } else {
                console.warn('No svgShapes.' + this + '.play()');
              }
            });

            // set names to the top params (around TV)
            for (var i = 0, len = topParams.values.length; i < len; i++) {
              $(topParams.selectors[i]).text(topParams.values[i]); 
            }
            // set names to the icons headers (below TV)
            for (i = 0, len = topParams.icons.values.length; i < len; i++) {
              $(topParams.icons.selectors[i]).text(topParams.icons.values[i]); 
            }
            // 
            $(window).off('resize scroll', start);
            $tabs.off('click', _start);
            isAnimated = true;
          } // end of function start

          $(window).on('DOMContentLoaded resize scroll', function (event) {
            start(event);
          });

          $tabs.on('click', _start);
          $phoneInfographicWrap.show();

          function _start() { // console.log('Check active =>', $('#tab-specs').hasClass('active'));
            setTimeout(start, 100);
          };

        });
      }());
    
