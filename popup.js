const STRINGS = {
  en: {
    docTitle: "Coursera Helper",
    title: "Coursera Helper",
    subtitle: "Helps you rush through courses efficiently.",
    autoCopy: "Auto copy",
    autoCopyHint: "Copy questions when a lesson page opens.",
    autoReload: "Auto reload after skip",
    autoReloadHint: "Reload the page when a skip run finishes.",
    autoInfoUpdate: "Auto info update",
    autoInfoUpdateHint: "Refresh the dashboard when you open or switch Coursera pages.",
    requestMode: "Skip mode for standalone modules",
    requestModeHint: "Applies to the standalone skip modules only. Step by step waits between items; Instant does not.",
    requestModeNames: { sequential: "Step by step", instant: "Instant" },
    language: "Language",
    appearance: "Appearance",
    quickActions: "Quick actions",
    courseTools: "Standalone skip modules",
    generalSettings: "General settings",
    copyButton: "Copy all questions to send AI models",
    skipAllButton: "Skip all courses step by step (recommended)",
    skipAllInstantButton: "Skip all courses instantly",
    skipAllBusy: "Skip all courses is already running.",
    skipAllStarting: "Scanning the course, then skipping every item that can be skipped…",
    skipAllRunning: (params) => `Skipped ${params.done} of ${params.total} items.`,
    skipAllDone: (params) => `Skip finished: ${params.completed} newly marked, ${params.already} already done. Reload the page to see the checkmarks.` + skipAllTails(params),
    skipAllPartial: (params) => `Skip finished: ${params.completed} newly marked, ${params.already} already done, ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skipAllTails(params),
    skipAllUnverified: (params) => `Skip finished: ${params.completed} newly marked, ${params.already} already done, ${params.unverified} could not be read back.` + skipAllTails(params),
    skipAllSkipped: (params) => ` ${params.skipped} locked item${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    skipAllAnswered: (params) => ` ${params.answered} discussion prompt${params.answered === 1 ? "" : "s"} already had your answer.`,
    skipAllNone: "No item that can be skipped was found in this course.",
    skipAllNotCourse: "Open a Coursera course page first.",
    skipAllNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    skipAllIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    skipAllStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    skipAllFailed: "The run failed. Check the browser console for the reason.",
    idle: "Open a Coursera lesson page to copy its questions.",
    reading: "Reading the page…",
    copied: (count) => `Copied ${count} question${count === 1 ? "" : "s"}!`,
    autoCopied: (count) => `Auto copied ${count} question${count === 1 ? "" : "s"}.`,
    blocked: "Clipboard blocked: click the page, then copy again.",
    noQuestions: "No questions are visible yet. Wait for the page to load, then copy again.",
    wrongPage: "Not a Coursera lesson page. Reload it after installing.",
    copyFailed: "Copy failed. Reload the page and try again.",
    accountFallbackName: "Coursera account",
    accountUnknown: "The signed-in Coursera account could not be read. Reload the page.",
    userInformation: "User information",
    noticeTitle: "Just installed or updated?",
    noticeHint: "Reload the Coursera page and this extension once so the panel can read your account and progress.",
    noticeClose: "Dismiss",
    staleTitle: "This tab still runs the old page script",
    staleHint: "The dashboard reads its values from the page, and this tab no longer answers. Reloading the tab brings them back. Anything typed into the page is lost when it reloads.",
    staleReload: "Reload this tab",
    staleWaiting: "Waiting for the tab…",
    lessonTypes: "Lesson types",
    overviewTitle: "Learning progress",
    learningLabel: "In progress",
    overviewCaption: (params) => `Average across ${params.count} course${params.count === 1 ? "" : "s"} in progress.`,
    courseProgressTitle: "Course progress",
    courseCaption: (params) => `${params.done} of ${params.total} items completed.`,
    synced: "Synced",
    syncing: "Syncing",
    notSynced: "Not synced",
    noData: "No data",
    collapse: "Collapse",
    expand: "Expand",
    completeVideosButton: "Skip lecture videos",
    videoStarting: "Looking for the lecture videos of this course…",
    videoRunning: (params) => `Completed ${params.done} of ${params.total} lecture videos.`,
    videoDone: (params) => `Completed ${params.completed} of ${params.total} lecture videos. Reload the page to see the checkmarks.` + skippedTail("videoSkipped", params) + alreadyTail("videoAlready", params),
    videoPartial: (params) => `Completed ${params.completed} of ${params.total} lecture videos. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("videoSkipped", params) + alreadyTail("videoAlready", params),
    videoSkipped: (params) => ` ${params.skipped} locked lecture${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    videoAlready: (params) => ` ${params.already} lecture${params.already === 1 ? " was" : "s were"} already done.`,
    videoBusy: "Lecture video skip is already running.",
    videoNone: "No lecture videos were found in this course.",
    videoNotCourse: "Open a Coursera course page first.",
    videoNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    videoIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    videoStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    videoFailed: "The run failed. Check the browser console for the reason.",
    completeReadingsButton: "Skip readings",
    readingStarting: "Looking for the readings of this course…",
    readingRunning: (params) => `Completed ${params.done} of ${params.total} readings.`,
    readingDone: (params) => `Completed ${params.completed} of ${params.total} readings. Reload the page to see the checkmarks.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingPartial: (params) => `Completed ${params.completed} of ${params.total} readings. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingUnverified: (params) => `${params.completed} of ${params.total} readings are confirmed, ${params.unverified} could not be read back.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingSkipped: (params) => ` ${params.skipped} locked reading${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    readingAlready: (params) => ` ${params.already} reading${params.already === 1 ? " was" : "s were"} already done.`,
    readingBusy: "Reading skip is already running.",
    readingNone: "No reading material was found in this course.",
    readingNotCourse: "Open a Coursera course page first.",
    readingNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    readingIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    readingStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    readingFailed: "The run failed. Check the browser console for the reason.",
    completeDiscussionsButton: "Skip discussions",
    discussionStarting: "Looking for the discussion prompts of this course…",
    discussionRunning: (params) => `Replied to ${params.done} of ${params.total} discussion prompts.`,
    discussionDone: (params) => `Replied to ${params.completed} of ${params.total} discussion prompts. Reload the page to see them.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionPartial: (params) => `Replied to ${params.completed} of ${params.total} discussion prompts. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionUnverified: (params) => `${params.completed} of ${params.total} replies are confirmed, ${params.unverified} could not be read back.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionSkipped: (params) => ` ${params.skipped} locked prompt${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    discussionAlready: (params) => ` ${params.already} prompt${params.already === 1 ? " was" : "s were"} already complete.`,
    discussionAnswered: (params) => ` ${params.answered} prompt${params.answered === 1 ? "" : "s"} already had your answer.`,
    discussionBusy: "Discussion skip is already running.",
    discussionNone: "No discussion prompt was found in this course.",
    discussionNotCourse: "Open a Coursera course page first.",
    discussionNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    discussionIdentity: "The page and Coursera name two different accounts, so nothing was posted. Reload the page.",
    discussionStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    discussionFailed: "The run failed. Check the browser console for the reason.",
    completePluginsButton: "Skip practice items",
    pluginStarting: "Looking for the practice items of this course…",
    pluginRunning: (params) => `Marked ${params.done} of ${params.total} practice items.`,
    pluginDone: (params) => `Marked ${params.completed} of ${params.total} practice items as done. Reload the page to see the checkmarks.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginPartial: (params) => `Marked ${params.completed} of ${params.total} practice items. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginUnverified: (params) => `${params.completed} of ${params.total} items are confirmed, ${params.unverified} could not be read back.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginSkipped: (params) => ` ${params.skipped} locked item${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    pluginAlready: (params) => ` ${params.already} item${params.already === 1 ? " was" : "s were"} already done.`,
    pluginBusy: "Practice item skip is already running.",
    pluginNone: "No ungraded practice item was found in this course.",
    pluginNotCourse: "Open a Coursera course page first.",
    pluginNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    pluginIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    pluginStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    pluginFailed: "The run failed. Check the browser console for the reason.",
    completeLabsButton: "Skip labs",
    labStarting: "Looking for the labs of this course…",
    labRunning: (params) => `Marked ${params.done} of ${params.total} labs.`,
    labDone: (params) => `Marked ${params.completed} of ${params.total} labs as done. Reload the page to see the checkmarks.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labPartial: (params) => `Marked ${params.completed} of ${params.total} labs. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labUnverified: (params) => `${params.completed} of ${params.total} labs are confirmed, ${params.unverified} could not be read back.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labSkipped: (params) => ` ${params.skipped} locked lab${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    labAlready: (params) => ` ${params.already} lab${params.already === 1 ? " was" : "s were"} already done.`,
    labBusy: "Lab skip is already running.",
    labNone: "No lab was found in this course.",
    labNotCourse: "Open a Coursera course page first.",
    labNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    labIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    labStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    labFailed: "The run failed. Check the browser console for the reason.",
    completeLtiButton: "Skip ungraded labs",
    ltiStarting: "Looking for the ungraded labs of this course…",
    ltiRunning: (params) => `Marked ${params.done} of ${params.total} ungraded labs.`,
    ltiDone: (params) => `Marked ${params.completed} of ${params.total} ungraded labs as done. Reload the page to see the checkmarks.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiPartial: (params) => `Marked ${params.completed} of ${params.total} ungraded labs. ${params.failed} still ${params.failed === 1 ? "needs" : "need"} attention.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiUnverified: (params) => `${params.completed} of ${params.total} ungraded labs are confirmed, ${params.unverified} could not be read back.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiSkipped: (params) => ` ${params.skipped} locked ungraded lab${params.skipped === 1 ? " was left alone." : "s were left alone."}`,
    ltiAlready: (params) => ` ${params.already} ungraded lab${params.already === 1 ? " was" : "s were"} already done.`,
    ltiBusy: "Ungraded lab skip is already running.",
    ltiNone: "No ungraded lab was found in this course.",
    ltiNotCourse: "Open a Coursera course page first.",
    ltiNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    ltiIdentity: "The page and Coursera name two different accounts, so nothing was marked. Reload the page.",
    ltiStopped: "The page changed while the run was going on, so the rest of the list was left alone.",
    ltiFailed: "The run failed. Check the browser console for the reason.",
    checkGradedButton: "Check graded apps",
    gradedStarting: "Looking for the graded apps of this course…",
    gradedDone: (params) => `Graded apps completed: ${params.completed} of ${params.total}. This extension never submits or changes graded work.`,
    gradedNone: "No graded app was found in this course.",
    gradedNotCourse: "Open a Coursera course page first.",
    gradedNotLoggedIn: "Coursera did not return a signed-in user. Log in and reload the page.",
    gradedIdentity: "The page and Coursera name two different accounts, so nothing was read. Reload the page.",
    gradedFailed: "The graded apps could not be read. Check the browser console.",
    creditMade: "Made with love by Litterium",
    creditStarLead: "Please",
    creditStarTail: "my repo if you find it useful",
    creditGreeting: "Study well!",
    themeNames: { system: "System", light: "Light", dark: "Dark" },
    languageNames: { en: "English", vi: "Tiếng Việt" }
  },
  vi: {
    docTitle: "Coursera Helper",
    title: "Coursera Helper",
    subtitle: "Giúp bạn hoàn thành khoá học nhanh gọn.",
    autoCopy: "Tự động sao chép",
    autoCopyHint: "Sao chép câu hỏi ngay khi mở trang bài tập.",
    autoReload: "Tự động tải lại sau khi bỏ qua",
    autoReloadHint: "Tải lại trang khi lượt bỏ qua kết thúc.",
    autoInfoUpdate: "Tự động cập nhật thông tin",
    autoInfoUpdateHint: "Làm mới Bảng tin khi bạn mở hoặc chuyển trang Coursera.",
    requestMode: "Chế độ bỏ qua cho các chức năng độc lập",
    requestModeHint: "Chỉ áp dụng cho các chức năng bỏ qua độc lập bên trên: từng bước chờ giữa các bài, ngay lập tức gửi liền; ưu tiên từng bước.",
    requestModeNames: { sequential: "Từng bước", instant: "Ngay lập tức" },
    language: "Ngôn ngữ",
    appearance: "Giao diện",
    quickActions: "Tác vụ nhanh",
    courseTools: "Các chức năng bỏ qua độc lập",
    generalSettings: "Cài đặt chung",
    copyButton: "Sao chép tất cả câu hỏi để gửi AI",
    skipAllButton: "Bỏ qua toàn bộ khoá học từng bước (khuyến nghị)",
    skipAllInstantButton: "Bỏ qua toàn bộ khoá học ngay lập tức",
    skipAllBusy: "Bỏ qua toàn bộ khoá học đang chạy.",
    skipAllStarting: "Đang quét khoá học rồi bỏ qua mọi bài có thể…",
    skipAllRunning: (params) => `Đã bỏ qua ${params.done}/${params.total} bài.`,
    skipAllDone: (params) => `Đã bỏ qua xong: ${params.completed} bài vừa đánh dấu, ${params.already} bài đã xong từ trước. Reload trang để thấy dấu tick.` + skipAllTails(params),
    skipAllPartial: (params) => `Đã bỏ qua xong: ${params.completed} bài vừa đánh dấu, ${params.already} bài đã xong từ trước, còn ${params.failed} bài chưa được.` + skipAllTails(params),
    skipAllUnverified: (params) => `Đã bỏ qua xong: ${params.completed} bài vừa đánh dấu, ${params.already} bài đã xong từ trước, còn ${params.unverified} bài đã ghi nhưng không đọc lại được.` + skipAllTails(params),
    skipAllSkipped: (params) => ` ${params.skipped} bài bị khoá được bỏ qua.`,
    skipAllAnswered: (params) => ` ${params.answered} thảo luận đã có câu trả lời của bạn.`,
    skipAllNone: "Không tìm thấy bài nào có thể bỏ qua trong khoá học này.",
    skipAllNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    skipAllNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    skipAllIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    skipAllStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    skipAllFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    idle: "Mở một trang bài tập Coursera để sao chép câu hỏi.",
    reading: "Đang đọc trang…",
    copied: (count) => `Đã sao chép ${count} câu hỏi!`,
    autoCopied: (count) => `Đã tự động sao chép ${count} câu hỏi.`,
    blocked: "Bảng nhớ tạm bị chặn: click vào trang rồi sao chép lại.",
    noQuestions: "Chưa thấy câu hỏi nào. Đợi trang tải xong rồi sao chép lại.",
    wrongPage: "Không phải trang bài tập Coursera. Hãy reload sau khi cài.",
    copyFailed: "Sao chép thất bại. Hãy reload trang rồi thử lại.",
    accountFallbackName: "Tài khoản Coursera",
    accountUnknown: "Không đọc được tài khoản Coursera đang đăng nhập. Hãy reload trang.",
    userInformation: "Thông tin người dùng",
    noticeTitle: "Mới cài hoặc vừa cập nhật?",
    noticeHint: "Hãy tải lại trang Coursera và tiện ích một lần để Bảng tin đọc được tài khoản và tiến độ.",
    noticeClose: "Đóng",
    staleTitle: "Tab này vẫn đang chạy script trang cũ",
    staleHint: "Bảng tin đọc số liệu từ chính trang, và tab này không còn trả lời. Tải lại tab sẽ lấy lại số liệu. Nội dung bạn đang gõ trong trang sẽ mất khi tải lại.",
    staleReload: "Tải lại tab này",
    staleWaiting: "Đang chờ tab…",
    lessonTypes: "Loại bài học",
    overviewTitle: "Tiến độ học tập",
    learningLabel: "Đang học",
    overviewCaption: (params) => `Trung bình trên ${params.count} khoá đang học.`,
    courseProgressTitle: "Tiến độ khoá học",
    courseCaption: (params) => `Đã hoàn thành ${params.done}/${params.total} mục.`,
    synced: "Đã đồng bộ",
    syncing: "Đang đồng bộ",
    notSynced: "Chưa đồng bộ",
    noData: "Không có dữ liệu",
    collapse: "Thu gọn",
    expand: "Mở rộng",
    completeVideosButton: "Bỏ qua video bài giảng",
    videoStarting: "Đang tìm video bài giảng của khoá học này…",
    videoRunning: (params) => `Đã hoàn thành ${params.done}/${params.total} video bài giảng.`,
    videoDone: (params) => `Đã hoàn thành ${params.completed}/${params.total} video bài giảng. Reload trang để thấy dấu tick.` + skippedTail("videoSkipped", params) + alreadyTail("videoAlready", params),
    videoPartial: (params) => `Đã hoàn thành ${params.completed}/${params.total} video bài giảng. ${params.failed} video chưa được.` + skippedTail("videoSkipped", params) + alreadyTail("videoAlready", params),
    videoSkipped: (params) => ` ${params.skipped} bài giảng bị khoá đã được bỏ qua.`,
    videoAlready: (params) => ` ${params.already} bài giảng đã xong từ trước.`,
    videoBusy: "Bỏ qua video bài giảng đang chạy.",
    videoNone: "Không tìm thấy video bài giảng nào trong khoá học này.",
    videoNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    videoNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    videoIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    videoStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    videoFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    completeReadingsButton: "Bỏ qua bài đọc",
    readingStarting: "Đang tìm bài đọc của khoá học này…",
    readingRunning: (params) => `Đã hoàn thành ${params.done}/${params.total} bài đọc.`,
    readingDone: (params) => `Đã hoàn thành ${params.completed}/${params.total} bài đọc. Reload trang để thấy dấu tick.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingPartial: (params) => `Đã hoàn thành ${params.completed}/${params.total} bài đọc. ${params.failed} bài chưa được.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingUnverified: (params) => `${params.completed}/${params.total} bài đọc đã xác minh, còn ${params.unverified} bài đã ghi nhưng không đọc lại được.` + skippedTail("readingSkipped", params) + alreadyTail("readingAlready", params),
    readingSkipped: (params) => ` ${params.skipped} bài đọc bị khoá đã được bỏ qua.`,
    readingAlready: (params) => ` ${params.already} bài đọc đã xong từ trước.`,
    readingBusy: "Bỏ qua bài đọc đang chạy.",
    readingNone: "Không tìm thấy bài đọc nào trong khoá học này.",
    readingNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    readingNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    readingIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    readingStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    readingFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    completeDiscussionsButton: "Bỏ qua thảo luận",
    discussionStarting: "Đang tìm thảo luận của khoá học này…",
    discussionRunning: (params) => `Đã trả lời ${params.done}/${params.total} thảo luận.`,
    discussionDone: (params) => `Đã trả lời ${params.completed}/${params.total} thảo luận. Reload trang để xem.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionPartial: (params) => `Đã trả lời ${params.completed}/${params.total} thảo luận. ${params.failed} thảo luận chưa được.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionUnverified: (params) => `${params.completed}/${params.total} câu trả lời đã xác minh, còn ${params.unverified} câu đã đăng nhưng không đọc lại được.` + skippedTail("discussionSkipped", params) + answeredTail("discussionAnswered", params) + alreadyTail("discussionAlready", params),
    discussionSkipped: (params) => ` ${params.skipped} thảo luận bị khoá đã được bỏ qua.`,
    discussionAlready: (params) => ` ${params.already} thảo luận đã hoàn thành từ trước.`,
    discussionAnswered: (params) => ` ${params.answered} thảo luận đã có câu trả lời của bạn.`,
    discussionBusy: "Bỏ qua thảo luận đang chạy.",
    discussionNone: "Không tìm thấy thảo luận nào trong khoá học này.",
    discussionNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    discussionNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    discussionIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đăng. Hãy reload trang.",
    discussionStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    discussionFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    completePluginsButton: "Bỏ qua bài thực hành",
    pluginStarting: "Đang tìm bài thực hành của khoá học này…",
    pluginRunning: (params) => `Đã đánh dấu ${params.done}/${params.total} bài thực hành.`,
    pluginDone: (params) => `Đã đánh dấu ${params.completed}/${params.total} bài thực hành là đã xong. Reload trang để thấy dấu tick.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginPartial: (params) => `Đã đánh dấu ${params.completed}/${params.total} bài thực hành. ${params.failed} bài chưa được.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginUnverified: (params) => `${params.completed}/${params.total} bài đã xác minh, còn ${params.unverified} bài đã ghi nhưng không đọc lại được.` + skippedTail("pluginSkipped", params) + alreadyTail("pluginAlready", params),
    pluginSkipped: (params) => ` ${params.skipped} bài bị khoá đã được bỏ qua.`,
    pluginAlready: (params) => ` ${params.already} bài đã được đánh dấu xong từ trước.`,
    pluginBusy: "Bỏ qua bài thực hành đang chạy.",
    pluginNone: "Không tìm thấy bài thực hành nào trong khoá học này.",
    pluginNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    pluginNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    pluginIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    pluginStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    pluginFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    completeLabsButton: "Bỏ qua lab",
    labStarting: "Đang tìm lab của khoá học này…",
    labRunning: (params) => `Đã đánh dấu ${params.done}/${params.total} lab.`,
    labDone: (params) => `Đã đánh dấu ${params.completed}/${params.total} lab là đã xong. Reload trang để thấy dấu tick.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labPartial: (params) => `Đã đánh dấu ${params.completed}/${params.total} lab. ${params.failed} bài chưa được.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labUnverified: (params) => `${params.completed}/${params.total} lab đã xác minh, còn ${params.unverified} bài đã ghi nhưng không đọc lại được.` + skippedTail("labSkipped", params) + alreadyTail("labAlready", params),
    labSkipped: (params) => ` ${params.skipped} lab bị khoá được bỏ qua.`,
    labAlready: (params) => ` ${params.already} lab đã được đánh dấu xong từ trước.`,
    labBusy: "Bỏ qua lab đang chạy.",
    labNone: "Không tìm thấy lab nào trong khoá học này.",
    labNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    labNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    labIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    labStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    labFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    completeLtiButton: "Bỏ qua lab chưa cho điểm",
    ltiStarting: "Đang tìm lab chưa cho điểm của khoá học này…",
    ltiRunning: (params) => `Đã đánh dấu ${params.done}/${params.total} lab chưa cho điểm.`,
    ltiDone: (params) => `Đã đánh dấu ${params.completed}/${params.total} lab chưa cho điểm là đã xong. Reload trang để thấy dấu tick.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiPartial: (params) => `Đã đánh dấu ${params.completed}/${params.total} lab chưa cho điểm. ${params.failed} bài chưa được.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiUnverified: (params) => `${params.completed}/${params.total} lab chưa cho điểm đã xác minh, còn ${params.unverified} bài đã ghi nhưng không đọc lại được.` + skippedTail("ltiSkipped", params) + alreadyTail("ltiAlready", params),
    ltiSkipped: (params) => ` ${params.skipped} lab chưa cho điểm bị khoá được bỏ qua.`,
    ltiAlready: (params) => ` ${params.already} lab chưa cho điểm đã được đánh dấu xong từ trước.`,
    ltiBusy: "Bỏ qua lab chưa cho điểm đang chạy.",
    ltiNone: "Không tìm thấy lab chưa cho điểm nào trong khoá học này.",
    ltiNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    ltiNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    ltiIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đánh dấu. Hãy reload trang.",
    ltiStopped: "Trang đã thay đổi khi đang chạy, nên phần còn lại được giữ nguyên.",
    ltiFailed: "Lần chạy thất bại. Xem console của trình duyệt để biết lý do.",
    checkGradedButton: "Bỏ qua bài chấm điểm",
    gradedStarting: "Đang tìm app chấm điểm của khoá học này…",
    gradedDone: (params) => `App chấm điểm đã hoàn thành: ${params.completed}/${params.total}. Extension này không nộp hay sửa bài chấm điểm.`,
    gradedNone: "Không tìm thấy app chấm điểm nào trong khoá học này.",
    gradedNotCourse: "Hãy mở một trang khoá học Coursera trước.",
    gradedNotLoggedIn: "Coursera không trả về tài khoản đã đăng nhập. Hãy đăng nhập rồi reload trang.",
    gradedIdentity: "Trang và Coursera chỉ hai tài khoản khác nhau, nên không có gì được đọc. Hãy reload trang.",
    gradedFailed: "Không đọc được các app chấm điểm. Xem console trình duyệt.",
    creditMade: "Được làm với tình yêu bởi Litterium",
    creditStarLead: "Hãy",
    creditStarTail: "repo nếu bạn thấy hữu ích nhé",
    creditGreeting: "Chúc bạn học tập tốt!",
    themeNames: { system: "Hệ thống", light: "Sáng", dark: "Tối" },
    languageNames: { en: "English", vi: "Tiếng Việt" }
  }
};

const FLAG_SVGS = {
  en: '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0 30 20M30 0 0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 30 20M30 0 0 20" stroke="#C8102E" stroke-width="2"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="4"/></svg>',
  vi: '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#DA251D"/><polygon points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15" fill="#ffff00"/></svg>'
};

const GLYPH_SVGS = {
  system: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  light: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9 6.3 6.3M17.7 17.7l1.4 1.4M19.1 4.9 17.7 6.3M6.3 17.7 4.9 19.1"/></svg>',
  dark: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  sequential: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/><path d="M9 6h12M9 12h12M9 18h12"/></svg>',
  instant: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>',
  off: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>',
  on: '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3.2-6.9"/><path d="M21 3v6h-6"/></svg>'
};

const elements = {
  reloadNotice: document.getElementById("reloadNotice"),
  noticeClose: document.getElementById("noticeClose"),
  staleNotice: document.getElementById("staleNotice"),
  staleReload: document.getElementById("staleReload"),
  accountCard: document.getElementById("accountCard"),
  accountZoom: document.getElementById("accountZoom"),
  accountBody: document.getElementById("accountBody"),
  accountSync: document.getElementById("accountSync"),
  accountPhoto: document.getElementById("accountPhoto"),
  accountFallback: document.getElementById("accountFallback"),
  accountName: document.getElementById("accountName"),
  accountEmail: document.getElementById("accountEmail"),
  accountMessage: document.getElementById("accountMessage"),
  learningCard: document.getElementById("learningCard"),
  learningZoom: document.getElementById("learningZoom"),
  learningBody: document.getElementById("learningBody"),
  learningSync: document.getElementById("learningSync"),
  learningName: document.getElementById("learningName"),
  learningPercent: document.getElementById("learningPercent"),
  learningBar: document.getElementById("learningBar"),
  learningFill: document.getElementById("learningFill"),
  learningCaption: document.getElementById("learningCaption"),
  courseCard: document.getElementById("courseCard"),
  courseZoom: document.getElementById("courseZoom"),
  courseBody: document.getElementById("courseBody"),
  courseSync: document.getElementById("courseSync"),
  courseName: document.getElementById("courseName"),
  coursePercent: document.getElementById("coursePercent"),
  courseBar: document.getElementById("courseBar"),
  courseFill: document.getElementById("courseFill"),
  courseCaption: document.getElementById("courseCaption"),
  typesToggle: document.getElementById("typesToggle"),
  overviewTypes: document.getElementById("overviewTypes"),
  autoCopy: document.getElementById("autoCopy"),
  autoReload: document.getElementById("autoReload"),
  autoInfoUpdate: document.getElementById("autoInfoUpdate"),
  languagePicker: document.getElementById("languagePicker"),
  themePicker: document.getElementById("themePicker"),
  requestModePicker: document.getElementById("requestModePicker"),
  quickActionsZoom: document.getElementById("quickActionsZoom"),
  quickActionsBody: document.getElementById("quickActionsBody"),
  skipModulesZoom: document.getElementById("skipModulesZoom"),
  skipModules: document.getElementById("skipModules"),
  settingsZoom: document.getElementById("settingsZoom"),
  settingsBody: document.getElementById("settingsBody"),
  copyNow: document.getElementById("copyNow"),
  skipEverything: document.getElementById("skipEverything"),
  skipEverythingInstant: document.getElementById("skipEverythingInstant"),
  completeVideos: document.getElementById("completeVideos"),
  completeReadings: document.getElementById("completeReadings"),
  completeDiscussions: document.getElementById("completeDiscussions"),
  completePlugins: document.getElementById("completePlugins"),
  completeLabs: document.getElementById("completeLabs"),
  completeLti: document.getElementById("completeLti"),
  checkGraded: document.getElementById("checkGraded"),
  badge: document.getElementById("badge"),
  status: document.getElementById("status")
};

const accountGlyph = elements.accountFallback.firstElementChild;

const CARD_VIEWS = [
  { key: "account", zoom: "accountZoom", body: "accountBody", sync: "accountSync" },
  { key: "learning", zoom: "learningZoom", body: "learningBody", sync: "learningSync" },
  { key: "course", zoom: "courseZoom", body: "courseBody", sync: "courseSync" }
];

const SECTION_VIEWS = [
  { key: "quickActions", zoom: "quickActionsZoom", body: "quickActionsBody" },
  { key: "skipModules", zoom: "skipModulesZoom", body: "skipModules" },
  { key: "settings", zoom: "settingsZoom", body: "settingsBody" }
];

const SYNC_LABELS = { none: "noData", stale: "notSynced", syncing: "syncing", synced: "synced" };

let settings = {
  autoCopy: false,
  language: "en",
  theme: "system",
  requestMode: "sequential",
  autoReload: false,
  autoInfoUpdate: true,
  noticeHidden: false,
  collapsedCards: { account: false, learning: false, course: false },
  collapsedSections: { quickActions: false, skipModules: false, settings: false, lessonTypes: false }
};
let lastStatus = { key: "idle", params: 0, kind: "default" };
let accountView = { state: "none", kind: "idle", account: null };
let learningView = { state: "none", percent: 0, count: 0 };
let courseView = { state: "none", percent: 0, done: 0, total: 0, name: "", types: [] };
let lastAccount = null;
let lastLearning = null;
let lastCourse = null;
// the tab the panel is reading and whether that page has finished loading
let activeTabId = 0;
let activeTabReady = false;
// the tab whose Coursera page the panel did read, in numbers only. Chrome wipes the panel when
// the extension reloads and leaves the page script of an open tab behind, so this one number is
// what tells an orphaned script apart from a tab that was never a Coursera page. It lives in
// session storage: no page value, no URL, and it is gone when the browser closes
let readTabId = 0;
const READ_TAB_AGE = 6 * 60 * 60 * 1000;
// the tab this notice is about, and the reload the panel asked for on it
let orphanTabId = 0;
let orphanWaiting = false;
let orphanTimer = 0;
const COURSE_TYPE_LIMIT = 60;
let videoPolling = false;
let readingPolling = false;
let discussionPolling = false;
let pluginPolling = false;
let labPolling = false;
let ltiPolling = false;
let skipAllPolling = false;
let reloadPending = false;
let reloadWanted = false;
let reloadTimer = 0;
let reloadTabId = 0;
const segments = [];

// string table for the current language
function strings() {
  return STRINGS[settings.language] || STRINGS.en;
}

// the extra sentence about items the course keeps locked, read from the current table so
// it changes language together with the rest of the status
function skippedTail(key, params) {
  return params.skipped ? strings()[key](params) : "";
}

// the extra sentence about prompts this account already answered
function answeredTail(key, params) {
  return params.answered ? strings()[key](params) : "";
}

// the extra sentence about practice items Coursera already reports as done
function alreadyTail(key, params) {
  return params.already ? strings()[key](params) : "";
}

// the extra sentences of the skip-all status: locked items and prompts this account
// already answered
function skipAllTails(params) {
  return skippedTail("skipAllSkipped", params) + answeredTail("skipAllAnswered", params);
}

// every run of this panel owns the page while it polls: a second start would put two write
// queues on the same course
function runBusy() {
  return videoPolling || readingPolling || discussionPolling || pluginPolling
    || labPolling || ltiPolling || skipAllPolling;
}

// disable every button that starts a write until the run that owns the panel ends
function lockRunButtons() {
  setSkipActionsDisabled(true);
  elements.skipEverything.disabled = true;
  elements.skipEverythingInstant.disabled = true;
}

// hand the buttons back only when no run and no pending reload still owns the panel
function unlockRunButtons() {
  if (runBusy() || reloadPending) return;
  setSkipActionsDisabled(false);
  elements.skipEverything.disabled = false;
  elements.skipEverythingInstant.disabled = false;
}

// build a segmented control where each choosable value is one rounded button
function buildSegmented(container, getOptions, getValue, onPick) {
  container.setAttribute("role", "radiogroup");

  // redraw every segment, optionally in a new language
  function refresh() {
    container.replaceChildren();
    getOptions().forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "segment";
      button.setAttribute("role", "radio");
      button.dataset.value = option.value;
      button.setAttribute("aria-checked", String(option.value === getValue()));
      button.innerHTML = `${option.icon}<span class="segment-label"></span>`;
      button.querySelector(".segment-label").textContent = option.label;
      button.addEventListener("click", () => onPick(option.value));
      container.append(button);
    });
  }

  // arrow keys walk the group like a native radio group
  container.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const items = Array.from(container.children);
    if (items.length < 2) return;
    event.preventDefault();
    const index = items.indexOf(document.activeElement);
    const step = event.key === "ArrowRight" ? 1 : -1;
    const target = items[(index + step + items.length) % items.length] || items[0];
    target.focus();
    target.click();
  });

  const segment = { refresh };
  segments.push(segment);
  refresh();
  return segment;
}

// redraw every segmented control, used when the language changes
function refreshSegments() {
  segments.forEach((segment) => segment.refresh());
}

// options for the language control
function languageOptions() {
  const text = strings();
  return Object.keys(STRINGS).map((value) => ({
    value,
    label: text.languageNames[value],
    icon: FLAG_SVGS[value]
  }));
}

// options for the theme control
function themeOptions() {
  const text = strings();
  return ["system", "light", "dark"].map((value) => ({
    value,
    label: text.themeNames[value],
    icon: GLYPH_SVGS[value]
  }));
}

// options for the skip mode control, the setting every skip step follows
function requestModeOptions() {
  const text = strings();
  return ["sequential", "instant"].map((value) => ({
    value,
    label: text.requestModeNames[value],
    icon: GLYPH_SVGS[value]
  }));
}

const RELOAD_CODES = ["done", "partial", "unverified"];

// keep the tab a run belongs to, so the reload lands on the page that was skipped
function rememberRunTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      reloadTabId = tab && tab.id ? tab.id : 0;
      resolve();
    });
  });
}

// ask for one reload after a run ends. The reload itself waits until every other run of the
// panel has stopped, so a navigation never cuts a write queue in half
function reloadAfterRun(state) {
  if (!settings.autoReload || reloadPending) return;
  if (!state || state.phase === "running") return;
  if (!RELOAD_CODES.includes(state.code)) return;
  if (!reloadTabId) return;
  reloadWanted = true;
  scheduleReload();
}

// reload the run tab once, as soon as no run is polling and no reload is already waiting
function scheduleReload() {
  if (!reloadWanted || reloadPending) return;
  if (runBusy()) {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(scheduleReload, 500);
    return;
  }
  const tabId = reloadTabId;
  if (!tabId) {
    reloadWanted = false;
    return;
  }
  reloadPending = true;
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError || !tab) {
      reloadPending = false;
      reloadWanted = false;
      unlockRunButtons();
      return;
    }
    const finish = (url) => {
      if (!/^https:\/\/([a-z0-9-]+\.)*coursera\.org\//i.test(url || "")) {
        reloadPending = false;
        reloadWanted = false;
        unlockRunButtons();
        return;
      }
      reloadWanted = false;
      chrome.tabs.reload(tabId);
      setTimeout(() => {
        reloadPending = false;
        unlockRunButtons();
      }, 4000);
    };
    // the side panel cannot read tab.url on every build, so a page that answers its own
    // ping tells the panel where it is instead of adding a broad host permission
    if (tab.url) {
      finish(tab.url);
      return;
    }
    chrome.tabs.sendMessage(tabId, { action: "ping" }, (response) => {
      if (chrome.runtime.lastError || !response || !response.ok) {
        reloadPending = false;
        reloadWanted = false;
        unlockRunButtons();
        return;
      }
      finish(String(response.url || ""));
    });
  });
}

// store the status as a key so it can be re-translated when the language changes
function setStatus(key, params = 0, kind = "default") {
  lastStatus = { key, params, kind };
  renderStatus();
}

// print the status in the current language
function renderStatus() {
  const text = strings();
  const value = text[lastStatus.key] || lastStatus.key;
  elements.status.textContent = typeof value === "function" ? value(lastStatus.params) : value;
  elements.status.className = `status ${lastStatus.kind}`;
}

// apply the theme, follow system listens to matchMedia
function applyTheme() {
  const dark = settings.theme === "dark"
    || (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const sent = chrome.runtime && typeof chrome.runtime.sendMessage === "function"
    ? chrome.runtime.sendMessage({ action: "iconTheme", dark })
    : null;
  if (sent && typeof sent.catch === "function") sent.catch(() => {});
}

// translate the whole popup into the chosen language
function applyLanguage() {
  const text = strings();
  document.documentElement.lang = settings.language;
  document.title = text.docTitle;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = text[node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });
  elements.autoCopy.setAttribute("aria-label", text.autoCopy);
  elements.autoReload.setAttribute("aria-label", text.autoReload);
  elements.autoInfoUpdate.setAttribute("aria-label", text.autoInfoUpdate);
  elements.noticeClose.setAttribute("aria-label", text.noticeClose);
  refreshSegments();
  renderStatus();
  renderAccount();
  renderLearning();
  renderCourse();
  renderCollapse();
  renderStaleNotice();
}

// save the settings
async function saveSettings() {
  await chrome.storage.local.set(settings);
}

// read the settings and build the three segmented controls when the panel opens
async function initialize() {
  // a storage read that fails leaves every setting at its default instead of leaving the
  // whole panel unbuilt
  let stored = {};
  try {
    stored = await chrome.storage.local.get([
      "autoCopy", "language", "theme", "requestMode", "autoReload", "autoInfoUpdate",
      "collapsedCards", "collapsedSections", "noticeHidden"
    ]) || {};
  } catch {}
  const collapsed = stored.collapsedCards && typeof stored.collapsedCards === "object"
    ? stored.collapsedCards : {};
  const sections = stored.collapsedSections && typeof stored.collapsedSections === "object"
    ? stored.collapsedSections : {};
  settings = {
    autoCopy: stored.autoCopy === true,
    // a stored key the table inherited instead of defining ("__proto__") is not a language
    language: Object.hasOwn(STRINGS, stored.language) ? stored.language : "en",
    theme: ["system", "light", "dark"].includes(stored.theme) ? stored.theme : "system",
    requestMode: stored.requestMode === "instant" ? "instant" : "sequential",
    autoReload: stored.autoReload === true || stored.autoReload === "on",
    autoInfoUpdate: stored.autoInfoUpdate !== false,
    noticeHidden: stored.noticeHidden === true,
    collapsedCards: {
      account: collapsed.account === true,
      learning: collapsed.learning === true,
      course: collapsed.course === true
    },
    collapsedSections: {
      quickActions: sections.quickActions === true,
      skipModules: sections.skipModules === true,
      settings: sections.settings === true,
      lessonTypes: sections.lessonTypes === true
    }
  };
  elements.autoCopy.checked = settings.autoCopy;
  elements.autoReload.checked = settings.autoReload;
  elements.autoInfoUpdate.checked = settings.autoInfoUpdate;
  elements.reloadNotice.hidden = settings.noticeHidden;
  elements.badge.textContent = "v" + chrome.runtime.getManifest().version;

  buildSegmented(elements.requestModePicker, requestModeOptions,
    () => settings.requestMode,
    async (value) => {
      settings.requestMode = value;
      await saveSettings();
      refreshSegments();
    });

  buildSegmented(elements.languagePicker, languageOptions,
    () => settings.language,
    async (value) => {
      settings.language = value;
      await saveSettings();
      applyLanguage();
    });

  buildSegmented(elements.themePicker, themeOptions,
    () => settings.theme,
    async (value) => {
      settings.theme = value;
      await saveSettings();
      applyTheme();
      refreshSegments();
    });

  applyTheme();
  applyLanguage();
  readTabId = await loadRememberedTab();
  refreshDashboard();
  resumeActiveRun();
}

// send a message to one tab and answer with what the content script reports
function sendToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(response);
    });
  });
}

// send a message to the content script of the active tab
function sendToActiveTab(message) {
  return new Promise((resolve, reject) => {
    activeTabId = 0;
    activeTabReady = false;
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab || !tab.id) {
        reject(new Error("No active tab."));
        return;
      }
      activeTabId = tab.id;
      activeTabReady = tab.status === "complete";
      sendToTab(tab.id, message).then(resolve, reject);
    });
  });
}

// send a message to the tab the open run belongs to, so a tab switch does not leave the
// panel watching a page that never answers
function sendToRunTab(message) {
  const tabId = reloadTabId;
  if (!tabId) return sendToActiveTab(message);
  return sendToTab(tabId, message);
}

// the content script keeps its run going while the panel is closed, so a panel that opens
// in the middle of one picks the run up again instead of leaving it unwatched
async function resumeActiveRun() {
  const probes = [
    { action: "skipAllStatus", show: showSkipAllState, follow: followSkipAllRun },
    { action: "videoStatus", show: showVideoState, follow: followVideoRun },
    { action: "readingStatus", show: showReadingState, follow: followReadingRun },
    { action: "discussionStatus", show: showDiscussionState, follow: followDiscussionRun },
    { action: "pluginStatus", show: showPluginState, follow: followPluginRun },
    { action: "labStatus", show: showLabState, follow: followLabRun },
    { action: "ltiStatus", show: showLtiState, follow: followLtiRun }
  ];
  for (const probe of probes) {
    if (runBusy()) return;
    const state = await sendToActiveTab({ action: probe.action }).catch(() => null);
    if (!state || state.phase !== "running") continue;
    await rememberRunTab();
    probe.show(state);
    probe.follow();
    return;
  }
}

// the two letters the avatar falls back to when Coursera has no photo for this account
function accountInitials(value) {
  const words = String(value || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const first = Array.from(words[0])[0] || "";
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] || "" : "";
  return (first + last).toUpperCase();
}

// the initials, or the person glyph when there are none
function showAccountFallback(initials) {
  elements.accountFallback.textContent = initials;
  if (!initials && accountGlyph) elements.accountFallback.append(accountGlyph);
}

// the badge every dashboard widget carries: red when this panel never read a value, yellow
// when it shows the last value it read, green while it is connecting and when it just did
function renderSync(node, state) {
  const text = strings();
  const key = SYNC_LABELS[state] || SYNC_LABELS.none;
  node.textContent = text[key];
  node.dataset.state = SYNC_LABELS[state] ? state : "none";
}

// draw the account card. The page values are written as text and the photo only as an https
// source, so a page that lies about its own account gains nothing here
function renderAccount() {
  const text = strings();
  elements.accountPhoto.hidden = true;
  elements.accountPhoto.removeAttribute("src");
  elements.accountEmail.hidden = true;
  elements.accountEmail.textContent = "";
  elements.accountEmail.title = "";
  elements.accountMessage.hidden = true;
  elements.accountMessage.textContent = "";
  elements.accountName.classList.remove("missing");

  if (accountView.kind === "account") {
    const account = accountView.account;
    elements.accountName.textContent = account.name || text.accountFallbackName;
    if (account.email) {
      elements.accountEmail.textContent = account.email;
      elements.accountEmail.title = account.email;
      elements.accountEmail.hidden = false;
    }
    showAccountFallback(accountInitials(account.name || account.email));
    if (account.photo) {
      elements.accountPhoto.onload = () => { elements.accountPhoto.hidden = false; };
      elements.accountPhoto.onerror = () => { elements.accountPhoto.hidden = true; };
      elements.accountPhoto.src = account.photo;
    }
  } else {
    elements.accountName.textContent = text.accountFallbackName;
    showAccountFallback("");
    const message = accountView.kind === "unknown" ? text.accountUnknown : "";
    elements.accountMessage.textContent = message;
    elements.accountMessage.hidden = !message;
  }
  renderSync(elements.accountSync, accountView.state);
}

// the last account this panel read stays on screen when the current page cannot answer it
function staleAccount(reason) {
  if (lastAccount) return { kind: "account", account: lastAccount, state: "stale" };
  return { kind: reason, account: null, state: "none" };
}

// ask the page for the account it is signed in as. Nothing is stored: the answer lives only in
// this panel, and a tab without the content script only gets a hint to open a Coursera page
async function loadAccount() {
  accountView = { ...accountView, state: "syncing" };
  renderAccount();
  try {
    const answer = await sendToActiveTab({ action: "accountInfo" });
    noteReadAnswer();
    const name = answer && typeof answer.name === "string" ? answer.name.slice(0, 80) : "";
    const email = answer && typeof answer.email === "string" ? answer.email.slice(0, 120) : "";
    const photo = answer && /^https:\/\//i.test(String(answer.photo || "")) ? String(answer.photo).slice(0, 500) : "";
    if (name || email || photo) {
      lastAccount = { name, email, photo };
      accountView = { kind: "account", account: lastAccount, state: "synced" };
    } else {
      accountView = staleAccount("unknown");
    }
  } catch {
    accountView = staleAccount("offpage");
    noteOrphanRead();
  }
  renderAccount();
}

// draw the learning card. It stays on screen even when the page carries no list of courses in
// progress: the bar is empty and the percentage reads N/A instead of a made-up number
function renderLearning() {
  const text = strings();
  const shown = learningView.count > 0;
  elements.learningName.hidden = !shown;
  elements.learningPercent.textContent = shown ? `${learningView.percent}%` : "N/A";
  elements.learningPercent.classList.toggle("na", !shown);
  elements.learningFill.style.width = shown ? `${learningView.percent}%` : "0";
  elements.learningBar.setAttribute("aria-valuenow", String(shown ? learningView.percent : 0));
  elements.learningBar.setAttribute("aria-label", text.overviewTitle);
  elements.learningCaption.textContent = shown
    ? text.overviewCaption({ count: learningView.count })
    : "";
  renderSync(elements.learningSync, learningView.state);
}

// the course card keeps the same shape: N/A and an empty bar on a page that is not a course
function renderCourse() {
  const text = strings();
  const shown = courseView.total > 0;
  const typesCollapsed = settings.collapsedSections.lessonTypes === true;
  elements.coursePercent.textContent = shown ? `${courseView.percent}%` : "N/A";
  elements.coursePercent.classList.toggle("na", !shown);
  elements.courseFill.style.width = shown ? `${courseView.percent}%` : "0";
  elements.courseBar.setAttribute("aria-valuenow", String(shown ? courseView.percent : 0));
  elements.courseBar.setAttribute("aria-label", text.courseProgressTitle);
  elements.courseName.hidden = !shown || !courseView.name;
  elements.courseName.textContent = shown ? courseView.name : "";
  elements.courseName.title = shown ? courseView.name : "";
  const types = shown ? courseView.types : [];
  elements.typesToggle.hidden = types.length === 0;
  elements.typesToggle.setAttribute("aria-expanded", String(!typesCollapsed));
  elements.overviewTypes.hidden = types.length === 0 || typesCollapsed;
  elements.overviewTypes.replaceChildren();
  if (shown) {
    elements.courseCaption.textContent = text.courseCaption({ done: courseView.done, total: courseView.total });
    types.forEach((type) => {
      const chip = document.createElement("span");
      chip.className = "type-chip";
      chip.style.setProperty("--type-hue", String(typeHue(type.done, type.count)));
      chip.textContent = `${type.label} ${type.done}/${type.count}`;
      elements.overviewTypes.append(chip);
    });
  } else {
    elements.courseCaption.textContent = "";
  }
  renderSync(elements.courseSync, courseView.state);
}

// a lesson type turns red at none done, green at all done and blends between the two on the way
function typeHue(done, count) {
  const ratio = count > 0 ? Math.min(1, Math.max(0, done / count)) : 0;
  return Math.round(ratio * 120);
}

// fold one card or section to its heading, with the zoom button showing the way back
function collapseNode(view, collapsed, text) {
  const zoom = elements[view.zoom];
  elements[view.body].hidden = collapsed;
  zoom.dataset.collapsed = String(collapsed);
  zoom.setAttribute("aria-expanded", String(!collapsed));
  const title = zoom.parentElement.querySelector(".dash-title, .eyebrow").textContent;
  zoom.setAttribute("aria-label", `${collapsed ? text.expand : text.collapse} ${title}`);
}

// collapse or expand a dashboard widget. A collapsed widget keeps only the zoom button and
// its name
function renderCardCollapse() {
  const text = strings();
  CARD_VIEWS.forEach((view) => {
    const collapsed = settings.collapsedCards[view.key] === true;
    elements[view.sync].hidden = collapsed;
    collapseNode(view, collapsed, text);
  });
}

// collapse or expand quick actions, the standalone skip modules and general settings
function renderSectionCollapse() {
  const text = strings();
  SECTION_VIEWS.forEach((view) => {
    collapseNode(view, settings.collapsedSections[view.key] === true, text);
  });
}

function renderCollapse() {
  renderCardCollapse();
  renderSectionCollapse();
}

// read one overview answer into the two card shapes. A course answer is kept only when it
// carries a total and at least one type row; labels are page text, so they are cut down and
// written as text, never parsed
function readOverviewAnswer(answer) {
  const learning = { ok: false, percent: 0, count: 0 };
  const course = { ok: false, percent: 0, done: 0, total: 0, name: "", types: [] };
  if (!answer || typeof answer !== "object") return { learning, course };
  const percent = Number.isFinite(answer.percent)
    ? Math.max(0, Math.min(100, Math.round(answer.percent)))
    : 0;
  if (answer.kind === "course") {
    const total = Number.isFinite(answer.total)
      ? Math.max(0, Math.min(10000, Math.round(answer.total)))
      : 0;
    const done = Number.isFinite(answer.done)
      ? Math.max(0, Math.min(total, Math.round(answer.done)))
      : 0;
    const name = typeof answer.name === "string" ? answer.name.slice(0, 120) : "";
    const types = [];
    if (Array.isArray(answer.types)) {
      answer.types.slice(0, COURSE_TYPE_LIMIT).forEach((type) => {
        if (!type || typeof type.label !== "string") return;
        const label = type.label
          .replace(/[\u0000-\u001F\u007F]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 40);
        if (!label || !Number.isFinite(type.count) || type.count <= 0) return;
        const count = Math.min(10000, Math.round(type.count));
        const done = Number.isFinite(type.done)
          ? Math.max(0, Math.min(count, Math.round(type.done)))
          : 0;
        types.push({ label, count, done });
      });
    }
    if (total > 0) {
      course.ok = true;
      course.percent = percent;
      course.done = done;
      course.total = total;
      course.name = name;
      course.types = types;
    }
    return { learning, course };
  }
  const count = Number.isFinite(answer.count)
    ? Math.max(0, Math.min(500, Math.round(answer.count)))
    : 0;
  if (answer.kind === "ok" && count > 0) {
    learning.ok = true;
    learning.percent = percent;
    learning.count = count;
  }
  return { learning, course };
}

// the last progress values this panel read stay on screen, marked stale, when the current
// page cannot answer
function staleLearning() {
  if (lastLearning) return { ...lastLearning, state: "stale" };
  return { state: "none", percent: 0, count: 0 };
}

function staleCourse() {
  if (lastCourse) return { ...lastCourse, state: "stale" };
  return { state: "none", percent: 0, done: 0, total: 0, name: "", types: [] };
}

// ask the page for the progress lists. A page without them, or a tab without the content
// script, keeps the last read values on screen with a stale pill instead of a made-up number
async function loadOverview() {
  learningView = { ...learningView, state: "syncing" };
  courseView = { ...courseView, state: "syncing" };
  renderLearning();
  renderCourse();
  try {
    const answer = await sendToActiveTab({ action: "overviewInfo" });
    noteReadAnswer();
    const views = readOverviewAnswer(answer);
    if (views.learning.ok) {
      lastLearning = { percent: views.learning.percent, count: views.learning.count };
      learningView = { ...lastLearning, state: "synced" };
    } else {
      learningView = staleLearning();
    }
    if (views.course.ok) {
      lastCourse = {
        percent: views.course.percent,
        done: views.course.done,
        total: views.course.total,
        name: views.course.name,
        types: views.course.types
      };
      courseView = { ...lastCourse, state: "synced" };
    } else {
      courseView = staleCourse();
    }
  } catch {
    learningView = staleLearning();
    courseView = staleCourse();
    noteOrphanRead();
  }
  renderLearning();
  renderCourse();
}

// a skip run owns the page while it polls, and the dashboard waits for it
function dashboardBusy() {
  return videoPolling || readingPolling || discussionPolling || pluginPolling
    || labPolling || ltiPolling || skipAllPolling || reloadPending;
}

let infoRefreshTimer = 0;

// re-read the dashboard after a tab switch or navigation. A Coursera page that still answers
// with nothing gets one more read, which is what a dashboard that is late or out of date looks
// like while the page finishes its own start-up
async function refreshDashboard() {
  clearTimeout(infoRefreshTimer);
  infoRefreshTimer = 0;
  if (dashboardBusy()) return;
  await Promise.all([loadAccount(), loadOverview()]);
  if (learningView.state === "synced" || courseView.state === "synced") return;
  infoRefreshTimer = setTimeout(() => {
    infoRefreshTimer = 0;
    if (dashboardBusy()) return;
    if (learningView.state === "synced" || courseView.state === "synced") return;
    loadAccount();
    loadOverview();
  }, 1500);
}

// debounce a refresh so a tab that is still loading is read once, at the end
function scheduleInfoRefresh() {
  if (!settings.autoInfoUpdate) return;
  clearTimeout(infoRefreshTimer);
  infoRefreshTimer = setTimeout(refreshDashboard, 500);
}

chrome.tabs.onActivated.addListener(() => scheduleInfoRefresh());
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab || !tab.active) return;
  if (changeInfo.status === "complete" || typeof changeInfo.url === "string") scheduleInfoRefresh();
});

// The panel and the page are only in step while both come from the same load of this extension.
// Chrome closes the panel when the extension reloads but leaves the page script of a tab that is
// already open running, and that left-behind script answers nothing, so the dashboard has no way
// back until the tab itself reloads. A side panel without the tabs permission sees no tab URL, so
// the one number that separates that tab from a tab which was never a Coursera page is the tab
// this panel did read before, kept in session storage and dropped when the browser closes
function rememberReadTab(tabId) {
  if (!tabId || tabId === readTabId) return;
  readTabId = tabId;
  try {
    chrome.storage.session.set({ readTab: { id: tabId, at: Date.now() } }).catch(() => {});
  } catch {}
}

async function loadRememberedTab() {
  let stored = {};
  try {
    stored = await chrome.storage.session.get("readTab") || {};
  } catch {
    return 0;
  }
  const record = stored.readTab;
  if (!record || !Number.isInteger(record.id) || !Number.isFinite(record.at)) return 0;
  return Date.now() - record.at > READ_TAB_AGE ? 0 : record.id;
}

// a tab that answers is a tab running the current script, so the notice has nothing left to say
function noteReadAnswer() {
  rememberReadTab(activeTabId);
  if (orphanTabId) clearOrphanRead();
}

// a tab that used to answer and now answers nothing is the orphan a reload leaves behind. The
// panel says so and offers one button; it never reloads a page on its own
function noteOrphanRead() {
  if (!activeTabId || !activeTabReady || orphanWaiting) return;
  if (activeTabId !== readTabId) return;
  orphanTabId = activeTabId;
  renderStaleNotice();
}

function clearOrphanRead() {
  clearTimeout(orphanTimer);
  orphanTimer = 0;
  orphanTabId = 0;
  orphanWaiting = false;
  renderStaleNotice();
}

function renderStaleNotice() {
  const text = strings();
  elements.staleNotice.hidden = orphanTabId === 0;
  elements.staleReload.textContent = orphanWaiting ? text.staleWaiting : text.staleReload;
  elements.staleReload.disabled = orphanWaiting;
}

elements.staleReload.addEventListener("click", () => {
  const tabId = orphanTabId;
  if (!tabId || orphanWaiting) return;
  orphanWaiting = true;
  renderStaleNotice();
  chrome.tabs.reload(tabId).then(() => {
    // a tab that never finishes loading is not a tab this panel keeps waiting on
    orphanTimer = setTimeout(() => {
      if (!orphanWaiting) return;
      orphanWaiting = false;
      refreshDashboard();
    }, 8000);
  }, () => clearOrphanRead());
});

// the reload asked for by the button is read again as soon as it lands, whether or not the Auto
// info update switch is on
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!orphanWaiting || tabId !== orphanTabId) return;
  if (changeInfo.status !== "complete") return;
  clearTimeout(orphanTimer);
  orphanTimer = 0;
  orphanWaiting = false;
  refreshDashboard();
});

// the offer belongs to one tab: a switch drops it, and a closed tab takes the number with it
chrome.tabs.onActivated.addListener(() => clearOrphanRead());
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === orphanTabId) clearOrphanRead();
  if (tabId === readTabId) readTabId = 0;
});

// the content script reports the copy it made on its own, so the dock can show it without a
// notice drawn on the page
chrome.runtime.onMessage.addListener((message, sender) => {
  if (!message || message.action !== "copyStatus") return false;
  if (!sender.tab || !sender.tab.active) return false;
  if (dashboardBusy()) return false;
  if (message.count > 0 && message.copied) setStatus("autoCopied", message.count);
  else if (message.count > 0) setStatus("blocked", 0, "warn");
  return false;
});

// translate the state the content script reports
function showVideoState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0
  };
  if (state.code === "starting") setStatus("videoStarting");
  else if (state.code === "running") setStatus("videoRunning", params);
  else if (state.code === "done") setStatus("videoDone", params);
  else if (state.code === "partial") setStatus("videoPartial", params, "warn");
  else if (state.code === "busy") setStatus("videoBusy", 0, "warn");
  else if (state.code === "none") setStatus("videoNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("videoNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("videoNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("videoIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("videoStopped", 0, "warn");
  else setStatus("videoFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the run while the popup stays open
async function followVideoRun() {
  if (videoPolling) return;
  videoPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "videoStatus" }).catch(() => null);
      if (!state) break;
      showVideoState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    videoPolling = false;
    unlockRunButtons();
  }
}

// start the lecture video completion and watch its progress
async function startVideoRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("videoStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completeVideos" });
    if (!response) throw new Error("no answer");
    showVideoState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followVideoRun();
      return;
    }
  } catch {
    setStatus("videoNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the state the content script reports
function showReadingState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0
  };
  if (state.code === "starting") setStatus("readingStarting");
  else if (state.code === "running") setStatus("readingRunning", params);
  else if (state.code === "done") setStatus("readingDone", params);
  else if (state.code === "partial") setStatus("readingPartial", params, "warn");
  else if (state.code === "unverified") setStatus("readingUnverified", params, "warn");
  else if (state.code === "busy") setStatus("readingBusy", 0, "warn");
  else if (state.code === "none") setStatus("readingNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("readingNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("readingNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("readingIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("readingStopped", 0, "warn");
  else setStatus("readingFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the run while the popup stays open
async function followReadingRun() {
  if (readingPolling) return;
  readingPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "readingStatus" }).catch(() => null);
      if (!state) break;
      showReadingState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    readingPolling = false;
    unlockRunButtons();
  }
}

// start the reading completion and watch its progress
async function startReadingRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("readingStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completeReadings" });
    if (!response) throw new Error("no answer");
    showReadingState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followReadingRun();
      return;
    }
  } catch {
    setStatus("readingNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the state the content script reports
function showDiscussionState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0,
    answered: state.answered || 0
  };
  if (state.code === "starting") setStatus("discussionStarting");
  else if (state.code === "running") setStatus("discussionRunning", params);
  else if (state.code === "done") setStatus("discussionDone", params);
  else if (state.code === "partial") setStatus("discussionPartial", params, "warn");
  else if (state.code === "unverified") setStatus("discussionUnverified", params, "warn");
  else if (state.code === "busy") setStatus("discussionBusy", 0, "warn");
  else if (state.code === "none") setStatus("discussionNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("discussionNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("discussionNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("discussionIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("discussionStopped", 0, "warn");
  else setStatus("discussionFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the run while the popup stays open
async function followDiscussionRun() {
  if (discussionPolling) return;
  discussionPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "discussionStatus" }).catch(() => null);
      if (!state) break;
      showDiscussionState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    discussionPolling = false;
    unlockRunButtons();
  }
}

// start the discussion replies and watch their progress
async function startDiscussionRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("discussionStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completeDiscussions" });
    if (!response) throw new Error("no answer");
    showDiscussionState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followDiscussionRun();
      return;
    }
  } catch {
    setStatus("discussionNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the state the content script reports
function showPluginState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0,
    already: state.already || 0
  };
  if (state.code === "starting") setStatus("pluginStarting");
  else if (state.code === "running") setStatus("pluginRunning", params);
  else if (state.code === "done") setStatus("pluginDone", params);
  else if (state.code === "partial") setStatus("pluginPartial", params, "warn");
  else if (state.code === "unverified") setStatus("pluginUnverified", params, "warn");
  else if (state.code === "busy") setStatus("pluginBusy", 0, "warn");
  else if (state.code === "none") setStatus("pluginNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("pluginNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("pluginNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("pluginIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("pluginStopped", 0, "warn");
  else setStatus("pluginFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the run while the popup stays open
async function followPluginRun() {
  if (pluginPolling) return;
  pluginPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "pluginStatus" }).catch(() => null);
      if (!state) break;
      showPluginState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    pluginPolling = false;
    unlockRunButtons();
  }
}

// mark the practice items done and watch their progress
async function startPluginRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("pluginStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completePlugins" });
    if (!response) throw new Error("no answer");
    showPluginState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followPluginRun();
      return;
    }
  } catch {
    setStatus("pluginNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the state the content script reports for the lab button
function showLabState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0,
    already: state.already || 0
  };
  if (state.code === "starting") setStatus("labStarting");
  else if (state.code === "running") setStatus("labRunning", params);
  else if (state.code === "done") setStatus("labDone", params);
  else if (state.code === "partial") setStatus("labPartial", params, "warn");
  else if (state.code === "unverified") setStatus("labUnverified", params, "warn");
  else if (state.code === "busy") setStatus("labBusy", 0, "warn");
  else if (state.code === "none") setStatus("labNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("labNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("labNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("labIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("labStopped", 0, "warn");
  else setStatus("labFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the lab run while the popup stays open
async function followLabRun() {
  if (labPolling) return;
  labPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "labStatus" }).catch(() => null);
      if (!state) break;
      showLabState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    labPolling = false;
    unlockRunButtons();
  }
}

// mark the labs done and watch their progress
async function startLabRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("labStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completeLabs" });
    if (!response) throw new Error("no answer");
    showLabState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followLabRun();
      return;
    }
  } catch {
    setStatus("labNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the state the content script reports for the ungraded lab button
function showLtiState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0,
    already: state.already || 0
  };
  if (state.code === "starting") setStatus("ltiStarting");
  else if (state.code === "running") setStatus("ltiRunning", params);
  else if (state.code === "done") setStatus("ltiDone", params);
  else if (state.code === "partial") setStatus("ltiPartial", params, "warn");
  else if (state.code === "unverified") setStatus("ltiUnverified", params, "warn");
  else if (state.code === "busy") setStatus("ltiBusy", 0, "warn");
  else if (state.code === "none") setStatus("ltiNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("ltiNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("ltiNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("ltiIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("ltiStopped", 0, "warn");
  else setStatus("ltiFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the ungraded lab run while the popup stays open
async function followLtiRun() {
  if (ltiPolling) return;
  ltiPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "ltiStatus" }).catch(() => null);
      if (!state) break;
      showLtiState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    ltiPolling = false;
    unlockRunButtons();
  }
}

// mark the ungraded labs done and watch their progress
async function startLtiRun() {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("ltiStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "completeLti" });
    if (!response) throw new Error("no answer");
    showLtiState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followLtiRun();
      return;
    }
  } catch {
    setStatus("ltiNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// translate the read-only graded app answer. Nothing was written, so there is no progress to
// follow and no run to poll
function showGradedState(state) {
  const params = {
    total: state.total || 0,
    completed: state.completed || 0
  };
  if (state.code === "starting") setStatus("gradedStarting");
  else if (state.code === "graded") setStatus("gradedDone", params);
  else if (state.code === "none") setStatus("gradedNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("gradedNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("gradedNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("gradedIdentity", 0, "error");
  else setStatus("gradedFailed", 0, "error");
}

// the buttons that start a write. They are all disabled while the skip-all run owns the
// page, so two queues never write at the same time
const SKIP_ACTION_BUTTONS = ["completeVideos", "completeReadings", "completeDiscussions", "completePlugins", "completeLabs", "completeLti", "checkGraded"];

function setSkipActionsDisabled(disabled) {
  SKIP_ACTION_BUTTONS.forEach((name) => {
    elements[name].disabled = disabled;
  });
}

// translate the state the skip-all run reports
function showSkipAllState(state) {
  const params = {
    done: state.done || 0,
    total: state.total || 0,
    completed: state.completed || 0,
    already: state.already || 0,
    unverified: state.unverified || 0,
    failed: state.failed || 0,
    skipped: state.skipped || 0,
    answered: state.answered || 0
  };
  if (state.code === "starting") setStatus("skipAllStarting");
  else if (state.code === "running") setStatus("skipAllRunning", params);
  else if (state.code === "done") setStatus("skipAllDone", params);
  else if (state.code === "partial") setStatus("skipAllPartial", params, "warn");
  else if (state.code === "unverified") setStatus("skipAllUnverified", params, "warn");
  else if (state.code === "busy") setStatus("skipAllBusy", 0, "warn");
  else if (state.code === "none") setStatus("skipAllNone", 0, "warn");
  else if (state.code === "notCourse") setStatus("skipAllNotCourse", 0, "error");
  else if (state.code === "notLoggedIn") setStatus("skipAllNotLoggedIn", 0, "error");
  else if (state.code === "identity") setStatus("skipAllIdentity", 0, "error");
  else if (state.code === "stopped") setStatus("skipAllStopped", 0, "warn");
  else setStatus("skipAllFailed", 0, "error");
  reloadAfterRun(state);
}

// follow the skip-all run while the popup stays open
async function followSkipAllRun() {
  if (skipAllPolling) return;
  skipAllPolling = true;
  lockRunButtons();
  try {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const state = await sendToRunTab({ action: "skipAllStatus" }).catch(() => null);
      if (!state) break;
      showSkipAllState(state);
      if (state.phase !== "running") break;
    }
  } finally {
    skipAllPolling = false;
    unlockRunButtons();
  }
}

// skip every item that can be skipped, at the pacing the pressed button stands for
async function startSkipAllRun(mode) {
  if (runBusy()) return;
  lockRunButtons();
  setStatus("skipAllStarting");
  await rememberRunTab();
  try {
    const response = await sendToRunTab({ action: "skipEverything", requestMode: mode });
    if (!response) throw new Error("no answer");
    showSkipAllState(response);
    if (response.phase === "running" && response.code !== "busy") {
      followSkipAllRun();
      return;
    }
  } catch {
    setStatus("skipAllNotCourse", 0, "error");
  }
  unlockRunButtons();
}

// look at the graded app items without touching them
async function startGradedCheck() {
  if (runBusy()) return;
  elements.checkGraded.disabled = true;
  setStatus("gradedStarting");
  try {
    const response = await sendToActiveTab({ action: "checkGraded" });
    if (!response) throw new Error("no answer");
    showGradedState(response);
  } catch {
    setStatus("gradedNotCourse", 0, "error");
  }
  elements.checkGraded.disabled = false;
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

elements.autoCopy.addEventListener("change", async () => {
  settings.autoCopy = elements.autoCopy.checked;
  await saveSettings();
});

elements.autoReload.addEventListener("change", async () => {
  settings.autoReload = elements.autoReload.checked;
  await saveSettings();
});

elements.autoInfoUpdate.addEventListener("change", async () => {
  settings.autoInfoUpdate = elements.autoInfoUpdate.checked;
  await saveSettings();
  if (settings.autoInfoUpdate) refreshDashboard();
});

elements.noticeClose.addEventListener("click", async () => {
  settings.noticeHidden = true;
  elements.reloadNotice.hidden = true;
  await saveSettings();
});

CARD_VIEWS.forEach((view) => {
  elements[view.zoom].addEventListener("click", async () => {
    settings.collapsedCards[view.key] = !settings.collapsedCards[view.key];
    renderCollapse();
    await saveSettings();
  });
});

SECTION_VIEWS.forEach((view) => {
  elements[view.zoom].addEventListener("click", async () => {
    settings.collapsedSections[view.key] = !settings.collapsedSections[view.key];
    renderSectionCollapse();
    await saveSettings();
  });
});

elements.copyNow.addEventListener("click", async () => {
  elements.copyNow.disabled = true;
  setStatus("reading");
  try {
    const response = await sendToActiveTab({ action: "copyNow" });
    if (!response) {
      setStatus("wrongPage", 0, "error");
    } else if (response.error) {
      // the page answered, so the copy itself failed instead of the tab being wrong
      setStatus("copyFailed", 0, "error");
    } else if (!response.count) {
      setStatus("noQuestions", 0, "warn");
    } else if (response.copied) {
      setStatus("copied", response.count);
    } else {
      setStatus("blocked", 0, "warn");
    }
  } catch {
    setStatus("wrongPage", 0, "error");
  } finally {
    elements.copyNow.disabled = false;
  }
});

elements.skipEverything.addEventListener("click", () => {
  startSkipAllRun("sequential");
});

elements.skipEverythingInstant.addEventListener("click", () => {
  startSkipAllRun("instant");
});

elements.typesToggle.addEventListener("click", async () => {
  settings.collapsedSections.lessonTypes = !settings.collapsedSections.lessonTypes;
  renderCourse();
  await saveSettings();
});

elements.completeVideos.addEventListener("click", () => {
  startVideoRun();
});

elements.completeReadings.addEventListener("click", () => {
  startReadingRun();
});

elements.completeDiscussions.addEventListener("click", () => {
  startDiscussionRun();
});

elements.completePlugins.addEventListener("click", () => {
  startPluginRun();
});

elements.completeLabs.addEventListener("click", () => {
  startLabRun();
});

elements.completeLti.addEventListener("click", () => {
  startLtiRun();
});

elements.checkGraded.addEventListener("click", () => {
  startGradedCheck();
});

initialize();
