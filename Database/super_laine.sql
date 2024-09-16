-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: ספטמבר 14, 2022 בזמן 06:18 AM
-- גרסת שרת: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `super_laine`
--
CREATE DATABASE IF NOT EXISTS `super_laine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `super_laine`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'Fruits and Vegetables'),
(2, 'Pastries and Breads'),
(3, 'Meat, Chicken and Fish'),
(4, 'Dairy products and Eggs'),
(5, 'Drinks'),
(6, 'Cleaning products');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `soppingCartId` int(11) NOT NULL,
  `totalPrice` decimal(6,2) NOT NULL,
  `deliveryCity` varchar(20) NOT NULL,
  `deliveryStreet` varchar(35) NOT NULL,
  `deliveryDate` date NOT NULL,
  `orderDate` date NOT NULL,
  `creditCard` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `soppingCartId`, `totalPrice`, `deliveryCity`, `deliveryStreet`, `deliveryDate`, `orderDate`, `creditCard`) VALUES
(29, 2, 66, '1230.00', 'petah tikva', 'yefe', '2022-08-24', '2022-08-14', '12312312'),
(30, 3, 67, '492.00', 'petah tikva', 'nona', '2022-08-17', '2022-08-14', '3213123'),
(35, 2, 74, '123.00', 'dsdfsf', 'dfasfasf', '2022-08-18', '2022-08-14', '9878798'),
(36, 2, 75, '123.00', 'sdfsdf', 'knlkjlkj', '2022-08-16', '2022-08-14', '8789798787897987'),
(39, 7, 79, '369.00', 'Petah-Tikva', 'wfwfwwef', '2022-08-16', '2022-08-14', '234234234234'),
(40, 8, 87, '671.90', 'Petah-Tikva', 'dlksfnjsdf fdsf sdf ', '2022-08-17', '2022-08-17', '1234124441'),
(41, 6, 83, '154.50', 'Petah-Tikva', 'dfgdfggf', '2022-08-24', '2022-08-20', '234234234234'),
(58, 6, 104, '867.70', 'Petah-Tikva', 'gdfgdfgdfg', '2022-08-25', '2022-08-23', '234234234234234'),
(59, 9, 106, '65.40', 'Kiryat-Ono', 'dfhgi df jgfd', '2022-09-01', '2022-08-28', '76567576565'),
(60, 6, 105, '770.20', 'Petah-Tikva', 'off', '2022-09-04', '2022-08-30', '9999999999999999'),
(61, 10, 108, '864.00', 'Petah-Tikva', 'dsfdsfsd', '2022-12-01', '2022-09-01', '32432432'),
(62, 6, 107, '22.80', 'Rishon-Lezion', 'asdasd', '2022-09-22', '2022-09-06', '23213123');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `products`
--

INSERT INTO `products` (`productId`, `productName`, `categoryId`, `price`, `imageName`) VALUES
(2, 'Kilo Of Cucumbers', 1, '1.90', '119dc481-a269-402a-aacf-ab007126a6cd.jpeg'),
(3, 'Kilo Of Tomatos', 1, '1.90', 'fe005576-64ca-4466-b01c-407fbc902fa0.jpeg'),
(4, 'Kilo Of Oranges', 1, '2.40', 'ff6a604b-3773-4204-a616-80dea15180b0.jpeg'),
(5, 'KIlo Of Red Gambot', 1, '1.80', 'd2048a70-f3ac-4175-a3a9-46f454e64501.jpeg'),
(6, 'Kilo Of Peaches', 1, '2.60', 'fa8bd72d-f176-4e72-8426-0d5946eb096b.jpeg'),
(7, 'KIlo Of Yellow Gambot', 1, '1.70', '62351644-57bf-476a-83cf-ac865e6f5cef.jpeg'),
(8, 'Watermelon', 1, '3.10', '8988be09-b3d9-406c-b883-d53218583b65.jpeg'),
(9, 'Almond Croissant', 2, '2.20', '104f2cd4-fe8f-4901-aefe-35cadb6ccf77.jpeg'),
(10, 'Baguette', 2, '1.40', '6aa7bc88-e154-498f-866f-15b1fa5a4bf4.jpeg'),
(11, 'Challah', 2, '2.30', '9a4b03e9-4ada-428c-9d5b-05381c23a44c.jpeg'),
(12, 'Cheese Croissant', 2, '2.60', '5e56a110-c310-4aac-86a8-8e8ba4d0ee9f.jpeg'),
(13, 'Chocolate Croissant', 2, '2.50', '9e66a38b-2ce0-4cde-bc09-7ebf91737fdb.jpeg'),
(14, 'Croissant', 2, '2.00', '3799eafc-030e-44f1-9986-a71e86d7d894.jpeg'),
(15, 'Whole Wheat Bread', 2, '4.30', '62658cfb-c554-42cc-8de4-df2232be7937.jpeg'),
(17, 'Sourdough Bread', 2, '3.80', 'e621277c-59a2-4a50-9f1f-414f2b9fb570.jpeg'),
(18, 'White Bread', 2, '3.50', 'ef1983e8-30d1-48e4-aaa5-d987d3b7f9a1.jpeg'),
(19, 'Kilo Of Apples', 1, '3.00', 'e81354dd-fbf5-4510-a721-d495d9022d73.jpeg'),
(20, 'KIlo Of Green Gambot', 1, '1.70', 'c10b6911-3e9a-4cde-8926-ec9fd0100602.jpeg'),
(21, 'Melon', 1, '4.20', 'da8d922c-cdab-4940-9007-d8e1e8a6f763.jpeg'),
(22, 'Rye Bread', 2, '5.20', '617a1dc9-6da6-4f6f-96ca-438e1c9bb412.jpeg'),
(23, 'Amnon', 3, '5.00', 'fd1b9725-3362-4fa9-a99b-de9373c19fd0.jpeg'),
(24, 'Chicken Breast', 3, '6.00', 'b3b07af9-4379-4510-8c47-6519f2f62176.jpeg'),
(25, 'Entrecote', 3, '14.00', '3d626550-dd3d-4656-8b57-864bdfff13cb.jpeg'),
(26, 'Ground Beef', 3, '12.00', 'd35ac4ab-9da0-4998-9f1f-0f51df93469a.jpeg'),
(27, 'Red Tuna', 3, '23.00', '23616760-a2eb-49f3-a1a3-1c1395d2be66.jpeg'),
(28, 'Surfer', 3, '11.00', '7bdcac3a-dd27-4716-b77a-f856ea76a0c2.jpeg'),
(29, 'Salty Fish', 3, '6.90', '1925c4eb-bbcc-47c9-a546-e50ea1a2563a.jpeg'),
(30, 'Chicken Wings', 3, '3.90', '1503cb61-2b84-4cc0-b5a4-6018e434964c.jpeg'),
(31, 'Chicken Thighs', 3, '4.50', '099446b6-b8ba-46a1-a0c7-0358b938fe02.jpeg'),
(32, 'Salmon', 3, '15.00', '5c1432f0-f338-4102-83af-988bb295510a.jpeg'),
(33, 'Brown Eggs', 4, '6.30', '6ffa1195-86fd-4602-8299-e9a527431156.jpeg'),
(34, 'Cottage', 4, '2.10', 'e7526d99-f748-4bf3-9083-add00c1471b7.jpeg'),
(35, 'Cream Cheese', 4, '2.20', 'cc4cd62d-b06a-4a73-a7df-efca5bf13979.jpeg'),
(36, 'Danish Chocolate Delicacy', 4, '1.20', 'd25c14b3-45fc-4b8b-a16b-28dfc9429297.jpeg'),
(37, 'Yogurt Pro', 4, '2.70', '842c78a9-2958-48f6-b064-ab0cd6e8e8fb.jpeg'),
(38, 'Milky', 4, '2.50', '95c32093-26fa-49dc-a3bd-c30c92779725.jpeg'),
(39, 'Yellow Valley Cheese', 4, '8.40', 'c2ba0ce3-342c-4673-bb19-0d33c2d47c26.jpeg'),
(40, 'Terra Milk', 4, '2.00', '775ab921-11f4-4dd2-8056-5e3b5a8bd5c6.jpeg'),
(41, 'Tnuva Milk', 4, '2.20', '74488940-0dd2-4447-89f3-83e143f74a4f.jpeg'),
(42, 'White Eggs', 4, '5.60', 'ede306d2-d3ed-4852-a97c-c4466f97685c.jpeg'),
(43, 'Mango', 5, '2.80', 'e80265fc-c0b5-424d-87d4-57609c54ccbf.jpeg'),
(44, 'Coca Cola', 5, '3.00', 'efc272be-b8eb-4e7e-ae65-e1a96829cf4f.jpeg'),
(45, 'Fanta', 5, '3.00', '9925f3dc-02e5-43de-b6bf-7045d1afb48b.jpeg'),
(46, 'Jeck Danuels', 5, '34.00', '624ccb69-89b6-486f-9df0-8f6789a36e76.jpeg'),
(47, 'Red Wine', 5, '27.00', 'aaf2c99b-ce95-4080-9803-9333b30c9fa7.jpeg'),
(48, 'White Wine', 5, '21.00', '39c02cfb-9bc5-42cd-922a-06fd17fe889a.jpeg'),
(49, 'Water', 5, '1.50', '6e0e6ddb-365d-481e-8639-78a2b981a624.jpeg'),
(50, 'Vodka Beluga', 5, '29.00', 'f46744bf-511f-4aaf-9a5f-a52b69663ee1.jpeg'),
(51, 'Squeezed Oranges', 5, '5.50', '313d05ee-6757-42b9-9bdc-c202b55a7f98.jpeg'),
(52, 'Sprite', 5, '3.00', 'bb97a7fa-42ae-4a1d-850a-6ba92ad9e0cc.jpeg'),
(54, 'Bath Soap', 6, '4.90', '265755eb-c05a-48b8-9994-bbb4348d5f2b.jpeg'),
(55, 'Broom', 6, '5.00', 'bb38b706-1b78-4c03-90ee-b1d1ebdf104f.png'),
(56, 'Cloths', 6, '8.00', '7bd5c917-32c0-47cb-bcc2-b68dc927decb.jpeg'),
(57, 'Dishwasher Tablets', 6, '14.00', 'be0d2e3f-2f50-455e-8f60-f24d0860246f.jpeg'),
(58, 'Paper Towels', 6, '11.00', '5c40708a-0054-454e-b29b-4478edd69456.jpeg'),
(59, 'Shampoo', 6, '5.60', 'd5ac0c91-b5d1-4fb7-ba73-986ccc48cbfb.jpeg'),
(60, 'Toilet Paper', 6, '9.99', '8fdf6656-69af-44ce-adc3-868c0915d87e.jpeg'),
(61, 'Wipes', 6, '7.49', 'e243f045-f7a4-4fc2-909b-dc9a53e9a28b.jpeg'),
(62, 'Rag', 6, '3.99', 'a32b1cfe-c6f8-4241-a96d-a4686a6a615d.jpeg'),
(72, 'Dish Soap', 6, '5.90', '9cadd3cb-34c6-42cd-8131-2b93c421e960.jpeg');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `shoppingCart`
--

CREATE TABLE `shoppingCart` (
  `shoppingCartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productionDate` date NOT NULL,
  `status` varchar(5) NOT NULL DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `shoppingCart`
--

INSERT INTO `shoppingCart` (`shoppingCartId`, `userId`, `productionDate`, `status`) VALUES
(66, 2, '2022-08-13', 'close'),
(67, 3, '2022-08-13', 'close'),
(74, 2, '2022-08-13', 'close'),
(75, 2, '2022-08-13', 'close'),
(76, 2, '2022-08-13', 'close'),
(77, 2, '2022-08-13', 'close'),
(78, 2, '2022-08-14', 'open'),
(79, 7, '2022-08-13', 'close'),
(80, 3, '2022-08-14', 'open'),
(81, 5, '2022-08-14', 'open'),
(82, 1, '2022-08-15', 'open'),
(83, 6, '2022-08-16', 'close'),
(86, 4, '2022-08-17', 'open'),
(87, 8, '2022-08-17', 'close'),
(88, 6, '2022-08-20', 'close'),
(89, 6, '2022-08-22', 'close'),
(90, 6, '2022-08-22', 'close'),
(91, 6, '2022-08-22', 'close'),
(92, 6, '2022-08-22', 'close'),
(93, 6, '2022-08-22', 'close'),
(94, 6, '2022-08-22', 'close'),
(95, 6, '2022-08-22', 'close'),
(96, 6, '2022-08-22', 'close'),
(97, 6, '2022-08-22', 'close'),
(98, 6, '2022-08-22', 'close'),
(99, 6, '2022-08-22', 'close'),
(100, 6, '2022-08-22', 'close'),
(101, 6, '2022-08-22', 'close'),
(102, 6, '2022-08-22', 'close'),
(103, 6, '2022-08-22', 'close'),
(104, 6, '2022-08-22', 'close'),
(105, 6, '2022-08-23', 'close'),
(106, 9, '2022-08-28', 'close'),
(107, 6, '2022-08-31', 'close'),
(108, 10, '2022-09-01', 'close');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `trolleyItem`
--

CREATE TABLE `trolleyItem` (
  `trolleyItemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `totalPrice` decimal(6,2) NOT NULL,
  `shoppingCartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `trolleyItem`
--

INSERT INTO `trolleyItem` (`trolleyItemId`, `productId`, `stock`, `totalPrice`, `shoppingCartId`) VALUES
(360, 6, 3, '369.00', 66),
(361, 7, 1, '123.00', 66),
(362, 8, 1, '123.00', 66),
(363, 9, 5, '615.00', 66),
(364, 4, 1, '123.00', 67),
(365, 9, 1, '123.00', 67),
(366, 2, 1, '123.00', 67),
(367, 10, 1, '123.00', 67),
(387, 2, 1, '123.00', 74),
(388, 3, 1, '123.00', 75),
(389, 5, 1, '123.00', 76),
(390, 4, 1, '123.00', 77),
(391, 3, 1, '123.00', 77),
(392, 6, 1, '123.00', 78),
(393, 3, 3, '369.00', 78),
(394, 3, 1, '123.00', 79),
(395, 7, 2, '246.00', 79),
(404, 2, 3, '17.70', 83),
(405, 3, 1, '5.90', 83),
(406, 8, 2, '9.00', 87),
(407, 12, 2, '246.00', 87),
(409, 7, 1, '7.90', 87),
(410, 18, 3, '369.00', 87),
(411, 25, 3, '30.00', 87),
(412, 29, 1, '10.00', 87),
(413, 7, 1, '7.90', 83),
(414, 15, 1, '123.00', 83),
(415, 2, 1, '5.90', 88),
(416, 3, 1, '5.90', 88),
(417, 5, 1, '7.90', 88),
(418, 6, 1, '10.90', 88),
(419, 7, 1, '7.90', 88),
(420, 8, 1, '4.50', 88),
(421, 9, 1, '8.00', 88),
(422, 20, 1, '7.90', 88),
(423, 21, 1, '8.00', 88),
(424, 21, 1, '8.00', 88),
(425, 22, 1, '44.00', 88),
(426, 23, 1, '10.00', 88),
(427, 4, 1, '5.90', 89),
(428, 3, 1, '5.90', 89),
(429, 10, 1, '123.00', 89),
(430, 11, 1, '123.00', 89),
(431, 2, 1, '5.90', 90),
(432, 3, 1, '5.90', 90),
(433, 9, 1, '8.00', 90),
(434, 3, 2, '11.80', 90),
(435, 3, 7, '41.30', 91),
(436, 4, 1, '5.90', 92),
(437, 5, 1, '7.90', 92),
(438, 6, 1, '10.90', 92),
(439, 7, 1, '7.90', 92),
(440, 6, 3, '32.70', 93),
(441, 5, 2, '15.80', 94),
(442, 10, 1, '123.00', 94),
(443, 5, 6, '47.40', 95),
(444, 11, 1, '123.00', 95),
(445, 4, 1, '5.90', 96),
(446, 5, 1, '7.90', 96),
(447, 6, 1, '10.90', 96),
(448, 11, 1, '123.00', 96),
(449, 12, 1, '123.00', 96),
(450, 9, 1, '8.00', 96),
(451, 2, 1, '5.90', 96),
(452, 3, 1, '5.90', 96),
(453, 10, 1, '123.00', 96),
(454, 13, 1, '123.00', 96),
(455, 19, 1, '10.90', 96),
(456, 15, 1, '123.00', 96),
(457, 14, 1, '123.00', 96),
(458, 20, 1, '7.90', 96),
(459, 4, 1, '5.90', 97),
(460, 5, 1, '7.90', 97),
(461, 6, 1, '10.90', 97),
(462, 7, 1, '7.90', 97),
(463, 3, 1, '5.90', 97),
(464, 2, 1, '5.90', 97),
(465, 8, 1, '4.50', 97),
(466, 9, 1, '8.00', 97),
(467, 10, 1, '123.00', 97),
(468, 11, 1, '123.00', 97),
(469, 12, 1, '123.00', 97),
(470, 13, 1, '123.00', 97),
(471, 3, 3, '17.70', 98),
(472, 9, 1, '8.00', 98),
(473, 7, 1, '7.90', 98),
(474, 8, 1, '4.50', 98),
(475, 9, 1, '8.00', 98),
(476, 10, 1, '123.00', 98),
(477, 11, 1, '123.00', 98),
(478, 2, 1, '5.90', 98),
(479, 4, 1, '5.90', 98),
(480, 5, 1, '7.90', 98),
(481, 6, 1, '10.90', 98),
(482, 11, 1, '123.00', 99),
(483, 4, 1, '5.90', 99),
(484, 3, 1, '5.90', 99),
(485, 5, 1, '7.90', 99),
(486, 6, 1, '10.90', 99),
(487, 7, 1, '7.90', 99),
(488, 3, 1, '5.90', 99),
(489, 2, 1, '5.90', 99),
(490, 8, 1, '4.50', 99),
(491, 9, 1, '8.00', 99),
(492, 10, 1, '123.00', 99),
(493, 11, 1, '123.00', 99),
(494, 12, 1, '123.00', 99),
(495, 13, 1, '123.00', 99),
(496, 20, 1, '7.90', 99),
(497, 19, 1, '10.90', 99),
(498, 2, 1, '5.90', 100),
(499, 3, 1, '5.90', 100),
(500, 4, 1, '5.90', 100),
(501, 5, 1, '7.90', 100),
(502, 6, 1, '10.90', 100),
(503, 7, 1, '7.90', 100),
(504, 13, 1, '123.00', 100),
(505, 12, 1, '123.00', 100),
(506, 11, 1, '123.00', 100),
(507, 10, 1, '123.00', 100),
(508, 9, 1, '8.00', 100),
(509, 8, 1, '4.50', 100),
(510, 14, 1, '123.00', 100),
(511, 15, 1, '123.00', 100),
(512, 17, 1, '123.00', 100),
(513, 18, 1, '123.00', 100),
(514, 4, 1, '5.90', 101),
(515, 10, 1, '123.00', 101),
(516, 11, 1, '123.00', 101),
(517, 2, 1, '5.90', 102),
(518, 3, 1, '5.90', 102),
(519, 4, 1, '5.90', 102),
(520, 5, 1, '7.90', 102),
(521, 6, 1, '10.90', 102),
(522, 7, 1, '7.90', 102),
(523, 13, 1, '123.00', 102),
(524, 12, 1, '123.00', 102),
(525, 11, 1, '123.00', 102),
(526, 10, 1, '123.00', 102),
(527, 9, 1, '8.00', 102),
(528, 8, 1, '4.50', 102),
(529, 14, 1, '123.00', 102),
(530, 15, 1, '123.00', 102),
(531, 17, 1, '123.00', 102),
(532, 2, 1, '5.90', 103),
(533, 3, 1, '5.90', 103),
(534, 4, 1, '5.90', 103),
(535, 5, 1, '7.90', 103),
(536, 6, 1, '10.90', 103),
(537, 7, 1, '7.90', 103),
(538, 8, 1, '4.50', 103),
(539, 9, 1, '8.00', 103),
(540, 10, 1, '123.00', 103),
(541, 11, 1, '123.00', 103),
(542, 12, 1, '123.00', 103),
(543, 13, 1, '123.00', 103),
(544, 14, 1, '123.00', 103),
(545, 15, 1, '123.00', 103),
(546, 17, 1, '123.00', 103),
(547, 18, 1, '123.00', 103),
(548, 19, 1, '10.90', 103),
(549, 20, 1, '7.90', 103),
(550, 21, 1, '8.00', 103),
(551, 22, 1, '44.00', 103),
(552, 23, 1, '10.00', 103),
(553, 24, 1, '10.00', 103),
(554, 25, 1, '10.00', 103),
(555, 26, 1, '10.00', 103),
(556, 59, 1, '11.00', 103),
(557, 60, 1, '17.80', 103),
(558, 61, 1, '13.40', 103),
(559, 62, 1, '8.60', 103),
(560, 55, 1, '7.00', 103),
(561, 54, 1, '18.00', 103),
(563, 52, 1, '5.00', 103),
(564, 46, 1, '20.00', 103),
(565, 2, 1, '5.90', 104),
(566, 8, 1, '4.50', 104),
(567, 9, 1, '8.00', 104),
(568, 10, 1, '123.00', 104),
(569, 11, 1, '123.00', 104),
(570, 5, 1, '7.90', 104),
(571, 4, 1, '5.90', 104),
(572, 3, 1, '5.90', 104),
(573, 6, 1, '10.90', 104),
(574, 12, 1, '123.00', 104),
(575, 13, 1, '123.00', 104),
(576, 7, 1, '7.90', 104),
(577, 55, 1, '7.00', 104),
(578, 56, 1, '4.00', 104),
(579, 54, 1, '18.00', 104),
(581, 45, 1, '5.00', 104),
(582, 46, 1, '20.00', 104),
(583, 44, 1, '5.00', 104),
(584, 52, 1, '5.00', 104),
(585, 51, 1, '9.00', 104),
(586, 43, 1, '5.00', 104),
(587, 47, 1, '17.00', 104),
(588, 48, 1, '14.00', 104),
(589, 56, 1, '4.00', 104),
(590, 57, 1, '48.00', 104),
(591, 49, 1, '3.00', 104),
(592, 58, 1, '23.00', 104),
(593, 50, 1, '25.00', 104),
(594, 62, 1, '8.60', 104),
(595, 61, 1, '13.40', 104),
(596, 60, 1, '17.80', 104),
(597, 59, 1, '11.00', 104),
(598, 41, 1, '10.00', 104),
(599, 40, 1, '10.00', 104),
(600, 39, 1, '10.00', 104),
(601, 38, 1, '10.00', 104),
(610, 10, 1, '123.00', 105),
(611, 5, 1, '7.90', 105),
(612, 4, 1, '5.90', 105),
(613, 3, 1, '5.90', 105),
(614, 11, 1, '123.00', 105),
(615, 8, 1, '4.50', 105),
(616, 9, 1, '8.00', 105),
(617, 14, 1, '123.00', 105),
(618, 13, 1, '123.00', 105),
(619, 15, 1, '123.00', 105),
(620, 17, 1, '123.00', 105),
(621, 3, 2, '11.80', 106),
(622, 2, 2, '11.80', 106),
(623, 19, 2, '21.80', 106),
(624, 27, 1, '10.00', 106),
(625, 34, 1, '10.00', 106),
(688, 35, 1, '2.20', 108),
(689, 38, 1, '2.50', 108),
(690, 39, 1, '8.40', 108),
(691, 3, 1, '1.90', 108),
(692, 3, 3, '5.70', 108),
(693, 19, 1, '3.00', 108),
(694, 19, 1, '3.00', 108),
(695, 5, 11, '19.80', 108),
(696, 27, 11, '253.00', 108),
(697, 27, 11, '253.00', 108),
(699, 27, 11, '253.00', 108),
(700, 13, 1, '2.50', 108),
(701, 50, 1, '29.00', 108),
(702, 47, 1, '27.00', 108),
(750, 2, 1, '1.90', 107),
(751, 2, 10, '19.00', 107),
(752, 3, 1, '1.90', 107),
(753, 9, 1, '2.20', 81),
(754, 10, 2, '2.80', 81),
(755, 11, 3, '6.90', 81),
(756, 6, 2, '5.20', 81),
(757, 3, 2, '3.80', 81),
(758, 3, 1, '1.90', 81),
(759, 4, 1, '2.40', 81),
(760, 2, 1, '1.90', 81),
(766, 3, 1, '1.90', 86);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id` varchar(12) NOT NULL,
  `password` varchar(128) NOT NULL,
  `city` varchar(15) NOT NULL,
  `street` varchar(35) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `id`, `password`, `city`, `street`, `role`) VALUES
(1, 'Idan', 'Laav', 'idanlaav.1@gmail.com', '1', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Petah-Tikva', 'Yefe Nof 78', 'Admin'),
(2, 'Idan', 'Laav', 'idanlaav.12@gmail.com', '12', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Petah-Tikva', 'Yefe Nof 78', 'User'),
(3, 'Idan', 'Laav', 'idanlaav.123@gmail.com', '123', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Tel-Aviv', 'Yefe Nof 78', 'User'),
(4, 'Idan', 'Laav', 'idanlaav.12354@gmail.com', '123456789', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Eilat', 'Yefe Nof 78', 'User'),
(5, 'effew', 'wfefwe', 'idan@gmail.com', '234324', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Asdod', 'wefwef', 'User'),
(6, 'fdgdfg', 'dfgdfg', 'ida@gmail.com', '435345', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Herzliya', 'dfgdfggf', 'User'),
(7, 'יעעי יעי', 'יח יח', 'idanlaav.123456789@gmail.com', '123456789098', 'c166e80902e7e8594b8119508bcf8d3f689fbcfeafc46d8d35d4cef471e0545c2250fd901c9fb0efa63ca8b3e1d05d18c9705b56f488cefa44b009e7251c960d', 'Ramat-Gan', 'רא  רא רא', 'User'),
(8, 'roy', 'tevel', 'roy@gmail.com', '126387', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Petah-Tikva', 'dlksfnjsdf fdsf sdf ', 'User'),
(9, 'raz', 'gilad', 'raz@gmail.com', '7823466578', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Tel-Aviv', 'dfhgi df jgfd', 'User'),
(10, 'sdf', 'fdgfd', 'sdfds@sdfds.com', '323432432', 'f7364bb512b2cf1be367b6f6dbcb10849fe03f38913f73f1a3579ac1df0df41cf00a9345f376f24ea1f80b49db702660ae96dca1bdcc28d41644120066472614', 'Petah-Tikva', 'sdfdsf213', 'User'),
(11, 'kd dd', 'adsasd sasd', 'idaasdasd@gmail.com', '123456780', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Rishon-Lezion', 'ssadd', 'User');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- אינדקסים לטבלה `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `soppingCartId` (`soppingCartId`);

--
-- אינדקסים לטבלה `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- אינדקסים לטבלה `shoppingCart`
--
ALTER TABLE `shoppingCart`
  ADD PRIMARY KEY (`shoppingCartId`),
  ADD KEY `userId` (`userId`);

--
-- אינדקסים לטבלה `trolleyItem`
--
ALTER TABLE `trolleyItem`
  ADD PRIMARY KEY (`trolleyItemId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `shoppingCartId` (`shoppingCartId`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `shoppingCart`
--
ALTER TABLE `shoppingCart`
  MODIFY `shoppingCartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `trolleyItem`
--
ALTER TABLE `trolleyItem`
  MODIFY `trolleyItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=767;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`soppingCartId`) REFERENCES `shoppingCart` (`shoppingCartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- הגבלות לטבלה `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- הגבלות לטבלה `shoppingCart`
--
ALTER TABLE `shoppingCart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- הגבלות לטבלה `trolleyItem`
--
ALTER TABLE `trolleyItem`
  ADD CONSTRAINT `trolleyitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `trolleyitem_ibfk_2` FOREIGN KEY (`shoppingCartId`) REFERENCES `shoppingCart` (`shoppingCartId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
