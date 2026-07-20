# AML FAQ

這是一個可直接部署到 GitHub Pages 的純前端靜態網站，使用 HTML、CSS、JavaScript 製作，不需要安裝套件或執行建置流程。

## 專案結構

```text
AML Buddy/
├── index.html
├── assets/
│   └── cathay-logo.png
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── data.js
├── .nojekyll
├── .gitignore
└── README.md
```

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可。

## 上傳到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `aml-faq`。
2. 進入 repository，選擇 `Add file` → `Upload files`。
3. 上傳以下檔案與資料夾：
   - `index.html`
   - `assets/`
   - `css/`
   - `js/`
   - `.nojekyll`
   - `.gitignore`
   - `README.md`
4. Commit 完成後，進入 `Settings` → `Pages`。
5. 在 `Build and deployment` 裡選：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. 儲存後等待 GitHub Pages 產生網址。

部署完成後，網址通常會長得像：

```text
https://你的帳號.github.io/你的repository名稱/
```

## 內容維護

問答內容集中在 `js/data.js`。目前資料採同一筆資料內含中英文欄位：

- `label.zh` / `label.en`
- `q.zh` / `q.en`
- `a.zh` / `a.en`
- `ref.zh` / `ref.en`

畫面流程集中在 `js/app.js`。若只是修改題庫內容，通常只需要調整 `js/data.js`。
