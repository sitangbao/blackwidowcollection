# Natasha Romanoff Collection Archive

这是一个可直接部署到 GitHub Pages 的静态收藏图鉴网站。无需安装软件或购买服务器。

## 网站功能
- 日谷、美谷、欧谷、其他地区筛选
- 11 种商品类别筛选
- 商品名称/系列/备注搜索
- 商品照片网格、点击查看详情
- 收藏数量统计
- 手机与电脑自适应布局

## 如何添加自己的商品

1. 把商品图片放进 `assets` 文件夹，建议使用压缩后的 `.webp` 或 `.jpg`。
2. 打开 `data.js`。
3. 复制一个示例商品对象，修改资料，例如：

```js
{
  id: "nat-003",
  name: "娜塔莎红色徽章",
  region: "日谷",
  category: "吧唧",
  year: "2024",
  series: "系列名称",
  originalPrice: "¥800",
  paidPrice: "RM25",
  image: "assets/nat-003.webp",
  notes: "补充说明"
}
```

4. 每件商品的 `id` 必须不同。
5. `region` 请使用：`日谷`、`美谷`、`欧谷`、`其他`。
6. `category` 请使用以下其中一项：
   `吧唧`、`冰箱贴`、`立牌`、`挂件类`、`纸质类`、`文具类`、`水杯`、`迷你手办`、`音像制品类`、`服饰类`、`其他`。
7. 保存后重新上传/提交到 GitHub，网站会自动更新。

## 发布到 GitHub Pages

1. 登录 https://github.com/ 并创建一个新仓库，例如 `natasha-collection`。
2. 将本压缩包解压，把 `index.html`、`style.css`、`script.js`、`data.js` 和 `assets` 文件夹上传到仓库根目录。
3. 在仓库打开 **Settings → Pages**。
4. 在 **Build and deployment** 下选择 **Deploy from a branch**。
5. Branch 选择 `main`，文件夹选择 `/ (root)`，按 **Save**。
6. 等待 GitHub Pages 发布，网址通常为 `https://你的用户名.github.io/natasha-collection/`。

## 重要说明
- GitHub Pages 网站是公开的；不要放私人资料。
- 这是静态网站，不包含在线后台。添加商品需要编辑 `data.js` 并上传图片。
- 建议保留原始高清图在自己的设备，只把压缩版放到网站。
- 这是个人收藏档案，与 Marvel / Disney 无隶属关系。商品图片与商标归其权利人所有。
