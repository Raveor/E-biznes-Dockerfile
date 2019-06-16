# --- !Ups
CREATE TABLE `t_authors` (
  `author_id` int(11) NOT NULL,
  `surname` varchar(30) COLLATE utf8_bin NOT NULL,
  `author_name` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(300) COLLATE utf8_bin NOT NULL,
  `author_id` int(11) NOT NULL,
  `publishing_house_id` int(11) NOT NULL,
  `publish_year` int(11) NOT NULL,
  `description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `book_price` double NOT NULL,
  `book_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_book_types` (
  `book_type_id` int(11) NOT NULL,
  `type_name` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_order2books` (
  `order_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_orders` (
  `order_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_publishing_houses` (
  `publishing_house_id` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `t_users` (
  `client_id` int(11) NOT NULL,
  `username` varchar(60) COLLATE utf8_bin NOT NULL,
  `email` varchar(60) COLLATE utf8_bin NOT NULL,
  `twitter_id` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `facebook_id` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `admin_flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `t_authors` (`author_id`, `surname`, `author_name`) VALUES
(1, 'Martin', 'George R. R.'),
(2, 'Dobbs', 'Michael'),
(3, 'Książkiewicz', 'Maciej'),
(4, 'brennus', 'brennus'),
(5, 'brennus', 'brennus'),
(8, 'Oto', 'Ja Zedytowany'),
(11, 'Oauth', 'Ouath');

INSERT INTO `t_books` (`book_id`, `title`, `author_id`, `publishing_house_id`, `publish_year`, `description`, `book_price`, `book_type_id`) VALUES
(1, 'House of Cards', 2, 1, 2015, 'House of Cards – kto rozdaje karty na najwyższych szczeblach władzy? \r\nOpowieść-fenomen, która zachwyciła miliony widzów i czytelników na całym świecie.\r\nCzłowieka motywuje nie szacunek, lecz strach. To na nim buduje się imperia i za jego sprawą wszczyna rewolucje. W tym tkwi sekret wielkich ludzi. Kiedy ktoś się ciebie boi, zniszczysz go, zmiażdżysz, a w efekcie on zawsze obdarzy cię szacunkiem. Prymitywny strach jest upajający, wszechogarniający, wyzwalający. Zawsze silniejszy od szacunku. Zawsze.\r\n\r\nMichael Dobbs wie o czym pisze. Sam wiele lat był politykiem, który z bliska obserwował, jak działają mechanizmy władzy. Swoje doświadczenia przekuł w fascynującą opowieść o korupcji, manipulacji i ambicji, która każe człowiekowi iść po trupach do celu. \r\nJak daleko można się posunąć, by osiągnąć upragniony cel? \r\nOd tej książki rozpoczęła się historia jednego z najlepszych seriali XXI wieku.\r\n', 50, 1),
(2, 'Gra o Tron', 1, 2, 1998, 'W Zachodnich Krainach o ośmiu tysiącach lat zapisanej historii widmo wojen i katastrofy nieustannie wisi nad ludźmi. Zbliża się zima, lodowate wichry wieją z północy, gdzie schroniły się wyparte przez ludzi pradawne rasy i starzy bogowie. Zbuntowani władcy na szczęście pokonali szalonego Smoczego Króla, Aerysa Targaryena, zasiadającego na Żelaznym Tronie Zachodnich Krain, lecz obalony władca pozostawił po sobie potomstwo, równie szalone jak on sam... Tron objął Robert - najznamienitszy z buntowników. Minęły już lata pokoju i oto możnowładcy zaczynają grę o tron.\r\n', 60, 1),
(3, 'TYTULsdfdf', 1, 2, 1234, 'sdfdsfsdfdsfsdfaszcxc', 3, 1),
(4, 'addghhggghhg', 3, 1, 1234, 'fsfsdfsfhghgugu', 4, 1),
(5, 'Moja mala ksiazka', 3, 3, 2019, 'TO MOJA KSIAZKA', 200.5, 2);

INSERT INTO `t_book_types` (`book_type_id`, `type_name`) VALUES
(1, 'Fantasy'),
(2, 'Przygodowa');

INSERT INTO `t_order2books` (`order_id`, `book_id`, `quantity`) VALUES
(1, 1, 5),
(1, 2, 3);

INSERT INTO `t_orders` (`order_id`, `client_id`) VALUES
(1, 2);

INSERT INTO `t_publishing_houses` (`publishing_house_id`, `name`) VALUES
(1, 'Społeczny Instytut Wydawniczy Znak'),
(2, 'Zysk i S-ka Wydawnictwo'),
(3, 'Abecadło'),
(4, 'sdfsdf'),
(5, 'Moje wydawnictwo');

INSERT INTO `t_users` (`client_id`, `username`, `email`, `twitter_id`, `facebook_id`, `admin_flag`) VALUES
(2, 'Maciej Ksi??kiewicz', 'ksiazkiewiczmaciej@outlook.com', '2824172378', NULL, 1),
(3, 'Maciek Ksi??kiewicz', 'ksiazkiewiczmaciej@outlook.com', NULL, '2491348260904988', 0);

ALTER TABLE `t_authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Indeksy dla tabeli `t_books`
--
ALTER TABLE `t_books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `publishing_house_id` (`publishing_house_id`),
  ADD KEY `ct_t_books_book_type_id_fk` (`book_type_id`);

--
-- Indeksy dla tabeli `t_book_types`
--
ALTER TABLE `t_book_types`
  ADD PRIMARY KEY (`book_type_id`);

--
-- Indeksy dla tabeli `t_order2books`
--
ALTER TABLE `t_order2books`
  ADD UNIQUE KEY `order_id` (`order_id`,`book_id`),
  ADD KEY `ct_t_order2books_book_id_fk` (`book_id`);

--
-- Indeksy dla tabeli `t_orders`
--
ALTER TABLE `t_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `ct_t_orders_client_id_fk` (`client_id`);

--
-- Indeksy dla tabeli `t_publishing_houses`
--
ALTER TABLE `t_publishing_houses`
  ADD PRIMARY KEY (`publishing_house_id`);

--
-- Indeksy dla tabeli `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`client_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `t_authors`
--
ALTER TABLE `t_authors`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `t_books`
--
ALTER TABLE `t_books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `t_book_types`
--
ALTER TABLE `t_book_types`
  MODIFY `book_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `t_orders`
--
ALTER TABLE `t_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `t_publishing_houses`
--
ALTER TABLE `t_publishing_houses`
  MODIFY `publishing_house_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `t_users`
--
ALTER TABLE `t_users`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `t_books`
--
ALTER TABLE `t_books`
  ADD CONSTRAINT `ct_t_books_author_fk` FOREIGN KEY (`author_id`) REFERENCES `t_authors` (`author_id`),
  ADD CONSTRAINT `ct_t_books_book_type_id_fk` FOREIGN KEY (`book_type_id`) REFERENCES `t_book_types` (`book_type_id`),
  ADD CONSTRAINT `ct_t_books_publishing_house_fk` FOREIGN KEY (`publishing_house_id`) REFERENCES `t_publishing_houses` (`publishing_house_id`);

--
-- Ograniczenia dla tabeli `t_order2books`
--
ALTER TABLE `t_order2books`
  ADD CONSTRAINT `ct_t_order2books_book_id_fk` FOREIGN KEY (`book_id`) REFERENCES `t_books` (`book_id`),
  ADD CONSTRAINT `ct_t_order2books_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `t_orders` (`order_id`);

--
-- Ograniczenia dla tabeli `t_orders`
--
ALTER TABLE `t_orders`
  ADD CONSTRAINT `ct_t_orders_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `t_users` (`client_id`);


# --- !Downs

DROP TABLE IF EXISTS `t_order2books`;

DROP TABLE IF EXISTS `t_orders`;

DROP TABLE IF EXISTS `t_users`;

DROP TABLE IF EXISTS `t_books`;

DROP TABLE IF EXISTS `t_authors`;

DROP TABLE IF EXISTS `t_book_types`;

DROP TABLE IF EXISTS `t_publishing_houses`;