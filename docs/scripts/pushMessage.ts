// Script Name: Push Message Service

/** 解析邮箱地址 */
function parseMail(mail) {
  // 收信人.发送人.随机掩码
  const regexp =
    /^(?<receiver>\d+)\.(?<sender>\d+)\.(?<code>.*)@txt.voice.google.com/;
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

/** 从线程获取消息 */
function getMessagesByThread(thread) {
  return thread.getMessages();
}

/** 过滤未读消息 */
function filterUnreadMessage(message) {
  return (
    message.isUnread() &&
    !message.getPlainBody().includes("report-phone-number-online")
  );
}

/** 根据时间正序排序消息 */
function sortMessagesAccordingByDate(a, b) {
  return a.getDate().getTime() - b.getDate().getTime();
}

/** 获取上报在线状态未读邮件 */
function listUnreadMails() {
  return GmailApp.search(
    "is:unread from:(@txt.voice.google.com) -{report-phone-number-online}",
  ) // 检索 未读 来自txt.voice.google.com的邮件 不包含report-phone-number-online
    .reduce(
      (acc, thread) =>
        acc.concat(
          getMessagesByThread(thread)
            .filter(filterUnreadMessage)
            .sort(sortMessagesAccordingByDate),
        ),
      [],
    ); // 获取每个未读线程中的邮件消息
}

function JSONParse(content) {
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function main() {
  try {
    listUnreadMails().forEach((message) => {
      const { content, from } = parseMessage(message);
      const { receiver, sender } = parseMail(from);
      const { reportedAt } = JSONParse(content);

      const response = UrlFetchApp.fetch(
        "https://tpn.beautifulpicture.cn/api/messages/push",
        {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify({
            reportedAt: reportedAt ?? new Date().toISOString(),
            content,
            from: sender,
            phoneNumber: receiver,
          }),
        },
      );

      const statusCode = response.getResponseCode();

      if (statusCode < 200 || statusCode >= 300) return;

      message.markRead();
      message.moveToTrash();

      Logger.log("Push Success!");
    });
  } catch (e) {
    Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
  }
}
