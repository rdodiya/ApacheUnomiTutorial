var SESSIONID = null,  PROFILEID = null;
(function () {
  const unomiTrackerTestConf = {
    scope: "example-tracker",
    site: {
      siteInfo: {
        siteID: "example-tracker",
      },
    },
    page: {
      pageInfo: {
        pageID: "example-tracker-page",
        pageName: document.title,
        pagePath: document.location.pathname,
        destinationURL: document.location.origin + document.location.pathname,
        language: "en",
        categories: [],
        tags: [],
      },
      consentTypes: [],
    },
    "events:": [],
    wemInitConfig: {
      contextServerUrl: "http://localhost:8181", //url where Apache Unomi is installed 
      timeoutInMilliseconds: "1500",
      contextServerCookieName: "context-profile-id",
      activateWem: true,
      trackerSessionIdCookieName: "example-tracker-session-id",
      trackerProfileIdCookieName: "example-tracker-profile-id",
    },
  };
  // generate a new session
  if (unomiWebTracker.getCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName) == null ) {
    unomiWebTracker.setCookie(unomiTrackerTestConf.wemInitConfig.trackerSessionIdCookieName,unomiWebTracker.generateGuid(), 1);
  }

  // init tracker with our conf
  unomiWebTracker.initTracker(unomiTrackerTestConf);

  unomiWebTracker._registerCallback(() => {
    console.log(
      "Unomi tracker test successfully loaded context",
      unomiWebTracker.getLoadedContext()
    );

    SESSIONID = unomiWebTracker.getLoadedContext().sessionId;
    PROFILEID = unomiWebTracker.getLoadedContext().profileId;
  }, "Unomi tracker test callback example");
  // start the tracker
  unomiWebTracker.startTracker();
  console.log("SESSIONID : " + SESSIONID + ", PROFILEID : " + PROFILEID);
})();

function sendPageVisitEvent(pageVisit) {
  var customAppEvent = unomiWebTracker.buildEvent(
    "click",
    unomiWebTracker.buildTarget(pageVisit.toLowerCase()+"PageVisit",pageVisit),
    unomiWebTracker.buildSourcePage()
  );

  unomiWebTracker.collectEvent(
    customAppEvent,
    function (xhr) {
      console.info(pageVisit+" click event successfully collected.");
    },
    function (xhr) {
      console.error("Could not send"+pageVisit+" click event.");
    }
  );
}

$(document).ready(function () {
  //on click event listener
  $(".pageVisit").click(function (e) { 
    e.preventDefault();
    sendPageVisitEvent(e.target.getHTML());
  });
});