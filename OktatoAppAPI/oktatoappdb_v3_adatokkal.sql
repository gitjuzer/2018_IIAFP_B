-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Ápr 08. 10:22
-- Kiszolgáló verziója: 5.7.14
-- PHP verzió: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `oktatoappdb`
--
USE `heroku_9f6b4f373cfd5f1`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `classroom`
--

CREATE TABLE `classroom` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `classroom`
--

INSERT INTO `classroom` (`id`, `name`) VALUES
(1, 'testclass');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `classroom_to_game`
--

CREATE TABLE `classroom_to_game` (
  `is_active` tinyint(4) DEFAULT NULL,
  `game_id_pk` int(11) NOT NULL,
  `classroom_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `classroom_to_game`
--

INSERT INTO `classroom_to_game` (`is_active`, `game_id_pk`, `classroom_id_pk`) VALUES
(NULL, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `correct_answer`
--

CREATE TABLE `correct_answer` (
  `question_id` int(11) NOT NULL,
  `correct_answer` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `correct_answer`
--

INSERT INTO `correct_answer` (`question_id`, `correct_answer`) VALUES
(1, '7'),
(2, '4');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `difficulty`
--

CREATE TABLE `difficulty` (
  `difficulty_level` int(11) NOT NULL,
  `diffculty_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `difficulty`
--

INSERT INTO `difficulty` (`difficulty_level`, `diffculty_name`) VALUES
(1, 'easy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `game_mode`
--

CREATE TABLE `game_mode` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `game_mode`
--

INSERT INTO `game_mode` (`id`, `name`, `description`) VALUES
(1, 'feleletvalaszto', 'kérdések jönnek és meg kell válaszolni öket helyesen');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `game_session`
--

CREATE TABLE `game_session` (
  `id` int(11) NOT NULL,
  `session_name` varchar(45) NOT NULL,
  `max_points` int(11) DEFAULT NULL,
  `game_id` int(11) NOT NULL,
  `difficulty_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `game_session`
--

INSERT INTO `game_session` (`id`, `session_name`, `max_points`, `game_id`, `difficulty_level`) VALUES
(1, 'matek', 10, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `permission_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `permission`
--

INSERT INTO `permission` (`id`, `permission_name`) VALUES
(4, 'ADD_NEW_QUESTION'),
(5, 'DELETE_QUESTION');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `question` varchar(250) NOT NULL,
  `points` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `question`
--

INSERT INTO `question` (`id`, `question`, `points`, `game_session_id`) VALUES
(1, 'Mennyi 5+2?', 1, 1),
(2, 'Mennyi 2^2?', 2, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `role_description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `role`
--

INSERT INTO `role` (`id`, `role_name`, `role_description`) VALUES
(1, 'TEACHER', 'Tanár'),
(2, 'STUDENT', 'Diák'),
(3, 'ADMIN', 'Adminisztrátor');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role_to_permission`
--

CREATE TABLE `role_to_permission` (
  `role_id_pk` int(11) NOT NULL,
  `permission_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `role_to_permission`
--

INSERT INTO `role_to_permission` (`role_id_pk`, `permission_id_pk`) VALUES
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `statistic`
--

CREATE TABLE `statistic` (
  `id` int(11) NOT NULL,
  `gained_points` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `statistic`
--

INSERT INTO `statistic` (`id`, `gained_points`, `created_at`, `user_id`, `game_session_id`) VALUES
(1, 6, '2019-04-08 00:00:00', 21, 1),
(2, 0, '2019-04-08 00:00:00', 21, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `token`
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
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(1000) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password_hash`, `first_name`, `last_name`, `created_at`, `last_login`) VALUES
(21, 'test', 'test@test.com', '$2b$10$8fHxsu2NZ1slD0AmUrw3bemu6R1ybQTP2Bzs.kCx8BTdaJzF68/Q6', 'test', 'test', '2019-04-08 12:15:25', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_to_classroom`
--

CREATE TABLE `user_to_classroom` (
  `user_id_pk` int(11) NOT NULL,
  `classroom_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `user_to_classroom`
--

INSERT INTO `user_to_classroom` (`user_id_pk`, `classroom_id_pk`) VALUES
(21, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_to_role`
--

CREATE TABLE `user_to_role` (
  `user_id_pk` int(11) NOT NULL,
  `role_id_pk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `user_to_role`
--

INSERT INTO `user_to_role` (`user_id_pk`, `role_id_pk`) VALUES
(21, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `wrong_answer`
--

CREATE TABLE `wrong_answer` (
  `id` int(11) NOT NULL,
  `wrong_answer` varchar(250) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `wrong_answer`
--

INSERT INTO `wrong_answer` (`id`, `wrong_answer`, `question_id`) VALUES
(1, '8', 1),
(2, '1', 1),
(3, '54', 2),
(4, '32', 2),
(5, '321', 2);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `classroom_to_game`
--
ALTER TABLE `classroom_to_game`
  ADD PRIMARY KEY (`game_id_pk`,`classroom_id_pk`),
  ADD KEY `fk_Classroom_To_Game_Game1_idx` (`game_id_pk`),
  ADD KEY `fk_Classroom_To_Game_Classroom1_idx` (`classroom_id_pk`);

--
-- A tábla indexei `correct_answer`
--
ALTER TABLE `correct_answer`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `Question_Id_UNIQUE` (`question_id`),
  ADD KEY `fk_Correct_answer_Question1_idx` (`question_id`);

--
-- A tábla indexei `difficulty`
--
ALTER TABLE `difficulty`
  ADD PRIMARY KEY (`difficulty_level`),
  ADD UNIQUE KEY `diffculty_name` (`diffculty_name`),
  ADD UNIQUE KEY `Diffculty_Name_UNIQUE` (`diffculty_name`);

--
-- A tábla indexei `game_mode`
--
ALTER TABLE `game_mode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `game_session`
--
ALTER TABLE `game_session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_name_UNIQUE` (`session_name`),
  ADD KEY `fk_Game_session_Game1_idx` (`game_id`),
  ADD KEY `fk_Game_session_Difficulty1_idx` (`difficulty_level`);

--
-- A tábla indexei `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`);

--
-- A tábla indexei `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Question_Game_session1_idx` (`game_session_id`);

--
-- A tábla indexei `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- A tábla indexei `role_to_permission`
--
ALTER TABLE `role_to_permission`
  ADD PRIMARY KEY (`role_id_pk`,`permission_id_pk`),
  ADD KEY `fk_role_to_permission_role1_idx` (`role_id_pk`),
  ADD KEY `fk_role_to_permission_permission1_idx` (`permission_id_pk`);

--
-- A tábla indexei `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Statistic_User1_idx` (`user_id`),
  ADD KEY `fk_Statistic_Game_session1_idx` (`game_session_id`);

--
-- A tábla indexei `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_token_user1_idx` (`user_Id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `user_to_classroom`
--
ALTER TABLE `user_to_classroom`
  ADD PRIMARY KEY (`user_id_pk`,`classroom_id_pk`),
  ADD KEY `fk_User_To_Classroom_User1_idx` (`user_id_pk`),
  ADD KEY `fk_User_To_Classroom_Classroom1_idx` (`classroom_id_pk`);

--
-- A tábla indexei `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD PRIMARY KEY (`user_id_pk`,`role_id_pk`),
  ADD UNIQUE KEY `user_id_pk` (`user_id_pk`),
  ADD KEY `fk_user_to_role_role1` (`role_id_pk`);

--
-- A tábla indexei `wrong_answer`
--
ALTER TABLE `wrong_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Wrong_answer_Question1_idx` (`question_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT a táblához `game_mode`
--
ALTER TABLE `game_mode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT a táblához `game_session`
--
ALTER TABLE `game_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT a táblához `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT a táblához `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT a táblához `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT a táblához `statistic`
--
ALTER TABLE `statistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT a táblához `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT a táblához `wrong_answer`
--
ALTER TABLE `wrong_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `classroom_to_game`
--
ALTER TABLE `classroom_to_game`
  ADD CONSTRAINT `fk_Classroom_To_Game_Classroom1` FOREIGN KEY (`classroom_id_pk`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Classroom_To_Game_Game1` FOREIGN KEY (`game_id_pk`) REFERENCES `game_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `correct_answer`
--
ALTER TABLE `correct_answer`
  ADD CONSTRAINT `fk_Correct_answer_Question1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `game_session`
--
ALTER TABLE `game_session`
  ADD CONSTRAINT `fk_Game_session_Difficulty1` FOREIGN KEY (`difficulty_level`) REFERENCES `difficulty` (`difficulty_level`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Game_session_Game1` FOREIGN KEY (`game_id`) REFERENCES `game_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_Question_Game_session1` FOREIGN KEY (`game_session_id`) REFERENCES `game_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `role_to_permission`
--
ALTER TABLE `role_to_permission`
  ADD CONSTRAINT `fk_role_to_permission_permission1` FOREIGN KEY (`permission_id_pk`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_role_to_permission_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `statistic`
--
ALTER TABLE `statistic`
  ADD CONSTRAINT `fk_Statistic_Game_session1` FOREIGN KEY (`game_session_id`) REFERENCES `game_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Statistic_User1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `fk_Token_user1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `user_to_classroom`
--
ALTER TABLE `user_to_classroom`
  ADD CONSTRAINT `fk_User_To_Classroom_Classroom1` FOREIGN KEY (`classroom_id_pk`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_To_Classroom_User1` FOREIGN KEY (`user_id_pk`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `user_to_role`
--
ALTER TABLE `user_to_role`
  ADD CONSTRAINT `fk_user_to_role_role1` FOREIGN KEY (`role_id_pk`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_to_role_user1` FOREIGN KEY (`user_id_pk`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `wrong_answer`
--
ALTER TABLE `wrong_answer`
  ADD CONSTRAINT `fk_Wrong_answer_Question1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
