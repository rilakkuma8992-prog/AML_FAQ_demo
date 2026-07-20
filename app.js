// ============================================================
// AML FAQ desktop three-column interaction.
// Questions, answers, and references are read only from js/data.js.
// ============================================================

const CATEGORY_DEFS = [
  {id:"kyc", label:{zh:"KYC", en:"KYC"}},
  {id:"cdd-edd", label:{zh:"CDD/EDD", en:"CDD/EDD"}},
  {id:"wlf", label:{zh:"WLF", en:"WLF"}},
  {id:"sanctions", label:{zh:"國際制裁", en:"International Sanctions"}},
  {id:"overseas", label:{zh:"海外管理", en:"Overseas Management"}}
];

const UI_TEXT = {
  zh: {
    documentTitle:"AML FAQ 互動原型 Demo",
    langLabel:"語言切換",
    contactTop:"聯絡洗防窗口",
    chooseBiz:"請選擇業務別",
    chooseQuestion:"請選擇您的問題",
    expandAll:"全部展開",
    collapseAll:"全部收合",
    emptyCategory:"此分類目前尚無常見問題",
    answerPanelTitle:"答案",
    emptyAnswer:"請根據左方分類選擇您的問題",
    answerLabel:"答案",
    refLabel:"參考",
    contactFooterButton:"還是找不到答案？請洽洗防窗口",
    modalTitle:"聯絡洗防窗口",
    modalBody:"找不到您要的答案嗎？<br>請聯繫洗防部 AML 專責窗口：分機 1234<br>或內部信箱 aml-support@bank.internal",
    modalClose:"我知道了"
  },
  en: {
    documentTitle:"AML FAQ Interactive Demo",
    langLabel:"Language",
    contactTop:"Contact AML Office",
    chooseBiz:"Select Business Line",
    chooseQuestion:"Select Your Question",
    expandAll:"Expand all",
    collapseAll:"Collapse all",
    emptyCategory:"No frequently asked questions in this category yet.",
    answerPanelTitle:"Answer",
    emptyAnswer:"Please select a question from the categories on the left.",
    answerLabel:"Answer",
    refLabel:"Reference",
    contactFooterButton:"Still cannot find an answer? Contact the AML office",
    modalTitle:"Contact AML Office",
    modalBody:"Cannot find the answer you need?<br>Please contact the AML Office: extension 1234<br>or internal mailbox aml-support@bank.internal",
    modalClose:"Got it"
  }
};

let currentLang = "zh";
let selectedBiz = Object.keys(DB)[0] || "";
let expandedCategories = new Set();
let selectedQuestion = null;

function t(key){
  return UI_TEXT[currentLang][key];
}

function localize(value){
  if(value && typeof value === "object"){
    return value[currentLang] || value.zh || "";
  }
  return value || "";
}

function formatQuestionCount(count){
  return String(count);
}

function escapeHtml(value){
  return String(value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function getBizEntries(){
  return Object.entries(DB).map(([id, biz]) => ({id, ...biz}));
}

function getTopicEntries(bizId){
  return Object.entries(DB[bizId]?.topics || {}).map(([id, topic]) => ({id, ...topic}));
}

function getQuestionCount(bizId){
  return getTopicEntries(bizId).reduce((sum, topic) => sum + topic.questions.length, 0);
}

function buildCategoryGroups(bizId){
  return CATEGORY_DEFS.map(category => ({
    ...category,
    topics:getTopicEntries(bizId).filter(topic => topic.category === category.id)
  }));
}

function selectBiz(bizId){
  selectedBiz = bizId;
  expandedCategories = new Set();
  selectedQuestion = null;
  render();
}

function toggleCategory(categoryId){
  if(expandedCategories.has(categoryId)){
    expandedCategories.delete(categoryId);
  }else{
    expandedCategories.add(categoryId);
  }
  render();
}

function toggleAllCategories(){
  const groups = buildCategoryGroups(selectedBiz);
  const allOpen = groups.every(group => expandedCategories.has(group.id));
  expandedCategories = allOpen ? new Set() : new Set(groups.map(group => group.id));
  render();
}

function selectQuestion(topicId, idx){
  selectedQuestion = {biz:selectedBiz, topic:topicId, idx};
  render();
}

function jumpToAnswer(bizId, topicId, idx){
  selectedBiz = bizId;
  const topic = DB[bizId]?.topics?.[topicId];
  if(topic){
    expandedCategories.add(topic.category);
  }
  selectedQuestion = {biz:bizId, topic:topicId, idx};
  render();
}

function changeLanguage(lang){
  if(lang !== currentLang){
    currentLang = lang;
    render();
  }
}

function closeModal(){
  document.getElementById("modalLayer").innerHTML = "";
}

function openContactModal(){
  document.getElementById("modalLayer").innerHTML = `
    <div class="modal-mask" role="presentation">
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="contactTitle">
        <h4 id="contactTitle">${escapeHtml(t("modalTitle"))}</h4>
        <p>${t("modalBody")}</p>
        <button class="modal-close" type="button" onclick="closeModal()">${escapeHtml(t("modalClose"))}</button>
      </div>
    </div>`;
}

function renderBizPanel(){
  return `
    <aside class="app-panel biz-panel">
      <div class="panel-head">
        <h2 class="panel-title">${escapeHtml(t("chooseBiz"))}</h2>
      </div>
      <div class="panel-body">
        <div class="biz-list">
          ${getBizEntries().map(biz => `
            <button class="biz-button ${biz.id === selectedBiz ? "is-active" : ""}" type="button" data-biz="${biz.id}">
              <span>
                <span class="biz-name">${escapeHtml(localize(biz.label))}</span>
              </span>
              <span class="biz-count">${getQuestionCount(biz.id)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </aside>`;
}

function renderQuestionList(group){
  if(group.topics.length === 0){
    return `<div class="empty-category">${escapeHtml(t("emptyCategory"))}</div>`;
  }

  return `
    <div class="question-list">
      ${group.topics.map(topic => `
        ${topic.questions.map((item, idx) => {
          const isSelected = selectedQuestion &&
            selectedQuestion.biz === selectedBiz &&
            selectedQuestion.topic === topic.id &&
            selectedQuestion.idx === idx;

          return `
            <button class="question-button ${isSelected ? "is-selected" : ""}" type="button" data-topic="${topic.id}" data-idx="${idx}">
              ${escapeHtml(localize(item.q))}
            </button>`;
        }).join("")}
      `).join("")}
    </div>`;
}

function renderCategoryPanel(){
  const groups = buildCategoryGroups(selectedBiz);
  const allOpen = groups.every(group => expandedCategories.has(group.id));

  return `
    <section class="app-panel category-panel">
      <div class="panel-head">
        <div class="panel-head-row">
          <h2 class="panel-title">${escapeHtml(t("chooseQuestion"))}</h2>
          <button class="expand-all-btn" type="button" data-toggle-all="true">${escapeHtml(allOpen ? t("collapseAll") : t("expandAll"))}</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="topic-stack">
          ${groups.map(group => {
            const isOpen = expandedCategories.has(group.id);
            const questionTotal = group.topics.reduce((sum, topic) => sum + topic.questions.length, 0);

            return `
              <section class="topic-block ${isOpen ? "is-open" : ""}">
                <button class="topic-toggle" type="button" data-category="${group.id}" aria-expanded="${isOpen}">
                  <span class="toggle-icon">${isOpen ? "−" : "+"}</span>
                  <span class="topic-name">${escapeHtml(localize(group.label))}</span>
                  <span class="topic-count">${escapeHtml(formatQuestionCount(questionTotal))}</span>
                </button>
                ${isOpen ? renderQuestionList(group) : ""}
              </section>`;
          }).join("")}
        </div>
      </div>
    </section>`;
}

function renderAnswerPanel(){
  let answerHtml = `
    <div class="answer-empty">
      ${escapeHtml(t("emptyAnswer"))}
    </div>`;

  if(selectedQuestion){
    const item = DB[selectedQuestion.biz]?.topics?.[selectedQuestion.topic]?.questions?.[selectedQuestion.idx];
    if(item){
      answerHtml = `
        <div class="answer-content">
          <h2 class="answer-question">${escapeHtml(localize(item.q))}</h2>
          <div class="answer-card">
            <p class="answer-text">${escapeHtml(localize(item.a))}</p>
          </div>
          <div class="answer-card answer-ref">
            <p class="answer-label">${escapeHtml(t("refLabel"))}</p>
            ${escapeHtml(localize(item.ref))}
          </div>
        </div>`;
    }
  }

  return `
    <section class="app-panel answer-panel">
      <div class="panel-head">
        <h2 class="panel-title">${escapeHtml(t("answerPanelTitle"))}</h2>
      </div>
      <div class="panel-body">
        <div class="answer-shell">${answerHtml}</div>
      </div>
      <div class="contact-card">
        <button class="contact-card-btn" type="button" onclick="openContactModal()">${escapeHtml(t("contactFooterButton"))}</button>
      </div>
    </section>`;
}

function bindAppEvents(){
  document.querySelectorAll("[data-biz]").forEach(button => {
    button.onclick = () => selectBiz(button.dataset.biz);
  });

  document.querySelectorAll("[data-category]").forEach(button => {
    button.onclick = () => toggleCategory(button.dataset.category);
  });

  document.querySelectorAll("[data-toggle-all]").forEach(button => {
    button.onclick = () => toggleAllCategories();
  });

  document.querySelectorAll("[data-topic][data-idx]").forEach(button => {
    button.onclick = () => selectQuestion(button.dataset.topic, Number(button.dataset.idx));
  });
}

function renderChrome(){
  document.documentElement.lang = currentLang === "zh" ? "zh-Hant" : "en";
  document.title = t("documentTitle");

  const contactTop = document.querySelector(".contact-top");
  if(contactTop){
    contactTop.textContent = t("contactTop");
  }

  const languageSwitch = document.querySelector(".language-switch");
  if(languageSwitch){
    languageSwitch.setAttribute("aria-label", t("langLabel"));
  }

  document.querySelectorAll("[data-lang-option]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.langOption === currentLang);
    button.onclick = () => changeLanguage(button.dataset.langOption);
  });
}

function render(){
  const app = document.getElementById("app");

  renderChrome();
  app.innerHTML = `
    ${renderBizPanel()}
    ${renderCategoryPanel()}
    ${renderAnswerPanel()}
  `;

  bindAppEvents();
}

render();
