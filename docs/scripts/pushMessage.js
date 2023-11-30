// Script Name: Push Message Service

// Parse
/////////////////////////////////

/**
 * 解析邮箱地址
 *
 * @param mail {string} - 邮箱
 * @return {{ receiver: string, sender: string, code: string }}
 *
 * @example
 *
 * parseMail("17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com");
 * // { receiver: "17207277520", sender: "12527130222", code: "LBftK5Dmzd" }
 */
function parseMail(mail) {
  return mail.match(/^(?<receiver>\d+)\.(?<sender>\d+)\.(?<code>.*)@/)?.groups;
}

/**
 * 解析收件人
 *
 * @param from {string} - 来源
 *
 * @return {string}
 *
 * @example
 *
 * parseSender("Google Voice <17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com>")
 * // 17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com
 */
function parseSender(from) {
  return from.match(/<(?<mail>.*)>/)?.groups?.mail;
}

/**
 * 解析内容
 *
 * @param plainBody {string} - Plain Body
 * @return {string}
 *
 * parseContent("&lt;https://voice.google.com&gt;\r\nYour Pear.us verification code is 9587\r\n您的账号 &lt;https://voice.google.com&gt; 帮助中心\r\n&lt;https://support.google.com/voice#topic=1707989&gt; 帮助论坛\r\n&lt;https://productforums.google.com/forum/#!forum/voice&gt;\r\n您收到此电子邮件，是因为您曾表示愿意接收有关短信的电子邮件通知。如果您不希望 \r\n日后再收到这类电子邮件，请更新您的电子邮件通知设置\r\n&lt;https://voice.google.com/settings#messaging&gt;。\r\nGoogle LLC\r\n1600 Amphitheatre Pkwy\r\nMountain View CA 94043 USA");
 * // Your Pear.us verification code is 9587
 */
function parseContent(plainBody) {
  return plainBody.match(/^\r?\n<.+m>\r?\n(?<content>.*)\r?\n/)?.groups
    ?.content;
}

/**
 * 解析消息
 *
 * @param message {object} - 消息对象
 * @return {{ content: string; from: string; to: string; date: string; }}
 *
 * @example
 * parseMessage({
 *   getPlainBody() {
 *     return '';
 *   },
 *   getFrom() {
 *     return "XXX <xxx@xxx.xx>";
 *   },
 *   getTo() {
 *     return "xxx@xxx.xx";
 *   },
 *   getDate() {
 *     return new Date();
 *   }
 * });
 *
 * // { content: '', from: 'xxx.xxx.xxx@xxx.xx', to: 'xxx@xxx.xx', date: '0000-00-00T00:00:00.000Z', receiver: "xxx", sender: "xxx", code: "xxx" }
 */
function parseMessage(message) {
  const content = parseContent(message.getPlainBody());
  const from = parseSender(message.getFrom());
  const to = message.getTo();
  const date = message.getDate().toISOString();
  const { receiver, sender, code } = parseMail(from);
  return { content, from, to, date, receiver, sender, code };
}

// Service
//////////////////////////////////////////////////////////////////

function post(url, data, init) {
  const baseURL = "https://tpn.beautifulpicture.cn";
  const fullURL = `${baseURL}${url}`;

  const response = UrlFetchApp.fetch(fullURL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data),
    ...init,
  });

  const statusCode = response.getResponseCode();

  return statusCode >= 200 && statusCode < 300;
}

// Util
//////////////////////////////////////////////////////////////////

// Message

/** 过滤未读消息 */
function filterUnreadMessage(message) {
  return message.isUnread();
}

/** 包含报告在线状态 */
function includeReportOnlineMessage(message) {
  const plainBody = message.getPlainBody();
  return plainBody.includes("report-phone-number-online");
}

/** 排除报告在线状态 */
function excludeReportOnlineMessage(message) {
  return !includeReportOnlineMessage(message);
}

/** 从消息获取时间 */
function getTimeByMessage(message) {
  return message.getDate().getTime();
}

/** 时间正序排序消息 */
function sortMessagesAccordingByDate(a, b) {
  return getTimeByMessage(a) - getTimeByMessage(b);
}

/** 时间倒序排序消息 */
function sortMessageDescendingByDate(a, b) {
  return getTimeByMessage(b) - getTimeByMessage(a);
}

// Thread

/** 从线程获取消息 */
function getUnreadMessagesByThread(thread) {
  return thread.getMessages().filter(filterUnreadMessage);
}

// Gmail App

/** 获取上报在线状态未读邮件 */
function listUnreadMessages(search) {
  return GmailApp.search(search)
    .reduce((acc, thread) => acc.concat(getUnreadMessagesByThread(thread)), [])
    .sort(sortMessagesAccordingByDate);
}

// Handler
function unreadMessagesHandler(list, handler) {
  try {
    list.forEach((message) => {
      if (!handler(parseMessage(message))) return;
      // message.markRead();
      // message.moveToTrash();
    });
  } catch (e) {
    Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
  }
}

// Push Message

function assemblePushMessageParams({ content, receiver, sender, date }) {
  return {
    receivedAt: date,
    content,
    from: sender,
    phoneNumber: receiver,
  };
}

function pushMessage() {
  const search =
    "is:unread from:(@txt.voice.google.com) -{report-phone-number-online}";
  unreadMessagesHandler(
    listUnreadMessages(search).filter(excludeReportOnlineMessage),
    (metadata) =>
      post("/api/messages/push", assemblePushMessageParams(metadata)),
  );
}

// Report Online

function assembleReportOnlineParams({ content, receiver }) {
  const { reportedAt } = JSONParse(content);
  return {
    reportedAt: reportedAt ?? new Date().toISOString(),
    from: receiver,
  };
}

function reportOnline() {
  const search =
    "is:unread from:(@txt.voice.google.com) report-phone-number-online";
  unreadMessagesHandler(
    listUnreadMessages(search).filter(includeReportOnlineMessage),
    ({ content, receiver, sender }) =>
      post(
        `/api/numbers/${sender}/online`,
        assembleReportOnlineParams({ content, receiver }),
      ),
  );
}
