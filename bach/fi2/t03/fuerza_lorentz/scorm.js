(function () {
  "use strict";
  var api = null;
  var initialized = false;
  var finished = false;

  function findApi(start) {
    var current = start;
    for (var i = 0; current && i < 10; i += 1) {
      try { if (current.API) return current.API; } catch (_) {}
      try { if (current.parent === current) break; current = current.parent; } catch (_) { break; }
    }
    return null;
  }

  function getApi() {
    api = findApi(window);
    if (!api && window.opener) api = findApi(window.opener);
    return api;
  }

  function initialize() {
    if (!getApi()) return;
    try {
      initialized = api.LMSInitialize("") === "true";
      if (!initialized) return;
      var status = api.LMSGetValue("cmi.core.lesson_status");
      if (!status || status === "not attempted") {
        api.LMSSetValue("cmi.core.lesson_status", "incomplete");
        api.LMSCommit("");
      }
    } catch (_) { initialized = false; }
  }

  function complete() {
    if (!initialized || finished) return;
    try {
      api.LMSSetValue("cmi.core.lesson_status", "completed");
      api.LMSSetValue("cmi.core.score.raw", "100");
      api.LMSSetValue("cmi.core.score.min", "0");
      api.LMSSetValue("cmi.core.score.max", "100");
      api.LMSCommit("");
    } catch (_) {}
  }

  function finish() {
    if (!initialized || finished) return;
    finished = true;
    try { api.LMSCommit(""); api.LMSFinish(""); } catch (_) {}
  }

  window.addEventListener("lorentz-completed", complete);
  window.addEventListener("pagehide", finish);
  window.addEventListener("beforeunload", finish);
  initialize();
})();
