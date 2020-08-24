/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/worker/app-workers/app.workers.ts":
/*!***********************************************!*\
  !*** ./src/worker/app-workers/app.workers.ts ***!
  \***********************************************/
/*! exports provided: AppWorkers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppWorkers", function() { return AppWorkers; });
/* harmony import */ var _mocked_cpu_intensive_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mocked-cpu-intensive.worker */ "./src/worker/app-workers/mocked-cpu-intensive.worker.ts");
/* harmony import */ var _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/worker-message.model */ "./src/worker/app-workers/shared/worker-message.model.ts");
/* harmony import */ var _shared_worker_topic_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/worker-topic.constants */ "./src/worker/app-workers/shared/worker-topic.constants.ts");



class AppWorkers {
    constructor(workerCtx) {
        this.workerCtx = workerCtx;
        this.created = new Date();
    }
    workerBroker($event) {
        const { topic, data } = $event.data;
        const workerMessage = new _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_1__["WorkerMessageModel"](topic, data);
        switch (topic) {
            case _shared_worker_topic_constants__WEBPACK_IMPORTED_MODULE_2__["WORKER_TOPIC"].cpuIntensive:
                this.returnWorkResults(_mocked_cpu_intensive_worker__WEBPACK_IMPORTED_MODULE_0__["MockedCpuIntensiveWorker"].doWork(workerMessage));
                break;
            default: // Add support for other workers here
                console.error('Topic Does Not Match');
        }
    }
    returnWorkResults(message) {
        this.workerCtx.postMessage(message);
    }
}


/***/ }),

/***/ "./src/worker/app-workers/mocked-cpu-intensive.worker.ts":
/*!***************************************************************!*\
  !*** ./src/worker/app-workers/mocked-cpu-intensive.worker.ts ***!
  \***************************************************************/
/*! exports provided: MockedCpuIntensiveWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockedCpuIntensiveWorker", function() { return MockedCpuIntensiveWorker; });
/* harmony import */ var _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/worker-message.model */ "./src/worker/app-workers/shared/worker-message.model.ts");

class MockedCpuIntensiveWorker {
    static doWork(value) {
        const before = new Date();
        let count = 0;
        while (true) {
            count++;
            const now = new Date();
            if (now.valueOf() - before.valueOf() > value.data.duration) {
                break;
            }
        }
        return new _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageModel"](value.topic, { iteration: count });
    }
}


/***/ }),

/***/ "./src/worker/app-workers/shared/worker-message.model.ts":
/*!***************************************************************!*\
  !*** ./src/worker/app-workers/shared/worker-message.model.ts ***!
  \***************************************************************/
/*! exports provided: WorkerMessageModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerMessageModel", function() { return WorkerMessageModel; });
class WorkerMessageModel {
    constructor(topic, data) {
        this.topic = topic;
        this.data = data;
    }
    static getInstance(value) {
        const { topic, data } = value;
        return new WorkerMessageModel(topic, data);
    }
}


/***/ }),

/***/ "./src/worker/app-workers/shared/worker-topic.constants.ts":
/*!*****************************************************************!*\
  !*** ./src/worker/app-workers/shared/worker-topic.constants.ts ***!
  \*****************************************************************/
/*! exports provided: WORKER_TOPIC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKER_TOPIC", function() { return WORKER_TOPIC; });
const WORKER_TOPIC = {
    cpuIntensive: 'cpuIntensive',
};


/***/ }),

/***/ "./src/worker/main.worker.ts":
/*!***********************************!*\
  !*** ./src/worker/main.worker.ts ***!
  \***********************************/
/*! exports provided: worker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "worker", function() { return worker; });
/* harmony import */ var _app_workers_app_workers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-workers/app.workers */ "./src/worker/app-workers/app.workers.ts");

const worker = new _app_workers_app_workers__WEBPACK_IMPORTED_MODULE_0__["AppWorkers"](self);
addEventListener('message', ($event) => {
    worker.workerBroker($event);
});


/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/worker/main.worker.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/worker/main.worker.ts */"./src/worker/main.worker.ts");


/***/ })

/******/ });