# 4BIT Scheme v 4.4_4
# Written by Hwang
# Updated by Lee
# Updated by Hong,Cho
# Date : 2019/09/2 (월)


DROP DATABASE IF EXISTS `project_4bit`;

CREATE DATABASE IF NOT EXISTS `project_4bit`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;


DROP USER IF EXISTS `4bit`;
CREATE USER IF NOT EXISTS 'master'@'%' IDENTIFIED BY 'Test1234';
GRANT ALL PRIVILEGES ON project_4bit.* To 'master'@'%';

USE `project_4bit`;

SET FOREIGN_KEY_CHECKS = 0;


-- ---------- 로그관련 테이블 삭제 -------------------
DROP TABLE IF EXISTS `point_log`;
DROP TABLE IF EXISTS `attend_log`;
DROP TABLE IF EXISTS `class_teacher_log`;
-- ---------- 유저관련 테이블 삭제 -------------------
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `teacher`;
DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `branch`;
DROP TABLE IF EXISTS `class_group`;
-- ---------- 신분 권한 테이블 삭제 ------------------
DROP TABLE IF EXISTS `privilege`;
DROP TABLE IF EXISTS `role_privilege`;
DROP TABLE IF EXISTS `role`;
-- ---------- 과제 관련 테이블 삭제 ------------------
DROP TABLE IF EXISTS `homework`;
DROP TABLE IF EXISTS `hw_article`;
DROP TABLE IF EXISTS `hw_reply`;
DROP TABLE IF EXISTS `hw_article_file`;
-- ---------- 게시판 및 게시물 관련 테이블 삭제 ----------
DROP TABLE IF EXISTS `constraint_define`;
DROP TABLE IF EXISTS `board_type_list`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `reply`;
DROP TABLE IF EXISTS `article_file`;
DROP TABLE IF EXISTS `file`;
-- ---------- 시험 관련 테이블 삭제 ------------------
DROP TABLE IF EXISTS `student_test`;
DROP TABLE IF EXISTS `test_group`;
DROP TABLE IF EXISTS `student_answer`;
DROP TABLE IF EXISTS `test_quiz`;
DROP TABLE IF EXISTS `quiz`;
-- ---------- 로드맵 관련 테이블 삭제 -----------------
DROP TABLE IF EXISTS `roadmap`;
DROP TABLE IF EXISTS `roadmap_exercise`;
-- ---------- oauth 관련 테이블 삭제 ----------------
DROP TABLE IF EXISTS `oauth_refresh_token`;
DROP TABLE IF EXISTS `oauth_client_details`;
DROP TABLE IF EXISTS `oauth_access_token`;


-- ---------------------- CREATE 테이블 ---------------------------------

-- 신분 테이블
CREATE TABLE IF NOT EXISTS `role` (
   `role_code`         VARCHAR(36)         NOT NULL,
   `role_name`         VARCHAR(16)         NOT NULL,
   
   PRIMARY KEY (`role_code`)
    
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 권한 테이블
CREATE TABLE IF NOT EXISTS `privilege` (
   `privilege_code`      VARCHAR(36)         NOT NULL,
   `privilege_name`      VARCHAR(16)         NOT NULL,
   
      PRIMARY KEY (`privilege_code`)
    
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 신분_권한 테이블
CREATE TABLE IF NOT EXISTS `role_privilege` (
   `role_code`           VARCHAR(36)       	  NOT NULL,
   `privilege_code`      VARCHAR(36)          NOT NULL,
   
   UNIQUE (`role_code`, `privilege_code`),
 
   FOREIGN KEY (`role_code`) REFERENCES `role` (`role_code`),
   FOREIGN KEY (`privilege_code`) REFERENCES `privilege` (`privilege_code`)
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 포털유저 테이블
CREATE TABLE IF NOT EXISTS `user` (
   `user_id`            BIGINT         NOT NULL    AUTO_INCREMENT,
   `username`           VARCHAR(36)    	   NULL,
   `password`         	VARCHAR(36)    	   NULL,
   `name`            	VARCHAR(10)        NULL,
   `email`            	VARCHAR(30)        NULL,
   `phone`            	VARCHAR(15)        NULL,
   `point_sum`         	INT                NULL,
   `user_level`         INT                NULL,
   `role_code`         	VARCHAR(36)    NOT NULL,
   
	PRIMARY KEY (`user_id`),
    
	FOREIGN KEY (`role_code`) REFERENCES `role` (`role_code`)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 지점 테이블
CREATE TABLE IF NOT EXISTS  `branch` (
   `branch_code`         VARCHAR(36)      NOT NULL ,
   `branch_name`         VARCHAR(36)          NULL ,
   `branch_address`      VARCHAR(36)          NULL ,
   `branch_phone`      	 VARCHAR(15)          NULL ,
   
   PRIMARY KEY (`branch_code`)
    
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 반 테이블
CREATE TABLE IF NOT EXISTS  `class_group` (
   `class_id`      		   BIGINT            NOT NULL     AUTO_INCREMENT, 
   `class_name`        	   VARCHAR(36)           NULL ,
   `class_start_date`      DATETIME              NULL ,
   `class_end_date`        DATETIME              NULL ,
   `subject`         	   VARCHAR(50)           NULL ,
   `branch_code`           VARCHAR(36)       NOT NULL ,
   
    PRIMARY KEY (`class_id`),
    
    FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 관리자 테이블
CREATE TABLE IF NOT EXISTS `admin` (
   `admin_id`            BIGINT       	  NOT NULL    AUTO_INCREMENT,
   `user_id`      	     BIGINT      	  NOT NULL,
   `branch_code`         VARCHAR(36)      NOT NULL,
  
   
	PRIMARY KEY (`admin_id`),
    
	FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`branch_code`) REFERENCES `branch` (`branch_code`)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 학생 테이블
CREATE TABLE IF NOT EXISTS `student` (
   `student_id`            BIGINT         NOT NULL    AUTO_INCREMENT,
   `student_birth`         VARCHAR(8)         NULL,
   `roadmap_last`          INT                NULL,
   `attend_count`          INT                NULL,
   `absent_count`          INT                NULL,
   `late_count`            INT                NULL,
   `out_count`             INT                NULL,
   `early_leave_count`     INT                NULL,
   `counsel`               TEXT               NULL,
   `attend_id`			   VARCHAR(20)		  NULL,
   `user_id`               BIGINT         NOT NULL,
   `class_id`              BIGINT         NOT NULL,
   
   
   PRIMARY KEY (`student_id`),
    
   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`class_id`) REFERENCES `class_group` (`class_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 강사 테이블
CREATE TABLE IF NOT EXISTS `teacher` (
   `teacher_id`         BIGINT         NOT NULL    AUTO_INCREMENT,
   `user_id`            BIGINT         NOT NULL,
   
	PRIMARY KEY (`teacher_id`),
    
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 포인트로그 테이블
CREATE TABLE IF NOT EXISTS `point_log` (
   `point_log_id`       BIGINT           NOT NULL AUTO_INCREMENT,
   `point_added`        INT                  NULL,
   `point_from`         VARCHAR(36)          NULL,
   `point_event_time`   DATETIME             NULL,
   `user_id`            BIGINT           NOT NULL,
   
    PRIMARY KEY (`point_log_id`),
    
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 출석 로그 테이블
 CREATE TABLE IF NOT EXISTS `attend_log` (
   `attend_log_id`       BIGINT            		NOT NULL AUTO_INCREMENT,
   `event_name`          VARCHAR(10)  			NULL DEFAULT ('INIT'),   
   `event_attend_time`   DATETIME     	        NULL,
   `daily_attend_count`	 INT					NULL,
   `student_id`          BIGINT            		NOT NULL,
   
   PRIMARY KEY (`attend_log_id`),
    
    FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 반_강사_로그 테이블
 CREATE TABLE IF NOT EXISTS `class_teacher_log` (
   `class_teacher_log_id`       BIGINT            NOT NULL AUTO_INCREMENT,
   `class_teacher_event_time`   DATETIME              NULL,
   `class_teacher_description`  TEXT                  NULL,
   `teacher_id`                 BIGINT            NOT NULL,   
   `class_id`                   BIGINT            NOT NULL,
   
   PRIMARY KEY (`class_teacher_log_id`),
    
    FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `class_group` (`class_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 제약정의 테이블
CREATE TABLE IF NOT EXISTS `constraint_define` (
   `constraint_name`         VARCHAR(50)      NOT NULL,
   `title_length`            INT                  NULL,
   `content_length`          INT                  NULL,
   `each_file_size_limit`    INT                  NULL,
   `file_count`              INT                  NULL,
   `total_file_size_limit`   INT                  NULL,
   `reply_length`            INT                  NULL,
   `article_depth_limit`     INT                  NULL,
   `reply_depth_limit`       INT                  NULL,
   
   PRIMARY KEY (`constraint_name`)
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 게시판종류목록 테이블
CREATE TABLE IF NOT EXISTS `board_type_list` (
   `board_id`              VARCHAR(50)         NOT NULL,
   `board_name`            VARCHAR(50)             NULL,
   `article_last_number`   INT                 	   NULL DEFAULT (0),
   `constraint_name`       VARCHAR(50)         NOT NULL,
   `class_id`              BIGINT              NOT NULL,
   
   PRIMARY KEY (`board_id`),
    
   FOREIGN KEY (`constraint_name`) REFERENCES `constraint_define` (`constraint_name`)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`class_id`) REFERENCES `class_group` (`class_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 게시물 테이블
CREATE TABLE IF NOT EXISTS `article` (
   `article_id`             BIGINT            NOT NULL  AUTO_INCREMENT,
   `article_number`         INT               	  NULL,
   `article_create_date`    DATETIME              NULL,
   `article_update_date`    DATETIME              NULL,
   `article_hits`           INT                   NULL,
   `article_like`           INT                   NULL,
   `group_id`               INT                   NULL,
   `depth`                  INT                   NULL,
   `sequence`               INT                   NULL,
   `article_title`          VARCHAR(50)           NULL,
   `article_contents`       TEXT                  NULL,
   `user_id`                BIGINT            NOT NULL,
   `board_id`               VARCHAR(50)       NOT NULL,
   
   PRIMARY KEY (`article_id`),
    
   FOREIGN KEY (`board_id`) REFERENCES `board_type_list` (`board_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
     
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 댓글 테이블
CREATE TABLE IF NOT EXISTS `reply` (
   `reply_id`            BIGINT            NOT NULL    AUTO_INCREMENT,
   `reply_contents`      VARCHAR(255)          NULL,
   `reply_create_date`   DATETIME              NULL,
   `reply_update_date`   DATETIME              NULL,
   `reply_group_id`      INT                   NULL,
   `reply_depth`         INT                   NULL,
   `reply_sequence`      INT                   NULL,
   `user_id`             BIGINT            NOT NULL,
   `article_id`          BIGINT            NOT NULL,
   
   PRIMARY KEY (`reply_id`),
    
   FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 첨부파일 테이블
CREATE TABLE IF NOT EXISTS `file` (
   `file_id`            BIGINT            NOT NULL AUTO_INCREMENT,
   `file_origin_name`	VARCHAR(100)		  NULL,
   `file_name`          VARCHAR(100)          NULL,
--    `file_url`			VARCHAR(100)		  NULL,
   `file_size`          BIGINT                NULL,
   `file_upload_ip`	    VARCHAR(100)		  NULL,
   `file_extend_name`	VARCHAR(100)		  NULL,
   `user_id`    		BIGINT 			  NOT NULL,
   
   PRIMARY KEY (`file_id`),
   
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

CREATE TABLE IF NOT EXISTS `article_file`(
	`article_file_id`	BIGINT		NOT NULL AUTO_INCREMENT,
    `article_id`		BIGINT		NOT NULL,
    `file_id`			BIGINT		NOT NULL,
    
    PRIMARY KEY (`article_file_id`),
    
	FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 시험 테이블
CREATE TABLE IF NOT EXISTS `test_group` (         
   `test_id`              BIGINT               NOT NULL    AUTO_INCREMENT,
   `test_name`            VARCHAR(50)              NULL,
   `test_start_time`      DATETIME                 NULL,
   `test_end_time`        DATETIME                 NULL,
   `test_description`     TEXT                     NULL,
   `sum`                  INT                      NULL,
   `avg`            	  DOUBLE                   NULL,
   `max`          	      INT                      NULL,
   `min`            	  INT                      NULL,
   `user_id`         	  BIGINT               NOT NULL,
   `constraint_name`  	  VARCHAR(50)          NOT NULL,
   `class_id`			  BIGINT			   NOT NULL,
   
   PRIMARY KEY (`test_id`),
                                                                  -- 수정할 수 도 있다..
	FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`constraint_name`) REFERENCES `constraint_define` (`constraint_name`)
    ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`class_id`) REFERENCES `class_group` (`class_id`)
    ON DELETE CASCADE ON UPDATE CASCADE     
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 문제 테이블
CREATE TABLE IF NOT EXISTS `quiz` (
   `quiz_id`            BIGINT               NOT NULL AUTO_INCREMENT,
   `quiz_contents`      TEXT                     NULL,
   `quiz_answer`        VARCHAR(255)             NULL,
   `quiz_each_score`    INT                      NULL,
   `quiz_subject`       VARCHAR(36)              NULL,
   `quiz_chapter`       VARCHAR(36)              NULL,
   `quiz_level`         ENUM('상','중','하')       NULL DEFAULT('하'),
   `quiz_answertype`    INT                      NULL,
   `quiz_explain`       TEXT                     NULL,
   `user_id`            BIGINT            	 NOT NULL,
   `constraint_name`    VARCHAR(50)          NOT NULL,
   
   PRIMARY KEY (`quiz_id`),
    
	FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`constraint_name`) REFERENCES `constraint_define` (`constraint_name`)
    ON DELETE CASCADE ON UPDATE CASCADE    
   
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 시험_문제 테이블
CREATE TABLE IF NOT EXISTS `test_quiz` (
   `test_quiz_id`            BIGINT               NOT NULL AUTO_INCREMENT,
   `test_quiz_no`     	 	 INT 	                  NULL,
   `test_id`  	  	  	  	 BIGINT 		      NOT NULL,
   `quiz_id`  	  	  	  	 BIGINT 		      NOT NULL,
   
   PRIMARY KEY (`test_quiz_id`),
    
	FOREIGN KEY (`test_id`) REFERENCES `test_group` (`test_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`)
    ON DELETE CASCADE ON UPDATE CASCADE    
   
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 학생_시험 테이블
CREATE TABLE IF NOT EXISTS `student_test` (
   `student_test_id`        BIGINT         NOT NULL AUTO_INCREMENT,
   `st_test_score`          INT                NULL,
   `test_id`           	    BIGINT         NOT NULL,
   `user_id`             	BIGINT         NOT NULL,
   
   PRIMARY KEY (`student_test_id`),
    
    FOREIGN KEY (`test_id`) REFERENCES `test_group` (`test_id`)
   ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 학생_답안 테이블
CREATE TABLE IF NOT EXISTS `student_answer` (
   `student_answer_id`        			BIGINT         NOT NULL AUTO_INCREMENT,
   `student_test_answer_content`        TEXT                NULL,
   `student_test_id`           	 	    BIGINT         NOT NULL,
   `test_quiz_id` 		            	BIGINT         NOT NULL,
   
   PRIMARY KEY (`student_answer_id`),
    
    FOREIGN KEY (`student_test_id`) REFERENCES `student_test` (`student_test_id`)
   ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`test_quiz_id`) REFERENCES `test_quiz` (`test_quiz_id`)
   ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 과제 테이블
CREATE TABLE IF NOT EXISTS `homework` (
   `hw_id`           	BIGINT               NOT NULL    AUTO_INCREMENT,
   `hw_name`            VARCHAR(50)              NULL,
   `hw_deadline`        DATETIME          	     NULL,
   `hw_create_date`     DATETIME                 NULL,
   `hw_update_date`     DATETIME                 NULL,
   `hw_subject`         VARCHAR(50)         	 NULL,
   `hw_description`     TEXT               		 NULL,
   `user_id`         	BIGINT         		 NOT NULL,
   `constraint_name`  	VARCHAR(50)          NOT NULL,
   `class_id`         	BIGINT            	 NOT NULL,
   
   PRIMARY KEY (`hw_id`),
   
   FOREIGN KEY (`class_id`) REFERENCES `class_group` (`class_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`constraint_name`) REFERENCES `constraint_define` (`constraint_name`)
    ON DELETE CASCADE ON UPDATE CASCADE
   
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 과제게시물 테이블
CREATE TABLE IF NOT EXISTS `hw_article` (
   `hw_article_id`       BIGINT            NOT NULL AUTO_INCREMENT,
   `hw_submit_date`      DATETIME         	   NULL,
   `hw_update_date`      DATETIME         	   NULL,
   `hw_contents`         TEXT            	   NULL,
   `hw_id`            	 BIGINT            NOT NULL,
   `user_id`             BIGINT            NOT NULL,
   
   PRIMARY KEY (`hw_article_id`),
   
   FOREIGN KEY (`hw_id`) REFERENCES `homework` (`hw_id`)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
     
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 과제물_파일 테이블
CREATE TABLE IF NOT EXISTS `hw_article_file` (
   `hw_article_file_id`       BIGINT            NOT NULL AUTO_INCREMENT,
   `file_id`   				  BIGINT         	NOT NULL,
   `hw_article_id`      	  BIGINT   	 	    NOT NULL,
   
   PRIMARY KEY (`hw_article_file_id`),
   
   FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`hw_article_id`) REFERENCES `hw_article` (`hw_article_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
     
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


-- 과제물댓글 테이블
CREATE TABLE IF NOT EXISTS `hw_reply` (
   `hw_reply_id`            BIGINT            NOT NULL AUTO_INCREMENT,
   `hw_reply_contents`      VARCHAR(255)          NULL,
   `hw_reply_create_date`   DATETIME              NULL,
   `hw_reply_update_date`   DATETIME              NULL,
   `hw_article_id`          BIGINT            NOT NULL,
   `user_id`                BIGINT            NOT NULL,
   
   PRIMARY KEY (`hw_reply_id`),
   
   FOREIGN KEY (`hw_article_id`) REFERENCES `hw_article` (`hw_article_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
   
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 로드맵 테이블
CREATE TABLE IF NOT EXISTS `roadmap` (
   `roadmap_stage_no`         INT             NOT NULL,
   `roadmap_subject`          VARCHAR(36)         NULL,
   `roadmap_chapter`          VARCHAR(36)         NULL,
   
   PRIMARY KEY (`roadmap_stage_no`)
    
)ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;

-- 로드맵 연습문제 테이블
CREATE TABLE IF NOT EXISTS `roadmap_exercise` (
   `exercise_sequence`         BIGINT         NOT NULL AUTO_INCREMENT,
    `exercise_contents`        TEXT               NULL,
    `exercise_answer`          INT                NULL,
    `roadmap_stage_no`         INT            NOT NULL,
   
   PRIMARY KEY (`exercise_sequence`),
   
   FOREIGN KEY (`roadmap_stage_no`) REFERENCES `roadmap` (`roadmap_stage_no`)
    ON DELETE CASCADE ON UPDATE CASCADE
   
) ENGINE = `InnoDB` DEFAULT CHARACTER SET = `utf8`;


--
-- Table structure for table `oauth_client_details`   사용
--
CREATE TABLE IF NOT EXISTS `oauth_client_details` (
  `client_id`               VARCHAR(255) PRIMARY KEY,
  `resource_ids`            VARCHAR(255),
  `client_secret`           VARCHAR(255),
  `scope`                   VARCHAR(255),
  `authorized_grant_types`  VARCHAR(255),
  `web_server_redirect_uri` VARCHAR(255),
  `authorities`             VARCHAR(255),
  `access_token_validity`   INTEGER,
  `refresh_token_validity`  INTEGER,
  `additional_information`  VARCHAR(4096),
  `autoapprove`             VARCHAR(255)
) ENGINE = `MyISAM` DEFAULT CHARACTER SET = `utf8`;

--
-- Table structure for table `oauth_access_token`      사용
--
CREATE TABLE IF NOT EXISTS `oauth_access_token` (
  `token_id`                VARCHAR(255),
  `token`                   BLOB,
  `authentication_id`       VARCHAR(255) PRIMARY KEY,
  `user_name`               VARCHAR(255),
  `client_id`               VARCHAR(255),
  `authentication`          BLOB,
  `refresh_token`           VARCHAR(255)
) ENGINE = `MyISAM` DEFAULT CHARACTER SET = `utf8`;

--
-- Table structure for table `oauth_refresh_token`   사용
--
CREATE TABLE IF NOT EXISTS `oauth_refresh_token` (
  `token_id`                VARCHAR(255),
  `token`                   BLOB,
  `authentication`          BLOB
) ENGINE = `MyISAM` DEFAULT CHARACTER SET = `utf8`;



-- INSERT문 -------------------------------------------------------------------------------------------------------------
-- 기본 세팅
SET @client_id = '762f6bbb-a257-11e9-9b39-0242ac120002';
SET @client_secret = 'c16b2a8b36678a7440caeda356534ef2fa75699098bb7d58d499541024e53a51';
SET @resource_ids = 'project-4bit-server';
SET @authorized_grant_types = 'password,authorization_code,refresh_token,client_credentials';
SET @scope = 'read,write';
SET @authorities = 'ROLE_GUEST';
SET @access_token_validity = 3600;
SET @refresh_token_validity = 86400;

INSERT INTO `oauth_client_details` (`client_id`, `resource_ids`, `client_secret`, `scope`, `authorized_grant_types`, `authorities`, `access_token_validity`, `refresh_token_validity`, `autoapprove`)
  VALUES (@client_id, @resource_ids, @client_secret, @scope, @authorized_grant_types, @authorities, @access_token_validity, @refresh_token_validity, true);


-- ==========  Role Insert  ================
INSERT INTO `role` VALUE 
('role_guest'	, 	'ROLE_GUEST'),
('role_admin'	, 	'ROLE_ADMIN'),
('role_teacher'	,	'ROLE_TEACHER'),
('role_student'	,	'ROLE_STUDENT');

-- ==========  privilege Insert  ==============
INSERT INTO `privilege` VALUE
-- 관리자가 User, Class_group 을 읽고, 쓰기 하는 권한
('manage_read'	, 'MANAGE_READ'),
('manage_write'	, 'MANAGE_WRITE'),
-- 일반 유저들이 자신의 정보를 읽고 쓰는 권한
('me_read'	, 'ME_READ'),
('me_write'	, 'ME_WRITE'),

-- 전체공지게시판을 읽고 쓰는 권한
('notice_read'	, 'NOTICE_READ'),
('notice_write'	, 'NOTICE_WRITE'),
-- 취업게시판을 읽고 쓰는 권한
('job_read'	, 'JOB_READ'),
('job_write', 'JOB_WRITE'),
-- 프로젝트 영상 게시판을 읽고 쓰는 권한
('pro_read'	, 'PRO_READ'),
('pro_write', 'PRO_WRITE'),

-- 반별 공지게시판을 읽고 쓰는 권한
('cnotice_read'	, 'CNOTICE_READ'),
('cnotice_write', 'CNOTICE_WRITE'),
-- 반별 자유게시판에 대한 읽고 쓰는 권한
('cboard_read'	,	'CBOARD_READ'),
('cboard_write'	,	'CBOARD_WRITE'),
-- 반별 자료게시판에 대한 읽고 쓰는 권한
('library_read'	,	'LIBRARY_READ'),
('library_write',	'LIBRARY_WRITE'),

-- 시험을 출제하는 시험게시판을 읽고 쓰는 권한
('test_read' , 'TEST_READ'),
('test_write', 'TEST_WRITE'),
-- 학생이 제출하는 답안에대해 읽고 쓰는 권한
('stest_read' , 'STEST_READ'),
('stest_write', 'STEST_WRITE'),

-- 과제를 출제하는 과제게시판을 읽고 쓰는 권한
('hw_read' , 'HW_READ'),
('hw_write', 'HW_WRITE'),
-- 학생이 제출하는 과제물에대해 읽고 쓰는 권한
('shw_read' , 'SHW_READ'),
('shw_write', 'SHW_WRITE'),


-- 로드맵을 읽고 쓰는 권한
('roadmap_read' , 'ROADMAP_READ'),
('roadmap_write', 'ROADMAP_WRITE');


-- ================  role_privilege Insert  =====================
INSERT INTO `role_privilege` VALUE
-- 관리자가 유저, 반 을 등록 삭제 수정하는 권한
('role_admin' , 'manage_read'),

('role_admin' , 'manage_write'),
-- --------------------------------------
-- 유저 개개인이 자신의 정보를 읽고 쓰는 권한
('role_admin'	, 'me_read'),
('role_teacher'	, 'me_read'),
('role_student'	, 'me_read'),

('role_admin'	, 'me_write'),
('role_teacher'	, 'me_write'),
('role_student'	, 'me_write'),
-- --------------------------------------
-- 공지를 읽고 쓰는 권한.  ( 강사, 학생은 write 에 대한 권한이 없다.
('role_admin'	, 'notice_read'),
('role_teacher'	, 'notice_read'),
('role_student'	, 'notice_read'),

('role_admin'	, 'notice_write'),	
-- --------------------------------------
-- 취업게시물을 읽고 쓰는 권한 (강사, 학생은 write에 대한 권한이 없다.)
('role_admin'	, 'job_read'),
('role_teacher'	, 'job_read'),
('role_student'	, 'job_read'),

('role_admin'	, 'job_write'),
-- --------------------------------------
-- 프로젝트를 읽고 쓰는 권한  (강사, 학생은 write에 대한 권한이 없다.)
('role_admin'	, 'pro_read'),
('role_teacher'	, 'pro_read'),
('role_student'	, 'pro_read'),

('role_admin'	, 'pro_write'),
-- ----------------------------------------
-- 반별 공지를 읽고 쓰는 권한  (학생은 write에 대한 권한이 없다.)
('role_admin'	, 'cnotice_read'),
('role_teacher'	, 'cnotice_read'),
('role_student'	, 'cnotice_read'),

('role_admin'	, 'cnotice_write'),
('role_teacher'	, 'cnotice_write'),
-- ----------------------------------------
-- 반별 자유게시판 권한
('role_admin'	, 'cboard_read'),
('role_teacher'	, 'cboard_read'),
('role_student'	, 'cboard_read'),

('role_admin'	, 'cboard_write'),
('role_teacher'	, 'cboard_write'),
('role_student'	, 'cboard_write'),
-- -----------------------------------
-- 반별 자료게시판 권한
('role_admin'	, 'library_read'),
('role_teacher'	, 'library_read'),
('role_student'	, 'library_read'),

('role_admin'	, 'library-write'),
('role_teacher'	, 'library_write'),
('role_student'	, 'library_write'),
-- -----------------------------------
-- 강사가 시험을 제출하는 권한(학생은 wrtie 권한이 없다)
('role_admin'	, 'test_read'),
('role_teacher'	, 'test_read'),
('role_student'	, 'test_read'),

('role_admin'	, 'test_write'),
('role_teacher'	, 'test_write'),
-- -------------------------------------
-- 학생이 시험을 읽고 쓰는 권한
('role_admin'	, 'stest_read'),
('role_teacher'	, 'stest_read'),
('role_student'	, 'stest_read'),

('role_admin'	, 'stest_write'),
('role_teacher'	, 'stest_write'),
('role_student'	, 'stest_write'),
-- ------------------------------------
-- 강사가 과제를 출제하는 권한
('role_admin'	, 'hw_read'),
('role_teacher'	, 'hw_read'),
('role_student'	, 'hw_read'),

('role_admin'	, 'hw_write'),
('role_teacher'	, 'hw_write'),
-- -----------------------------------
-- 학생이 과제를 제출하는 권한
('role_admin'	, 'shw_read'),
('role_teacher'	, 'shw_read'),
('role_student'	, 'shw_read'),

('role_admin'	, 'shw_write'),
('role_teacher'	, 'shw_write'),
('role_student'	, 'shw_write'),
-- -----------------------------------
-- 로드맵 관련 권한
('role_admin'	, 'roadmap_read'),
('role_teacher'	, 'roadmap_read'),
('role_student'	, 'roadmap_read'),

('role_admin'	, 'roadmap_write'),
('role_teacher'	, 'roadmap_write'),
('role_student'	, 'roadmap_write');



-- ================  branch Insert  =====================
-- 지점코드, 지점명, 주소, 지점연락처
INSERT INTO `branch` VALUE 
('sinchon'	,'신촌', '마포구'	,'02-111-1111'),
('gangnam'	,'강남', '강남구'	,'02-222-2222'),
('seocho'	,'서초', '서초구'	,'02-333-3333');

-- ================  class_group Insert  =========================================================================
-- AUTO_INCREMENT가 0번부터 시작하기 세팅
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

INSERT INTO `class_group` VALUE (0, '관리용 데이터', null,null,null, 'sinchon');
INSERT INTO `class_group` VALUE (1, 'JAVA 117','2019-02-26 00:00:00','2019-08-26 00:00:00','java-web','sinchon');
-- 								반이름,        시작일, 				종료일, 			과목, 		지점코드
INSERT INTO `class_group` (`class_name`,`class_start_date`,`class_end_date`,`subject`,`branch_code`) VALUE 
('JAVA 118','2019-02-26 00:00:00','2019-08-26 00:00:00','java-application','gangnam');


-- ================  User Insert  =================================================================================
-- (PK 유저고유번호) 	로그인이름, 		비번, 	이름,	     메일, 	연락처, 	포인트합계, 	유저레벨, 			신분코드
INSERT INTO `user` (`username` ,`password`,`name`,`email`,`phone`, `point_sum`, `user_level`, `role_code`)
VALUE
('test_a_1', '1234', '김관리자', 'sinchon@bitcamp.com', '02-111-1111', 100000, 1000, 'role_admin'),		
('test_a_2', '1234', '이관리자', 'gangnam@bitcamp.com', '02-122-1222', 100000, 1000, 'role_admin'),
('test_a_3', '1234', '박관리자', 'sinchon@bitcamp.com', '02-1333-1333', 100000, 1000, 'role_admin'),		
('test_a_4', '1234', '최관리자', 'gangnam@bitcamp.com', '02-1444-1444', 100000, 1000, 'role_admin'),		

('test_t_1', '1234', '이선생님', 'park@bitcamp.com', '010-2111-2111' , 100000, 1000, 'role_teacher'),			
('test_t_2', '1234', '김선생님', 'moon@bitcamp.com', '010-2222-2222' , 100000, 1000, 'role_teacher'),			
('test_t_3', '1234', '박선생님', 'lee@bitcamp.com',  '010-2333-2333' , 100000, 1000, 'role_teacher'),			

('2019022601',  '1234', '김학생',  'angk226@gmail.com', '010-3111-3111' ,    0,    0, 'role_student'),			
('2019022602',  '1234', '이학생',  'some_you@naver.com', '010-3222-3222' ,    0,   0, 'role_student'),			
('2019022603',  '1234', '박학생',  'hellotripley@gmail.com', '010-3333-3333' ,    0,   0, 'role_student'),			
('2019022604',  '1234', '최학생',  'seo089@naver.com', '010-3444-3444' ,    0,   0, 'role_student'),			 
('2019022605',  '1234', '주학생',  'agatha2003@naver.com', '010-3555-3555' ,    0,   0, 'role_student'),			
('2019022606',  '1234', '황학생',  'soplaum@gmail.com', '010-3666-3666' ,    0,   0, 'role_student'),			
('2019022607',  '1234', '홍학생',  'test@naver.com', '010-3777-3777' ,    0,   0, 'role_student'),			
('2019022608',  '1234', '류학생',  'qwead@naver.com', '010-3888-3888' ,    0,   0, 'role_student'),			
('2019022609',  '1234', '하학생',  '123q@naver.com', '010-3999-3999' ,    0,   0, 'role_student'),			
('2019022610', '1234', '정학생', '321w@naver.com', '010-3000-3000' ,    0,   0, 'role_student');			


-- ================   Admin Insert  ==============================================================================================
-- 관리자_고유번호(PK), 유저고유번호(FK), 지점코드(FK)
INSERT INTO `admin`(`user_id`, `branch_code`)
value
('1' , 'sinchon'),	
('2' , 'gangnam'),
('3' , 'seocho'),	
('4' , 'sinchon'); 	

-- ================   Teacher Insert  ==============================================================================================
-- 강사_고유번호(PK) , 유저_고유번호(FK)
INSERT INTO `teacher` (`user_id`)
VALUE
('5'),	
('6'),	
('7'); 	

-- ================  Student Insert  ==============================================================================================
-- 생년월일, 로드맵단계, 출석, 결석, 지각, 외출, 조퇴, 상담내용, 유저_고유번호, 반_고유번호
-- 로드맵 단계는 5-5 == 505  식으로 표현
INSERT INTO `student` 
(`student_birth`,`roadmap_last`,`attend_count`,`absent_count`,`late_count`,`out_count`,`early_leave_count`,`counsel`,`attend_id`,`user_id`,`class_id`) VALUE
('19990101', 1,   0, 0, 0, 0, 0, '더미데이터', '1905654620',	'8',  '1'),	
('19990202', 1,   0, 0, 0, 0, 0, '더미데이터.', '1905093020',	'9',  '1'),	
('19990303', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'10',  '1'),	
('19990404', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'11',  '1'),	
('19990505', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'12',  '1'),	

('19990606', 1,   0, 0, 0, 0, 0, '더미데이터', '3008163132' ,'13',  '2'),	
('19990707', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'14',  '2'),	
('19990808', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'15',  '2'),	
('19990909', 1,   0, 0, 0, 0, 0, '더미데이터',  null,		'16',  '2'),	
('19991010', 1,   0, 0, 0, 0, 0, '더미데이터', null,		'17',  '2');	

-- ================  Constraint Define Insert  ==============================================================================================
-- 제약이름, 제목글자수, 내용글자수, 개당첨부파일크기, 파일첨부개수, 총파일크기, 댓글글자수, 게시물뎁쓰제한, 댓글뎁쓰제한
INSERT INTO `constraint_define` VALUE
('notice_constraint'		, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 전체공지 제약
('job_constraint'			, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 취업공지 제약
('project_constraint'		, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 프로젝트 제약
('class_notice_constraint'	, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 반별 공지 제약
('class_board_constraint'	, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 반별 자유 제약
('class_library_constraint'	, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 반별 자료 제약
('homework_constraint'		, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 과제 제약
('test_constraint'			, 20, 500, 300, 5, 1024, 100, 1, 3),			-- 시험 제약
('quiz_constraint'			, 20, 500, 300, 5, 1024, 100, 1, 3);			-- 문제 제약

-- ================  Board Type List Insert  ==============================================================================================
-- 게시판 영문명(pk) 게시판한글명 , 게시물마지막번호, 제약이름, 반_고유번호
INSERT INTO `board_type_list` VALUE
('notice'			,'전체공지게시판',   12, 'notice_constraint'			, '0'),
('job'				,'취업공지게시판',   13, 'job_constraint'				, '0'),
('project'			,'프로젝트게시판',   0, 'project_constraint'			, '0'),
('class_1_notice'	,'1반 공지게시판', 12, 'class_notice_constraint'	, '1'),
('class_1_board'	,'1반 자유게시판', 27, 'class_board_constraint'		, '1'),
('class_1_library'	,'1반 자료게시판', 10, 'class_library_constraint'	, '1'),
('class_2_notice'	,'2반 공지게시판', 1, 'class_notice_constraint'	, '2'),
('class_2_board'	,'2반 자유게시판', 1, 'class_board_constraint'		, '2'),
('class_2_library'	,'2반 자료게시판', 3, 'class_library_constraint'	, '2');

-- ================  Article Insert  ==============================================================================================
-- 게시물번호, 작성일, 수정일, 조회수, 좋아요, 그룹ID, 뎁쓰, 시퀀스, 게시물제목, 게시물내용, 유저_고유번호, 게시판_영문명
INSERT INTO `article` 
(`article_number` ,`article_create_date`,`article_update_date`,`article_hits`,`article_like`,`group_id` ,`depth`,`sequence`, 
`article_title`,  `article_contents`, `user_id`, `board_id`)
VALUE  
-- 전체 공지(notice)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '1번 전체공지', '1번 전체공지 내용', '1', 'notice'),		
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '2번 전체공지', '2번 전체공지 내용', '1', 'notice'),
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '3번 전체공지', '3번 전체공지 내용', '1', 'notice'),		
(4, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '4번 전체공지', '4번 전체공지 내용', '1', 'notice'),
(5, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '5번 전체공지', '5번 전체공지 내용', '1', 'notice'),		
(6, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '6번 전체공지', '6번 전체공지 내용', '1', 'notice'),
(7, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '7번 전체공지', '7번 전체공지 내용', '1', 'notice'),		
(8, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '8번 전체공지', '8번 전체공지 내용', '1', 'notice'),
(9, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '9번 전체공지', '9번 전체공지 내용', '1', 'notice'),		
(10, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0,0, 0, 0, 0, '10번 전체공지', '10번 전체공지 내용', '1', 'notice'),
(11, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '11번 전체공지', '11번 전체공지 내용', '1', 'notice'),		
(12, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0,0, 0, 0, 0, '12번 전체공지', '12번 전체공지 내용', '1', 'notice'),


-- 취업 게시판 (job)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '1번 취업공지 제목', '1번 취업 내용'   , '1', 'job'),
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '2번 취업공지 제목', '2번 취업 내용'   , '1', 'job'),
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '3번 취업공지 제목', '3번 취업 내용'   , '1', 'job'),
(4, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '4번 취업공지 제목', '4번 취업 내용'   , '1', 'job'),		
(5, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '5번 취업공지 제목', '5번 취업 내용'   , '1', 'job'),
(6, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '6번 취업공지 제목', '6번 취업 내용'   , '1', 'job'),
(7, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '7번 취업공지 제목', '7번 취업 내용'   , '1', 'job'),
(8, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '8번 취업공지 제목', '8번 취업 내용'   , '1', 'job'),
(9, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '9번 취업공지 제목', '9번 취업 내용'   , '1', 'job'),
(10, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '10번 취업공지 제목', '10번 취업 내용'   , '1', 'job'),
(11, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '11번 취업공지 제목', '11번 취업 내용'   , '1', 'job'),
(12, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '12번 취업공지 제목', '12번 취업 내용'   , '1', 'job'),
(13, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '13번 취업공지 제목', '13번 취업 내용'   , '1', 'job'),

-- 프로젝트 영상 (project)

-- 반별 게시판
-- 1반 공지게시판 (class_1_notice)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '1번 공지제목', '1번 내용', '5', 'class_1_notice'),		-- 1반 강사(3) 반별 공지글 1
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '2번 공지제목', '2번 내용', '5', 'class_1_notice'),
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '3번 공지제목', '3번 내용', '5', 'class_1_notice'),
(4, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '4번 공지제목', '4번 내용', '5', 'class_1_notice'),
(5, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '5번 공지제목', '5 내용', '5', 'class_1_notice'),
(6, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '6번 공지제목', '6번 내용', '5', 'class_1_notice'),
(7, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '7번 공지제목', '7번 내용', '5', 'class_1_notice'),
(8, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '8번 공지제목', '8번 내용', '5', 'class_1_notice'),
(9, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '9번 공지제목', '9번 내용', '5', 'class_1_notice'),
(10, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '10번 공지제목', '10번 내용', '5', 'class_1_notice'),
(11, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '11번 공지제목', '11번 내용', '5', 'class_1_notice'),
(12, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '12번 공지제목', '12번 내용', '5', 'class_1_notice'),



-- 1반 자료게시판 (class_1_library)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '1번 자료 제목', '1번 자료 내용', '5', 'class_1_library'),
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '2번 자료 제목', '2번 자료 내용', '5', 'class_1_library'),
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '3번 자료 제목', '3번 자료 내용', '5', 'class_1_library'),
(4, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '4번 자료 제목', '4번 자료 내용', '5', 'class_1_library'),
(5, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '5번 자료 제목', '5번 자료 내용', '5', 'class_1_library'),
(6, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '6번 자료 제목', '6번 자료 내용', '5', 'class_1_library'),
(7, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '7번 자료 제목', '7번 자료 내용', '5', 'class_1_library'),
(8, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '8번 자료 제목', '8번 자료 내용', '5', 'class_1_library'),
(9, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '9번 자료 제목', '9번 자료 내용', '5', 'class_1_library'),
(10, '2019-02-26 00:00:00', '2019-02-26 00:00:00',  0, 0, 0, 0, 0, '10번 자료 제목', '10번 자료 내용', '5', 'class_1_library'),


-- 1반 자유게시판 (class_1_board)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 1번제목', '자유게시판 1번 내용', '8', 'class_1_board'),		-- 1반 1번 학생(userId: 6/ st_id: 1) 반별 자유게시글 1
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 2번제목', '자유게시판 2번 내용', '9', 'class_1_board'),		-- 1반 2번 학생(userId: 7/ st_id: 2) 반별 자유게시글 1  
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 3번제목', '자유게시판 3번 내용', '10', 'class_1_board'),		-- 1반 강사(3) 반별 자유게시글 1
(4, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 4번제목', '자유게시판 4번 내용', '8', 'class_1_board'),
(5, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 5번제목', '자유게시판 5번 내용', '8', 'class_1_board'),
(6, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 6번제목', '자유게시판 6번 내용', '8', 'class_1_board'),
(7, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 7번제목', '자유게시판 7번 내용', '8', 'class_1_board'),
(8, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 8번제목', '자유게시판 8번 내용', '8', 'class_1_board'),
(9, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 9번제목', '자유게시판 9번 내용', '8', 'class_1_board'),
(10, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 10번제목', '자유게시판 10번 내용', '9', 'class_1_board'),
(11, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 11번제목', '자유게시판 11번 내용', '9', 'class_1_board'),
(12, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 12번제목', '자유게시판 12번 내용', '9', 'class_1_board'),
(13, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 13번제목', '자유게시판 13번 내용', '8', 'class_1_board'),
(14, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 14번제목', '자유게시판 14번 내용', '8', 'class_1_board'),
(15, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 15번제목', '자유게시판 15번 내용', '8', 'class_1_board'),
(16, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 16번제목', '자유게시판 16번 내용', '8', 'class_1_board'),
(17, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 17번제목', '자유게시판 17번 내용', '8', 'class_1_board'),
(18, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 18번제목', '자유게시판 18번 내용', '8', 'class_1_board'),
(19, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 19번제목', '자유게시판 19번 내용', '8', 'class_1_board'),
(20, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 20번제목', '자유게시판 20번 내용', '8', 'class_1_board'),
(21, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 21번제목', '자유게시판 21번 내용', '8', 'class_1_board'),
(22, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 22번제목', '자유게시판 22번 내용', '8', 'class_1_board'),
(23, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 23번제목', '자유게시판 23번 내용', '8', 'class_1_board'),
(24, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 24번제목', '자유게시판 24번 내용', '8', 'class_1_board'),
(25, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 25번제목', '자유게시판 25번 내용', '8', 'class_1_board'),
(26, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 26번제목', '자유게시판 26번 내용', '8', 'class_1_board'),
(27, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 0, 0, 0, 0, 0, '자유게시판 27번제목', '자유게시판 27번 내용', '8', 'class_1_board'),

-- 2반 공지게시판 (class_2_notice)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 30, 5, 1, 1, 1, '2반 공지 1번 제목', '2반 공지 1번 내용', '4', 'class_2_notice'),		-- 2반 강사(4) 반별 공지글 1

-- 2반 자료게시판 (class_2_library)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 30, 5, 1, 1, 1, '1반 자료 1번 제목', '1반 자료 1번 내용', '4', 'class_2_library'),		-- 2반 강사(4) 반별 자료글 1

-- 2반 자유게시판 (class_2_board)
(1, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 30, 5, 1, 1, 1, '2반 자유게시판 1번 제목', '2반 자유게시판 1번 내용', '11', 'class_2_board'),		-- 2반 6번 학생(userId: 11/ st_id: 6) 반별 자유게시글 1
(2, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 30, 5, 1, 1, 1, '2반 자유게시판 2번 제목', '2반 자유게시판 2번 내용', '12', 'class_2_board'),		-- 2반 7번 학생(userId: 12/ st_id: 7) 반별 자유게시글 1
(3, '2019-02-26 00:00:00', '2019-02-26 00:00:00', 30, 5, 1, 1, 1, '2반 자유게시판 3번 제목', '2반 자유게시판 3번 내용',  '4', 'class_2_board');		-- 2반 강사(4) 반별 자유게시글 1



-- ================  Reply Insert  ==============================================================================================
-- 댓글내용, 작성일, 수정일, 그룹ID, 뎁쓰, 시퀀스, 유저_고유번호, 게시물_고유번호
INSERT INTO `reply` (`reply_contents`,`reply_create_date`,`reply_update_date`, `reply_group_id`, `reply_depth` ,`reply_sequence`,
 `user_id`, `article_id`) VALUE 
('1번 댓글입니다~', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','1'),	
('2번 댓글입니다!~', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '9','1'),	
('3번 댓글입니다!!~', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '13','1'),	
('4번 댓글입니다!!!', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','1'),
('5번 댓글입니다!@!', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '9','1'),
('6번 댓글입니다@!@', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','1'),

('1번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','2'),
('2번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '9','2'),
('3번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '10','2'),
('4번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','2'),

('1반 자유게시판 1번글 1번댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','18'),	
('1반 자유게시판 1번글 2번댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '9','18'),
('ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '8','18'),	
('ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 0, 0, 0,   '10','18'),	

('1반 자게 2번글 1번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '6','19'),	
('1반 자게 2번글 2번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '7','19'),	

('1반 자게 3번글 1번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '6','20'),	
('1반 자게 3번글 2번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '3','20'),	
('1반 자게 3번글 3번 댓글', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '6','20'),	

('1반 공지 1번글 1번 댓글^^', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '6','5'),	
('1반 공지 1번글 2번 댓글^^', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '7','5'),	

('1반 자료 1번글 1번 댓글**', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '6','17'),	
('1반 자료 1번글 2번 댓글**', '2019-02-26 10:10:00', '2019-02-26 10:10:00', 1, 1, 1,   '7','17');


-- ================  File Insert  ==============================================================================================
-- ================  Article_File Insert  ==============================================================================================
-- ================  Homework Insert  ==============================================================================================
-- 선생님 출제
-- 과제명, 제출기한, 출제일, 수정일, 과목, 내용, 유저_고유번호, 제약이름, 반_고유번호
-- INSERT INTO `homework` (`hw_name`, `hw_deadline`, `hw_create_date`, `hw_update_date`,
--  `hw_subject`, `hw_description`, `user_id`,`constraint_name`,`class_id`) VALUE 
-- ('1반 1번 과제','2019-03-13 00:00:00', '2019-03-11 00:00:00','2019-03-11 00:00:00', 'JAVA' , '1반 1번 과제내용', '3','homework_constraint','1'), -- 1반 1번 과제(User_id : 3 Teacher_id : 1)
-- ('1반 2번 과제','2019-04-13 00:00:00', '2019-04-11 00:00:00','2019-04-11 00:00:00', 'JAVA2', '1반 2번 과제내용', '3','homework_constraint','1'), -- 1반 2번 과제(User_id : 3 Teacher_id : 1)
-- ('2반 1번 과제','2019-03-13 00:00:00', '2019-03-11 00:00:00','2019-03-11 00:00:00', 'JAVA' , '2반 1번 과제내용', '4','homework_constraint','2'); -- 1반 1번 과제(User_id : 3 Teacher_id : 1)

-- ================  HW Article Insert  ==============================================================================================
-- 학생 제출
-- 제출 날짜, 수정날짜, 과제내용, 과제_고유번호, 유저_고유번호
-- INSERT INTO `hw_article` (`hw_submit_date`, `hw_update_date`, `hw_contents`, `hw_id`, `user_id`) VALUE 
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 1번학생 과제내용1', '1', '6'),		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 학생의 과제제출
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 2번학생 과제내용1', '1', '7'),		-- 1반 1번과제에대한 (User_id: 7/ st_id:2) 학생의 과제제출
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 1번학생 과제내용1', '2', '6'),		-- 1반 2번과제에대한 (User_id: 6/ st_id:1) 학생의 과제제출
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 1번학생 과제내용1', '2', '7'),		-- 1반 2번과제에대한 (User_id: 7/ st_id:2) 학생의 과제제출
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 1번학생 과제내용1', '3', '11'),		-- 2반 1번과제에대한 (User_id: 11/ st_id:6) 학생의 과제제출
-- ('2019-04-20 15:23:18', '2019-04-20 00:00:00', '1반 1번학생 과제내용1', '3', '12');		-- 2반 1번과제에대한 (User_id: 12/ st_id:7) 학생의 과제제출


-- ================  HW Reply Insert  ==============================================================================================
-- 과제댓글내용, 작성일, 수정일, 과제제출_고유번호, 유저_고유번호
-- INSERT INTO `hw_reply` (`hw_reply_contents`, `hw_reply_create_date`, `hw_reply_update_date`, `hw_article_id`, `user_id`) VALUE 
-- ('3번 강사님 1번 과제 1번째 질문이요(6번학생)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '1', '6'),		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 학생6번이 질문
-- ('1번 학생아 1번 과제 1번째 답변이다(3번강사)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '1', '3'),		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 강사3번이 답변
-- ('3번 강사님 1번 과제 2번째 질문이요(6번학생)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '1', '6'),		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 학생6번이 질문
-- ('1번 학생아 1번 과제 2번째 답변이다(6번학생)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '1', '3'),		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 강사3번이 답변

-- ('3번 강사님 1번 과제 질문이요(7번학생)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '2', '7'),		-- 1반 1번과제에대한 (User_id: 7/ st_id:2) 학생7번이 질문
-- ('2번 학생아 1번 과제 답변이다(3번강사)','2019-04-20 15:23:18', '2019-04-20 00:00:00', '2', '3');		-- 1반 1번과제에대한 (User_id: 6/ st_id:1) 강사3번이 답변


-- ================  Point Log Insert  ==============================================================================================
-- 획득포인트, 포인트획득경로, 발생시간, 유저_고유번호
-- INSERT INTO `point_log` (`point_added`, `point_from`, `point_event_time`, `user_id`) VALUE
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'시험 점수','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),

-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8'),
-- (10,'과제 제출','2019-04-20 15:23:18','8');

-- ================  Class Teacher Log Insert  ==============================================================================================
-- 로그발생시간, 로그상세, 강사_고유번호, 반_고유번호
INSERT INTO `class_teacher_log` (`class_teacher_event_time`, `class_teacher_description`, `teacher_id`, `class_id`) VALUE
('2019-02-26 00:00:00','1반 개강','1','1'),		-- (User_id : 3 / t_id : 1) 인 1반 담당 강사가 들어옴
('2019-02-26 00:00:00','2반 개강','2','2');		-- (User_id : 4 / t_id : 2) 인 2반 담당 강사가 들어옴

-- ================  Attend Log Insert  ==============================================================================================
-- ================  Roadmap  Insert  ==============================================================================================
-- ================  Roadmap Exercise Insert  ==============================================================================================
-- ================  Quiz Insert  ==============================================================================================
-- 문제내용, 문제답, 문제당배점, 과목, 챕터, 난이도, 답안형식(객:0 /주:1) 해설, 유저_고유번호(강사), 제약이름 
INSERT INTO `quiz` (`quiz_contents`, `quiz_answer`, `quiz_each_score`, `quiz_subject`,`quiz_chapter`,`quiz_level`,`quiz_answertype`,`quiz_explain`,`user_id`,`constraint_name`) VALUE
('프로그램(코드)을 기계가 이해할 수 있는 언어로 바꾸는 작업은 무엇일까요?',	'컴파일',				10, 'Java', '입문',		'하', 1, '기계어로 변환', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 1번 문제를 제출
('자바 개발을 위해 설치하는 자바 라이브러리는 무엇일까요?',				'JDK',				10, 'Java', '입문', 		'하', 1, '자바라이브러리 설치', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 2번 문제를 제출
('자바 프로그램이 실행되는 자바 실행 환경은 무엇일까요?',				'JRE',				10, 'Java', '입문', 		'하', 1, '자바 실행 환경', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 3번 문제를 제출
('자바에서 클래스의 동적 로딩 방식을 제공하는 메서드는 무엇일까요?',		'Class.forName()',	10, 'Java', '클래스', 	'중', 1, '일반 클래스', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 4번 문제를 제출
('클래스를 생성하여 메모리에 있는 상태 멤버 변수를 다른말로 표현 하는 단어는?','인스턴스',10, 'Java', '클래스와객체', '중', 1, '문제 고유번호_5번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 5번 문제를 제출
('사용자가 예외를 직접 발생시키기 위해 사용하는 예약어는 무엇일까요?',		'throw',			10, 'Java', '예외 처리', 	'중', 1, '문제 고유번호_6번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 6번 문제를 제출
('모든 예외 클래스의 최상위 클래스는 무엇일까요?',						'exception',		10, 'Java', '예외 처리', 	'중', 1, '문제 고유번호_7번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 7번 문제를 제출
('인터페이스에 선언한 변수는 컴파일할 때 __으로 변환됩니다.',				'상수',				10, 'Java', '인터페이스', 	'상', 1, '문제 고유번호_8번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 8번 문제를 제출
('바이트로 읽어들인 자료를 문자로 변환해 주는 스트림은 무엇일까요?',		'InputStreamReader',10, 'Java', '입출력', 	'상', 1, '문제 고유번호_9번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 9번 문제를 제출
('2차원 배열 선언의 방법을 쓰시오.',								'타입[][]변수이름[][]',10, 'Java', '배열과 ArrayList', 	'상', 1, '문제 고유번호_10번 해설','3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 10번 문제를 제출

('문제(quiz) 고유번호_11번 내용', '1', 				 10, 'DB', 'DML', 	'하', 0, '문제 고유번호_11번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 11번 문제를 제출
('문제(quiz) 고유번호_12번 내용', '2', 				 10, 'DB', 'DDL', 	'하', 0, '문제 고유번호_12번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 12번 문제를 제출
('문제(quiz) 고유번호_13번 내용', '문제 고유번호_13번 답', 10, 'DB', 'DDL', 	'하', 1, '문제 고유번호_13번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 13번 문제를 제출
('문제(quiz) 고유번호_14번 내용', '3',				 10, 'DB', 'DCL', 	'중', 0, '문제 고유번호_14번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 14번 문제를 제출
('문제(quiz) 고유번호_15번 내용', '4',				 10, 'DB', 'DCL', 	'중', 0, '문제 고유번호_15번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 15번 문제를 제출
('문제(quiz) 고유번호_16번 내용', '문제 고유번호_16번 답', 10, 'DB', '무결성', 	'중', 1, '문제 고유번호_16번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 16번 문제를 제출
('문제(quiz) 고유번호_17번 내용', '문제 고유번호_17번 답', 10, 'DB', '무결성', 	'중', 1, '문제 고유번호_17번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 17번 문제를 제출
('문제(quiz) 고유번호_18번 내용', '1',				 10, 'DB', '무결성', 	'상', 0, '문제 고유번호_18번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 18번 문제를 제출
('문제(quiz) 고유번호_19번 내용', '문제 고유번호_19번 답', 10, 'DB', '쿼리', 	'상', 1, '문제 고유번호_19번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 19번 문제를 제출
('문제(quiz) 고유번호_20번 내용', '문제 고유번호_20번 답', 10, 'DB', '쿼리', 	'상', 1, '문제 고유번호_20번 해설', '4', 'quiz_constraint'),		-- 4번 강사(UserId : 4/ t_id: 2)가 20번 문제를 제출

('문제(quiz) 고유번호_21번 내용', '1',				 10, '웹', 'ch_1', 	'하', 0, '문제 고유번호_21번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 21번 문제를 제출
('문제(quiz) 고유번호_22번 내용', '2',				 10, '웹', 'ch_1', 	'하', 0, '문제 고유번호_22번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 22번 문제를 제출
('문제(quiz) 고유번호_23번 내용', '문제 고유번호_23번 답', 10, '웹', 'ch_2', 	'하', 1, '문제 고유번호_23번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 23번 문제를 제출
('문제(quiz) 고유번호_24번 내용', '3',				 10, '웹', 'ch_2', 	'중', 0, '문제 고유번호_24번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 24번 문제를 제출
('문제(quiz) 고유번호_25번 내용', '4',				 10, '웹', 'ch_2', 	'중', 0, '문제 고유번호_25번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 25번 문제를 제출
('문제(quiz) 고유번호_26번 내용', '문제 고유번호_26번 답', 10, '웹', 'ch_3', 	'중', 1, '문제 고유번호_26번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 26번 문제를 제출
('문제(quiz) 고유번호_27번 내용', '문제 고유번호_27번 답', 10, '웹', 'ch_3', 	'중', 1, '문제 고유번호_27번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 27번 문제를 제출
('문제(quiz) 고유번호_28번 내용', '1',				 10, '웹', 'ch_4', 	'상', 0, '문제 고유번호_28번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 28번 문제를 제출
('문제(quiz) 고유번호_29번 내용', '문제 고유번호_29번 답', 10, '웹', 'ch_4', 	'상', 1, '문제 고유번호_29번 해설', '3', 'quiz_constraint'),		-- 3번 강사(UserId : 3/ t_id: 1)가 29번 문제를 제출
('문제(quiz) 고유번호_30번 내용', '문제 고유번호_30번 답', 10, '웹', 'ch_4', 	'상', 1, '문제 고유번호_30번 해설', '3', 'quiz_constraint');		-- 3번 강사(UserId : 3/ t_id: 1)가 30번 문제를 제출


-- ================  Test Group Insert  ==============================================================================================
-- 시험이름, 시작시간, 종료시간, 상세, 모든학생총점, 평균, 최고점, 최저점, 유저_고유번호(강사), 제약이름, 반_고유번호
-- INSERT INTO `test_group` (`test_name`, `test_start_time`, `test_end_time`, `test_description`,`sum`,
-- `avg`,`max`,`min`,`user_id`,`constraint_name`,`class_id`) VALUE
-- ('1반 1번 시험','2019-05-25 15:00:00','2019-05-25 18:00:00','자바의 기초에대한 시험',500,80,100,60,'3','test_constraint','1'),		-- (1반) 3번 강사가 1번 시험을 제출 (과거)
-- ('2반 1번 시험','2019-05-25 15:00:00','2019-05-25 18:00:00','자바의 기초에대한 시험',500,80,100,60,'4','test_constraint','2'),		-- (2반) 4번 강사가 1번 시험을 제출 (과거)

-- ('1반 2번 시험','2019-08-18 12:00:00','2019-08-18 18:00:00','DB의 기초에대한 시험',500,80,100,60,'3','test_constraint','1'),		-- (1반) 3번 강사가 2번 시험을 제출 (현재)
-- ('2반 2번 시험','2019-08-18 12:00:00','2019-08-18 18:00:00','DB의 기초에대한 시험',500,80,100,60,'4','test_constraint','2'),		-- (2반) 4번 강사가 2번 시험을 제출 (현재)

-- ('1반 3번 시험','2019-09-05 15:00:00','2019-09-05 18:00:00','웹의 기초에대한 시험',500,80,100,60,'3','test_constraint','1'),		-- (1반) 3번 강사가 3번 시험을 제출 (미래)
-- ('2반 3번 시험','2019-09-05 15:00:00','2019-09-05 18:00:00','웹의 기초에대한 시험',500,80,100,60,'4','test_constraint','2');		-- (2반) 4번 강사가 3번 시험을 제출 (미래)
-- ================  Test Quiz Insert  ==============================================================================================
-- 시험지내번호 , 시험_고유번호, 문제_고유번호
-- INSERT INTO `test_quiz` (`test_quiz_no`,`test_id`,`quiz_id`) VALUE
-- (1, '1', '1'),		-- 1반 1번 시험의 1번문제 
-- (2, '1', '2'),		-- 1반 1번 시험의 2번문제 
-- (3, '1', '3'),		-- 1반 1번 시험의 3번문제 
-- (4, '1', '4'),		-- 1반 1번 시험의 4번문제 
-- (5, '1', '5'),		-- 1반 1번 시험의 5번문제 
-- (6, '1', '6'),		-- 1반 1번 시험의 6번문제 
-- (7, '1', '7'),		-- 1반 1번 시험의 7번문제 
-- (8, '1', '8'),		-- 1반 1번 시험의 8번문제 
-- (9, '1', '9'),		-- 1반 1번 시험의 9번문제 
-- (10,'1','10'),		-- 1반 1번 시험의 10번문제 

-- (1, '3', '11'),		-- 1반 2번 시험의 1번문제 
-- (2, '3', '12'),		-- 1반 2번 시험의 2번문제 
-- (3, '3', '13'),		-- 1반 2번 시험의 3번문제 
-- (4, '3', '14'),		-- 1반 2번 시험의 4번문제 
-- (5, '3', '15'),		-- 1반 2번 시험의 5번문제 
-- (6, '3', '16'),		-- 1반 2번 시험의 6번문제 
-- (7, '3', '17'),		-- 1반 2번 시험의 7번문제 
-- (8, '3', '18'),		-- 1반 2번 시험의 8번문제 
-- (9, '3', '19'),		-- 1반 2번 시험의 9번문제 
-- (10,'3', '20'),		-- 1반 2번 시험의 10번문제

-- (1, '2', '11'),		-- 2반 1번 시험의 1번문제 
-- (2, '2', '12'),		-- 2반 1번 시험의 2번문제 
-- (3, '2', '13'),		-- 2반 1번 시험의 3번문제 
-- (4, '2', '14'),		-- 2반 1번 시험의 4번문제 
-- (5, '2', '15'),		-- 2반 1번 시험의 5번문제 
-- (6, '2', '16'),		-- 2반 1번 시험의 6번문제 
-- (7, '2', '17'),		-- 2반 1번 시험의 7번문제 
-- (8, '2', '18'),		-- 2반 1번 시험의 8번문제 
-- (9, '2', '19'),		-- 2반 1번 시험의 9번문제 
-- (10,'2', '20'),		-- 2반 1번 시험의 10번문제 

-- (1, '4', '1'),		-- 2반 2번 시험의 1번문제 
-- (2, '4', '2'),		-- 2반 2번 시험의 2번문제 
-- (3, '4', '3'),		-- 2반 2번 시험의 3번문제 
-- (4, '4', '4'),		-- 2반 2번 시험의 4번문제 
-- (5, '4', '5'),		-- 2반 2번 시험의 5번문제 
-- (6, '4', '6'),		-- 2반 2번 시험의 6번문제 
-- (7, '4', '7'),		-- 2반 2번 시험의 7번문제 
-- (8, '4', '8'),		-- 2반 2번 시험의 8번문제 
-- (9, '4', '9'),		-- 2반 2번 시험의 9번문제 
-- (10,'4', '10');		-- 2반 2번 시험의 10번문제
-- ================  Student Test Insert  ==============================================================================================
-- 개인시험점수, 시험_고유번호, 유저_고유번호
-- INSERT INTO `student_test`(`st_test_score`,`test_id`,`user_id`) VALUE
-- (100,'1','6'),		-- (User Id : 6 / st_id : 1) 1반의 1번 학생의 1번 시험결과
-- (90,'1','7'),		-- (User Id : 7 / st_id : 2) 1반의 2번 학생의 1번 시험결과
-- (80,'1','8'),		-- (User Id : 8 / st_id : 3) 1반의 3번 학생의 1번 시험결과
-- (70,'1','9'),		-- (User Id : 9 / st_id : 4) 1반의 4번 학생의 1번 시험결과
-- (60,'1','10'),		-- (User Id : 10 / st_id : 5) 1반의 5번 학생의 1번 시험결과

-- (60,'3','6'),		-- (User Id : 6 / st_id : 1) 1반의 1번 학생의 2번 시험결과
-- (70,'3','7'),		-- (User Id : 7 / st_id : 2) 1반의 2번 학생의 2번 시험결과
-- (80,'3','8'),		-- (User Id : 8 / st_id : 3) 1반의 3번 학생의 2번 시험결과
-- (90,'3','9'),		-- (User Id : 9 / st_id : 4) 1반의 4번 학생의 2번 시험결과
-- (100,'3','10'),		-- (User Id : 10 / st_id : 5) 1반의 5번 학생의 2번 시험결과

-- (60,'2','11'),		-- (User Id : 11 / st_id : 6) 2반의 6번 학생의 1번 시험결과
-- (70,'2','12'),		-- (User Id : 12 / st_id : 7) 2반의 7번 학생의 1번 시험결과
-- (80,'2','13'),		-- (User Id : 13 / st_id : 8) 2반의 8번 학생의 1번 시험결과
-- (90,'2','14'),		-- (User Id : 14 / st_id : 9) 2반의 9번 학생의 1번 시험결과
-- (100,'2','15'),		-- (User Id : 15 / st_id : 10) 2반의 10번 학생의 1번 시험결과

-- (100,'4','11'),		-- (User Id : 11 / st_id : 6) 2반의 11번 학생의 2번 시험결과
-- (90,'4','12'),		-- (User Id : 12 / st_id : 7) 2반의 12번 학생의 2번 시험결과
-- (80,'4','13'),		-- (User Id : 13 / st_id : 8) 2반의 13번 학생의 2번 시험결과
-- (70,'4','14'),		-- (User Id : 14 / st_id : 9) 2반의 14번 학생의 2번 시험결과
-- (60,'4','15');		-- (User Id : 15 / st_id : 10) 2반의 15번 학생의 2번 시험결과


-- ================  Student Answer Insert  ==============================================================================================
-- 학생답안내용, 학생_시험_고유번호, 시험문제고유번호
-- INSERT INTO `student_answer` (`student_test_answer_content`,`student_test_id`,`test_quiz_id`) VALUE
-- ('1',				'1','1'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 1번답
-- ('2',				'1','2'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 2번답
-- ('문제 고유번호_3번 답','1','3'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 3번답
-- ('4',				'1','4'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 4번답
-- ('1',				'1','5'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 5번답
-- ('문제 고유번호_6번 답','1','6'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 6번답
-- ('문제 고유번호_7번 답','1','7'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 7번답
-- ('2',				'1','8'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 8번답
-- ('문제 고유번호_9번 답',	'1','9'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 9번답
-- ('문제 고유번호_10번 답','1','10'),		-- (User ID: 6 / st_id: 1) 학생의 1번시험의 10번답

-- ('1',				'2','1'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 1번답
-- ('2',				'2','2'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 2번답
-- ('문제 고유번호_3번 답','2','3'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 3번답
-- ('4',				'2','4'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 4번답
-- ('1',				'2','5'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 5번답
-- ('문제 고유번호_6번 답','2','6'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 6번답
-- ('문제 고유번호_7번 답','2','7'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 7번답
-- ('2',				'2','8'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 8번답
-- ('문제 고유번호_9번 답',	'2','9'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 9번답
-- ('오답작성~',			'2','10'),		-- (User ID: 7 / st_id: 2) 학생의 1번시험의 10번답

-- ('1',				'3','1'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 1번답
-- ('2',				'3','2'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 2번답
-- ('문제 고유번호_3번 답','3','3'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 3번답
-- ('4',				'3','4'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 4번답
-- ('1',				'3','5'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 5번답
-- ('문제 고유번호_6번 답','3','6'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 6번답
-- ('문제 고유번호_7번 답','3','7'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 7번답
-- ('2',				'3','8'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 8번답
-- ('오답작성~',			'3','9'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 9번답
-- ('오답작성~',			'3','10'),		-- (User ID: 8 / st_id: 3) 학생의 1번시험의 10번답

-- ('1',				'4','1'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 1번답
-- ('2',				'4','2'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 2번답
-- ('문제 고유번호_3번 답','4','3'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 3번답
-- ('4',				'4','4'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 4번답
-- ('1',				'4','5'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 5번답
-- ('문제 고유번호_6번 답','4','6'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 6번답
-- ('오답작성~',			'4','7'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 7번답
-- ('2',				'4','8'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 8번답
-- ('오답작성~',			'4','9'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 9번답
-- ('오답작성~',			'4','10'),		-- (User ID: 9 / st_id: 4) 학생의 1번시험의 10번답

-- ('1',				'5','1'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 1번답
-- ('2',				'5','2'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 2번답
-- ('문제 고유번호_3번 답',	'5','3'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 3번답
-- ('4',				'5','4'),		-- (User ID: 10/ st_id:  5) 학생의 1번시험의 4번답
-- ('1',				'5','5'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 5번답
-- ('오답작성~',			'5','6'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 6번답
-- ('오답작성~',			'5','7'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 7번답
-- ('2',				'5','8'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 8번답
-- ('오답작성~',			'5','9'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 9번답
-- ('오답작성~',			'5','10'),		-- (User ID: 10 / st_id: 5) 학생의 1번시험의 10번답

-- ('1',				'6','1'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 1번답
-- ('2',				'6','2'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 2번답
-- ('문제 고유번호_13번 답','6','3'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 3번답
-- ('3',				'6','4'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 4번답
-- ('4',				'6','5'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 5번답
-- ('오답작성~',			'6','6'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 6번답
-- ('오답작성~',			'6','7'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 7번답
-- ('1',				'6','8'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 8번답
-- ('오답작성~',			'6','9'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 9번답
-- ('오답작성~',			'6','10'),		-- (User ID: 6 / st_id: 1) 학생의 2번시험의 10번답

-- ('1',				'7','11'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 1번답
-- ('2',				'7','12'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 2번답
-- ('문제 고유번호_13번 답','7','13'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 3번답
-- ('3',				'7','14'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 4번답
-- ('4',				'7','15'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 5번답
-- ('문제 고유번호_16번 답','7','16'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 6번답
-- ('오답작성~',			'7','17'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 7번답
-- ('1',				'7','18'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 8번답
-- ('오답작성~',			'7','19'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 9번답
-- ('오답작성~',			'7','20'),		-- (User ID: 7 / st_id: 2) 학생의 2번시험의 10번답

-- ('1',				'8','11'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 1번답
-- ('2',				'8','12'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 2번답
-- ('문제 고유번호_13번 답','8','13'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 3번답
-- ('3',				'8','14'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 4번답
-- ('4',				'8','15'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 5번답
-- ('문제 고유번호_16번 답','8','16'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 6번답
-- ('문제 고유번호_17번 답','8','17'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 7번답
-- ('1',				'8','18'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 8번답
-- ('오답작성~',			'8','19'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 9번답
-- ('오답작성~',			'8','20'),		-- (User ID: 8 / st_id: 3) 학생의 2번시험의 10번답

-- ('1',				'9','11'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 1번답
-- ('2',				'9','12'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 2번답
-- ('문제 고유번호_13번 답','9','13'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 3번답
-- ('3',				'9','14'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 4번답
-- ('4',				'9','15'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 5번답
-- ('문제 고유번호_16번 답','9','16'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 6번답
-- ('문제 고유번호_17번 답',			'9','17'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 7번답
-- ('1',				'9','18'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 8번답
-- ('문제 고유번호_19번 답',			'9','19'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 9번답
-- ('오답작성~',			'9','20'),		-- (User ID: 9 / st_id: 4) 학생의 2번시험의 10번답

-- ('1',				'10','11'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 1번답
-- ('2',				'10','12'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 2번답
-- ('문제 고유번호_13번 답',	'10','13'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 3번답
-- ('3',				'10','14'),		-- (User ID: 10/ st_id:  5) 학생의 2번시험의 4번답
-- ('4',				'10','15'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 5번답
-- ('문제 고유번호_16번 답',			'10','16'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 6번답
-- ('문제 고유번호_17번 답',			'10','17'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 7번답
-- ('1',				'10','18'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 8번답
-- ('문제 고유번호_19번 답',			'10','19'),		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 9번답
-- ('문제 고유번호_20번 답',			'10','20');		-- (User ID: 10 / st_id: 5) 학생의 2번시험의 10번답

-- ================  Roadmap Insert  ==============================================================================================
-- 스테이지번호, 과목명, 챕터명
INSERT INTO `roadmap` VALUE 
(1,'JAVA','자바 프로그래밍 입문'),
(2,'JAVA','변수와 자료형'),
(3,'JAVA','자바의 여러가지 연산자'),
(4,'JAVA','제어 흐름 이해하기'),
(5,'JAVA','클래스와 객체1'),
(6,'JAVA','클래스와 객체2'),
(7,'JAVA','배열과 ArrayList'),
(8,'JAVA','상속과 다형성'),
(9,'JAVA','추상 클래스'),
(10,'JAVA','인터페이스'),
(11,'JAVA','기본 클래스'),
(12,'JAVA','컬렉션 프레임워크'),
(13,'JAVA','내부 클래스, 람다식, 스트림, 쓰레드'),
(14,'JAVA','예외 처리'),
(15,'JAVA','자바 입출력');

-- ================  Roadmap_Exercise Insert  ==============================================================================================
-- 연습문제번호, 문제, 답, 스테이지번호
INSERT INTO `roadmap_exercise` VALUE
(1, '1-1문제 \r\n 프로그램(코드)을 기계가 이해할 수 있는 언어로 바꾸는 작업은 무엇일까요? \r\n\r\n 1.가상 머신  2.객체 지향  3.JDK  4.컴파일 ', 4, 1),
(2, '1-2문제 \r\n 자바 개발을 위해 설치하는 자바 라이브러리는 무엇일까요? \r\n\r\n 1.JVM  2.JDK  3.JRE  4.JAVA SE ', 2, 1),
(3, '1-3문제 \r\n 자바 프로그램이 실행되는 자바 실행 환경은 무엇일까요? \r\n\r\n 1.JVM  2.JDK  3.JRE  4.JAVA SE ', 3, 1),
(4, '2-1문제 \r\n 더 많은 실수를 표현하기 위해 가수부와 지수부로 비트를 나누어 표현하는 방식은 무엇일까요? \r\n\r\n 1.아스키  2.부동 소수점 방식  3.리터럴  4.UTF-8 ', 2, 2),
(5, '2-2문제 \r\n 다음 자료형에 대한 데이터가 틀린 것은? \r\n\r\n 1.boolean = 참과 거짓   2.char = 문자   3.short = 정수   4.long = 실수 ', 4, 2),
(6, '2-3문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 짝지은 것은? \r\n double e1 = 1.2e-3; \r\n double e2 = 1.2e+3; \r\n int num1 = 0xA0E; \r\n int num2 = 0752; \r\n\r\n System.out.println(e1); \r\n System.out.println(e2); \r\n System.out.println(num1); \r\n System.out.println(num2); \r\n\r\n 1. 1.2e-3 / 1.2e+3 / 0xA0E / 0752 \r\n 2. 0.012 / 120.0 / 2574 / 490 \r\n 3. 0.0012 / 1200.0 / 2574 / 490 \r\n 4. 0.0012 / 1200.0 / 24105 / 752 ', 3, 2),
(7, '3-1문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 짝지은 것은? \r\n int num = 10; \r\n\r\n System.out.println(num); \r\n System.out.println(num++); \r\n System.out.println(num); \r\n System.out.println(--num); \r\n\r\n 1.10/10/11/10  2.10/11/11/10  3.10/10/11/11  4.10/11/11/11 ', 1, 3),
(8, '3-2문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 짝지은 것은? \r\n int num = 8; \r\n\r\n System.out.println(num += 10); \r\n System.out.println(num -= 10); \r\n System.out.println(num >>= 2); \r\n\r\n 1.18/18/4  2.8/8/8  3.18/18/2  4.18/8/2', 4, 3),
(9, '3-3문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 짝지은 것은? \r\n int num1 = 10; \r\n int num2 = 20; \r\n boolean result; \r\n\r\n result = ((num > 10) && (num2 > 10)); \r\n System.out.println(result); \r\n result = ((num > 10) && (num2 > 10)); \r\n System.out.println(result); \r\n System.out.println(!result); \r\n\r\n 1.false/false/true  2.false/true/false  3.true/false/false  4.false/true/true', 2, 3),
(10, '4-1문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 고른 것은? \r\n int n = 0; \r\n\r\n for(int i = 1 ; i <= 110 ; i++) { \r\n if(i % 4 == 0) { \r\n n++; \r\n } \r\n } \r\n\r\n System.out.println(n); \r\n\r\n 1. 25   2. 26   3. 27   4. 28 ', 3, 4),
(11, '4-2문제 \r\n 다음 코드가 수행될 때 출력되는 값을 바르게 고른 것은? \r\n for(int i = 1 ; i <= 10 ; i++) { \r\n if(i % 2 == 0) { \r\n conitnue; \r\n System.out.println(i); \r\n } \r\n } \r\n\r\n 1. 1, 3, 5, 7, 9 \r\n 2. 2, 4, 6, 8, 10 \r\n 3. 1 \r\n 4. 2 ', 1, 4),
(12, '4-3문제 \r\n 다음 중 for문 사용법이 틀린것은? \r\n\r\n 1.for(   ; i < 10 ; i++)  2.for(int i = 0 ;   ; i++)  3.for(int i = 0 ; i < 10 ;   )  4.for(   ;   ;   ) ', 1, 4),
(13, '5-1문제 \r\n 다음 설명하는 것을 바르게 짝지은 것은? \r\n\r\n -클래스를 생성하여 메모리에 있는 상태 \r\n -멤버 변수를 다른말로 표현 하는 단어 \r\n\r\n 1.스택/생성자  2.인스턴스/인스턴스 변수  3.로컬/인스턴스  4.스택/인자', 2, 5),
(14, '5-2문제 \r\n 이것은 일반함수에 객체 지향의 개념을 추가하여, 클래스 내부에 선언하고 클래스 멤버 변수를 사용하여 클래스 기능을 구현합니다. 이것은 무엇일까요? \r\n\r\n 1.인스턴스  2.생성자  3.메서드  4.오버로드 ', 3, 5),
(15, '5-3문제 \r\n 클래스에 여러 생성자가 오버로드 되어 있을 경우에 하나의 생성자에서 다른 생성자를 호출할 때 이것을 사용합니다. 이것은 무엇일까요? \r\n\r\n 1.static  2.this  3.get  4.set', 2, 5),
(16, '6-1문제 \r\n 클래스 내부에서 선언하는 static 변수는 생성되는 인스턴스마다 만들어지는 것이 아닌 여러 인스턴스가 공유하는 변수입니다. \r\n 따라서 클래스에 기반한 유일한 변수라는 의미를 이것이라고도 합니다. 이것은 무엇일까요? \r\n\r\n 1.로컬 변수  2.지역 변수 3.클래스 변수  4.인스턴스 변수 ', 3, 6),
(17, '6-2문제 \r\n 빈칸에 들어갈 내용을 바르게 짝지은 것은? \r\n\r\n -지역변수는 함수나 메서드 내부에서만 사용할 수 있고 _____메모리에 생성됩니다. \r\n -멤버 변수중 static 예약어를 사용하는 static _____메모리에 생성됩니다. \r\n\r\n 1.스택/스택  2.스택/데이터 영역  3.힙/스택  4. 데이터 영역/힙', 2, 6),
(18, '6-3문제 \r\n 싱글톤 패턴으로 프로그램을 구현하는 과정으로 틀린것은? \r\n\r\n 1.생성자를 public으로 만들기 \r\n 2.클래스 내부에 static으로 유일한 인스턴스 생성하기 \r\n 3.외부에서 참조할 수 있는 public 메서드 만들기 \r\n 4.실제로 사용하는 코드 만들기 ', 1, 6),
(19, '7-1문제 \r\n 다음 코드에 대한 연산의 값으로 바르게 바르게 짝지은 것은? \r\n int[] arr = new int[] {3, 6, 9, 12}; \r\n\r\n arr[0] + 2 = ? \r\n arr[1] + arr[2] = ? \r\n arr[4] - 3 = ? \r\n\r\n 1. 5 / 15 / 컴파일 오류발생 \r\n 2. 2 / 9 / 컴파일 오류발생 \r\n 3. 컴파일 오류발생 / 9 / 9 \r\n 4. 컴파일 오류발생 / 15 / 컴파일 오류발생 ', 1, 7),
(20, '7-2문제 \r\n String클래스에 대한 설명으로 바르지 않은 것은? \r\n\r\n 1.String클래스는 char배열에 메서드를 추가한 것이다. \r\n 2.char charAt(int index) 메서드는 문자열에서 시작부터 해당위치(index)까지 있는 문자들을 반환하는 메서드이다. \r\n 3.boolean equals(String str) 메서드는 문자열의 내용이 같은지 확인하는 메서드이다. 결과는 같으면 true, 다르면 false가 된다. \r\n 4.char[] toCharArray() 메서드는 문자열을 문자배열로 변환해서 반환하는 메서드이다. ', 2, 7),
(21, '7-3문제 \r\n 2차원 배열 선언의 방법으로 틀린 것은? \r\n\r\n 1.타입[][] 변수이름;  2.타입 변수이름[][];  3.타입[] 변수이름[];  4.타입[][] 변수이름[][];  ', 4, 7),
(22, '8-1문제 \r\n 이것은 하위 클래스가 상위 클래스의 생성자를 호출하거나 상위 클래스의 멤버 변수, 메서드를 호출하기 위해 사용하는 것으로 상위 클래스의 주소, 즉 참조 값을 나타냅니다. 이것은 무엇일까요? \r\n\r\n 1.implements  2.super  3.extends  4.instanceof ', 2, 8),
(23, '8-2문제 \r\n 인스턴스 변수에 별도의 초기화를 진행하지 않으면 모든 인스턴스 변수는 디폴트 값으로 초기화 되는데 초기화 되는 값으로 틀린것은? \r\n\r\n 1.int - 0  2.long - 0  3.double - 0  4.boolean - true ', 4, 8),
(24, '8-3문제 \r\n 상속에 대한 설명으로 바르지 않은 것은? \r\n\r\n 1.상위 클래스의 참조변수는 하위 클래스의 인스턴스를 참조할 수 없다. \r\n 2.오버라이딩 된 상위 클래스의 메서드는 오버라이딩을 한 하위 클래스의 메서드에 의해 가리워진다. \r\n 3.외부에서는 참조변수를 통해서 오버라이딩 된 상위 클래스의 메소드를 호출할 수 없다. \r\n 4.클래스를 정의할 때 어떤 클래스도 상속하지 않으면 Object 클래스를 상속하게 된다. ', 1, 8),
(25, '9-1문제 \r\n 다음 설명하는 것을 바르게 짝지은 것은? \r\n\r\n -상수를 선언할 때 상속받은 클래스에서 메서드를 재정의하지 못하도록 사용하는 예약어 \r\n -추상클래스나 추상 메서드를 선언할 때 사용하는 예약어 \r\n\r\n 1.override/final  2.abstract/finally  3.finally/override  4.final/abstract ', 4, 9),
(26, '9-2문제 \r\n 로직 흐름을 정의한 메서드이며 메서드 내부에서 일반 메서드나 구현되지 않은 추상 메서드를 호출합니다. \r\n 흐름이 변하지 않도록 하위 클래스에서 재정의하지 못하게 final로 선언하는 메서드는 무엇일까요? \r\n\r\n 1.정적  2.디폴트  3.템플릿  4.상수 ', 3, 9),
(27, '9-3문제 \r\n 추상 클래스에 대한 설명으로 바른 것은? \r\n\r\n 1.추상 클래스는 참조변수 선언이 불가능하다. \r\n 2.추상클래스는 메서드 오버라이딩의 원리가 그대로 적용된다. \r\n 3.클래스에 abstract로 선언하지 않아도 abstract 메서드를 사용할 수 있다. \r\n 4. 추상 클래스는 인스턴스로 생성할 수 있다. ', 2, 9),
(28, '10-1문제 \r\n 인터페이스에 선언한 변수는 컴파일할 때 이것으로 변환됩니다. 이것은 무엇일까요? \r\n\r\n 1.인스턴스  2.상수  3.로컬  4.생성자 ', 2, 10),
(29, '10-2문제 \r\n 인터페이스에서 구현 코드를 제공하는 메서드는 _____와 _____입니다. 빈칸에 들어갈 내용을 바르게 짝지은 것은? \r\n\r\n 1.디폴트 메서드/정적 메서드  2.디폴트 메서드/추상 메서드  3.정적 메서드/인스턴스 메서드  4.디폴트 메서드/인스턴스 메서드  ', 1, 10),
(30, '10-3문제 \r\n 한 인터페이스를 여러 클래스가 다양한 방식으로 구현한 경우에 프로그램에서 인터페이스에 선언된 메서드를 사용할 때 \r\n 각 클래스의 구현 내용과 상관없이 동일한 방식으로 사용할 수 있습니다. \r\n 이렇게 같은 코드가 여러 구현 내용으로 실행되는 객체 지향 특성을 이것 이라고 합니다. 이것은 무엇일까요? \r\n\r\n 1.메서드 재정의  2.추상  3.상속  4.다형성 ', 4, 10),
(31, '11-1문제 \r\n 기본 자료형을 멤버 변수로 포함하여 메서드를 제공함으로서 기본 자료형의 객체를 제공하는 클래스는 무엇일까요? \r\n\r\n 1.Class  3.String  3.Wrapper  4.Object ', 3, 11),
(32, '11-2문제 \r\n 자바에서 클래스의 동적 로딩 방식을 제공하는 메서드는 무엇일까요? \r\n\r\n 1.Class.forName()  2.hashCode()  3.get.Class()  4.clone() ', 1, 11),
(33, '11-3문제 \r\n Object 클래스의 toString 메서드에 대한 설명으로 바르지 않은 것은? \r\n\r\n 1.toString 메서드는 Object 클래스의 인스턴스 메서드이다. \r\n 2.원하는 문자열을 반환하도록 toString 메서드를 오버로딩 하는 것이 일반적이다. \r\n 3.System.out.println 메서드는 인자로 전달된 인스턴스의 toString 메서드를 호출하여 반환되는 문자열을 출력한다. \r\n 4.toString 메서드는 인스턴스의 정보를 문자열의 형태로 반환하기 위한 메서드이다. ', 2, 11),
(34, '12-1문제 \r\n 클래스에서 여러 자료형을 사용할 때 자료형을 명시하지 않고 자료형을 의미하는 문자로 선언한 후 실제 클래스를 생성할 때 자료형을 명시하는 프로그래밍 방식은 무엇일까요? \r\n\r\n 1.링크드 리스트  2.컬렉션 프레임워크  3.Map  4.제네릭 ', 4, 12),
(35, '12-2문제 \r\n Collection 인터페이스를 구현한 클래스를 순회하기 위해 사용하는 인터페이스는 무엇일까요? \r\n\r\n 1.Implements  2.ArrayList  3.Iterator  4.Abstract ', 3, 12),
(36, '12-3문제 \r\n ArrayList<E>의 특징으로 바르지 않은 것은? \r\n\r\n 1.저장소의 용량을 늘리는 과정에서 많은 시간이 소요된다. \r\n 2.데이터의 삭제에 필요한 연산과정이 매우 길다. \r\n 3.데이터의 참조가 용이해서 빠른 참조가 가능하다. \r\n 4.clone() ', 1, 12),
(37, '13-1문제 \r\n 람다식으로 구현할 수 있는 인터페이스는 메서드를 하나만 가져야 합니다. 이러한 인터페이스는 무엇일까요? \r\n\r\n 1.함수형 인터페이스  2.스트림 인터페이스  3.리듀스 인터페이스  4.람다식 인터페이스 ', 1, 13),
(38, '13-2문제 \r\n 스트림의 특징으로 바르지 않은 것은? \r\n\r\n 1.자료의 대상과 관계없이 동일한 연산을 수행한다. \r\n 2.한 번 생성하고 사용한 스트림을 재사용할 수 있다. \r\n 3.스트림의 연산은 기존 자료를 변경하지 않는다. \r\n 4.스트림의 연산은 중간 연산과 최종 연산이 있다. ', 2, 13),
(39, '13-3문제 \r\n 쓰레드에 대한 설명으로 바르지 않은 것은? \r\n\r\n 1.쓰레드가 생성되면 가상머신은 쓰레드의 실행을 위한 별도의 메모리 공간을 할당한다. \r\n 2.쓰레드의 실행순서는 소스코드가 나열된 순서와 다를 수 있기 때문에 실행순서 예측이 불가능하다. \r\n 3.동기화는 쓰레드의 접근 순서나 방식을 컨트롤 한다는 의미이다. \r\n 4.Dead상태가 된 쓰레드가 필요시 다시 Runnable상태로 실행할 수 있다. ', 4, 13),
(40, '14-1문제 \r\n 모든 예외 클래스의 최상위 클래스는 무엇일까요? \r\n\r\n 1.exception  2.stack  3.throws  4.throw ', 1, 14),
(41, '14-2문제 \r\n 예외 처리를 위해 try-catch 문장을 사용할 수도 있지만, 예외를 직접 처리하지 않고 미룰 때 사용하는 예약어는 무엇일까요? \r\n\r\n 1.exception  2.finally  3.throws  4.throw ', 3, 14),
(42, '14-3문제 \r\n 사용자가 예외를 직접 발생시키기 위해 사용하는 예약어는 무엇일까요? \r\n\r\n 1.exception  2.finally  3.throws  4.throw ', 4, 14),
(43, '15-1문제 \r\n 바이트로 읽어들인 자료를 문자로 변환해 주는 스트림은 무엇일까요? \r\n\r\n 1.BufferedReader  2.InputStreamReader  3.CharReader  4.StringReader ', 2, 15),
(44, '15-2문제 \r\n 인스턴스 내용을 그대로 저장하거나 네트워크로 전송할 수 있도록 연속된 바이트로 만들고 이를 복원하는 기술은 무엇일까요? \r\n\r\n 1.transient  2.스트림  3.직렬화  4.데코레이터 ', 3, 15),
(45, '15-3문제 \r\n 직렬화를 구현하기 위해 자바에서 사용하는 두 가지 인터페이스를 바르게 짝지은 것은? \r\n\r\n 1.ObjectInputStream/ObjectOutputStream  2.writeExternal/readExternal  3.transient/serialVersionUID  4.Serialization/Externalization ', 4, 15);


-- ===================================================================================================================================
-- Select 문 만들기!



