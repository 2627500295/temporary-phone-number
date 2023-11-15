/** Array last */
function last(array) {
  return Array.isArray(array) && array.length
    ? array[array.length - 1]
    : undefined;
}

/** Array head */
function head(arr) {
  return arr && arr.length ? arr[0] : undefined;
}

/** Array nth */
function nth(array, n) {
  if (array && array.length) {
    n += n < 0 ? array.length : 0;
    return array[n];
  }

  return undefined;
}

/** Array at */
function at(array, n) {
  n = Math.trunc(n) || 0;
  if (n < 0) n += array.length;
  if (n < 0 || n >= array.length) return undefined;
  return array[n];
}

/** JSON Parse */
function JSONParse(str, value = {}) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return value;
  }
}

/** 发送邮件 */
function sendEmail(to, subject = '', htmlBody = '') {
  return MailApp.sendEmail({ to, subject, htmlBody });
}

/** 解析邮箱地址 */
function parseMail(mail) {
  const regexp =
    /^(?<source>\d+)\.(?<target>\d+)\.(?<code>.*)@txt.voice.google.com/;
  return mail.match(regexp)?.groups;
}

/** 解析收件人 */
function parseSender(from) {
  const regexp = /<(?<mail>.*)>/;
  return from.match(regexp)?.groups?.mail;
}

/** 解析内容 */
function parseContent(plainBody) {
  return plainBody.match(/m>\r\n(?<content>.*)\r\n/)?.groups?.content;
}

/** 解析消息 */
function parseMessage(message) {
  const plainBody = message.getPlainBody();
  const content = parseContent(plainBody);
  const from = parseSender(message.getFrom());
  const to = message.getTo();
  const date = message.getDate().toISOString();
  return { content, from, to, date };
}

/** 获取上报在线状态未读邮件 */
function listUnreadMails() {
  return GmailApp.search(
    'is:unread from:(@txt.voice.google.com) report-phone-number-online',
  ) // 检索 未读 来自txt.voice.google.com的邮件 不包含report-phone-number-online
    .reduce((acc, thread) => {
      const messages = thread
        .getMessages()
        .filter(
          (message) =>
            message.isUnread() &&
            message.getPlainBody().includes('report-phone-number-online'),
        )
        .sort((a, b) => a.getDate().getTime() - b.getDate().getTime());

      acc.push(...messages);

      return acc;
    }, []); // 获取每个未读线程中的邮件消息
}

function main() {
  try {
    listUnreadMails().forEach((message) => {
      const { content, from, date } = parseMessage(message);
      const { source, target, code } = parseMail(from);

      Logger.log({
        from,
        content,
        date,
        metadata: {
          source,
          target,
          code,
        },
      });

      UrlFetchApp.fetch('https://httpbin.org/post', {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          phoneNumber: source,
          reportedAt: date,
          from: target,
        }),
      });

      // 回复邮件
      MailApp.sendEmail({
        to: from,
        subject: '',
        htmlBody: 'Report success',
      });

      message.markRead();
      message.moveToTrash();
    });
  } catch (e) {
    Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
  }
}
