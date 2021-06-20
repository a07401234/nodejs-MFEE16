const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../utils/db");
const bcrypt = require("bcrypt");
const multer = require("multer");
// 設定上傳檔案的儲存方式
const path = require("path");
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // routes/auth.js --> 現在位置
    // public/uploads --> 希望上傳儲存的位置
    // __dirname: ..../routes/../public/uploads
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // 抓出副檔名
    const ext = file.originalname.split(".").pop();
    // 組合出自己想要的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
// 要用 multer 來做一個上傳工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    // console.log(file);
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("不合法的 file type"), false);
    }
    // file.originalname: Name of the file on the user's computer
    // 101.jpeg
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("是不合格的副檔名"));
    }
    // 檔案ＯＫ, 接受這個檔案
    cb(null, true);
  },
  limits: {
    // 限制檔案的上限 2M
    fileSize: 2 * 1024 * 1024,
  },
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

// 註冊表單資料的驗證規則
const registerRules = [
  // 確認 Email 格式是否正確
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  // 密碼限制至少 6碼以上
  body("password").isLength({ min: 6 }),
  // 確認密碼一致
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    // 加上中間函式(express.urlencoded)的設定
    // 就可以透過 req.body 來取得 post 資料
    console.log(req.body);
    // 後端工程師絕對不能相信來自前端的資料，所以要做驗證

    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
      // 不是空的，就是有問題
      console.log(validateResult);
      // 暫時先這樣做
      return next(new Error("註冊表單資料有問題"));
    }
    // 先檢查這個 Email 是否已經註冊過
    let checkResult = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );
    // 如果已經註冊過
    if (checkResult.length > 0) {
      return next(new Error("已經註冊過了"));
    }
    console.log(req.file);
    // 沒有註冊過，新增一筆到資料庫
    // bcrypt是密碼加密套件，套件記得都要 require 進來才能使用
    let result = await connection.queryAsync(
      "INSERT INTO members (email, password, name, photo) VALUES (?);",
      [
        [
          req.body.email,
          bcrypt.hash(req.body.password, 10),
          req.body.name,
          `/uploads/${req.file.filename}`,
        ],
      ]
    );
    res.send("註冊成功");

    //   res.send("這裡是 POST");
  }
);
router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
