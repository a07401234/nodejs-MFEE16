const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../utils/db");
const bcrypt = require("bcrypt");

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

router.post("/register", registerRules, async (req, res, next) => {
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
  // 沒有註冊過，新增一筆到資料庫
  // bcrypt是密碼加密套件，套件記得都要 require 進來才能使用
  let result = await connection.queryAsync(
    "INSERT INTO members (email, password, name) VALUES (?);",
    [[req.body.email, bcrypt.hash(req.body.password), req.body.name]]
  );
  res.send("註冊成功");

  //   res.send("這裡是 POST");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
