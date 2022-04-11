const _ = require("lodash");
const validator = require("validator");
const User = require("../models/User");

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/login", {
    title: "Login",
  });
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  res.render("account/profile", {
    title: "Account Management",
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/account");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user.email !== req.body.email) user.emailVerified = false;
    user.email = req.body.email || "";
    user.profile.name = req.body.name || "";
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash("errors", {
            msg: "The email address you have entered is already associated with an account.",
          });
          return res.redirect("/account");
        }
        return next(err);
      }
      req.flash("success", { msg: "Profile information has been updated." });
      res.redirect("/account");
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, (err) => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash("info", { msg: "Your account has been deleted." });
    res.redirect("/");
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const { provider } = req.params;
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter(
      (token) => token.kind !== provider.toLowerCase()
    );
    // Some auth providers do not provide an email address in the user profile.
    // As a result, we need to verify that unlinking the provider is safe by ensuring
    // that another login method exists.
    if (
      !(user.email && user.password) &&
      tokensWithoutProviderToUnlink.length === 0
    ) {
      req.flash("errors", {
        msg:
          `The ${_.startCase(
            _.toLower(provider)
          )} account cannot be unlinked without another form of login enabled.` +
          " Please link another account or add an email address and password.",
      });
      return res.redirect("/account");
    }
    user.tokens = tokensWithoutProviderToUnlink;
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash("info", {
        msg: `${_.startCase(_.toLower(provider))} account has been unlinked.`,
      });
      res.redirect("/account");
    });
  });
};
