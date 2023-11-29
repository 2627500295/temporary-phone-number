function pipe(...funcs) {
  return (params) => funcs.reduce((value, func) => func(value), params);
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

function filter(fn, arr) {
  return arr.filter(fn);
}

function sort(fn, arr) {
  return arr.sort(fn);
}

/** 排序消息 */
function sortMessage(a, b) {
  return a.getDate().getTime() - b.getDate().getTime();
}

/** 过滤消息 */
function filterMessage(message) {
  return (
    message.isUnread() &&
    message.getPlainBody().includes('report-phone-number-online')
  );
}

/** 从线程中获取消息 */
function getMessagesByThread(thread) {
  return thread.getMessages();
}

/** 获取上报在线状态未读邮件 */
function listUnreadMails() {
  const searchRule =
    'is:unread from:(@txt.voice.google.com) report-phone-number-online';

  return GmailApp.search(searchRule) // 检索 未读 来自txt.voice.google.com的邮件 不包含report-phone-number-online
    .reduce((acc, thread) => {
      const messages = pipe(
        getMessagesByThread,
        (arr) => filter(filterMessage, arr),
        (arr) => sort(sortMessage, arr),
      )(thread);

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
