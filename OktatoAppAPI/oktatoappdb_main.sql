-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2019 at 01:40 PM
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
DROP DATABASE IF EXISTS `oktatoappdb`;
CREATE DATABASE IF NOT EXISTS `oktatoappdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `oktatoappdb`;

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classroom_to_game`
--

CREATE TABLE `classroom_to_game` (
  `is_active` tinyint(4) DEFAULT NULL,
  `game_id_pk` int(11) NOT NULL,
  `classroom_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `correct_answer`
--

CREATE TABLE `correct_answer` (
  `question_id` int(11) NOT NULL,
  `correct_answer` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `difficulty`
--

CREATE TABLE `difficulty` (
  `difficulty_level` int(11) NOT NULL,
  `diffculty_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `game_mode`
--

CREATE TABLE `game_mode` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `game_session`
--

CREATE TABLE `game_session` (
  `id` int(11) NOT NULL,
  `session_name` varchar(45) NOT NULL,
  `max_points` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `difficulty_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `permission_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `question` varchar(250) NOT NULL,
  `points` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `statistic`
--

CREATE TABLE `statistic` (
  `id` int(11) NOT NULL,
  `gained_points` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_to_classroom`
--

CREATE TABLE `user_to_classroom` (
  `user_id_pk` int(11) NOT NULL,
  `classroom_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_to_role`
--

CREATE TABLE `user_to_role` (
  `user_id_pk` int(11) NOT NULL,
  `role_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wrong_answer`
--

CREATE TABLE `wrong_answer` (
  `id` varchar(45) NOT NULL,
  `wrong_answer` varchar(250) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `classroom_to_game`
--
ALTER TABLE `classroom_to_game`
  ADD PRIMARY KEY (`game_id_pk`,`classroom_id_pk`),
  ADD KEY `fk_Classroom_To_Game_Game1_idx` (`game_id_pk`),
  ADD KEY `fk_Classroom_To_Game_Classroom1_idx` (`classroom_id_pk`);

--
-- Indexes for table `correct_answer`
--
ALTER TABLE `correct_answer`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `Question_Id_UNIQUE` (`question_id`),
  ADD KEY `fk_Correct_answer_Question1_idx` (`question_id`);

--
-- Indexes for table `difficulty`
--
ALTER TABLE `difficulty`
  ADD PRIMARY KEY (`difficulty_level`),
  ADD UNIQUE KEY `diffculty_name` (`diffculty_name`),
  ADD UNIQUE KEY `Diffculty_Name_UNIQUE` (`diffculty_name`);

--
-- Indexes for table `game_mode`
--
ALTER TABLE `game_mode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `game_session`
--
ALTER TABLE `game_session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_name_UNIQUE` (`session_name`),
  ADD KEY `fk_Game_session_Game1_idx` (`game_id`),
  ADD KEY `fk_Game_session_Difficulty1_idx` (`difficulty_level`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Question_Game_session1_idx` (`game_session_id`);

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
-- Indexes for table `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Statistic_User1_idx` (`user_id`),
  ADD KEY `fk_Statistic_Game_session1_idx` (`game_session_id`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_to_classroom`
--
ALTER TABLE `user_to_classroom`
  ADD PRIMARY KEY (`user_id_pk`,`classroom_id_pk`),
  ADD KEY `fk_User_To_Classroom_User1_idx` (`user_id_pk`),
  ADD KEY `fk_User_To_Classroom_Classroom1_idx` (`classroom_id_pk`);

--
-- Indexes for table `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD PRIMARY KEY (`user_id_pk`,`role_id_pk`),
  ADD UNIQUE KEY `user_id_pk` (`user_id_pk`),
  ADD KEY `fk_user_to_role_role1` (`role_id_pk`);

--
-- Indexes for table `wrong_answer`
--
ALTER TABLE `wrong_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Wrong_answer_Question1_idx` (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `game_mode`
--
ALTER TABLE `game_mode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `game_session`
--
ALTER TABLE `game_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `statistic`
--
ALTER TABLE `statistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `classroom_to_game`
--
ALTER TABLE `classroom_to_game`
  ADD CONSTRAINT `fk_Classroom_To_Game_Classroom1` FOREIGN KEY (`classroom_id_pk`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Classroom_To_Game_Game1` FOREIGN KEY (`game_id_pk`) REFERENCES `game_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `correct_answer`
--
ALTER TABLE `correct_answer`
  ADD CONSTRAINT `fk_Correct_answer_Question1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `game_session`
--
ALTER TABLE `game_session`
  ADD CONSTRAINT `fk_Game_session_Difficulty1` FOREIGN KEY (`difficulty_level`) REFERENCES `difficulty` (`difficulty_level`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_session_Game1` FOREIGN KEY (`game_id`) REFERENCES `game_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_Question_Game_session1` FOREIGN KEY (`game_session_id`) REFERENCES `game_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `role_to_permission`
--
ALTER TABLE `role_to_permission`
  ADD CONSTRAINT `fk_role_to_permission_permission1` FOREIGN KEY (`permission_id_pk`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_role_to_permission_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `statistic`
--
ALTER TABLE `statistic`
  ADD CONSTRAINT `fk_Statistic_Game_session1` FOREIGN KEY (`game_session_id`) REFERENCES `game_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Statistic_User1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `fk_Token_user1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_to_classroom`
--
ALTER TABLE `user_to_classroom`
  ADD CONSTRAINT `fk_User_To_Classroom_Classroom1` FOREIGN KEY (`classroom_id_pk`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_To_Classroom_User1` FOREIGN KEY (`user_id_pk`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD CONSTRAINT `fk_user_to_role_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_to_role_user1` FOREIGN KEY (`user_id_pk`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wrong_answer`
--
ALTER TABLE `wrong_answer`
  ADD CONSTRAINT `fk_Wrong_answer_Question1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
