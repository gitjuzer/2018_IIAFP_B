-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2019 at 09:43 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oktatoappdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `permission_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `permission_name`) VALUES
(3, 'INSERT_NEW_QUESTION'),
(1, 'INSERT_TO_CLASSROOM');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `role_description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`, `role_description`) VALUES
(1, 'TEACHER', 'Tanár'),
(2, 'STUDENT', 'Diák'),
(3, 'ADMIN', 'Adminisztrátor');

-- --------------------------------------------------------

--
-- Table structure for table `role_to_permission`
--

CREATE TABLE `role_to_permission` (
  `role_id_pk` int(11) NOT NULL,
  `permission_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_to_permission`
--

INSERT INTO `role_to_permission` (`role_id_pk`, `permission_id_pk`) VALUES
(2, 3),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` varchar(10000) NOT NULL,
  `created_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `user_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `token`, `created_at`, `expires_at`, `is_active`, `user_Id`) VALUES
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhjdiIsInVzZXJfaWQiOjIsImlhdCI6MTU1Mzg4OTE0MiwiZXhwIjoxNTUzODkyNzQyfQ._eYPwSCLbGy50I3RjYHyveu5oh6ncqtjt1t4nzkgOCg', '2019-03-29 20:52:22', '2019-03-29 21:52:22', 1, 2),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhjdiIsInVzZXJfaWQiOjIsImlhdCI6MTU1Mzg5MTU2NCwiZXhwIjoxNTUzODk1MTY0fQ.sbsA8o7Y-o_8N2-QPk9LOIyyKizie1S9h047ZANM2j0', '2019-03-29 21:32:44', '2019-03-29 22:32:44', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `last_login`) VALUES
(1, 'test', 'test', 'test', 'test', '2019-03-29 16:39:15', NULL),
(2, 'xcv', 'test', 'test', 'test', '2019-03-29 20:47:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_to_role`
--

CREATE TABLE `user_to_role` (
  `user_id_pk` int(11) NOT NULL,
  `role_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_to_role`
--

INSERT INTO `user_to_role` (`user_id_pk`, `role_id_pk`) VALUES
(1, 3),
(2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `role_to_permission`
--
ALTER TABLE `role_to_permission`
  ADD PRIMARY KEY (`role_id_pk`,`permission_id_pk`),
  ADD KEY `fk_role_to_permission_role1_idx` (`role_id_pk`),
  ADD KEY `fk_role_to_permission_permission1_idx` (`permission_id_pk`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_token_user1_idx` (`user_Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD PRIMARY KEY (`user_id_pk`,`role_id_pk`),
  ADD UNIQUE KEY `user_id_pk` (`user_id_pk`),
  ADD KEY `fk_user_to_role_role1` (`role_id_pk`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role_to_permission`
--
ALTER TABLE `role_to_permission`
  ADD CONSTRAINT `fk_role_to_permission_permission1` FOREIGN KEY (`permission_id_pk`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_role_to_permission_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `fk_Token_user1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD CONSTRAINT `fk_user_to_role_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_to_role_user1` FOREIGN KEY (`user_id_pk`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
