CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int NOT NULL,
	`company_id` int NOT NULL,
	`position` varchar(256),
	`resume` varchar(10000),
	`status` enum('pending','accepted','rejected') DEFAULT 'pending');

CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);

CREATE TABLE `reviewers` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int NOT NULL,
	`company_id` int NOT NULL);

CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
CREATE INDEX ReviewerCompanyIndex ON reviewers (`company_id`);
	`email` varchar(256) NOT NULL,
	`name` text NOT NULL,
	`occupation` text);

CREATE TABLE `people` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` int,
	`occupation` text);

ALTER TABLE applications ADD CONSTRAINT applications_user_id_users_id_fk FOREIGN KEY (`user_id`) REFERENCES users(`id`) ;
ALTER TABLE applications ADD CONSTRAINT applications_company_id_companies_id_fk FOREIGN KEY (`company_id`) REFERENCES companies(`id`) ;
ALTER TABLE reviewers ADD CONSTRAINT reviewers_user_id_users_id_fk FOREIGN KEY (`user_id`) REFERENCES users(`id`) ;
ALTER TABLE reviewers ADD CONSTRAINT reviewers_company_id_companies_id_fk FOREIGN KEY (`company_id`) REFERENCES companies(`id`) ;
CREATE UNIQUE INDEX name_idx ON companies (`name`);
CREATE INDEX ReviewerIndex ON reviewers (`user_id`);
CREATE INDEX ReviewerCompanyIndex ON reviewers (`company_id`);
