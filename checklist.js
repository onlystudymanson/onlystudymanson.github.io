const checklist = document.querySelector("[data-checklist]");

if (checklist) {
  const checkboxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const completedElement = document.querySelector("[data-completed]");
  const totalElement = document.querySelector("[data-total]");
  const progressElement = document.querySelector("[data-progress]");
  const messageElement = document.querySelector("[data-message]");
  const clearButton = document.querySelector("[data-clear]");
  const sendButton = checklist.querySelector('.send-button');
  const sendLabel = checklist.querySelector('[data-send-label]');
  const responseFrame = document.querySelector('[data-mail-response]');
  const endpoint = document
    .querySelector('meta[name="checklist-endpoint"]')
    ?.getAttribute('content')
    ?.trim();
  const storageKey = "essay-like-lim-checklist";
  let deliveryPending = false;

  function finishDelivery(message, succeeded) {
    deliveryPending = false;
    sendButton.disabled = false;
    sendLabel.textContent = "보내기";
    messageElement.textContent = message;
    messageElement.dataset.status = succeeded ? "success" : "error";
  }

  function updateProgress() {
    const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
    completedElement.textContent = completed;
    totalElement.textContent = checkboxes.length;
    progressElement.style.width = `${(completed / checkboxes.length) * 100}%`;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(checkboxes.map((checkbox) => checkbox.checked))
      );
    } catch {
      // The checklist still works when browser storage is unavailable.
    }
  }

  try {
    const savedState = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(savedState)) {
      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = Boolean(savedState[index]);
      });
    }
  } catch {
    // Ignore unavailable or malformed saved data.
  }

  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateProgress));

  clearButton?.addEventListener("click", () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    messageElement.textContent = "체크한 항목을 모두 지웠어요.";
    updateProgress();
  });

  checklist.addEventListener("submit", (event) => {
    event.preventDefault();
    const checkedItems = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (checkedItems.length === 0) {
      messageElement.textContent = "보내기 전에 항목을 하나 이상 체크해 주세요.";
      return;
    }

    const validEndpoint =
      endpoint?.startsWith("https://script.google.com/macros/s/") &&
      endpoint.endsWith("/exec");

    if (!validEndpoint) {
      messageElement.textContent =
        "이메일 전송 설정이 필요해요. README.md를 확인해 주세요.";
      return;
    }

    checklist.action = endpoint;
    sendButton.disabled = true;
    sendLabel.textContent = "전송 중";
    messageElement.textContent = "체크한 목록을 보내고 있어요…";
    delete messageElement.dataset.status;
    deliveryPending = true;

    // Submit into the hidden iframe so the visitor stays on this page.
    HTMLFormElement.prototype.submit.call(checklist);
  });

  window.addEventListener("message", (event) => {
    if (
      !deliveryPending ||
      event.source !== responseFrame?.contentWindow ||
      event.data?.type !== "checklist-email-result"
    ) {
      return;
    }

    finishDelivery(
      event.data.ok
        ? "전송했어요. 체크한 목록이 곧 도착합니다."
        : "이메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
      Boolean(event.data.ok)
    );
  });

  // Google Apps Script wraps HtmlService output in its own sandboxed iframe.
  // The outer frame finishes loading only after doPost has returned.
  responseFrame?.addEventListener("load", () => {
    if (!deliveryPending) return;
    finishDelivery("전송했어요. 체크한 목록이 곧 도착합니다.", true);
  });

  updateProgress();
}
