const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { validationResult } = require('express-validator')

const RestoController = class {
    constructor() {
        this.resto = prisma.resto
    }

    getRestaurants = async (req, res, next) => {
        try {
            const error = req.flash('error')
            const success = req.flash('success')
            const restaurants = await this.resto.findMany()
            res.render('index', { restaurants, error, success });
        } catch (error) {
            next(error)
        }
    }

    createRestaurant = (req, res, next) => {
        res.render('create');
    }

    storeRestaurant = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(error => req.flash('error', error.msg))
                return res.redirect('/')
            }
            const { name, description, address } = req.body
            await this.resto.create({
                data: {
                    name,
                    description,
                    address
                }
            })
            req.flash('success', 'Restaurant added successfully')
            res.redirect('/');
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/');
        }
    }

    editRestaurant = async (req, res, next) => {
        try {
            const { id } = req.params
            const resto = await this.resto.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            res.render('edit', { resto });
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/');
        }
    }

    updateRestaurant = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(error => req.flash('error', error.msg))
                return res.redirect('/')
            }
            const { id } = req.params
            const { name, description, address } = req.body
            await this.resto.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    description,
                    address
                }
            })
            req.flash('success', 'Restaurant updated successfully')
            res.redirect('/');
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/');
        }
    }

    deleteRestaurant = async (req, res, next) => {
        try {
            const { id } = req.params
            await this.resto.delete({
                where: {
                    id: parseInt(id)
                }
            })
            req.flash('success', 'Restaurant deleted successfully')
            res.redirect('/');
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/');
        }
    }
}

module.exports = new RestoController()