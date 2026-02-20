import { body, param } from "express-validator";
import { validateJWT } from "./validate-JWT.js";
import { checkValidators } from "./check-validators.js";

export const validateCreatePost = [
  validateJWT,

  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 2, max: 150 })
    .withMessage("El título debe tener entre 2 y 150 caracteres"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isIn(["TECNOLOGIA", "SALUD", "DEPORTES", "OTROS"])
    .withMessage("Categoría no válida"),

  body("text")
    .trim()
    .notEmpty()
    .withMessage("El contenido de la publicación es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El texto debe tener al menos 5 caracteres"),

  checkValidators,
];

export const validateUpdatePost = [
  validateJWT,

  param("id").notEmpty().withMessage("El ID de la publicación es obligatorio"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("El título debe tener entre 2 y 150 caracteres"),

  body("category")
    .optional()
    .trim()
    .isIn(["TECNOLOGIA", "SALUD", "DEPORTES", "OTROS"])
    .withMessage("Categoría no válida"),

  body("text")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("El texto debe tener al menos 5 caracteres"),

  checkValidators,
];
