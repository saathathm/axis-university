const express = require("express");

const {
  createCertificate,
  deleteCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  verifyCertificate,
} = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  validateCreateCertificate,
  validateUpdateCertificate,
} = require("../validators/certificateValidator");

const router = express.Router();

const protectedCertificateAccess = [authMiddleware, roleMiddleware("ADMIN")];

router.get("/verify/:certificateNumber", verifyCertificate);
router.get("/", protectedCertificateAccess, getAllCertificates);
router.get("/:id", protectedCertificateAccess, getCertificateById);
router.post(
  "/",
  protectedCertificateAccess,
  validateCreateCertificate,
  createCertificate
);
router.put(
  "/:id",
  protectedCertificateAccess,
  validateUpdateCertificate,
  updateCertificate
);
router.delete("/:id", protectedCertificateAccess, deleteCertificate);

module.exports = router;
