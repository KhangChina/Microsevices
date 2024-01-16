-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 16, 2024 at 02:04 AM
-- Server version: 10.6.16-MariaDB-1:10.6.16+maria~ubu2004
-- PHP Version: 8.0.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `identity_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `note` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `create_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `name`, `note`, `status`, `create_at`, `update_at`) VALUES
('e2eab0ea-fb88-4bfe-96c8-adc4cc86bcaa', 'Product System', 'Product for System Init', 'active', '2023-11-11 12:31:38.829090', '2023-11-11 12:31:38.829090');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` varchar(36) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(255) NOT NULL DEFAULT '',
  `full_name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `verified_phone` tinyint(4) NOT NULL DEFAULT 0,
  `verified_email` tinyint(4) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `create_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `password`, `username`, `full_name`, `email`, `phone`, `verified_phone`, `verified_email`, `status`, `create_at`, `update_at`) VALUES
('946e5ffd-f44f-44fd-b836-dbc19a23ab18', '$2b$10$MVa.1PsgKN0Kg1S.RhW.o.B14B2igBCnYdVVGJDpEowqbkqzXtVs2', 'admin@htgsoft.com', 'HTGSOFT Admin', 'admin@htgsoft.com', '+84964440770', 1, 1, 'active', '2024-01-16 01:25:28.471717', '2024-01-16 01:35:05.438253');

-- --------------------------------------------------------

--
-- Table structure for table `user-product`
--

CREATE TABLE `user-product` (
  `ID` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `create_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-product`
--

INSERT INTO `user-product` (`ID`, `user_id`, `product_id`, `create_at`, `update_at`) VALUES
('9073a433-b410-11ee-934f-0242c0a81002', '946e5ffd-f44f-44fd-b836-dbc19a23ab18', 'e2eab0ea-fb88-4bfe-96c8-adc4cc86bcaa', '2023-11-11 12:31:38.829090', '2023-11-11 12:31:38.829090');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `IDX_8e1f623798118e629b46a9e629` (`phone`);

--
-- Indexes for table `user-product`
--
ALTER TABLE `user-product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_68cd3e5dd5a72ff6883891de568` (`product_id`),
  ADD KEY `FK_d06b89655adeff6872175d35e53` (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user-product`
--
ALTER TABLE `user-product`
  ADD CONSTRAINT `FK_68cd3e5dd5a72ff6883891de568` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d06b89655adeff6872175d35e53` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
