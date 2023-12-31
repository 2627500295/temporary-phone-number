// Array
/////////////////////////////////

/**
 * Returns the last element of the given list or string.
 *
 * @param array - 数组
 *
 * @return {*|undefined}
 */
function last(array) {
  return Array.isArray(array) && array.length
    ? array[array.length - 1]
    : undefined;
}

/**
 * Returns the first element of the given list or string. In some libraries this function is named `first`.
 *
 * @param array - 数组
 *
 * @return {*|undefined}
 */
function head(arr) {
  return arr && arr.length ? arr[0] : undefined;
}

/**
 * Returns the nth element of the given list or string. If n is negative the element at index length + n is returned.
 *
 * @param array - 数组
 * @param n - 索引
 *
 * @return {undefined|*}
 */
function nth(array, n) {
  if (array && array.length) {
    n += n < 0 ? array.length : 0;
    return array[n];
  }

  return undefined;
}

/**
 * Returns the at element of the given list or string.
 *
 * @param array - 数组
 * @param n - 索引
 *
 * @return {undefined|*}
 */
function at(array, n) {
  n = Math.trunc(n) || 0;
  if (n < 0) n += array.length;
  if (n < 0 || n >= array.length) return undefined;
  return array[n];
}

// JSON
/////////////////////////////////

/**
 * JSON Parse
 *
 * @param str {string} - String
 * @param value {object} - Default value
 *
 * @return {object}
 */
function JSONParse(str, defaultValue = {}) {
  try {
    return JSON.parse(str) ?? defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

// Service
/////////////////////////////////

class TpnService {
  /**
   * POST 请求
   *
   * @param url - URL
   * @param data - DATA
   * @param init - options
   * @return {boolean}
   */
  static post(url, data, init) {
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
}

// Helper
/////////////////////////////////

class MailHelper {
  /**
   * 发送邮件
   *
   * @param to - mail address
   * @param subject - mail subject
   * @param htmlBody - mail content
   *
   * @return {void}
   */
  static sendEmail(to, subject, htmlBody) {
    try {
      const body = { to, subject, htmlBody }
      MailApp.sendEmail(body);
      Logger.log(JSON.stringify(body));
    } catch (e) {
      Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
    }
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
  static parseMessage(message) {
    const content = MailHelper.parseContent(message.getPlainBody());
    const from = MailHelper.parseSender(message.getFrom());
    const to = message.getTo();
    const date = message.getDate().toISOString();
    return { content, from, to, date };
  }

  /**
   * 解析 Voice 邮箱地址
   *
   * @param mail {string} - 邮箱
   * @return {{ receiver: string, sender: string, code: string }}
   *
   * @example
   *
   * ParseMail.voiceMail("17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com");
   * // { receiver: "17207277520", sender: "12527130222", code: "LBftK5Dmzd" }
   */
  static parseVoiceMail(mail) {
    const matched = mail.match(
      /^(?<receiver>\d+)\.(?<sender>\d+)\.(?<code>.*)@/,
    );
    return matched?.groups ?? {};
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
   * ParseMail.sender("Google Voice <17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com>")
   * // 17207277520.12527130222.LBftK5Dmzd@txt.voice.google.com
   */
  static parseSender(from) {
    const matched = from.match(/<(?<mail>.*)>/);
    return matched?.groups?.mail ?? "";
  }

  /**
   * 解析内容
   *
   * @param plainBody {string} - Plain Body
   * @return {string}
   *
   * ParseMail.content("&lt;https://voice.google.com&gt;\r\nYour Pear.us verification code is 9587\r\n您的账号 &lt;https://voice.google.com&gt; 帮助中心\r\n&lt;https://support.google.com/voice#topic=1707989&gt; 帮助论坛\r\n&lt;https://productforums.google.com/forum/#!forum/voice&gt;\r\n您收到此电子邮件，是因为您曾表示愿意接收有关短信的电子邮件通知。如果您不希望 \r\n日后再收到这类电子邮件，请更新您的电子邮件通知设置\r\n&lt;https://voice.google.com/settings#messaging&gt;。\r\nGoogle LLC\r\n1600 Amphitheatre Pkwy\r\nMountain View CA 94043 USA");
   * // Your Pear.us verification code is 9587
   */
  static parseContent(plainBody) {
    const matched = plainBody.match(/^\r?\n<.+m>\r?\n(?<content>.*)\r?\n/);
    return matched?.groups?.content ?? "";
  }

  /**
   * 过滤未读消息
   *
   * @param message - 消息
   * @return {boolean}
   */
  static filterUnreadMessage(message) {
    return message.isUnread();
  }

  /**
   * 从消息获取时间
   *
   * @param message - 消息
   * @return {number}
   */
  static getTimeByMessage(message) {
    return message.getDate().getTime();
  }

  /**
   * 时间正序排序消息
   *
   * @param a - 消息
   * @param b - 消息
   * @return {number}
   */
  static sortMessagesAccordingByDate(a, b) {
    return MailHelper.getTimeByMessage(a) - MailHelper.getTimeByMessage(b);
  }

  /**
   * 从线程获取消息
   *
   * @param thread - 线程
   * @return {message[]}
   */
  static getUnreadMessagesByThread(thread) {
    return thread.getMessages().filter(MailHelper.filterUnreadMessage);
  }

  /**
   * 获取未读邮件消息
   *
   * @param search {string} - 搜索
   */
  static listUnreadMessages(search) {
    return GmailApp.search(search)
      .reduce((acc, thread) => {
        const messages = MailHelper.getUnreadMessagesByThread(thread);
        acc.push(...messages);
        return acc;
      }, [])
      .sort(MailHelper.sortMessagesAccordingByDate);
  }

  /**
   * 删除消息
   *
   * @param message - 消息
   */
  static deleteMessage(message) {
    message.markRead();
    message.moveToTrash();
  }
}

// Handler
/////////////////////////////////

/**
 * 上报短信
 */
function reportSMS() {
  const search = "is:unread from:(@txt.voice.google.com)";

  function handler({ content, receiver, sender, date }) {
    const isReportOnline = new RegExp("report-phone-number-online").test(content);

    if (isReportOnline) {
      const reportedAt = JSONParse(content).receivedAt ?? new Date().toISOString();
      const data = { reportedAt, from: receiver };
      const response = TpnService.post(`/api/numbers/${sender}/online`, data);
      return response;
    } else {
      const data = { receivedAt: date, content, from: sender, phoneNumber: receiver};
      const response = TpnService.post("/api/numbers/${sender}/sms/push", data);
      return response;
    }
  }

  try {
    const unreadMessages = MailHelper.listUnreadMessages(search);

    if (!unreadMessages.length) return Logger.log(`\nUnread messages are empty\n`);

    unreadMessages.forEach((message) => {
      const metadata = MailHelper.parseMessage(message);
      const data = MailHelper.parseVoiceMail(metadata.from);
      const params = { ...metadata, ...data };
      if (!handler(params)) return;
      Logger.log("Report success: ", JSON.stringify(params));
      MailHelper.deleteMessage(message);
    });
  } catch (e) {
    Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
  }
}

/**
 * 报告在线
 */
function reportOnline() {
  const items = [
    // (209) 677 7520
    { phoneNumber: "12096777520", receiver: "17207277520", code: "XffQZfbw--" },
    { phoneNumber: "12096777520", receiver: "18037951555", code: "gSbWZ4rdC8" },
    // { phoneNumber: "12096777520", receiver: "19366666938", code: "hmtrcLtgXk" },

    // (720) 727 7520
    { phoneNumber: "17207277520", receiver: "12096777520", code: "HtqrZWHKHv" },
    { phoneNumber: "17207277520", receiver: "18037951555", code: "tfLXwt4gtg" },
    // { phoneNumber: "17207277520", receiver: "12527130222", code: "LBftK5Dmzd" },

    // (803) 795 1555
    { phoneNumber: "18037951555", receiver: "12096777520", code: "C2Q7xP4DMd" },
    { phoneNumber: "18037951555", receiver: "17207277520", code: "lHSTVHRVrX" },
  ];

  const phoneNumber = "17207277520";

  const { receiver, code } = items.find(
    (item) => item.phoneNumber === phoneNumber,
  );

  const body = {
    action: "report-phone-number-online",
    reportedAt: new Date().toISOString(),
    phoneNumber,
  };

  MailHelper.sendEmail(
    `${phoneNumber}.${receiver}.${code}@txt.voice.google.com`,
    `Report ${phoneNumber} online`,
    JSON.stringify(body),
  );
}
