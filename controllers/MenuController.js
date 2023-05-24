const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const MenuController = class {
  constructor() {
    this.menu = prisma.menu;
  }

  getMenusByRestaurant = async (req, res, next) => {
    try {
      const error = req.flash("error");
      const success = req.flash("success");
      const { id } = req.params;
      const resto = await prisma.resto.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      const menus = await this.menu.findMany({
        where: {
          restoId: parseInt(id),
        },
      });
      res.render("menus/index", { resto, menus, error, success });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  };

  createMenu = async (req, res, next) => {
    try {
      const error = req.flash("error");
      const { id } = req.params;
      const resto = await prisma.resto.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.render("menus/create", { resto, error });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  };

  storeMenu = async (req, res, next) => {
    try {
      const { id } = req.params;
      const resto = await prisma.resto.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!resto) {
        req.flash("error", "Restaurant not found");
        return res.redirect("/");
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash("error", error.msg);
        });
        return res.redirect(`/menus/create/${id}`);
      }
      const { name, description, price } = req.body;
      await this.menu.create({
        data: {
          name,
          description,
          price: parseInt(price),
          restoId: parseInt(id),
        },
      });
      req.flash("success", "Menu created successfully");
      return res.redirect(`/menus/${id}`);
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  };

  editMenu = async (req, res, next) => {
    try {
      const error = req.flash("error");
      const { id, menuId } = req.params;
      const resto = await prisma.resto.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!resto) throw new Error("Restaurant not found");
      const menu = await this.menu.findUnique({
        where: {
          id: parseInt(menuId),
        },
      });
      res.render("menus/edit", { resto, menu, error });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const { id, menuId } = req.params;
      const resto = await prisma.resto.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!resto) throw new Error("Restaurant not found");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash("error", error.msg);
        });
        return res.redirect(`/menus/edit/${id}/${menuId}`);
      }
      const { name, description, price } = req.body;
      await this.menu.update({
        where: {
          id: parseInt(menuId),
        },
        data: {
          name,
          description,
          price: parseInt(price),
        },
      });
      req.flash("success", "Menu updated successfully");
      return res.redirect(`/menus/${id}`);
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
        const { id, menuId } = req.params;
        const resto = await prisma.resto.findUnique({
            where: {
            id: parseInt(id),
            },
        });
        if (!resto) throw new Error("Restaurant not found");
        await this.menu.delete({
            where: {
            id: parseInt(menuId),
            },
        });
        req.flash("success", "Menu deleted successfully");
        return res.redirect(`/menus/${id}`);
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/");
    }
  };
};

module.exports = new MenuController();
