/**
 * Email receiver for the Essay, Like Lim checklist.
 * Deploy this project as a Google Apps Script web app.
 */

const RECIPIENT = 'ye3031@gmail.com';

// Only values present in the public checklist are accepted. This prevents the
// endpoint from being used to relay arbitrary email content.
const ALLOWED_ITEMS = [
  'Read today’s essay',
  'Write down one idea worth keeping',
  'Take a short walk without your phone',
  'Notice something usually overlooked',
  'Send a note to someone you miss',
  'Make room for tomorrow',
];

const KOREAN_ITEM_LABELS = {
  'Read today’s essay': '오늘의 에세이 읽기',
  'Write down one idea worth keeping': '기억하고 싶은 생각 하나 적기',
  'Take a short walk without your phone': '휴대폰 없이 잠깐 산책하기',
  'Notice something usually overlooked': '평소 지나쳤던 것 하나 발견하기',
  'Send a note to someone you miss': '보고 싶은 사람에게 안부 전하기',
  'Make room for tomorrow': '내일을 위한 여유 만들기',
};

function doGet() {
  return htmlResponse_('Checklist mail service is running.', true);
}

function doPost(event) {
  try {
    // Honeypot: bots commonly fill hidden fields. Return success without mail.
    if (event && event.parameter && event.parameter.website) {
      return htmlResponse_('Received.', true);
    }

    const submittedItems =
      event && event.parameters && event.parameters.item
        ? event.parameters.item
        : [];

    const checkedItems = submittedItems.filter(function (item) {
      return ALLOWED_ITEMS.indexOf(item) !== -1;
    });

    if (checkedItems.length === 0) {
      return htmlResponse_('No valid checklist items were selected.', false);
    }

    if (MailApp.getRemainingDailyQuota() < 1) {
      return htmlResponse_('The daily email limit has been reached.', false);
    }

    const completedList = checkedItems
      .map(function (item) {
        return '✓ ' + KOREAN_ITEM_LABELS[item];
      })
      .join('\n');

    const subject =
      '체크리스트 도착 — ' +
      checkedItems.length +
      '개 항목 완료';

    const body = [
      'Essay, Like Lim에서 체크리스트가 도착했습니다.',
      '',
      completedList,
      '',
      '받은 시각: ' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy년 M월 d일 HH:mm'),
    ].join('\n');

    MailApp.sendEmail({
      to: RECIPIENT,
      subject: subject,
      body: body,
      name: 'Essay, Like Lim',
    });

    return htmlResponse_('Sent.', true);
  } catch (error) {
    console.error(error);
    return htmlResponse_('Delivery failed.', false);
  }
}

function htmlResponse_(message, succeeded) {
  const result = JSON.stringify({
    type: 'checklist-email-result',
    ok: Boolean(succeeded),
  }).replace(/</g, '\\u003c');

  return HtmlService.createHtmlOutput(
    '<!doctype html><html><body><p>' +
      escapeHtml_(message) +
      '</p><script>window.parent.postMessage(' +
      result +
      ', "*");</script></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
