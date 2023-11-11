/*
 Navicat Premium Data Transfer

 Source Server         : MySQLDocker
 Source Server Type    : MySQL
 Source Server Version : 100615
 Source Host           : localhost:3306
 Source Schema         : identity_database

 Target Server Type    : MySQL
 Target Server Version : 100615
 File Encoding         : 65001

 Date: 11/11/2023 19:38:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `ID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `create_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('e2eab0ea-fb88-4bfe-96c8-adc4cc86bcaa', 'Product System', 'Product for System Init', 'active', '2023-11-11 12:31:38.829090', '2023-11-11 12:31:38.829090');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `verified_phone` tinyint NOT NULL DEFAULT 0,
  `verified_email` tinyint NOT NULL DEFAULT 0,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `create_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`(`email` ASC) USING BTREE,
  UNIQUE INDEX `IDX_8e1f623798118e629b46a9e629`(`phone` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '$2b$10$MVa.1PsgKN0Kg1S.RhW.o.B14B2igBCnYdVVGJDpEowqbkqzXtVs2', 'admin.admin', 'HTGSOFT Admin', 'admin@htgsoft.com', '+84999999999', 1, 1, 'active', '2023-11-11 12:35:12.159451', '2023-11-11 12:35:50.940472');

-- ----------------------------
-- Table structure for user_products_product
-- ----------------------------
DROP TABLE IF EXISTS `user_products_product`;
CREATE TABLE `user_products_product`  (
  `userID` int NOT NULL,
  `productID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`userID`, `productID`) USING BTREE,
  INDEX `IDX_8cd5e9463b89f9a21baa266151`(`userID` ASC) USING BTREE,
  INDEX `IDX_b5f86f089d584a3a8a3085a6f7`(`productID` ASC) USING BTREE,
  CONSTRAINT `FK_8cd5e9463b89f9a21baa2661513` FOREIGN KEY (`userID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b5f86f089d584a3a8a3085a6f75` FOREIGN KEY (`productID`) REFERENCES `product` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_products_product
-- ----------------------------
INSERT INTO `user_products_product` VALUES (1, 'e2eab0ea-fb88-4bfe-96c8-adc4cc86bcaa');

SET FOREIGN_KEY_CHECKS = 1;
