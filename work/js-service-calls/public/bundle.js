/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fetch.js":
/*!**********************!*\
  !*** ./src/fetch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchChangeWord": () => (/* binding */ fetchChangeWord),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchWord": () => (/* binding */ fetchWord)
/* harmony export */ });


function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchWord() {
  return fetch('/api/word', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchChangeWord(username, word) {
  return fetch('/api/word', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username,
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./src/fetch.js");

var MESSAGES = {
  'networkError': "Network Error, Please try again",
  'auth-missing': "Please Login",
  'required-username': "Username only contains letters and numbers",
  'auth-insufficient': "Please user other username",
  'invalid-word': "Please use valid word, word only contains letters",
  "default": "Something went wrong. Please try again"
};
var stateUser;
var stateWord;
checkSession();

//check session and username
function checkSession() {
  (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (user) {
    stateUser = user.username;
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (word) {
      stateWord = word.storedWord;
      renderWordPage();
    })["catch"](function (error) {
      renderStatus(error);
    });
  })["catch"](function (error) {
    console.log(error);
    renderLogin();
  });
  //.catch( () => renderLogin() );
}

// login
function toLogin() {
  var loginButtonEl = document.querySelector('.login-button');
  var usernameEl = document.querySelector('.login-username');
  loginButtonEl.addEventListener('click', function (e) {
    var username = usernameEl.value;
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(checkSession)["catch"](function (error) {
      return renderStatus(error);
    });
  });
}

//log out
function toLogout() {
  var logoutButtonEl = document.querySelector('.logout-button');
  logoutButtonEl.addEventListener('click', function (e) {
    stateWord = undefined;
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      return renderLogin();
    })["catch"](function (error) {
      return renderStatus(error);
    });
  });
}

//change word
function toChange(username) {
  var changeButtonEl = document.querySelector('.change-button');
  changeButtonEl.addEventListener('click', function (e) {
    var word = document.querySelector('.to-send').value;
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchChangeWord)(username, word).then(function (nameAndWord) {
      stateWord = nameAndWord.storedWord;
      renderWordPage();
    })["catch"](function (error) {
      return renderStatus(error);
    });
  });
}

//render login page
function renderLogin() {
  var loginEl = document.querySelector('.login-page');
  var wordEl = document.querySelector('.word-page');
  loginEl.classList.remove('no-display');
  wordEl.classList.add('no-display');
  loginEl.innerHTML = "\n    <div class=\"login\">\n      <form action=\"#\">\n        Username: <input class=\"login-username\">\n        <button type=\"button\" class=\"send-button login-button\">Login</button>\n      </form>\n    </div>\n  ";
  toLogin();
  renderStatus('');
}

//render word page
function renderWordPage() {
  var loginEl = document.querySelector('.login-page');
  var wordEl = document.querySelector('.word-page');
  loginEl.classList.add('no-display');
  wordEl.classList.remove('no-display');
  wordEl.innerHTML = "\n  <div class=\"change-word\">\n  <div class=\"default-word\">\n    <div> Username : ".concat(stateUser, " </div>\n    <div> Your word is : ").concat(stateWord, " </div>\n  </div>\n\n  <div class=\"change-word\">\n    <form action=\"#\">\n      <input class=\"to-send\" name=\"word\" type=\"textarea\" placeholder=\"  Change your word\"/>\n      <button type=\"button\" class=\"send-button change-button\">Change</button>\n      <button type=\"button\" class=\"send-button logout-button\">Logout</button>\n    </form>\n    <div class=\"status\"></div>\n  </div>  \n</div> \n  ");
  toChange(stateUser);
  toLogout();
  renderStatus('');
}

//render error message
function renderStatus(message) {
  var statusEl = document.querySelector('.status');
  if (!message) {
    statusEl.innerText = '';
    return;
  }
  var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
  statusEl.innerText = MESSAGES[key] || MESSAGES["default"];
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map